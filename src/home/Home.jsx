// import { useState, useEffect } from "react";

// const Home = () => {
//     const [isListening, setIsListening] = useState(false);
//     const [transcription, setTranscription] = useState("");
//     const [isShoutDetected, setIsShoutDetected] = useState(false);

//     useEffect(() => {
//         let recognition;
//         let audioContext;
//         let analyser;
//         let microphone;
//         let javascriptNode;

//         const startListening = async () => {
//             // Initialize SpeechRecognition
//             recognition = new webkitSpeechRecognition();
//             recognition.lang = "en-GB";
//             recognition.continuous = true;
//             recognition.interimResults = false;

//             recognition.onresult = (event) => {
//                 const transcript =
//                     event.results[event.results.length - 1][0].transcript;
//                 setTranscription(transcript);
//                 console.log("Transcribed Text:", transcript);
//             };

//             recognition.onerror = (event) => {
//                 console.error("Speech recognition error:", event.error);
//             };

//             recognition.onend = () => {
//                 if (isListening) recognition.start(); // Restart listening
//             };

//             recognition.start();
//             setIsListening(true);

//             // Initialize Web Audio API
//             audioContext = new (window.AudioContext || window.webkitAudioContext)();
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             microphone = audioContext.createMediaStreamSource(stream);
//             analyser = audioContext.createAnalyser();
//             analyser.fftSize = 256;
//             microphone.connect(analyser);
//             javascriptNode = audioContext.createScriptProcessor(256, 1, 1);

//             javascriptNode.onaudioprocess = () => {
//                 const array = new Uint8Array(analyser.frequencyBinCount);
//                 analyser.getByteFrequencyData(array);
//                 const volume = array.reduce((a, b) => a + b) / array.length;

//                 if (volume > 100) { // Threshold for a shout
//                     setIsShoutDetected(true);
//                 } else {
//                     setIsShoutDetected(false);
//                 }
//             };

//             microphone.connect(javascriptNode);
//             javascriptNode.connect(audioContext.destination);
//         };

//         startListening();

//         return () => {
//             if (recognition) recognition.abort();
//             if (audioContext) audioContext.close();
//             if (javascriptNode) javascriptNode.disconnect();
//         };
//     }, []);

//     return (
//         <div className="shout-to-text">
//             <h1>Shout to Text</h1>
//             <div>
//                 {isShoutDetected ? (
//                     <p className="text-green-500">Shout Detected!</p>
//                 ) : (
//                     <p className="text-gray-500">Speak normally or shout to detect...</p>
//                 )}
//             </div>
//             <div>
//                 <p>Transcribed Text: {transcription}</p>
//             </div>
//         </div>
//     );
// };

// export default Home;
