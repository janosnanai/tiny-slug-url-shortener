function ButtonPrimary({
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
      className={`rounded-lg border-2 border-pink-600 bg-pink-600 px-5 py-2 text-center text-lg font-semibold uppercase text-pink-100 transition duration-300 ease-out enabled:hover:bg-black/25 enabled:hover:text-pink-50 disabled:border-zinc-500 disabled:bg-zinc-500 disabled:text-zinc-800 ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
