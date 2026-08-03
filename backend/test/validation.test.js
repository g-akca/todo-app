import test from "node:test";
import assert from "node:assert/strict";
import { validateSignupInput, validateTaskDescription } from "../utils/validation.js";

test("validateSignupInput accepts a well-formed signup payload", () => {
  const result = validateSignupInput({
    email: "user@example.com",
    password: "StrongPass1",
    confirmPassword: "StrongPass1",
  });

  assert.equal(result.error, null);
});

test("validateSignupInput rejects mismatched passwords", () => {
  const result = validateSignupInput({
    email: "user@example.com",
    password: "StrongPass1",
    confirmPassword: "DifferentPass1",
  });

  assert.equal(result.error, "Passwords do not match.");
});

test("validateTaskDescription rejects empty content", () => {
  const result = validateTaskDescription("   ");

  assert.equal(result.error, "A task description is required.");
});