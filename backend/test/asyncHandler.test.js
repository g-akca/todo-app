import test from "node:test";
import assert from "node:assert/strict";
import { asyncHandler } from "../utils/asyncHandler.js";

test("asyncHandler calls wrapped handler", async () => {
  let called = false;
  const req = {};
  const res = {};
  const next = () => {};

  const wrapped = asyncHandler(async () => {
    called = true;
  });

  await wrapped(req, res, next);

  assert.equal(called, true);
});

test("asyncHandler forwards thrown errors to next", async () => {
  const req = {};
  const res = {};
  const expectedError = new Error("boom");
  let receivedError = null;

  const wrapped = asyncHandler(async () => {
    throw expectedError;
  });

  await wrapped(req, res, (error) => {
    receivedError = error;
  });

  assert.equal(expectedError, receivedError);
});
