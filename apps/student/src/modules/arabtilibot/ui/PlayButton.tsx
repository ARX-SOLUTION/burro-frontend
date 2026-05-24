import { Play } from '@untitledui/icons';

export default function PlayButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-gray-100 bg-teal-600 text-white shadow-[0_10px_25px_rgba(13,148,136,0.38)] transition-transform duration-150 hover:scale-[1.02]"
      aria-label="Darsni boshlash"
    >
      <span className="absolute inset-[3px] rounded-full border border-white/15" />
      <Play className="relative size-7 text-white" />
    </button>
  );
}
