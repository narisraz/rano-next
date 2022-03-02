import sha512 from 'crypto-js/sha512';
import Base64 from 'crypto-js/enc-base64';

export function encryptPassword(value: string): string {
  return Base64.stringify(sha512(value))
}