import bcrypt from 'bcrypt';

export function hashPassword(password: string): string {
  const saltRounds = 12;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}
