import React, { useEffect, useState } from "react";
import { makeUnauthenticatedPOSTRequestToken } from "../utils/serverHelpers";

import "../assets/css/chats.css";

function Chats({ currentUser }) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]); // Sử dụng state để lưu trữ các tin nhắn

  const [isScrolling, setIsScrolling] = useState(false);

  // Loading

  const [isLoadingOpenAI, setIsLoadingOpenAI] = useState(true);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      try {
        const response = await makeUnauthenticatedPOSTRequestToken(
          "/chat/send",
          {
            currentUserId: currentUser._id,
            message: message,
          }
        );
        // Kiểm tra xem tin nhắn có giá trị không trống
        setChatLog([...chatLog, message]); // Thêm tin nhắn vào chatLog
        setMessage(""); // Xóa nội dung tin nhắn sau khi gửi
      } catch (error) {
        console.log("Error fetching Send Message OpenAI info:", error);
      }
    }
  };

  const getResponseFromOpenAI = async () => {
    try {
      const response = await makeUnauthenticatedPOSTRequestToken(
        "/openai/response",
        {
          message: message,
        }
      );
      if (response) {
        const request = await makeUnauthenticatedPOSTRequestToken(
          "/chat/send",
          {
            currentUserId: currentUser._id,
            message: response,
          }
        );
      }
      setIsLoadingOpenAI(false);
    } catch (error) {
      console.log("Error fetching data from Open AI: ", error);
      setIsLoadingOpenAI(false);
    }
  };

  const handleGetChats = async () => {
    try {
      const response = await makeUnauthenticatedPOSTRequestToken(
        "/chat/getChats",
        {
          currentUserId: currentUser._id,
        }
      );
      setChatLog(response);
    } catch (error) {
      console.log("Error fetching data from Open AI: ", error);
    }
  };

  useEffect(() => {
    handleGetChats();
  }, [chatLog]);

  const handleClearChat = async () => {
    try {
      const response = await makeUnauthenticatedPOSTRequestToken(
        "/chat/clear",
        {
          currentUserId: currentUser._id,
        }
      );
    } catch (error) {
      console.log("Error fetching clear chat: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative overflow-hidden ">
        <div className="">
          <div
            className={`border-solid border-2 w-[980px] h-[480px] border-gray-400 overflow-y-scroll max-h-[88vh] rounded-md ${
              isScrolling ? "overflow-y-scroll" : "overflow-hidden"
            } `}
            id="chat_log"
            onScroll={() => {
              setIsScrolling(true);
            }}
          >
            {/* Hiển thị các tin nhắn trong chatLog */}
            {chatLog.length > 0 ? (
              <div className="my-4 mx-4">
                {chatLog?.map((msg, index) => (
                  <div key={index} className="py-1 px-2 ">
                    {index % 2 !== 0 ? (
                      <div className="flex">
                        <div className="text-3xl text-green-600 mr-4 mb-12">
                          <iconify-icon icon="arcticons:thunder"></iconify-icon>
                        </div>
                        {/* {index === chatLog.length - 1 && isLoadingOpenAI ? (
                          <div>Loading...</div>
                        ) : (
                          <div>{msg}</div>
                        )} */}
                        <div className="translate-y-2">{msg}</div>
                      </div>
                    ) : (
                      <div className="flex">
                        <div className="text-3xl text-green-600 mr-4 mb-12">
                          <iconify-icon icon="prime:user"></iconify-icon>
                        </div>
                        <div>{msg}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 px-4 flex justify-center h-[100%] flex-col bg-dark">
                <div className="flex justify-center items-center">
                  <div className="text-3xl text-green-600 mr-3 mb-4">
                    <iconify-icon icon="arcticons:thunder"></iconify-icon>
                  </div>
                  <div className="text-[18px] text-white">
                    Tôi là BMI, một cộng sự sáng tạo và hữu ích của bạn. Tôi có
                    một số hạn chế và không phải lúc nào cũng đúng. Tuy nhiên,
                    phản hồi của bạn sẽ giúp tôi cải thiện. Bạn không biết chắc
                    nên bắt đầu từ đâu?
                  </div>
                </div>
                <div className=" ml-12 mt-4">
                  <span className="text-blue-500 hover:text-blue-400 cursor-pointer">
                    Tìm hiểu chế độ dinh dưỡng hợp lí?
                  </span>
                </div>
                <div className="text-blue-500 hover:text-blue-400 ml-12 mt-2">
                  <span className="text-blue-500 hover:text-blue-400 cursor-pointer">
                    Các món ăn và dinh dưỡng?
                  </span>
                </div>
                <div className="flex justify-between px-16 mt-12">
                  <div>
                    <div className="leading-5 border-[1px] border-solid border-gray-400 px-2 py-1 rounded-md mt-4 text-white cursor-pointer hover:bg-gray-400">
                      <div>Gợi món ăn cho hôm nay</div>
                      <div className="text-gray-500">
                        với món ăn có lợi cho sức khỏe
                      </div>
                    </div>
                    <div className="leading-5 border-[1px] border-solid border-gray-400 px-2 py-1 rounded-md mt-4 text-white cursor-pointer hover:bg-gray-400">
                      <div>Gợi món ăn cho hôm nay</div>
                      <div className="text-gray-500">
                        với món ăn có lợi cho sức khỏe
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="leading-5 border-[1px] border-solid border-gray-400 px-2 py-1 rounded-md mt-4 text-white cursor-pointer hover:bg-gray-400">
                      <div>Gợi món ăn cho hôm nay</div>
                      <div className="text-gray-500">
                        với món ăn có lợi cho sức khỏe
                      </div>
                    </div>
                    <div className="leading-5 border-[1px] border-solid border-gray-400 px-2 py-1 rounded-md mt-4 text-white cursor-pointer hover:bg-gray-400">
                      <div>Gợi món ăn cho hôm nay</div>
                      <div className="text-gray-500">
                        với món ăn có lợi cho sức khỏe
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center pt-8">
          <button
            className="border-solid border-gray-400 border-[1px] px-2 py-1 rounded-lg mr-6 hover:bg-red-500 hover:text-white font-semibold"
            onClick={() => {
              handleClearChat();
            }}
          >
            Clear
          </button>
          <input
            className="border-solid border-[1px] border-gray-600 outline-none focus:border-green-400 w-[640px] h-[48px] px-2 py-1 rounded-lg"
            placeholder="Nhập câu hỏi tại đây"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
                getResponseFromOpenAI();
                handleGetChats();
              }
            }}
          />
          <div
            className="text-3xl ml-4 cursor-pointer hover:text-green-400 text-green-300"
            onClick={() => {
              handleSendMessage();
              getResponseFromOpenAI();
              handleGetChats();
            }}
          >
            <iconify-icon icon="majesticons:send-line"></iconify-icon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
