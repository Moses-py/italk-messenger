"use client";

import { User } from "@prisma/client";

import UserBox from "./UserBox";
import { useEffect, useState } from "react";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const [searchUsers, setSearchUsers] = useState<User[]>([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (searchString === "") {
      setSearchUsers([]);
    } else {
      const filteredUsers = items.filter((item) => {
        return item.name?.toLowerCase()!.includes(searchString.toLowerCase());
      });

      setSearchUsers(filteredUsers);
    }
  }, [items, searchString]);

  return (
    <aside
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
              text-2xl 
              font-bold 
              text-neutral-800 
              py-4
            "
          >
            Add a friend
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by username"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="block 
            
            w-full 
            py-2 
            text-gray-900 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-600 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-gray-300
            sm:text-sm 
            sm:leading-6
            px-2
            outline-none
            "
          />
        </div>
        {searchUsers !== null &&
          searchUsers.map((user) => <UserBox key={user.id} data={user} />)}
      </div>
    </aside>
  );
};

export default UserList;
