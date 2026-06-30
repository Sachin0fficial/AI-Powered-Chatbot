import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";

const MessageBubble = ({ role, content, timestamp }) => {
    const isUser = role === "user";

    return (
        <div className={`flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
            <div
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    isUser
                        ? "bg-indigo-600"
                        : "bg-gradient-to-br from-violet-600 to-indigo-600"
                }`}
            >
                <FontAwesomeIcon
                    icon={isUser ? faUser : faRobot}
                    className="text-white text-xs"
                />
            </div>
            <div className={`max-w-[75%] ${isUser ? "text-right" : "text-left"}`}>
                <div
                    className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isUser
                            ? "bg-indigo-600 text-white rounded-tr-sm"
                            : "bg-[var(--bg-bubble-ai)] text-[var(--text-primary)] rounded-tl-sm border border-[var(--border-color)]"
                    }`}
                >
                    {isUser ? (
                        content
                    ) : (
                        <div className="markdown-body prose-sm">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    )}
                </div>
                {timestamp && (
                    <p className="text-xs text-[var(--text-muted)] mt-1 px-1">
                        {new Date(timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
