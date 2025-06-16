interface PrimaryButtonType {
  type: "reset" | "button" | "submit" | undefined;
  value: string;
  className?: string;
  onClick?: () => void;
  key?: number;
}
const PrimaryButton = ({
  type,
  value,
  className = "",
  onClick,
  key,
}: PrimaryButtonType) => {
  return (
    <div>
      <button
        type={type}
        className={`primary-button transition-300 ${className}`}
        onClick={onClick}
        key={key}
      >
        {value}
      </button>
    </div>
  );
};

export default PrimaryButton;
