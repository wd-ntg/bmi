import React, { useState } from "react";

import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function MainDashboard({ currentUser }) {
  const [user, loading] = useAuthState(auth);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(`${user?.displayName}`);


  return (
    <div className="px-40 py-20 flex">
      <div>
        <div className="text-3xl font-semibold">Tài khoản</div>
        <div className="flex items-center justify-center text-xl mt-8 leading-6 bg-gray-100 w-[240px] py-2 px-2">
          <div className="mr-4 text-3xl">
            <iconify-icon icon="bx:user"></iconify-icon>
          </div>
          <div>Cài đặt tài khoản</div>
        </div>
      </div>
      <div className="ml-28 py-20">
        <header>
          <div className="font-semibold text-2xl">Thông tin cá nhân</div>
          <div className="border-b-[2px] border-gray-500 mt-4"></div>
        </header>
        <main>
          <div className="flex justify-center items-center">
            <div>
              <div className="font-semibold text-xl mt-4">Họ tên</div>
              <input
                className="w-[560px] px-2 py-1 my-4 outline-none border-b-[1px] border-gray-500"
                value={isEditing ? value : user?.displayName}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onClick={() => setIsEditing(true)}
              />
              <div>Tên của bạn xuất hiện trên trang cá nhân</div>
            </div>
            <div className="ml-8">
              <button className="rounded-lg border-gray-500 border-[1px] px-2 py-1 mx-2 hover:bg-green-400">
                Lưu
              </button>
              <button className="rounded-lg border-gray-500 border-[1px] px-2 py-1 mx-2 hover:bg-red-400">
                Hủy
              </button>
            </div>
          </div>
          <div>
            <div className="font-semibold text-xl mt-4">Avatar</div>
            <div className="flex items-center">
              <div className="flex items-center">
                <div>
                  Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.
                </div>
                <div>
                  <img
                    className="rounded-full w-[70px] h-[70px] bg-cover ml-6"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <div>
                <button className="rounded-lg border-gray-500 border-[1px] px-2 py-1 mx-2 hover:bg-green-400 ml-28">
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-xl mt-4 mb-2">Email</div>
            <div>{user.email}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainDashboard;
