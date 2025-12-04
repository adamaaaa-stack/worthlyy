interface ConditionScoreCircleProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function ConditionScoreCircle({ score, size = "md" }: ConditionScoreCircleProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const textClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  const labelClasses = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  const strokeWidth = size === "sm" ? 4 : size === "md" ? 6 : 8;
  const radius = size === "sm" ? 28 : size === "md" ? 42 : 56;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return "stroke-green-500";
    if (score >= 60) return "stroke-yellow-500";
    if (score >= 40) return "stroke-orange-500";
    return "stroke-red-500";
  };

  const getConditionLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Very Good";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      <svg className="absolute transform -rotate-90" viewBox="0 0 128 128">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className={`${getStrokeColor(score)} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="flex flex-col items-center">
        <span 
          className={`font-bold ${textClasses[size]} ${getScoreColor(score)}`}
          style={{ fontFamily: "'Space Grotesk', monospace" }}
        >
          {score}
        </span>
        <span className={`${labelClasses[size]} text-muted-foreground uppercase tracking-wide`}>
          {getConditionLabel(score)}
        </span>
      </div>
    </div>
  );
}
