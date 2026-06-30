import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRobot,
    faSignOutAlt,
    faSun,
    faMoon,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { chat, skills as skillsApi } from "../../services/api";
import SessionSidebar from "../chat/SessionSidebar";
import SkillPicker from "../chat/SkillPicker";
import MessageList from "../chat/MessageList";
import ChatInput from "../chat/ChatInput";

const ChatLayout = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [activeSessionId, setActiveSessionId] = useState(null);
    const [skillList, setSkillList] = useState([]);
    const [activeSkill, setActiveSkill] = useState("general");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const loadSessions = useCallback(async () => {
        try {
            const res = await chat.listSessions();
            setSessions(res.data);
        } catch {
            toast.error("Failed to load sessions");
        }
    }, []);

    const loadSkills = useCallback(async () => {
        try {
            const res = await skillsApi.list();
            setSkillList(res.data);
        } catch {
            toast.error("Failed to load skills");
        }
    }, []);

    useEffect(() => {
        loadSessions();
        loadSkills();
    }, [loadSessions, loadSkills]);

    const loadHistory = async (sessionId) => {
        try {
            const res = await chat.getHistory(sessionId);
            setMessages(res.data);
        } catch {
            toast.error("Failed to load chat history");
        }
    };

    const handleSelectSession = (sessionId) => {
        setActiveSessionId(sessionId);
        loadHistory(sessionId);
        setSidebarCollapsed(true);
    };

    const handleNewChat = async () => {
        try {
            const res = await chat.createSession();
            const newSession = res.data;
            setActiveSessionId(newSession.sessionId);
            setMessages([]);
            await loadSessions();
            setSidebarCollapsed(true);
        } catch {
            toast.error("Failed to create new chat");
        }
    };

    const handleDeleteSession = async (sessionId) => {
        try {
            await chat.deleteSession(sessionId);
            if (activeSessionId === sessionId) {
                setActiveSessionId(null);
                setMessages([]);
            }
            await loadSessions();
            toast.success("Chat deleted");
        } catch {
            toast.error("Failed to delete chat");
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setIsLoading(true);

        const optimisticMsg = { role: "user", content: userMessage, createdAt: new Date().toISOString() };
        setMessages((prev) => [...prev, optimisticMsg]);

        try {
            const res = await chat.ask({
                message: userMessage,
                sessionId: activeSessionId,
                skill: activeSkill,
            });

            const { answer, sessionId } = res.data;
            if (!activeSessionId) {
                setActiveSessionId(sessionId);
            }

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: answer, createdAt: new Date().toISOString() },
            ]);
            await loadSessions();
        } catch (err) {
            setMessages((prev) => prev.filter((m) => m !== optimisticMsg));
            const msg = err.response?.data || "Failed to send message";
            toast.error(typeof msg === "string" ? msg : "Failed to send message");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-[var(--bg-primary)]">
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <SessionSidebar
                sessions={sessions}
                activeSessionId={activeSessionId}
                onSelect={handleSelectSession}
                onNewChat={handleNewChat}
                onDelete={handleDeleteSession}
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]"
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                                <FontAwesomeIcon icon={faRobot} className="text-white text-sm" />
                            </div>
                            <div>
                                <h1 className="text-sm font-semibold text-[var(--text-primary)]">Master AI</h1>
                                <p className="text-xs text-[var(--text-muted)]">
                                    {user.name ? `Hi, ${user.name}` : "AI Assistant"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] transition-colors"
                        >
                            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </header>
                <SkillPicker
                    skills={skillList}
                    activeSkill={activeSkill}
                    onSelect={setActiveSkill}
                    disabled={isLoading}
                />
                <MessageList messages={messages} isLoading={isLoading} />
                <ChatInput
                    value={input}
                    onChange={setInput}
                    onSend={handleSend}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};

export default ChatLayout;
