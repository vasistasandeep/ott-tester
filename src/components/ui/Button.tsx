import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ButtonProps extends React.ComponentProps<typeof motion.button> {
    variant?: "primary" | "secondary" | "ghost" | "danger"
    size?: "sm" | "md" | "lg"
    loading?: boolean
    children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", loading, children, ...props }, ref) => {

        const variants = {
            primary: "bg-primary text-white hover:bg-primary/90 shadow-[0_0_15px_rgba(59,130,246,0.5)] border-primary/50",
            secondary: "bg-card hover:bg-white/10 text-foreground border-white/10 glass-button",
            ghost: "hover:bg-white/5 text-foreground/80 hover:text-foreground",
            danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
        }

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2",
            lg: "h-12 px-8 text-lg"
        }

        return (
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                ref={ref}
                disabled={loading || props.disabled}
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </motion.button>
        )
    }
)
Button.displayName = "Button"

export { Button }
