import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const App = () => {
  const [notifications, setNotifications] = useState([]);
  const record = () => {
    var recognition = new webkitSpeechRecognition()
    recognition.lang = 'en-GB'

    recognition.onresult = function (event) {
      console.log(event)
      const transcript = event.results[0][0].transcript;

      // Save the voice input to localStorage
      const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
      storedNotifications.push(transcript);
      localStorage.setItem("notifications", JSON.stringify(storedNotifications));

      // Update input field with recognized speech
      document.getElementById("speech").value = transcript;
    }
    recognition.start()
  }

  const showNotifications = () => {
    // Fetch notifications from localStorage
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  };
  return (
    <div className="flex flex-col lg:flex-row  justify-between items-center bg-[#e0f0ff]">
      {/* smartwatch */}
      <div className=" sm:mr-0 sm:ml-1 md:ml-40 w-[500px]">

        <div className="relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-t-[2.5rem] h-[63px] max-w-[133px]"></div>
        <div className="relative mx-auto border-gray-900 dark:bg-gray-800 dark:border-gray-800 border-[10px] rounded-[2.5rem] h-[213px] w-[208px]">
          <div className="h-[41px] w-[6px] bg-gray-800 dark:bg-gray-800 absolute -end-[16px] top-[40px] rounded-e-lg"></div>
          <div className="h-[32px] w-[6px] bg-gray-800 dark:bg-gray-800 absolute -end-[16px] top-[88px] rounded-e-lg"></div>
          <div className="rounded-[2rem] overflow-hidden h-[193px] w-[188px]">

          </div>
        </div>
        <div className="relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-b-[2.5rem] h-[63px] max-w-[133px]"></div>



        <div className="mt-14 w-full">

          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
          <div className=" mt-3 w-full relative">
          <input onClick={record}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 pl-10"
            id="speech"
            type="text"
            name="speech"
            placeholder="Say something"
          />
          <FaMicrophone
            onClick={record}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
          />
        </div>
        </div>




      </div>
      {/* mobile app */}
      <div className=" sm:ml-1 md:ml-[420px] h-full mr-36 mt-10">

        <div className="relative mx-auto border-gray-300 dark:border-gray-800 bg-gray-300 dark:bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
          <div className="h-[32px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
          <div className="text-center rounded-[2rem]  w-[272px] h-[572px] bg-white dark:bg-gray-800 overflow-y-scroll">
            <div className="mt-5"><button onClick={showNotifications} className="px-5 bg-[blue] py-3 rounded text-white">Notifications</button></div>
            <div className="mt-5 px-4">
              {notifications.length === 0 ? (
                <p>No notifications available.</p>
              ) : (
                <ul>
                  {notifications.map((note, index) => (
                    <li key={index} className="text-left my-2">
                      {index + 1}. {note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
export default App;
