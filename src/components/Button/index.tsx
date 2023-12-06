import { ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'rounded-full font-roboto font-medium text-white transition-all ease-in-out duration-300 flex justify-center',
  variants: {
    variant: {
      default:
        'disabled:text-dark bg-purple-normal hover:bg-purple-hover disabled:bg-zinc',
      toggle:
        'flex group items-center justify-center bg-dark hover:bg-red-700/20',
      action: 'text-white text-sm px-6  font-normal hover:text-purple-normal',
    },
    size: {
      default: 'w-full p-4',
      sm: 'px-4 py-2',
      md: 'w-56 max-h-10 p-2 text-base font-normal flex items-center justify-center',
      lg: 'w-fit',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    disabled?: boolean;
    type?: string;
  };

export function Button({
  disabled,
  variant,
  size,
  type,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={button({ variant, size, className })}
      {...props}
    >
      {props.children}
    </button>
  );
}
