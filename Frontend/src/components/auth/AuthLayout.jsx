import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

const AuthLayout = ({ title, subtitle, linkText, linkTo, children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center auth-bg px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-4 shadow-lg shadow-indigo-500/30">
                        <FontAwesomeIcon icon={faRobot} className="text-white text-2xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h1>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        {subtitle}{" "}
                        <Link to={linkTo} className="text-indigo-400 hover:text-indigo-300 font-medium">
                            {linkText}
                        </Link>
                    </p>
                </div>
                <div className="glass-card rounded-2xl p-8">{children}</div>
            </div>
        </div>
    );
};

export default AuthLayout;
