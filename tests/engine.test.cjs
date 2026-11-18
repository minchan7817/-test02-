const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = vm.createContext({});
for (const file of ['data.js', 'engine.js']) {
  const location = path.join(__dirname, '..', file);
  if (fs.existsSync(location)) vm.runInContext(fs.readFileSync(location, 'utf8'), context);
}
const getAPI = () => {
  assert.ok(context.Eco, '학습 프로그램의 상태 로직이 있어야 합니다.');
  return context.Eco;
};
const fixture = [
  { name: '토끼풀', kind: 'biotic', role: 'producer' },
  { name: '물', kind: 'abiotic', role: null },
];
const make = (mode = 'study') => new (getAPI().Session)(mode, fixture, 1000, false);

test('지정 20개와 추가 50개를 중복 없이 출제한다', () => {
  const api = getAPI();
  assert.equal(api.items.length, 70);
  assert.equal(new Set(api.items.map(x => x.name)).size, 70);
  const originals = '토끼풀,나무,토끼,참매,개구리,나비,거미,다람쥐,잠자리,벌,호랑이,사슴,뱀,세균,곰팡이,버섯,공기,흙,햇빛,물'.split(',');
  for (const name of originals) assert.ok(api.items.some(x => x.name === name), name);
  assert.equal(api.items.filter(x => x.kind === 'abiotic').length, 10);
  for (const item of api.items) {
    assert.ok(item.explanation.length > 10, item.name);
    assert.ok(item.kind === 'abiotic' ? item.role === null : ['producer', 'consumer', 'decomposer'].includes(item.role));
  }
});
test('학습에서 틀리면 같은 단계와 문제에서 다시 선택한다', () => {
  const s = make();
  assert.equal(s.answer('abiotic', 1001).status, 'retry');
  assert.equal(s.index, 0);
  assert.equal(s.stage, 'kind');
  assert.equal(s.answer('biotic', 1002).status, 'role');
  assert.equal(s.answer('consumer', 1003).status, 'retry');
  assert.equal(s.stage, 'role');
  assert.equal(s.answer('producer', 1004).status, 'correct');
});
test('이전 문제의 정답 상태를 유지하며 학습을 끝낸다', () => {
  const s = make();
  assert.equal(s.previous(), false);
  s.answer('biotic', 1001); s.answer('producer', 1002);
  assert.equal(s.next(1003), true);
  assert.equal(s.previous(), true);
  assert.equal(s.completed.has(0), true);
  assert.equal(s.stage, 'done');
  s.next(1004); s.answer('abiotic', 1005); s.next(1006);
  assert.equal(s.finished, true);
  assert.equal(s.completed.size, 2);
});
test('게임은 최종 정답에만 10점을 주고 연속 입력을 무시한다', () => {
  const s = make('game');
  s.answer('biotic', 1001);
  assert.equal(s.score, 0);
  assert.equal(s.answer('producer', 1002).status, 'correct');
  assert.equal(s.score, 10);
  assert.equal(s.answer('producer', 1003).status, 'ignored');
  assert.equal(s.score, 10);
  assert.equal(s.correct, 1);
});
test('게임 오답은 0점이고 다음 문제는 첫 단계로 시작한다', () => {
  const s = make('game');
  s.answer('biotic', 1001);
  assert.equal(s.answer('consumer', 1002).status, 'wrong');
  assert.equal(s.score, 0);
  s.next(1003);
  assert.equal(s.current.name, '물');
  assert.equal(s.stage, 'kind');
  assert.equal(s.attempted, 1);
});
test('정확히 120초에 만료되고 지연된 입력으로 점수를 얻지 못한다', () => {
  const s = make('game');
  assert.equal(s.remaining(120999), 1);
  assert.equal(s.remaining(121000), 0);
  assert.equal(s.answer('biotic', 121000).status, 'expired');
  assert.equal(s.finished, true);
  assert.equal(s.score, 0);
  assert.equal(s.next(121001), false);
});
test('게임은 전체 문제를 풀어도 시간이 남으면 계속 출제한다', () => {
  const s = make('game');
  s.answer('biotic', 1001); s.answer('producer', 1002); s.next(1003);
  s.answer('abiotic', 1004); s.next(1005);
  assert.equal(s.finished, false);
  assert.equal(s.stage, 'kind');
  assert.equal(s.attempted, 2);
  assert.equal(s.score, 20);
  assert.ok(s.current);
});
test('섞은 학습 세트에도 70개가 빠짐없이 한 번씩 나온다', () => {
  const api = getAPI();
  const s = new api.Session('study', api.items, 0);
  assert.equal(s.deck.length, 70);
  assert.equal(new Set(s.deck.map(x => x.name)).size, 70);
});
