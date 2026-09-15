import type { ConnectorId } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * 자체 제작 커넥터 아이콘.
 * 각 단자의 실제 형상을 단순화한 라인 아이콘으로, currentColor 를 따릅니다.
 */

type ShapeProps = { className?: string };

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function HdmiShape({ className }: ShapeProps) {
  return (
    <Frame className={className}>
      <path d="M8 11h32l-3.5 10h-25L8 11Z" />
      <path d="M12.5 14.5h23" />
      <path d="M15 21v3M33 21v3" />
    </Frame>
  );
}

function MiniHdmiShape({ className }: ShapeProps) {
  return (
    <Frame className={className}>
      <path d="M14 12h20l-2.5 8h-15L14 12Z" />
      <path d="M17.5 15h13" />
      <path d="M19 20v3M29 20v3" />
    </Frame>
  );
}

function DisplayPortShape({ className }: ShapeProps) {
  return (
    <Frame className={className}>
      <path d="M9 11h30v10H13l-4-4V11Z" />
      <path d="M13.5 14.5h21" />
      <path d="M16 21v3M32 21v3" />
    </Frame>
  );
}

function MiniDisplayPortShape({ className }: ShapeProps) {
  return (
    <Frame className={className}>
      <path d="M15 12h18v8H18l-3-3v-5Z" />
      <path d="M18.5 15h11" />
      <path d="M20 20v3M30 20v3" />
    </Frame>
  );
}

function UsbAShape({ className }: ShapeProps) {
  return (
    <Frame className={className}>
      <rect x="10" y="10" width="28" height="12" rx="1.5" />
      <rect x="13.5" y="13" width="21" height="4" rx="1" />
      <path d="M16 22v3M32 22v3" />
    </Frame>
  );
}

function UsbBShape({ className }: ShapeProps) {
  return (
    <Frame className={className}>
      <path d="M14 21V14l3-3h14l3 3v7H14Z" />
      <path d="M18 14.5h12" />
      <path d="M18 21v3M30 21v3" />
    </Frame>
  );
}

function UsbCShape({ className }: ShapeProps) {
  return (
    <Frame className={className}>
      <rect x="11" y="12" width="26" height="9" rx="4.5" />
      <rect x="15" y="15" width="18" height="3" rx="1.5" />
    </Frame>
  );
}

function DviShape({ className }: ShapeProps) {
  return (
    <Frame className={className}>
      <path d="M9 10h30v12H9l-1.5-6L9 10Z" />
      <path d="M14 13.5h18M14 18.5h18" />
      <circle cx="41" cy="16" r="1.5" />
    </Frame>
  );
}

function VgaShape({ className }: ShapeProps) {
  return (
    <Frame className={className}>
      <path d="M11 11h26l-2 10H13l-2-10Z" />
      <path d="M15 14.5h18M16 18h16" />
      <path d="M7.5 16h3M37.5 16h3" />
    </Frame>
  );
}

function Rj45Shape({ className }: ShapeProps) {
  return (
    <Frame className={className}>
      <path d="M14 9h20v13H14V9Z" />
      <path d="M20 22v4h8v-4" />
      <path d="M17.5 12v5M21 12v5M24.5 12v5M28 12v5M31.5 12v5" />
    </Frame>
  );
}

const shapes: Record<ConnectorId, (props: ShapeProps) => React.JSX.Element> = {
  hdmi: HdmiShape,
  'mini-hdmi': MiniHdmiShape,
  displayport: DisplayPortShape,
  'mini-displayport': MiniDisplayPortShape,
  'usb-a': UsbAShape,
  'usb-b': UsbBShape,
  'usb-c': UsbCShape,
  dvi: DviShape,
  vga: VgaShape,
  rj45: Rj45Shape,
};

export function ConnectorIcon({
  connector,
  className,
}: {
  connector: ConnectorId;
  className?: string;
}) {
  const Shape = shapes[connector];
  return (
    <span className={cn('inline-block h-6 w-9 text-graphite', className)}>
      <Shape />
    </span>
  );
}
