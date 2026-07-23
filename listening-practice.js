(function registerListeningPractice(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.CantoneseListening = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createListeningPracticeApi() {
  "use strict";

  const RETRY_MIN_GAP = 2;
  const RETRY_MAX_GAP = 3;

  function objectValue(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  }

  function itemDay(item) {
    return item?.day || "day1";
  }

  function hasText(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function isEligibleItem(item) {
    return Boolean(
      item
      && hasText(item.id)
      && hasText(item.cantonese || item.traditional)
      && hasText(item.mandarin)
      && hasText(item.jyutping)
    );
  }

  function itemsForDay(items, dayId) {
    return items.filter((item) => itemDay(item) === dayId && isEligibleItem(item));
  }

  function emptyState() {
    return { known: {}, unfamiliar: {}, retry: {}, sessions: {} };
  }

  function randomValue(random = Math.random) {
    const value = Number(random());
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(0.999999999999, value));
  }

  function sample(values, random = Math.random) {
    if (!values.length) return null;
    return values[Math.floor(randomValue(random) * values.length)];
  }

  function retryGap(random = Math.random) {
    return RETRY_MIN_GAP + Math.floor(randomValue(random) * (RETRY_MAX_GAP - RETRY_MIN_GAP + 1));
  }

  function nonNegativeInteger(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : fallback;
  }

  function cleanBooleanMap(value, validIds) {
    return Object.fromEntries(
      Object.entries(objectValue(value)).filter(([id, enabled]) => validIds.has(id) && Boolean(enabled))
    );
  }

  function sanitizeState(value, items, dayIds = []) {
    const eligibleItems = items.filter(isEligibleItem);
    const itemById = new Map(eligibleItems.map((item) => [item.id, item]));
    const validIds = new Set(itemById.keys());
    const validDays = new Set(dayIds.length ? dayIds : eligibleItems.map(itemDay));
    const source = objectValue(value);
    const known = cleanBooleanMap(source.known, validIds);
    const unfamiliar = cleanBooleanMap(source.unfamiliar, validIds);
    const retry = Object.fromEntries(
      Object.entries(objectValue(source.retry))
        .filter(([id, entry]) => validIds.has(id) && entry && typeof entry === "object")
        .map(([id, entry]) => {
          const remaining = nonNegativeInteger(entry.newCardsUntilDue ?? entry.due, RETRY_MIN_GAP);
          return [id, {
            newCardsUntilDue: remaining,
            due: remaining,
            repeats: nonNegativeInteger(entry.repeats)
          }];
        })
    );

    Object.keys(unfamiliar).forEach((id) => {
      if (!retry[id]) {
        retry[id] = { newCardsUntilDue: RETRY_MIN_GAP, due: RETRY_MIN_GAP, repeats: 0 };
      }
    });
    Object.keys(retry).forEach((id) => {
      unfamiliar[id] = true;
      delete known[id];
    });

    const sessions = {};
    Object.entries(objectValue(source.sessions)).forEach(([dayId, rawSession]) => {
      if (!validDays.has(dayId)) return;
      const dayPoolIds = new Set(eligibleItems.filter((item) => itemDay(item) === dayId).map((item) => item.id));
      const session = objectValue(rawSession);
      const seen = Array.isArray(session.seen)
        ? [...new Set(session.seen.filter((id) => dayPoolIds.has(id)))]
        : [];
      const currentItemId = dayPoolIds.has(session.currentItemId) ? session.currentItemId : null;
      sessions[dayId] = {
        seen,
        currentItemId,
        answerRevealed: Boolean(currentItemId && session.answerRevealed),
        assessmentReady: Boolean(currentItemId && (session.assessmentReady || session.answerRevealed))
      };
    });

    return { known, unfamiliar, retry, sessions };
  }

  function ensureState(state) {
    const value = objectValue(state);
    if (!value.known) value.known = {};
    if (!value.unfamiliar) value.unfamiliar = {};
    if (!value.retry) value.retry = {};
    if (!value.sessions) value.sessions = {};
    return value;
  }

  function ensureSession(state, dayId) {
    const listening = ensureState(state);
    if (!listening.sessions[dayId]) {
      listening.sessions[dayId] = {
        seen: [],
        currentItemId: null,
        answerRevealed: false,
        assessmentReady: false
      };
    }
    return listening.sessions[dayId];
  }

  function retryRemaining(entry) {
    return nonNegativeInteger(entry?.newCardsUntilDue ?? entry?.due, RETRY_MIN_GAP);
  }

  function scheduleRetry(state, itemId, random = Math.random, incrementRepeat = false) {
    const listening = ensureState(state);
    const previous = objectValue(listening.retry[itemId]);
    const gap = retryGap(random);
    listening.retry[itemId] = {
      newCardsUntilDue: gap,
      due: gap,
      repeats: nonNegativeInteger(previous.repeats) + (incrementRepeat ? 1 : 0)
    };
  }

  function markUnfamiliar(state, itemId, random = Math.random) {
    const listening = ensureState(state);
    delete listening.known[itemId];
    listening.unfamiliar[itemId] = true;
    scheduleRetry(listening, itemId, random, false);
  }

  function markKnown(state, itemId) {
    const listening = ensureState(state);
    listening.known[itemId] = true;
    delete listening.unfamiliar[itemId];
    delete listening.retry[itemId];
  }

  function decrementRetryCounters(state, pool) {
    const listening = ensureState(state);
    const poolIds = new Set(pool.map((item) => item.id));
    Object.entries(listening.retry).forEach(([id, entry]) => {
      if (!poolIds.has(id)) return;
      const remaining = Math.max(0, retryRemaining(entry) - 1);
      entry.newCardsUntilDue = remaining;
      entry.due = remaining;
    });
  }

  function dueRetryItems(state, pool, skipItemId) {
    const listening = ensureState(state);
    return pool.filter((item) => {
      const entry = listening.retry[item.id];
      return item.id !== skipItemId && entry && retryRemaining(entry) <= 0;
    });
  }

  function selectDueRetry(state, candidates, random) {
    if (!candidates.length) return null;
    const listening = ensureState(state);
    const minimumRepeats = Math.min(...candidates.map((item) => nonNegativeInteger(listening.retry[item.id]?.repeats)));
    return sample(
      candidates.filter((item) => nonNegativeInteger(listening.retry[item.id]?.repeats) === minimumRepeats),
      random
    );
  }

  function nextItem({ state, pool, dayId, advance = false, skipItemId = null, random = Math.random }) {
    const listening = ensureState(state);
    const eligiblePool = pool.filter((item) => itemDay(item) === dayId && isEligibleItem(item));
    const session = ensureSession(listening, dayId);

    if (!eligiblePool.length) {
      session.seen = [];
      session.currentItemId = null;
      session.answerRevealed = false;
      session.assessmentReady = false;
      return null;
    }

    const byId = new Map(eligiblePool.map((item) => [item.id, item]));
    session.seen = [...new Set(session.seen.filter((id) => byId.has(id)))];
    if (!byId.has(session.currentItemId)) {
      session.currentItemId = null;
      session.answerRevealed = false;
      session.assessmentReady = false;
    }

    if (!advance && session.currentItemId) return byId.get(session.currentItemId);

    if (advance) {
      const retryItem = selectDueRetry(listening, dueRetryItems(listening, eligiblePool, skipItemId), random);
      if (retryItem) {
        session.currentItemId = retryItem.id;
        session.answerRevealed = false;
        session.assessmentReady = false;
        if (!session.seen.includes(retryItem.id)) session.seen.push(retryItem.id);
        scheduleRetry(listening, retryItem.id, random, true);
        return retryItem;
      }
    }

    const ordinaryPool = eligiblePool.filter((item) => !listening.retry[item.id] && item.id !== skipItemId);
    const alternatePool = eligiblePool.filter((item) => item.id !== skipItemId);
    const selectionPool = ordinaryPool.length ? ordinaryPool : (alternatePool.length ? alternatePool : eligiblePool);
    const selectionIds = new Set(selectionPool.map((item) => item.id));
    let unseen = selectionPool.filter((item) => !session.seen.includes(item.id));

    if (!unseen.length) {
      const previousId = session.currentItemId;
      session.seen = session.seen.filter((id) => !selectionIds.has(id));
      unseen = selectionPool.length > 1
        ? selectionPool.filter((item) => item.id !== previousId)
        : [...selectionPool];
    }

    const item = sample(unseen.length ? unseen : selectionPool, random);
    session.currentItemId = item.id;
    session.answerRevealed = false;
    session.assessmentReady = false;
    if (!session.seen.includes(item.id)) session.seen.push(item.id);

    if (listening.retry[item.id]) scheduleRetry(listening, item.id, random, true);
    else decrementRetryCounters(listening, eligiblePool);

    return item;
  }

  function revealAnswer(state, dayId) {
    const session = ensureSession(state, dayId);
    if (session.currentItemId) {
      session.answerRevealed = true;
      session.assessmentReady = true;
    }
  }

  function enableAssessment(state, dayId) {
    const session = ensureSession(state, dayId);
    if (session.currentItemId) session.assessmentReady = true;
  }

  function resetDay(state, dayId, pool) {
    const listening = ensureState(state);
    pool.filter((item) => itemDay(item) === dayId).forEach((item) => {
      delete listening.known[item.id];
      delete listening.unfamiliar[item.id];
      delete listening.retry[item.id];
    });
    delete listening.sessions[dayId];
  }

  function progress(state, pool) {
    const listening = ensureState(state);
    return {
      known: pool.filter((item) => listening.known[item.id]).length,
      unfamiliar: pool.filter((item) => listening.unfamiliar[item.id]).length,
      total: pool.length
    };
  }

  return {
    RETRY_MIN_GAP,
    RETRY_MAX_GAP,
    emptyState,
    isEligibleItem,
    itemsForDay,
    sanitizeState,
    ensureSession,
    nextItem,
    revealAnswer,
    enableAssessment,
    markKnown,
    markUnfamiliar,
    resetDay,
    progress,
    retryRemaining
  };
});
