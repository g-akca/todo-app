const EMAIL_MIN_LENGTH = 5;
const EMAIL_MAX_LENGTH = 254;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 32;

export function validateSignupInput({ email, password, confirmPassword }) {
  if (!email || !password || !confirmPassword) {
    return { error: 'Email and passwords are required.' };
  }

  if (email.length < EMAIL_MIN_LENGTH || email.length > EMAIL_MAX_LENGTH) {
    return { error: `Email must be between ${EMAIL_MIN_LENGTH} and ${EMAIL_MAX_LENGTH} characters.` };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please provide a valid email address.' };
  }

  if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
    return { error: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.` };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  return { error: null };
}

export function validateTaskDescription(description) {
  const trimmed = description?.trim();

  if (!trimmed) {
    return { error: "A task description is required." };
  }

  return { error: null, value: trimmed };
}
