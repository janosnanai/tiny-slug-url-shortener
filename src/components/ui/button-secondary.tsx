function ButtonSecondary({
  onClick,
  className,
  disabled = false,
  type = "button",
  children,
}: {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}) {
  return (
    <button
      {...{ type, onClick, disabled }}
      className={`rounded-lg border-2 border-violet-600 bg-black/25 p-2 text-center text-lg font-semibold uppercase text-violet-300 transition duration-300 enabled:hover:bg-violet-600 enabled:hover:text-violet-50 disabled:border-zinc-500 disabled:text-zinc-500 ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonSecondary;
