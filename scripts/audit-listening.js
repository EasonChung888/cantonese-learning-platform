#!/usr/bin/env node

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const listening = require("../listening-practice.js");

global.window = {};
require("../data.js");

const siteRoot = path.resolve(__dirname, "..");
const appSource = fs.readFileSync(path.join(siteRoot, "app.js"), "utf8");
const htmlSource = fs.readFileSync(path.join(siteRoot, "index.html"), "utf8");
const items = global.window.STUDY_ITEMS;
const dayIds = [...new Set(items.map((item) => item.day || "day1"))];
const sentenceItems = items.filter((item) => item.questionTypes?.includes("sentenceJyutping"));
const missingSentenceAudio = sentenceItems.filter((item) => (
  !fs.existsSync(path.join(siteRoot, "audio", "sentences", `${item.id}.m4a`))
));

assert(items.length > 0, "题库不能为空");
assert(dayIds.length > 0, "至少需要一个 Day");
assert(appSource.includes('const LISTENING_MODULE = "听力练习";'), "左侧听力模块常量缺失");
assert(appSource.includes("els.quizCard.hidden = listeningMode;"), "听力模式没有隐藏左侧原测验卡片");
assert(appSource.includes("els.listeningPractice.hidden = !listeningMode;"), "听力卡片没有跟随模块状态切换");
assert(/id="listeningPractice"[^>]*hidden/.test(htmlSource), "听力卡片没有默认隐藏");
assert(htmlSource.includes('id="studyPanel"'), "右侧资料栏缺少稳定定位");
const quizGridPosition = htmlSource.indexOf('id="quizGrid"');
const listeningPosition = htmlSource.indexOf('id="listeningPractice"');
const studyPanelPosition = htmlSource.indexOf('id="studyPanel"');
assert(
  quizGridPosition < listeningPosition && listeningPosition < studyPanelPosition,
  "听力卡片必须位于测验网格左列并保留右侧资料栏"
);
dayIds.forEach((dayId) => {
  const allDayItems = items.filter((item) => (item.day || "day1") === dayId);
  assert.strictEqual(
    listening.itemsForDay(items, dayId).length,
    allDayItems.length,
    `${dayId} 有条目缺少听力答案字段`
  );
});
assert.deepStrictEqual(missingSentenceAudio.map((item) => item.id), [], "存在缺少录音的完整句子");

function makeItem(id, day = "day-test") {
  return {
    id,
    day,
    traditional: id,
    mandarin: `普通话 ${id}`,
    jyutping: `${id}1`
  };
}

function ids(count) {
  return Array.from({ length: count }, (_, index) => makeItem(String.fromCharCode(65 + index)));
}

function zeroRandom() {
  return 0;
}

const roundPool = ids(6);
const roundState = listening.emptyState();
const firstRound = [];
let item = listening.nextItem({ state: roundState, pool: roundPool, dayId: "day-test", random: zeroRandom });
firstRound.push(item.id);
for (let index = 1; index < roundPool.length; index += 1) {
  item = listening.nextItem({ state: roundState, pool: roundPool, dayId: "day-test", advance: true, random: zeroRandom });
  firstRound.push(item.id);
}
assert.strictEqual(new Set(firstRound).size, roundPool.length, "普通轮次内出现了重复题");
const nextRoundItem = listening.nextItem({
  state: roundState,
  pool: roundPool,
  dayId: "day-test",
  advance: true,
  random: zeroRandom
});
assert.notStrictEqual(nextRoundItem.id, firstRound.at(-1), "新轮次立即重复了上一轮最后一题");

const retryPool = ids(6);
const retryState = listening.emptyState();
const unfamiliarItem = listening.nextItem({
  state: retryState,
  pool: retryPool,
  dayId: "day-test",
  random: zeroRandom
});
listening.markUnfamiliar(retryState, unfamiliarItem.id, zeroRandom);
const ordinaryOne = listening.nextItem({
  state: retryState,
  pool: retryPool,
  dayId: "day-test",
  advance: true,
  skipItemId: unfamiliarItem.id,
  random: zeroRandom
});
assert.notStrictEqual(ordinaryOne.id, unfamiliarItem.id, "未熟后没有立即切换到其他题");
assert.strictEqual(listening.retryRemaining(retryState.retry[unfamiliarItem.id]), 1, "第一道普通题后的间隔错误");
const ordinaryTwo = listening.nextItem({
  state: retryState,
  pool: retryPool,
  dayId: "day-test",
  advance: true,
  random: zeroRandom
});
assert.notStrictEqual(ordinaryTwo.id, unfamiliarItem.id, "未熟题过早重现");
assert.strictEqual(listening.retryRemaining(retryState.retry[unfamiliarItem.id]), 0, "第二道普通题后的间隔错误");
const repeatedItem = listening.nextItem({
  state: retryState,
  pool: retryPool,
  dayId: "day-test",
  advance: true,
  random: zeroRandom
});
assert.strictEqual(repeatedItem.id, unfamiliarItem.id, "未熟题没有在两道普通题后重现");

