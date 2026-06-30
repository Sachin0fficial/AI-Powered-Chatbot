import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRobot,
    faFire,
    faCode,
    faList,
    faPen,
} from "@fortawesome/free-solid-svg-icons";

const ICON_MAP = {
    robot: faRobot,
    fire: faFire,
    code: faCode,
    list: faList,
    pen: faPen,
};

const SkillPicker = ({ skills, activeSkill, onSelect, disabled }) => {
    return (
        <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
            {skills.map((skill) => {
                const isActive = activeSkill === skill.id;
                const icon = ICON_MAP[skill.icon] || faRobot;
                return (
                    <button
                        key={skill.id}
                        onClick={() => onSelect(skill.id)}
                        disabled={disabled}
                        title={skill.description}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            isActive
                                ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25"
                                : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-indigo-500/50 hover:text-[var(--text-primary)]"
                        } disabled:opacity-50`}
                    >
                        <FontAwesomeIcon icon={icon} className="text-[10px]" />
                        {skill.name}
                    </button>
                );
            })}
        </div>
    );
};

export default SkillPicker;
