import verifyToken from '@/utils/verfyToken';
import { NextPageContext } from 'next';

import { IncomingMessage } from 'http';
import axios from 'axios';
import { useRouter } from 'next/router';
import UseCurrentUser from '../hooks/UseCurentUser';

interface ExtendedIncomingMessage extends IncomingMessage {
  cookies?: { [key: string]: string };
}
export default function Home() {
  const { data } = UseCurrentUser();

  const router = useRouter();
  const signOutHnadler = async () => {
    const res = await axios.get('/api/signOut');
    if (res.data.status === 'success') router.replace('/auth');
  };

  return (
    <>
      <h1 className="text-white">salm</h1>
      {data && <p className="text-white">logged in as: {data.data.email}</p>}
      <button className="bg-white w-full" onClick={signOutHnadler}>
        signOut
      </button>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const secretKey = process.env.SECRET_KEY;
  const req = context.req as ExtendedIncomingMessage;
  const token = req.cookies?.token;
  const result = verifyToken(token!, secretKey!);
  if (!result)
    return {
      redirect: { destination: '/auth', permanent: false },
    };

  return { props: { result } };
}