const retryThreeState = listening.emptyState();
const retryThreeItem = listening.nextItem({
  state: retryThreeState,
  pool: retryPool,
  dayId: "day-test",
  random: zeroRandom
});
listening.markUnfamiliar(retryThreeState, retryThreeItem.id, () => 0.999);
for (let remaining = 2; remaining >= 0; remaining -= 1) {
  const ordinaryItem = listening.nextItem({
    state: retryThreeState,
    pool: retryPool,
    dayId: "day-test",
    advance: true,
    skipItemId: remaining === 2 ? retryThreeItem.id : null,
    random: zeroRandom
  });
  assert.notStrictEqual(ordinaryItem.id, retryThreeItem.id, "三题间隔的未熟题过早重现");
  assert.strictEqual(
    listening.retryRemaining(retryThreeState.retry[retryThreeItem.id]),
    remaining,
    "三题间隔的普通题计数错误"
  );
}
const repeatedAfterThree = listening.nextItem({
  state: retryThreeState,
  pool: retryPool,
  dayId: "day-test",
  advance: true,
  random: zeroRandom
});
assert.strictEqual(repeatedAfterThree.id, retryThreeItem.id, "未熟题没有在三道普通题后重现");

const interleavedState = listening.emptyState();
interleavedState.unfamiliar.A = true;
interleavedState.unfamiliar.B = true;
interleavedState.retry.A = { newCardsUntilDue: 2, due: 2, repeats: 0 };
interleavedState.retry.B = { newCardsUntilDue: 0, due: 0, repeats: 0 };
const interleavedItem = listening.nextItem({
  state: interleavedState,
  pool: retryPool,
  dayId: "day-test",
  advance: true,
  random: zeroRandom
});
assert.strictEqual(interleavedItem.id, "B", "到期的待巩固题没有优先出现");
assert.strictEqual(listening.retryRemaining(interleavedState.retry.A), 2, "待巩固题重现错误缩短了其他题的间隔");

listening.markKnown(retryState, unfamiliarItem.id);
assert.strictEqual(retryState.known[unfamiliarItem.id], true, "认得状态没有记录");
assert.strictEqual(retryState.unfamiliar[unfamiliarItem.id], undefined, "认得后仍保留待巩固状态");
assert.strictEqual(retryState.retry[unfamiliarItem.id], undefined, "认得后仍保留重现状态");

const dirtyState = {
  known: { A: true, missing: true },
  unfamiliar: { B: true },
  retry: { B: { due: -5, repeats: "2" }, missing: { due: 0 } },
  sessions: {
    "day-test": {
      seen: ["A", "A", "missing"],
      currentItemId: "A",
      answerRevealed: true,
      assessmentReady: false
    },
    missing: { seen: ["A"], currentItemId: "A", answerRevealed: true, assessmentReady: true }
  }
};
const cleanState = listening.sanitizeState(dirtyState, retryPool, ["day-test"]);
assert.deepStrictEqual(cleanState.sessions["day-test"].seen, ["A"], "session seen 清理失败");
assert.strictEqual(cleanState.sessions["day-test"].answerRevealed, true, "答案展开状态没有保留");
assert.strictEqual(cleanState.sessions["day-test"].assessmentReady, true, "已展开答案没有进入可判断状态");
assert.strictEqual(cleanState.sessions.missing, undefined, "无效 Day session 没有删除");
assert.strictEqual(cleanState.known.missing, undefined, "无效题目状态没有删除");
assert.strictEqual(listening.retryRemaining(cleanState.retry.B), 0, "重现间隔没有规范化为非负整数");

const assessmentState = listening.emptyState();
listening.nextItem({ state: assessmentState, pool: retryPool, dayId: "day-test", random: zeroRandom });
listening.enableAssessment(assessmentState, "day-test");
assert.strictEqual(assessmentState.sessions["day-test"].assessmentReady, true, "播放后没有进入可判断状态");
assert.strictEqual(assessmentState.sessions["day-test"].answerRevealed, false, "播放不应自动显示答案");
listening.nextItem({
  state: assessmentState,
  pool: retryPool,
  dayId: "day-test",
  advance: true,
  random: zeroRandom
});
assert.strictEqual(assessmentState.sessions["day-test"].assessmentReady, false, "下一题错误继承可判断状态");
listening.revealAnswer(assessmentState, "day-test");
assert.strictEqual(assessmentState.sessions["day-test"].answerRevealed, true, "显示答案状态没有记录");
assert.strictEqual(assessmentState.sessions["day-test"].assessmentReady, true, "显示答案后没有进入可判断状态");

listening.resetDay(cleanState, "day-test", retryPool);
assert.deepStrictEqual(cleanState, listening.emptyState(), "重置 Day 没有清空对应听力状态");

console.log(`Listening audit passed: ${dayIds.length} days, ${items.length} items, ${sentenceItems.length} sentence audio files.`);
