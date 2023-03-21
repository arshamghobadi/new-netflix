import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  const serialized = serialize('token', '', { path: '/', maxAge: 0 });

  res
    .status(200)
    .setHeader('set-Cookie', serialized)
    .json({ status: 'success', message: 'logged out' });
}
