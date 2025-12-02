import styles from "./Timer.module.scss";

type ProgressCircleProps = {
  value: number; // текущее значение
  max: number; // максимум для отсчёта
  size?: number;
  strokeWidth?: string;
  trackColor?: string;
  progressColor?: string;
  textColor?: string;
};

function Timer({
  value,
  max,
  size = 80,
  strokeWidth = "1px",
  trackColor = "rgb(255, 255, 255)",
  progressColor = "rgba(10, 59, 41, 1)",
  textColor = "rgb(255, 255, 255)",
}: ProgressCircleProps) {
    const center = size / 2;
    const radius = center - parseFloat(strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = value / max;
    const dashOffset = circumference * (1 - progress);

    const safeValue = Math.min(Math.max(value, 0), max);
  return (
    <div className={styles.timer}>
      <svg width={size} height={size} viewBox="0 0 80 80">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke-width={strokeWidth}
          fill="none"
          style={{ stroke: trackColor }}
        ></circle>
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke-width={strokeWidth}
          transform="rotate(-90 40 40)"
          fill="none"
          style={{
            strokeDasharray: circumference.toString() ,
            strokeDashoffset: dashOffset.toString() ,
            stroke: progressColor,
          }}
        ></circle>
        <text
          x="50%"
          y="50%"
          dy=".3em"
          text-anchor="middle"
          style={{ fill: textColor, fontSize:  `${Math.round(size * 0.3)} +"px" `}}
        >
            {safeValue}
        </text>
      </svg>
    </div>
  );
}

export default Timer;
