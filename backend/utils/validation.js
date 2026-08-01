export function validateSignupInput({ email, password, confirmPassword }) {
  if (!email || !password || !confirmPassword) {
    return { error: 'Email and passwords are required.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please provide a valid email address.' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
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
