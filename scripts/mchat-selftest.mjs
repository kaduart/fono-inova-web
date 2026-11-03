// node scripts/mchat-selftest.mjs — confere as regras de pontuação da M-CHAT-R
import assert from 'node:assert/strict';
import { scoreMchat, ageInMonths, isEligibleAge, REVERSE_ITEMS } from '../src/lib/mchat/scoring.js';

const allOk = Object.fromEntries(Array.from({ length: 20 }, (_, i) => [i + 1, !REVERSE_ITEMS.includes(i + 1)]));
let r = scoreMchat(allOk);
assert.equal(r.score, 0); assert.equal(r.level, 'baixo');

r = scoreMchat({ ...allOk, 2: true, 5: true, 12: true });
assert.deepEqual(r.riskItems, [2, 5, 12]); assert.equal(r.level, 'medio');

r = scoreMchat({ ...allOk, 1: false, 3: false });
assert.equal(r.score, 2); assert.equal(r.level, 'baixo');

const many = { ...allOk }; for (const n of [1, 3, 4, 6, 7, 8, 9, 10]) many[n] = false;
r = scoreMchat(many); assert.equal(r.score, 8); assert.equal(r.level, 'alto');

r = scoreMchat({ 1: true }); assert.equal(r.complete, false); assert.equal(r.level, null);

assert.equal(ageInMonths('2024-11-10', new Date(2026, 10, 3)), 23);
assert.equal(isEligibleAge(15), false); assert.equal(isEligibleAge(16), true); assert.equal(isEligibleAge(30), true); assert.equal(isEligibleAge(31), false);
console.log('M-CHAT ok');
