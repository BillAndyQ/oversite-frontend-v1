// lib/crypto.ts
import crypto from 'crypto';

const secret = process.env.COOKIE_SECRET_KEY!; // 32+ caracteres en tu archivo .env
const algorithm = 'aes-256-cbc';
const ivLength = 16;

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(ivLength);
  const key = crypto.createHash('sha256').update(secret).digest();

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(data: string): string {
  const [ivHex, encryptedText] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = crypto.createHash('sha256').update(secret).digest();

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
