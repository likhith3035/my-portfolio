/**
 * Decorative SVG wave divider between sections.
 * Usage: <SectionDivider flip /> to flip upside-down.
 */
export default function SectionDivider({ color = '#ffffff', flip = false, dark = '#0B0B0C' }) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-10 md:h-14 block"
      >
        <path
          d="M0,30 C300,60 900,0 1200,30 L1200,60 L0,60 Z"
          className="fill-white dark:fill-[#121214]"
        />
      </svg>
    </div>
  );
}
