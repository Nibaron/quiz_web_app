const CircularProgressBar = ({ percentage = 0 }) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * percentage) / 100;

    return (
        <svg width="70" height="70" viewBox="0 0 40 40">
            {/* Background Circle */}
            <circle
                className="circle-bg"
                cx="20"
                cy="20"
                r={radius}
                stroke="#ccc"
                strokeWidth="4"
                fill="none"
            />
            {/* Progress Circle with rotation */}
            <circle
                className="circle-progress"
                cx="20"
                cy="20"
                r={radius}
                stroke="#007bff"
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 20 20)"
            />
            {/* Percentage Text */}
            <text
                x="20"
                y="20"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="10px"
                fill="#ccc"
            >
                {percentage}%
            </text>
        </svg>
    );
};

export default CircularProgressBar;
