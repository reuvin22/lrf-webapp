import React from 'react';
import { Loader2 } from 'lucide-react';
import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_ICON_SIZES,
} from '../constants/ComponentConstants/ButtonConstants';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  iconOnly = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...rest
}) => {
  const v = BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary;
  const s = BUTTON_SIZES[size] ?? BUTTON_SIZES.md;
  const iconSize = BUTTON_ICON_SIZES[size] ?? BUTTON_ICON_SIZES.md;

  const ActiveIcon = loading ? Loader2 : Icon;

  const classes = [
    'inline-flex items-center justify-center font-medium rounded-xl',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2',
    'cursor-pointer',
    'disabled:opacity-60 disabled:cursor-not-allowed',
    v.base,
    v.hover,
    v.focus,
    iconOnly ? s.iconPad : `${s.padding} ${s.text} ${s.gap}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {ActiveIcon && iconPosition === 'left' && (
        <ActiveIcon size={iconSize} className={loading ? 'animate-spin' : ''} />
      )}

      {!iconOnly && children}

      {ActiveIcon && iconPosition === 'right' && (
        <ActiveIcon size={iconSize} className={loading ? 'animate-spin' : ''} />
      )}
    </button>
  );
};

export default Button;