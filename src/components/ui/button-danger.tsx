function ButtonDanger({
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
      className={`rounded-lg border-2 border-red-600 bg-black/25 px-5 py-2 text-center text-lg font-semibold uppercase text-red-200 transition duration-300 ease-out enabled:hover:bg-red-600 enabled:hover:text-red-50 disabled:border-zinc-500 disabled:text-zinc-500 ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonDanger;
