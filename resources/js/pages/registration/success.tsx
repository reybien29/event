import { Head, Link } from '@inertiajs/react';
import LandingLayout from '../../Layouts/LandingLayout';

interface Props {
    reference: string;
}

export default function Success({ reference }: Props) {
    const T = {
        accent:        '#c1121f',
        accentBright:  '#a30b18',
        accentBorder:  'rgba(193,18,31,0.3)',
        accentFill:    'rgba(193,18,31,0.05)',
        surface:       '#ffffff',
        subtle:        '#f9fafb',
        textPrimary:   '#111827',
        textSecondary: '#4b5563',
        textTertiary:  '#6b7280',
        borderSubtle:  'rgba(0,0,0,0.08)',
        borderDefault: 'rgba(0,0,0,0.12)',
    };

    return (
        <LandingLayout>
            <Head title="Registration Successful" />

            <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '5rem 1.5rem', textAlign: 'center' }}>
                <style>{`
                    @keyframes scaleIn {
                        from { transform: scale(0.9); opacity: 0; }
                        to   { transform: scale(1); opacity: 1; }
                    }
                    .success-icon { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
                    
                    .btn-primary {
                        display: flex; align-items: center; justify-content: center;
                        height: 54px; border-radius: 0px; background: ${T.accent};
                        color: #ffffff; border: none; font-size: 11px; font-weight: 800;
                        letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer;
                        transition: background 0.18s, transform 0.1s;
                    }
                    .btn-primary:hover { background: ${T.accentBright}; }
                    .btn-primary:active { transform: scale(0.98); }

                    .btn-outline {
                        display: flex; align-items: center; justify-content: center;
                        height: 54px; border-radius: 0px; background: transparent;
                        color: ${T.textSecondary}; border: 1px solid ${T.borderDefault};
                        font-size: 10px; font-weight: 700; letter-spacing: 0.15em;
                        text-transform: uppercase; cursor: pointer;
                        transition: background 0.18s, color 0.18s;
                    }
                    .btn-outline:hover { background: ${T.subtle}; color: ${T.textPrimary}; }
                `}</style>

                <div style={{ marginBottom: '3rem' }}>
                    <div className="success-icon" style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '80px', height: '80px', borderRadius: '40px',
                        background: T.accent, color: '#ffffff', marginBottom: '2rem',
                        boxShadow: `0 12px 24px ${T.accentFill}`,
                    }}>
                        <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    
                    <span style={{
                        display: 'block', marginBottom: '1rem',
                        fontSize: '10px', fontWeight: 800,
                        letterSpacing: '0.4em', textTransform: 'uppercase',
                        color: T.accent,
                    }}>
                        Registration Successful
                    </span>
                    
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 900, letterSpacing: '-0.04em',
                        textTransform: 'uppercase', color: T.textPrimary,
                        lineHeight: 1,
                    }}>
                        Victory <span style={{ color: T.accent, fontStyle: 'italic' }}>Awaits.</span>
                    </h1>
                </div>

                <div style={{
                    background: T.surface,
                    border: `1px solid ${T.borderSubtle}`,
                    padding: '3rem',
                    position: 'relative',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
                }}>
                    <p style={{
                        fontSize: '14px', color: T.textSecondary,
                        lineHeight: '1.7', marginBottom: '2.5rem',
                    }}>
                        Your team registration has been secured. Your entry is currently{' '}
                        <span style={{ fontWeight: 800, color: T.textPrimary, textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                            Pending Verification
                        </span>. 
                        Please settle the tournament fee to confirm your slot.
                    </p>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <span style={{
                            display: 'block', marginBottom: '8px',
                            fontSize: '10px', fontWeight: 700,
                            letterSpacing: '0.28em', textTransform: 'uppercase',
                            color: T.textTertiary,
                        }}>
                            Registered ID Reference
                        </span>
                        <div style={{
                            fontSize: '3rem', fontWeight: 900,
                            letterSpacing: '-0.02em', color: T.textPrimary,
                            fontVariantNumeric: 'tabular-nums',
                        }}>
                            {reference}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button className="btn-primary">Pay via GCash</button>
                        <button className="btn-outline">Bank Transfer</button>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Link
                        href="/"
                        style={{
                            fontSize: '11px', fontWeight: 700,
                            letterSpacing: '0.2em', textTransform: 'uppercase',
                            color: T.textTertiary, textDecoration: 'none',
                            transition: 'color 0.18s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = T.textTertiary)}
                    >
                        ← Return to Stadium
                    </Link>
                    
                    <p style={{
                        fontSize: '10px', fontWeight: 700,
                        letterSpacing: '0.05em', textTransform: 'uppercase',
                        color: T.textTertiary, opacity: 0.7,
                    }}>
                        Official contact for verification will be made via phone within 48 hours.
                    </p>
                </div>
            </div>
        </LandingLayout>
    );
}
