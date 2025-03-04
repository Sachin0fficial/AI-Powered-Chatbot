// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";

// const HomePage = () => {
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
//             // console.log(response);

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
//                 <h1 className="text-2xl font-extralight">Talk With BOT</h1>
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
// };

// export default HomePage;
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const HomePage = () => {
    const [input, setInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [error, setError] = useState(null);
    const chatBoxRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { input };
        setChatHistory((prev) => [...prev, { type: "user", message: input }]);
        setInput("");

        try {
            const response = await axios.post(
                "http://localhost:8080/api/qna/ask",
                userMessage
            );

            setChatHistory((prev) => [
                ...prev,
                { type: "Assistant", message: response.data },
            ]);
            setError(null);
        } catch (err) {
            setError("Failed to send the message. Please try again later.");
        }
    };

    const handleInputKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <nav className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link to="/" className="text-white text-lg font-semibold">
                        AI Chatbot
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="flex flex-col items-center justify-center flex-grow p-4">
                <div
                    className="flex flex-col w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 mb-4 h-96 overflow-y-auto"
                    ref={chatBoxRef}
                >
                    {chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`mb-2 p-3 rounded-lg max-w-[75%] ${
                                chat.type === "user"
                                    ? "bg-blue-100 text-blue-800 self-end text-right"
                                    : "bg-gray-100 text-gray-800 self-start text-left"
                            }`}
                        >
                            <span className="font-semibold">
                                {chat.type === "user" ? "You:" : "Master"}
                            </span>{" "}
                            {chat.message}
                        </div>
                    ))}
                </div>

                {error && (
                    <div className="bg-red-200 text-red-700 p-3 rounded mt-2">
                        {error}
                    </div>
                )}

                {/* Input Area */}
                <div className="w-full max-w-2xl">
                    <div className="flex items-center w-full">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleInputKeyPress}
                            className="flex-grow border rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:shadow-outline"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
