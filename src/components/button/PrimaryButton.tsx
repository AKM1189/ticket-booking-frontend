interface PrimaryButtonType {
  value: string;
  className?: string;
  onClick: () => void;
}
const PrimaryButton = ({
  value,
  className = "",
  onClick,
}: PrimaryButtonType) => {
  return (
    <div>
      <button
        className={`primary-button transition-300 ${className}`}
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
};

export default PrimaryButton;
