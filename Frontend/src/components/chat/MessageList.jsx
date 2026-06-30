import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, isLoading }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    if (messages.length === 0 && !isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                    <FontAwesomeIcon icon={faRobot} className="text-white text-2xl" />
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    Welcome to Master AI
                </h2>
                <p className="text-[var(--text-secondary)] max-w-sm">
                    Choose a skill below and start chatting. I can help with code, trends,
                    summaries, creative writing, and more.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6">
            {messages.map((msg, index) => (
                <MessageBubble
                    key={index}
                    role={msg.role}
                    content={msg.content}
                    timestamp={msg.createdAt}
                />
            ))}
            {isLoading && (
                <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faRobot} className="text-white text-xs" />
                    </div>
                    <div className="bg-[var(--bg-bubble-ai)] border border-[var(--border-color)] rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1.5">
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                        </div>
                    </div>
                </div>
            )}
            <div ref={bottomRef} />
        </div>
    );
};

export default MessageList;
