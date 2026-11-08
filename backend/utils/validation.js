const EMAIL_MIN_LENGTH = 5;
const EMAIL_MAX_LENGTH = 254;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 32;
const TASK_DESCRIPTION_MAX_LENGTH = 255;

// Returns the first validation error plus the field ids it applies to.
export function validateSignupInput({ email, password, confirmPassword }) {
  if (!email || !password || !confirmPassword) {
    const fields = [];
    if (!email) fields.push('email');
    if (!password) fields.push('password');
    if (!confirmPassword) fields.push('confirmPassword');
    return { error: 'Email and passwords are required.', fields };
  }

  if (email.length < EMAIL_MIN_LENGTH || email.length > EMAIL_MAX_LENGTH) {
    return { error: `Email must be between ${EMAIL_MIN_LENGTH} and ${EMAIL_MAX_LENGTH} characters.`, fields: ['email'] };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please provide a valid email address.', fields: ['email'] };
  }

  if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
    return { error: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`, fields: ['password'] };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.', fields: ['confirmPassword'] };
  }

  return { error: null, fields: [] };
}

export function validateTaskDescription(description) {
  const trimmed = description?.trim();

  if (!trimmed) {
    return { error: "A task description is required." };
  }

  if (trimmed.length > TASK_DESCRIPTION_MAX_LENGTH) {
    return { error: `Task description must be ${TASK_DESCRIPTION_MAX_LENGTH} characters or fewer.` };
  }

  return { error: null, value: trimmed };
}
