import bcryptjs from 'bcryptjs';

export function hashPasswd(password: string): string {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
}

export function comparePasswd(password: string, hash: string): boolean {
  return bcryptjs.compareSync(password, hash);
}
