import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BentoCardVariant = 'default' | 'accent' | 'subtle' | 'danger';
type BentoCardPadding = 'sm' | 'md' | 'lg';

const variantClasses: Record<BentoCardVariant, string> = {
    default:
        'border-white/8 bg-white/[0.045] shadow-[0_30px_80px_rgba(2,6,23,0.3)]',
    accent:
        'border-brand-gold/20 bg-[linear-gradient(145deg,rgba(188,166,115,0.12),rgba(15,23,42,0.9),rgba(255,255,255,0.03))] shadow-[0_30px_90px_rgba(188,166,115,0.08)]',
    subtle:
        'border-white/6 bg-[#09090b]/85 shadow-[0_20px_70px_rgba(2,6,23,0.28)]',
    danger:
        'border-red-500/20 bg-[linear-gradient(145deg,rgba(127,29,29,0.2),rgba(15,23,42,0.92))] shadow-[0_24px_80px_rgba(127,29,29,0.12)]',
};

const paddingClasses: Record<BentoCardPadding, string> = {
    sm: 'p-5',
    md: 'p-6',
    lg: 'p-8',
};

export function BentoGrid({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[minmax(10rem,auto)]',
                className,
            )}
        >
            {children}
        </div>
    );
}

interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    variant?: BentoCardVariant;
    padding?: BentoCardPadding;
    glow?: boolean;
}

export function BentoCard({
    children,
    className,
    variant = 'default',
    padding = 'md',
    glow = false,
    ...props
}: BentoCardProps) {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-[1.75rem] border backdrop-blur-2xl',
                variantClasses[variant],
                paddingClasses[padding],
                glow &&
                    'before:pointer-events-none before:absolute before:-top-20 before:right-0 before:h-40 before:w-40 before:rounded-full before:bg-brand-gold/12 before:blur-[80px]',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function BentoHeading({
    eyebrow,
    title,
    description,
    className,
}: {
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('space-y-3', className)}>
            {eyebrow ? (
                <span className="inline-flex text-[10px] font-black tracking-[0.35em] text-brand-gold uppercase">
                    {eyebrow}
                </span>
            ) : null}
            <div className="text-3xl font-black tracking-[-0.04em] text-white uppercase sm:text-5xl">
                {title}
            </div>
            {description ? (
                <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
                    {description}
                </p>
            ) : null}
        </div>
    );
}

export function BentoMetric({
    label,
    value,
    helper,
    className,
    valueClassName,
}: {
    label: string;
    value: ReactNode;
    helper?: ReactNode;
    className?: string;
    valueClassName?: string;
}) {
    return (
        <div
            className={cn(
                'rounded-[1.5rem] border border-white/8 bg-black/15 p-5',
                className,
            )}
        >
            <div className="text-[10px] font-black tracking-[0.24em] text-zinc-500 uppercase">
                {label}
            </div>
            <div
                className={cn(
                    'mt-3 text-3xl font-black tracking-[-0.05em] text-white uppercase',
                    valueClassName,
                )}
            >
                {value}
            </div>
            {helper ? (
                <div className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {helper}
                </div>
            ) : null}
        </div>
    );
}
