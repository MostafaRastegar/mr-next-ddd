import jwt from 'jsonwebtoken';

export function getJwtSecretKey() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

  if (!secret) {
    throw new Error('JWT Secret key is not matched');
  }

  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token?: string) {
  try {
    const payload = jwt.decode(token ?? '');
    return payload;
  } catch (error) {
    return null;
  }
}
