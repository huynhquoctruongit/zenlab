import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/services/helpers'

const buttonVariants = cva(
  '',
  {
    variants: {
      variant: {
        default:
          'bg-[#2498F6] text-white backdrop-blur-md rounded-full border-2 border-gray-200 shadow-md hover:shadow-lg',
      },
      size: {
        default: 'px-6 py-2 text-sm font-semibold',
        sm: 'h-9 px-3',
        lg: 'px-8 py-4',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
