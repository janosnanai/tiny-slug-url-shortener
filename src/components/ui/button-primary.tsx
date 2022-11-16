function ButtonPrimary({
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
      className={`rounded-lg border-2 border-pink-600 bg-pink-600 px-5 py-2 text-center text-lg font-semibold uppercase text-pink-100 transition duration-300 ease-out hover:bg-black/25 hover:text-pink-50 ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
