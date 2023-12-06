export function CloseIcon({
  color = "#fff",
  className,
  size = 24,
}: {
  color?: string;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={className}
        d="M7.75732 16.7427L16.2426 8.25739"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        className={className}
        d="M16.2426 16.7426L7.75732 8.25732"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
