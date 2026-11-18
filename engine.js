(() => {
  function shuffled(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  class Session {
    constructor(mode, items, now, randomize = true) {
      this.mode = mode;
      this.deck = randomize ? shuffled(items) : [...items];
      this.index = 0;
      this.stage = 'kind';
      this.completed = new Set();
      this.score = 0;
      this.correct = 0;
      this.attempted = 0;
      this.mistakes = [];
      this.finished = false;
      this.deadline = now + 120000;
    }
    get current() { return this.deck[this.index]; }
    remaining(now) { return Math.max(0, Math.ceil((this.deadline - now) / 1000)); }
    expire(now) {
      if (this.mode === 'game' && now >= this.deadline) this.finished = true;
      return this.finished;
    }
    answer(value, now) {
      if (this.expire(now)) return {status:'expired'};
      if (this.stage === 'done') return {status:'ignored'};
      const expected = this.stage === 'kind' ? this.current.kind : this.current.role;
      if (value !== expected) {
        if (this.mode === 'study') return {status:'retry'};
        this.attempted++;
        this.mistakes.push(this.current);
        this.stage = 'done';
        return {status:'wrong'};
      }
      if (this.stage === 'kind' && value === 'biotic') {
        this.stage = 'role';
        return {status:'role'};
      }
      this.completed.add(this.index);
      this.stage = 'done';
      if (this.mode === 'game') { this.score += 10; this.correct++; this.attempted++; }
      return {status:'correct'};
    }
    next(now) {
      if (this.expire(now) || this.stage !== 'done') return false;
      this.index++;
      if (this.index === this.deck.length) {
        if (this.mode === 'study') { this.finished = true; return true; }
        const last = this.deck[this.deck.length - 1];
        this.deck = shuffled(this.deck);
        if (this.deck.length > 1 && this.deck[0] === last) [this.deck[0],this.deck[1]] = [this.deck[1],this.deck[0]];
        this.index = 0;
        this.completed.clear();
      }
      this.stage = this.mode === 'study' && this.completed.has(this.index) ? 'done' : 'kind';
      return true;
    }
    previous() {
      if (this.mode !== 'study' || this.index === 0 || this.finished) return false;
      this.index--;
      this.stage = this.completed.has(this.index) ? 'done' : 'kind';
      return true;
    }
  }
  Eco.Session = Session;
})();
