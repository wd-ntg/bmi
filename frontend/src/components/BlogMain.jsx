import React from "react";

import { Link } from "react-router-dom";

function BlogMain() {
  return (
    <div className="flex justify-center items-center py-16 flex-col">
      <header>
        <div className="text-xl text-black font-semibold my-4">
          Best Health Blog And Website
        </div>
        <div className="font-semibold">
          Choose from one of the most popular health blogs. Subscribe to your
          favorite health blogs for free.
        </div>
        <div className="my-4 text-sm font-semibold">POPULAR HEALTH BLOGS</div>
      </header>
      <main>
        <div>
          <Link to="https://feedly.com/i/subscription/feed%2Fhttp%3A%2F%2Frssfeeds.webmd.com%2Frss%2Frss.aspx%3FRSSSource%3DRSS_PUBLIC">
            <div className="flex w-[720px] justify-between border-[1px] border-solid border-gray-500 px-6 py-6 rounded-md hover:bg-gray-100 mb-8">
              <div className="w-[60px] h-[60px] mr-8">
                <img
                  className="w-[60px] h-[60px] rounded-md bg-cover"
                  src="https://images.pexels.com/photos/17977593/pexels-photo-17977593/free-photo-of-binh-minh-hoang-hon-dan-ba-th-gian.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                />
              </div>
              <div>
                <header>
                  <div className="text-black font-semibold">
                    1. WebMD Health
                  </div>
                  <div className="font-sm text-gray-500">
                    #1 most popular health blog
                  </div>
                  <div className="font-sm text-gray-500">webmd.com</div>
                </header>
                <main className="text-gray-500 text-sm">
                  <div className="my-4">
                    WebMD Health - Trustworthy, Credible and Timely Health
                    Information. The content of this
                  </div>
                  <div>
                    Cost May Lead Many to Skip COVID Testing: Why That's a....
                  </div>
                  <div>
                    Atopic Dermaitis: The importance of Treatment Adherence
                  </div>
                  <div>
                    As Superfungi Spread, the CDC Raises Alarms
                  </div>
                </main>
                <footer className="flex justify-between text-sm mt-4 text-gray-500">
                  <div>
                    <div>46K</div>
                    <div>followers</div>
                  </div>
                  <div>
                    <div>14</div>
                    <div>article per week</div>
                  </div>
                  <div>
                    <div>85%</div>
                    <div>relevance</div>
                  </div>
                </footer>
              </div>
              <div className="ml-8 w-[120px] font-semibold flex justify-center">
                <div className="hover:bg-green-400 border-solid border-[1px] cursor-pointer hover:text-white border-gray-500 h-[24px] px-3 py-4 w-[120px] flex justify-center items-center rounded-lg">
                  READ NOW
                </div>
              </div>
            </div>
          </Link>
          <Link to="https://feedly.com/i/subscription/feed%2Fhttp%3A%2F%2Frssfeeds.webmd.com%2Frss%2Frss.aspx%3FRSSSource%3DRSS_PUBLIC">
            <div className="flex w-[720px] justify-between border-[1px] border-solid border-gray-500 px-6 py-6 rounded-md hover:bg-gray-100 mb-8">
              <div className="w-[60px] h-[60px] mr-8">
                <img
                  className="w-[60px] h-[60px] rounded-md bg-cover"
                  src="https://images.pexels.com/photos/17977593/pexels-photo-17977593/free-photo-of-binh-minh-hoang-hon-dan-ba-th-gian.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                />
              </div>
              <div>
                <header>
                  <div className="text-black font-semibold">
                    2. NYT - Health
                  </div>
                  <div className="font-sm text-gray-500">
                    #2 most popular health blog
                  </div>
                  <div className="font-sm text-gray-500">nytimes.com</div>
                </header>
                <main className="text-gray-500 text-sm">
                  <div className="my-4">
                    The latest news on health and medicine, covid, vaccines, global health, mental health,
                  </div>
                  <div>
                    Supports of Aid in Dying Sue N.J. Over Residency Requi...
                  </div>
                  <div>
                    Windows Installed in Skulls Help Doctors Study Damaged...
                  </div>
                  <div>
                    Decongestant in Cold Medicines Doesn't Work, Panel Says
                  </div>
                </main>
                <footer className="flex justify-between text-sm mt-4 text-gray-500">
                  <div>
                    <div>45K</div>
                    <div>followers</div>
                  </div>
                  <div>
                    <div>16</div>
                    <div>article per week</div>
                  </div>
                  <div>
                    <div>90%</div>
                    <div>relevance</div>
                  </div>
                </footer>
              </div>
              <div className="ml-8 w-[120px] font-semibold flex justify-center">
                <div className="hover:bg-green-400 border-solid border-[1px] cursor-pointer hover:text-white border-gray-500 h-[24px] px-3 py-4 w-[120px] flex justify-center items-center rounded-lg">
                  READ NOW
                </div>
              </div>
            </div>
          </Link>
          <Link to="https://feedly.com/i/subscription/feed%2Fhttp%3A%2F%2Frssfeeds.webmd.com%2Frss%2Frss.aspx%3FRSSSource%3DRSS_PUBLIC">
            <div className="flex w-[720px] justify-between border-[1px] border-solid border-gray-500 px-6 py-6 rounded-md hover:bg-gray-100">
              <div className="w-[60px] h-[60px] mr-8">
                <img
                  className="w-[60px] h-[60px] rounded-md bg-cover"
                  src="https://images.pexels.com/photos/17977593/pexels-photo-17977593/free-photo-of-binh-minh-hoang-hon-dan-ba-th-gian.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                />
              </div>
              <div>
                <header>
                  <div className="text-black font-semibold">
                    3. CNN.Com - RSS Channel - Health
                  </div>
                  <div className="font-sm text-gray-500">
                    #3 most popular health blog
                  </div>
                  <div className="font-sm text-gray-500">cnn.com</div>
                </header>
                <main className="text-gray-500 text-sm">
                  <div className="my-4">
                    CNN.com delivers up-to-the-minute news and information on the lastest top stories, weather
                  </div>
                  <div>
                    
                  </div>
                  <div>
                    An Arkansas toddler dies of rare brain-eating amoeba infec...
                  </div>
                  <div>
                    
                  </div>
                </main>
                <footer className="flex justify-between text-sm mt-4 text-gray-500">
                  <div>
                    <div>22K</div>
                    <div>followers</div>
                  </div>
                  <div>
                    <div>8</div>
                    <div>article per week</div>
                  </div>
                  <div>
                    <div>85%</div>
                    <div>relevance</div>
                  </div>
                </footer>
              </div>
              <div className="ml-8 w-[120px] font-semibold flex justify-center">
                <div className="hover:bg-green-400 border-solid border-[1px] cursor-pointer hover:text-white border-gray-500 h-[24px] px-3 py-4 w-[120px] flex justify-center items-center rounded-lg">
                  READ NOW
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div></div>
      </main>
    </div>
  );
}

export default BlogMain;
