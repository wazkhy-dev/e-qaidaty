import React from 'react';
import qaidatyIcon from '../assets/qaidaty-icon.png';
import qaidatyLogoFull from '../assets/qaidaty-logo-full.png';

export type QaidatyLogoVariant = 'icon' | 'full';
export type QaidatyLogoSize = 'sm' | 'md' | 'lg';

interface QaidatyLogoProps {
  /** 'icon' = icon-only mark (for small/square spaces like the sidebar badge).
   *  'full' = horizontal icon + "Qaidaty" wordmark (for wider spaces like the landing header). */
  variant?: QaidatyLogoVariant;
  /** Controls the rendered height. Width follows automatically to preserve the logo's aspect ratio. */
  size?: QaidatyLogoSize;
  className?: string;
}

// Height presets per variant/size. Kept close to the footprint of the
// elements they replace so existing layouts (header height, sidebar
// spacing, modal padding) don't shift.
const ICON_SIZE_CLASSES: Record<QaidatyLogoSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14 sm:h-16 sm:w-16',
};

const FULL_HEIGHT_CLASSES: Record<QaidatyLogoSize, string> = {
  sm: 'h-7 sm:h-8',
  md: 'h-9 sm:h-11',
  lg: 'h-12 sm:h-14',
};

/**
 * Single shared source for the Qaidaty brand mark. All UI (landing header,
 * sidebar, mobile drawer, modals, etc.) should render the logo through this
 * component rather than importing the asset files directly, so the brand
 * stays consistent if the asset ever needs to change again.
 */
export const QaidatyLogo: React.FC<QaidatyLogoProps> = ({
  variant = 'icon',
  size = 'md',
  className = '',
}) => {
  if (variant === 'full') {
    return (
      <img
        src={qaidatyLogoFull}
        alt="Qaidaty"
        draggable={false}
        className={`${FULL_HEIGHT_CLASSES[size]} w-auto select-none object-contain ${className}`}
      />
    );
  }

  return (
    <img
      src={qaidatyIcon}
      alt="Qaidaty"
      draggable={false}
      className={`${ICON_SIZE_CLASSES[size]} w-auto select-none object-contain shrink-0 ${className}`}
    />
  );
};
