import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatInput = ({ value, onChange, onSend, disabled, maxLength = 4000 }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!disabled && value.trim()) {
                onSend();
            }
        }
    };

    return (
        <div className="border-t border-[var(--border-color)] p-4 bg-[var(--bg-secondary)]">
            <div className="flex items-end gap-2 max-w-4xl mx-auto">
                <div className="flex-1 relative">
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                        disabled={disabled}
                        rows={1}
                        maxLength={maxLength}
                        className="w-full resize-none rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 placeholder:text-[var(--text-muted)] disabled:opacity-50"
                        style={{ minHeight: "48px", maxHeight: "120px" }}
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                        }}
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-[var(--text-muted)]">
                        {value.length}/{maxLength}
                    </span>
                </div>
                <button
                    onClick={onSend}
                    disabled={disabled || !value.trim()}
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white flex items-center justify-center hover:from-indigo-600 hover:to-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
