function ButtonDanger({
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
      className={`rounded-lg border-2 border-red-600 bg-black/25 px-5 py-2 text-center text-lg font-semibold uppercase text-red-200 transition duration-300 ease-out hover:bg-red-600 hover:text-red-50 ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonDanger;
