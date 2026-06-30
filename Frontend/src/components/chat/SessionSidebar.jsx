import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faComments } from "@fortawesome/free-solid-svg-icons";

const SessionSidebar = ({
    sessions,
    activeSessionId,
    onSelect,
    onNewChat,
    onDelete,
    collapsed,
    onToggle,
}) => {
    return (
        <>
            {collapsed && (
                <button
                    onClick={onToggle}
                    className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)]"
                >
                    <FontAwesomeIcon icon={faComments} />
                </button>
            )}
            <aside
                className={`${
                    collapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"
                } fixed lg:relative z-40 w-72 h-full bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col transition-transform duration-200`}
            >
                <div className="p-4 border-b border-[var(--border-color)]">
                    <button
                        onClick={onNewChat}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:from-indigo-600 hover:to-violet-700 transition-all shadow-lg shadow-indigo-500/20"
                    >
                        <FontAwesomeIcon icon={faPlus} className="text-xs" />
                        New Chat
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {sessions.length === 0 ? (
                        <p className="text-xs text-[var(--text-muted)] text-center py-8 px-4">
                            No conversations yet. Start a new chat!
                        </p>
                    ) : (
                        sessions.map((session) => (
                            <div
                                key={session.sessionId}
                                className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer mb-1 transition-colors ${
                                    activeSessionId === session.sessionId
                                        ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                                        : "hover:bg-[var(--bg-primary)] text-[var(--text-secondary)]"
                                }`}
                                onClick={() => onSelect(session.sessionId)}
                            >
                                <FontAwesomeIcon icon={faComments} className="text-xs flex-shrink-0 opacity-60" />
                                <span className="flex-1 text-sm truncate">{session.title}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(session.sessionId);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-red-400 transition-opacity"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="text-xs" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </aside>
            {!collapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={onToggle}
                />
            )}
        </>
    );
};

export default SessionSidebar;
