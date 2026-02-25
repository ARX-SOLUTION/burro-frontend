export default function PlayButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-teal-600 text-white shadow-lg"
      aria-label="Play"
    >
      ▶
    </button>
  );
}
