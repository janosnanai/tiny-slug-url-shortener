interface PageButtonProps {
  onClick: (value: number) => void;
  value: number;
  active: boolean;
}

function PageButton({ onClick, value, active }: PageButtonProps) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`rounded-lg px-1 py-0.5 text-sm hover:bg-white/10 mobile-md:px-2 mobile-md:py-1 ${
        active ? "text-teal-300" : "text-zinc-400 hover:text-zinc-100"
      }`}
    >
      {value}
    </button>
  );
}

export default PageButton;
