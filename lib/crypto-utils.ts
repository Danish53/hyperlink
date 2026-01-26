import crypto from 'crypto';

const ENC_KEY_BASE64 = process.env.ENCRYPTION_KEY_BASE64;
if (!ENC_KEY_BASE64) {
  throw new Error('ENCRYPTION_KEY_BASE64 not set');
}
const ENC_KEY = Buffer.from(ENC_KEY_BASE64, 'base64');
if (ENC_KEY.length !== 32) {
  throw new Error('ENCRYPTION_KEY must be 32 bytes (base64).');
}

export function encryptText(plain: string): string {
  const iv = crypto.randomBytes(12); // 96-bit recommended for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', ENC_KEY, iv);
  const ciphertext = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  const payload = {
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    data: ciphertext.toString('base64'),
  };
  return JSON.stringify(payload);
}

export function decryptText(payloadJson: string): string {
  const payload = JSON.parse(payloadJson);
  const iv = Buffer.from(payload.iv, 'base64');
  const tag = Buffer.from(payload.tag, 'base64');
  const data = Buffer.from(payload.data, 'base64');

  const decipher = crypto.createDecipheriv('aes-256-gcm', ENC_KEY, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return decrypted.toString('utf8');
}
