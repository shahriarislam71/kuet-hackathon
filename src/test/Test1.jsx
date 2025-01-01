import { useState, useEffect } from "react";
import { FaMicrophone, FaBell } from "react-icons/fa";

const Test = () => {
    const [notifications, setNotifications] = useState([]);
    const [recognition, setRecognition] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [voiceOutput, setVoiceOutput] = useState(""); // Store voice output
    const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
    let silenceTimeout;

    useEffect(() => {
        // Initialize Speech Recognition
        const newRecognition = new webkitSpeechRecognition();
        newRecognition.lang = 'en-GB';
        newRecognition.continuous = true;
        newRecognition.interimResults = false;

        // Handle speech recognition result
        newRecognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();;

            // Update notifications and local storage
            const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
            storedNotifications.push(transcript);
            localStorage.setItem("notifications", JSON.stringify(storedNotifications));
            setNotifications(storedNotifications);

            // Update voice output
            setVoiceOutput(transcript);

            // Update input field
            document.getElementById("speech").value = transcript;

            // Check for keywords and trigger alarm
            if (transcript.includes("help") || transcript.includes("hijacking")) {
                playAlarm();
            }

            // Reset silence timeout
            if (silenceTimeout) clearTimeout(silenceTimeout);
            silenceTimeout = setTimeout(() => {
                if (isListening) {
                    setIsListening(false);
                    newRecognition.stop();
                }
            }, 3000); // Stop listening after 3 seconds of silence
        };

        // Restart listening when the user starts speaking again
        newRecognition.onend = () => {
            if (!isListening) {
                setIsListening(true);
                newRecognition.start();
            }
        };

        // Handle errors
        newRecognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            if (event.error === "not-allowed" || event.error === "service-not-allowed") {
                alert("Microphone access is denied. Please allow microphone permissions.");
            }
            setIsListening(false);
        };

        setRecognition(newRecognition);

        return () => {
            // Cleanup on component unmount
            newRecognition.abort();
        };
    }, []);

    useEffect(() => {
        if (recognition && !isListening) {
            recognition.start();
            setIsListening(true);
        }
    }, [recognition, isListening]);



    const playAlarm = () => {
        if (isAlarmPlaying) return; // Prevent multiple alarms from playing

        setIsAlarmPlaying(true);
        const alarmAudio = new Audio("../../public/danger-alarm-23793.mp3"); // Replace with the path to your alarm sound file
        alarmAudio.play();

        // Stop the alarm after 10 seconds
        setTimeout(() => {
            alarmAudio.pause();
            alarmAudio.currentTime = 0;
            setIsAlarmPlaying(false);
        }, 10000);
    };

    const showNotifications = () => {
        const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
        setNotifications(storedNotifications);
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center bg-[#e0f0ff] py-20">
            {/* Smartwatch */}
            <div className="sm:mr-0 sm:ml-1 md:ml-40 pt-36">
                <div className="relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-t-[2.5rem] h-[63px] max-w-[133px]"></div>
                <div className="relative mx-auto border-gray-900 dark:bg-gray-800 dark:border-gray-800 border-[10px] rounded-[2.5rem] h-[500px] w-[300px]">
                    {/* Icons */}
                    <div className="flex justify-between px-4 py-2">
                        <FaMicrophone
                            className={`text-2xl ${isListening ? "text-green-500" : "text-gray-400"}`}
                        />
                        <FaBell className="text-2xl text-gray-400" />
                    </div>

                    {/* Voice Output */}
                    <div className="text-center mt-4 px-4 py-6 rounded-[2rem] bg-gray-100 dark:bg-gray-800 h-[400px] w-[280px] mx-auto">
                        <p className="text-gray-800 dark:text-white text-lg">
                            {voiceOutput || "Say something..."}
                        </p>
                    </div>
                </div>
                <div className="relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-b-[2.5rem] h-[63px] max-w-[133px]"></div>

                <div className="mt-14 w-full">
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                    />
                    <div className="mt-3 w-full relative">
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 pl-10"
                            id="speech"
                            type="text"
                            name="speech"
                            placeholder="Say something"
                            readOnly
                        />
                        <FaMicrophone
                            className={`absolute top-1/2 left-3 transform -translate-y-1/2 ${isListening ? "text-green-500" : "text-gray-600"
                                }`}
                        />
                    </div>
                </div>
            </div>
            {/* Mobile App */}
            <div className="sm:ml-1 md:ml-[420px] h-full mr-36">
                <div className="relative mx-auto border-gray-300 dark:border-gray-800 bg-gray-300 dark:bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
                    <div className="text-center rounded-[2rem] w-[272px] h-[572px] bg-white dark:bg-gray-800 overflow-y-scroll">
                        <div className="mt-5">
                            <button onClick={showNotifications} className="px-5 bg-[blue] py-3 rounded text-white">
                                Notifications
                            </button>
                        </div>
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
    );
};

export default Test;
