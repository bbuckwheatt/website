/*
 * BGPattern.tsx — CSS-only decorative background pattern
 *
 * SERVER COMPONENT — pure markup, no interactivity. Zero JS bundle cost.
 *
 * The mask classes use CSS mask-image to fade the pattern in/out.
 * `var(--background)` in mask gradients refers to shadcn's background token,
 * which matches our page background color in both light and dark mode.
 *
 * Usage:
 *   <div className="relative">
 *     <BGPattern variant="diagonal-stripes" mask="fade-y" />
 *     ...content...
 *   </div>
 *
 * WHY absolute + z-[-10]:
 *   The pattern sits behind all content but inside its nearest positioned
 *   ancestor. The parent needs `position: relative` (or any non-static).
 */

import { cn } from '@/lib/utils';

type BGVariantType =
  | 'dots'
  | 'diagonal-stripes'
  | 'grid'
  | 'horizontal-lines'
  | 'vertical-lines'
  | 'checkerboard';

type BGMaskType =
  | 'fade-center'
  | 'fade-edges'
  | 'fade-top'
  | 'fade-bottom'
  | 'fade-left'
  | 'fade-right'
  | 'fade-x'
  | 'fade-y'
  | 'none';

type BGPatternProps = React.ComponentProps<'div'> & {
  variant?: BGVariantType;
  mask?: BGMaskType;
  size?: number;
  fill?: string;
};

const maskClasses: Record<BGMaskType, string> = {
  'fade-edges': '[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]',
  'fade-center': '[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]',
  'fade-top':    '[mask-image:linear-gradient(to_bottom,transparent,var(--background))]',
  'fade-bottom': '[mask-image:linear-gradient(to_bottom,var(--background),transparent)]',
  'fade-left':   '[mask-image:linear-gradient(to_right,transparent,var(--background))]',
  'fade-right':  '[mask-image:linear-gradient(to_right,var(--background),transparent)]',
  'fade-x':      '[mask-image:linear-gradient(to_right,transparent,var(--background),transparent)]',
  'fade-y':      '[mask-image:linear-gradient(to_bottom,transparent,var(--background),transparent)]',
  none: '',
};

function getBgImage(variant: BGVariantType, fill: string, size: number): string | undefined {
  switch (variant) {
    case 'dots':
      return `radial-gradient(${fill} 1px, transparent 1px)`;
    case 'grid':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case 'diagonal-stripes':
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    case 'horizontal-lines':
      return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case 'vertical-lines':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px)`;
    case 'checkerboard':
      return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
    default:
      return undefined;
  }
}

const BGPattern = ({
  variant = 'grid',
  mask = 'none',
  size = 24,
  fill = 'var(--bg-pattern-fill)',  // defaults to the theme-aware CSS variable
  className,
  style,
  ...props
}: BGPatternProps) => {
  const bgSize = `${size}px ${size}px`;
  const backgroundImage = getBgImage(variant, fill, size);

  return (
    <div
      className={cn('absolute inset-0 z-[-10] size-full', maskClasses[mask], className)}
      style={{ backgroundImage, backgroundSize: bgSize, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
};

BGPattern.displayName = 'BGPattern';
export { BGPattern };
