function ButtonSecondary({
  onClick,
  className,
  type = "button",
  children,
}: {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}) {
  return (
    <button
      {...{ type, onClick }}
      className={`rounded-lg border-2 border-violet-600 bg-black/25 p-2 text-center text-lg font-semibold uppercase text-violet-300 transition duration-300 hover:bg-violet-600 hover:text-violet-50 ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonSecondary;
