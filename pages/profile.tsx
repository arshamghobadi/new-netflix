import { NextPageContext } from 'next';
import verifyToken from '@/utils/verfyToken';

import { IncomingMessage } from 'http';
import axios from 'axios';
import { useRouter } from 'next/router';
import UseCurrentUser from '../hooks/UseCurentUser';
import Image from 'next/image';

interface ExtendedIncomingMessage extends IncomingMessage {
  cookies?: { [key: string]: string };
}

const Profiles = () => {
  const router = useRouter();
  const { data } = UseCurrentUser();
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className=" text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push('/')}>
            <div className="group flex-row w-44 mx-auto">
              <div
                className="
              w-44 h-44 rounded-md flex items-center justify-center border-2
               border-transparent group-hover:cursor-pointer group-hover:border-white
               overflow-hidden"
              >
                <Image
                  src="/images/default-blue.png"
                  alt="profil picture"
                  width={180}
                  height={180}
                  priority={true}
                />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {data?.data.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profiles;
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
