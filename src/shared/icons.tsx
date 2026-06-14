import type { SVGProps } from "react";

interface IcoProps extends Omit<SVGProps<SVGSVGElement>, "stroke"> {
  size?: number;
  stroke?: number;
}

const Ico = ({ children, size = 18, stroke = 1.6, className = "", style, ...rest }: IcoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...rest}
  >
    {children}
  </svg>
);

export const IconInbox = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M3 13l2.5-7A2 2 0 0 1 7.4 4.7h9.2A2 2 0 0 1 18.5 6L21 13" />
    <path d="M3 13v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
    <path d="M3 13h5l1.5 2h5L16 13h5" />
  </Ico>
);
export const IconHome = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
  </Ico>
);
export const IconCalendar = (p: IcoProps) => (
  <Ico {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Ico>
);
export const IconChart = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M4 19V5" /><path d="M4 19h16" />
    <path d="M8 15v-4M12 15V8M16 15v-2" />
  </Ico>
);
export const IconSettings = (p: IcoProps) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 4.27 16.96l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.27l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Ico>
);
export const IconEdit = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </Ico>
);
export const IconSearch = (p: IcoProps) => (
  <Ico {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Ico>
);
export const IconBell = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 3h16z" />
    <path d="M10 21a2 2 0 0 0 4 0" />
  </Ico>
);
export const IconSend = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4z" />
  </Ico>
);
export const IconPaperclip = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M21.4 11.05l-9 9a5 5 0 1 1-7.07-7.07l9-9a3.5 3.5 0 0 1 4.95 4.95l-9 9a2 2 0 1 1-2.83-2.83l8.49-8.49" />
  </Ico>
);
export const IconSmile = (p: IcoProps) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <path d="M9 9h.01M15 9h.01" />
  </Ico>
);
export const IconImage = (p: IcoProps) => (
  <Ico {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </Ico>
);
export const IconCheck = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M20 6L9 17l-5-5" />
  </Ico>
);
export const IconArrowRight = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
  </Ico>
);
export const IconArrowUpRight = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M7 17L17 7" /><path d="M8 7h9v9" />
  </Ico>
);
export const IconPlus = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 5v14M5 12h14" />
  </Ico>
);
export const IconChevron = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M6 9l6 6 6-6" />
  </Ico>
);
export const IconChevronLeft = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M15 18l-6-6 6-6" />
  </Ico>
);
export const IconChevronRight = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M9 18l6-6-6-6" />
  </Ico>
);
export const IconClose = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M18 6L6 18M6 6l12 12" />
  </Ico>
);
export const IconStar = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
  </Ico>
);
export const IconArchive = (p: IcoProps) => (
  <Ico {...p}>
    <rect x="3" y="3" width="18" height="5" rx="1" />
    <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
    <path d="M10 12h4" />
  </Ico>
);
export const IconFilter = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M3 4h18l-7 9v7l-4-2v-5z" />
  </Ico>
);
export const IconUsers = (p: IcoProps) => (
  <Ico {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2 21a7 7 0 0 1 14 0" />
    <circle cx="17" cy="7" r="2.5" />
    <path d="M22 19a5 5 0 0 0-6-4.9" />
  </Ico>
);
export const IconBolt = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M13 2L3 14h7l-1 8 11-13h-7z" />
  </Ico>
);
export const IconShield = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </Ico>
);
export const IconGlobe = (p: IcoProps) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Ico>
);
export const IconLogo = (p: IcoProps) => (
  <Ico {...p} stroke={1.8}>
    <path d="M4 7l8 4 8-4" />
    <path d="M4 7v10l8 4 8-4V7" />
    <path d="M12 11v10" />
  </Ico>
);
export const IconFB = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v8h3v-8h2.3l.7-3H14V8z" />
  </Ico>
);
export const IconIG = (p: IcoProps) => (
  <Ico {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </Ico>
);
export const IconWA = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M21 11.5a8.5 8.5 0 1 1-15.6 4.7L3 21l4.9-1.3A8.5 8.5 0 0 0 21 11.5z" />
    <path d="M9 9.5c.3 1.6 1.4 3.4 3 4.6 1 .8 1.7.8 2.3.5l1.2-.6.9 1.2c.3.4.2.7-.1 1.1-.6.7-1.7.9-2.7.6-1.6-.5-3.6-1.8-4.9-3.6-.9-1.3-1-2.2-.7-2.8.3-.5.6-.7 1-1l1 .8z" />
  </Ico>
);
export const IconLI = (p: IcoProps) => (
  <Ico {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 11v6" />
  </Ico>
);
export const IconMessenger = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 3c-5 0-9 3.7-9 8.3 0 2.6 1.3 4.9 3.3 6.4V22l3-1.7c.9.2 1.8.4 2.7.4 5 0 9-3.7 9-8.3S17 3 12 3z" />
    <path d="M7 13.5l2.8-3 2 1.8 2.4-2.3-2.8 3-2-1.8z" fill="currentColor" stroke="none" />
  </Ico>
);
export const IconTikTok = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5c.35 0 .68.05 1 .14" />
    <path d="M14 4a4.5 4.5 0 0 0 4.5 4.5" />
  </Ico>
);
export const IconLayers = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 2l9 5-9 5-9-5 9-5z" />
    <path d="M3 12l9 5 9-5" />
    <path d="M3 17l9 5 9-5" />
  </Ico>
);
export const IconPlayCircle = (p: IcoProps) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" stroke="none" />
  </Ico>
);
export const IconType = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M5 6h14" />
    <path d="M12 6v14" />
    <path d="M9 20h6" />
  </Ico>
);
export const IconLink = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.5 7" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5" />
  </Ico>
);
export const IconHeart = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
  </Ico>
);
export const IconMessage = (p: IcoProps) => (
  <Ico {...p}>
    <path d="M21 12a8 8 0 1 1-3.4-6.6L21 4l-1 4.4A8 8 0 0 1 21 12z" />
  </Ico>
);
export const IconShare = (p: IcoProps) => (
  <Ico {...p}>
    <circle cx="18" cy="5"  r="2.5" />
    <circle cx="6"  cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <path d="M8.2 10.7l7.6-4.4M8.2 13.3l7.6 4.4" />
  </Ico>
);
export const IconDots = (p: IcoProps) => (
  <Ico {...p}>
    <circle cx="5"  cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </Ico>
);

export const PLATFORM_ICONS: Record<string, (p: IcoProps) => React.ReactElement> = {
  facebook:  IconFB,
  instagram: IconIG,
  whatsapp:  IconWA,
  linkedin:  IconLI,
  messenger: IconMessenger,
  tiktok:    IconTikTok,
};
