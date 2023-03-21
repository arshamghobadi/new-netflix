import { verify, JwtPayload } from 'jsonwebtoken';

export default function verifyToken(token: string, secretkey: string) {
  try {
    const result = verify(token, secretkey) as JwtPayload;
    if (typeof result === 'string') {
      return false;
    } else {
      return { email: result.email };
    }
  } catch (error) {
    return false;
  }
}
