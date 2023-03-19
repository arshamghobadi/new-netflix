import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import prismadb from '../../lib/prismadb';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  try {
    const expriation = 24 * 60 * 60;
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Email and password required');
    }
    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.hashedPassword) {
      throw new Error('Email does not exist');
    }

    const isCorrectPassword = await compare(password, user.hashedPassword);

    if (!isCorrectPassword) {
      throw new Error('Incorrect password');
    }
    const token = sign({ email }, process.env.SECRET_KEY || '', {
      expiresIn: expriation,
    });
    res
      .status(200)
      .setHeader(
        'set-Cookie',
        serialize('token', token, {
          httpOnly: true,
          maxAge: expriation,
          path: '/',
        })
      )
      .json({
        status: 'success',
        message: 'Logged in',
        data: { email: user.email },
      });
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}
