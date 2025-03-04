// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";

// function App() {
//     const [input, setInput] = useState("");
//     const [chatHistory, setChatHistory] = useState([]);
//     const [error, setError] = useState(null);
//     const chatBoxRef = useRef(null);

//     useEffect(() => {
//         if (chatBoxRef.current) {
//             chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//         }
//     }, [chatHistory]);

//     const handleSendMessage = async () => {
//         if (!input.trim()) return;

//         const userMessage = { input };
//         setChatHistory((prev) => [...prev, { type: "user", message: input }]);
//         setInput("");

//         try {
//             const response = await axios.post(
//                 "http://localhost:8080/api/qna/ask",
//                 userMessage
//             );

//             setChatHistory((prev) => [
//                 ...prev,
//                 { type: "Assistant", message: response.data },
//             ]);
//             setError(null);
//         } catch (err) {
//             setError("Failed to send the message. Please try again later.");
//         }
//     };

//     const handleInputKeyPress = (e) => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
//             <header className="bg-blue-400 text-white w-full py-4 text-center rounded-lg shadow-lg">
//                 <h1 className="text-2xl font-extralight">Talk With Master</h1>
//             </header>

//             <div
//                 className="flex flex-col w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 mt-6 h-3/5 overflow-y-auto"
//                 ref={chatBoxRef}
//             >
//                 {chatHistory.map((chat, index) => (
//                     <div
//                         key={index}
//                         className={`mb-2 p-3 rounded-lg max-w-[75%] ${
//                             chat.type === "user"
//                                 ? "bg-blue-200 self-end text-right"
//                                 : "bg-gray-200 self-start text-left"
//                         }`}
//                     >
//                         <span className="font-semibold">
//                             {chat.type === "user" ? "You:" : "Assistant:"}
//                         </span>{" "}
//                         {chat.message}
//                     </div>
//                 ))}
//             </div>

//             {error && (
//                 <div className="bg-red-200 text-red-700 p-3 rounded mt-2">
//                     {error}
//                 </div>
//             )}

//             <div className="w-full max-w-2xl mt-4">
//                 <div className="flex items-center w-full">
//                     <input
//                         type="text"
//                         placeholder="Type your message..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyPress={handleInputKeyPress}
//                         className="flex-grow border rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <button
//                         onClick={handleSendMessage}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:shadow-outline"
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/" element={<RegistrationForm />} />
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
