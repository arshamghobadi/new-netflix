import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const router = useRouter();
  if (!visible) {
    return null;
  }
  const signOutHnadler = async () => {
    await axios.get('api/signOut');
    router.push('/');
  };
  return (
    <div className=" bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3  group/item flex flex-row gap-3 items-center w-full">
          <Image
            src="/images/default-blue.png"
            alt="profil picture"
            width={50}
            height={50}
            priority={true}
            className=" w-8 rounded-md"
          />
          <p className="text-white text-sm group-hover/item:underline">
            UserName
          </p>
        </div>
        <hr className=" bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={signOutHnadler}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
