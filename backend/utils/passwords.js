import bcrypt from "bcryptjs";

const PASSWORD_SALT_ROUNDS = 12;

function hashPassword(password) {
  return bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
}

function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export { comparePassword, hashPassword };