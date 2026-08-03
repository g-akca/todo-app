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

test("validateSignupInput rejects when email is missing", () => {
  const result = validateSignupInput({
    email: "",
    password: "StrongPass1",
    confirmPassword: "StrongPass1",
  });

  assert.equal(result.error, "Email and passwords are required.");
});

test("validateSignupInput rejects when password is missing", () => {
  const result = validateSignupInput({
    email: "user@example.com",
    password: "",
    confirmPassword: "StrongPass1",
  });

  assert.equal(result.error, "Email and passwords are required.");
});

test("validateSignupInput rejects invalid email format", () => {
  const result = validateSignupInput({
    email: "not-an-email",
    password: "StrongPass1",
    confirmPassword: "StrongPass1",
  });

  assert.equal(result.error, "Please provide a valid email address.");
});

test("validateSignupInput rejects email shorter than minimum length", () => {
  const result = validateSignupInput({
    email: "a@b",
    password: "StrongPass1",
    confirmPassword: "StrongPass1",
  });

  assert.equal(result.error, "Email must be between 5 and 254 characters.");
});

test("validateSignupInput rejects email longer than maximum length", () => {
  const localPart = "a".repeat(249);
  const result = validateSignupInput({
    email: `${localPart}@x.com`,
    password: "StrongPass1",
    confirmPassword: "StrongPass1",
  });

  assert.equal(result.error, "Email must be between 5 and 254 characters.");
});

test("validateSignupInput rejects password shorter than minimum length", () => {
  const result = validateSignupInput({
    email: "user@example.com",
    password: "Short1",
    confirmPassword: "Short1",
  });

  assert.equal(result.error, "Password must be between 8 and 32 characters.");
});

test("validateSignupInput rejects password longer than maximum length", () => {
  const longPassword = "A".repeat(33);
  const result = validateSignupInput({
    email: "user@example.com",
    password: longPassword,
    confirmPassword: longPassword,
  });

  assert.equal(result.error, "Password must be between 8 and 32 characters.");
});

test("validateTaskDescription rejects empty content", () => {
  const result = validateTaskDescription("   ");

  assert.equal(result.error, "A task description is required.");
});

test("validateTaskDescription trims valid description", () => {
  const result = validateTaskDescription("   finish homework   ");

  assert.equal(result.error, null);
  assert.equal(result.value, "finish homework");
});

test("validateTaskDescription accepts exactly 255 characters", () => {
  const exactLength = "a".repeat(255);
  const result = validateTaskDescription(exactLength);

  assert.equal(result.error, null);
  assert.equal(result.value.length, 255);
});

test("validateTaskDescription rejects description longer than 255 characters", () => {
  const tooLong = "a".repeat(256);
  const result = validateTaskDescription(tooLong);

  assert.equal(result.error, "Task description must be 255 characters or fewer.");
});