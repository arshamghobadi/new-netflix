import verifyToken from '@/utils/verfyToken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  const secretKey = process.env.SECRET_KEY;

  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ status: 'fialed', message: 'you are not logged in' });
    }
    const result = verifyToken(token, secretKey!);

    if (result) {
      res.status(200).json({ status: 'success', data: result });
    } else {
      res
        .status(401)
        .json({ status: 'failed', messsage: 'you are unauthorized' });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}
