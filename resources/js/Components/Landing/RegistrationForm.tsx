import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    fixedFee: string;
}

/* ── Design tokens ── */
const T = {
    accent:        '#c1121f',
    accentBright:  '#a30b18',
    accentBorder:  'rgba(193,18,31,0.3)',
    accentFill:    'rgba(193,18,31,0.05)',
    accentGlow:    'transparent',
    surface:       '#ffffff',
    raised:        '#ffffff',
    subtle:        '#f9fafb',
    textPrimary:   '#111827',
    textSecondary: '#4b5563',
    textTertiary:  '#6b7280',
    borderSubtle:  'rgba(0,0,0,0.08)',
    borderDefault: 'rgba(0,0,0,0.12)',
    error:         '#dc2626',
    errorBg:       'rgba(220,38,38,0.08)',
};

/* Shared styles */
const inputStyle: React.CSSProperties = {
    width: '100%',
    minHeight: '54px',
    padding: '0 1.125rem',
    borderRadius: '0px',
    border: `1px solid ${T.borderDefault}`,
    background: T.subtle,
    color: T.textPrimary,
    fontSize: '15px',
    fontWeight: 500,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.18s',
    appearance: 'none' as const,
    WebkitAppearance: 'none',
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.28em',
    textTransform: 'uppercase' as const,
    color: T.textTertiary,
};

const errorStyle: React.CSSProperties = {
    marginTop: '6px',
    fontSize: '11px',
    fontWeight: 700,
    color: T.error,
    letterSpacing: '0.05em',
};

export default function RegistrationForm({ fixedFee }: Props) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
        team_name: '',
        coach_name: '',
        contact_number: '',
        players: [{ name: '', jersey_number: '', position: '', birth_date: '' }],
        agreed_to_terms: false,
    });


    const addPlayer = () => {
        if (data.players.length < 12)
            setData('players', [...data.players, { name: '', jersey_number: '', position: '', birth_date: '' }]);
    };
    const removePlayer = (i: number) => {
        if (data.players.length > 1) {
            const p = [...data.players]; p.splice(i, 1); setData('players', p);
        }
    };
    const handlePlayer = (i: number, field: string, value: string) => {
        const p = [...data.players]; p[i] = { ...p[i], [field]: value }; setData('players', p);
    };
    const submit = (e: React.FormEvent) => { e.preventDefault(); post('/register'); };

    const progress = (step / 3) * 100;

    return (
        <div id="register" style={{ position: 'relative' }}>

            <style>{`
                @keyframes fadeUp {
                    from { opacity:0; transform:translateY(20px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                .rf-in  { animation: fadeUp 0.55s ease both; }
                .rf-in2 { animation: fadeUp 0.55s 0.08s ease both; }

                .rf-input:focus {
                    border-color: ${T.accent} !important;
                    box-shadow: 0 0 0 3px ${T.accentGlow};
                }
                .rf-input::placeholder { color: ${T.textTertiary}; font-weight: 400; }

                .rf-btn-primary {
                    display: flex; align-items: center; justify-content: center;
                    width: 100%; height: 54px; border-radius: 0px;
                    background: ${T.accent}; color: #ffffff; border: none;
                    font-size: 12px; font-weight: 800; letter-spacing: 0.22em;
                    text-transform: uppercase; cursor: pointer; font-family: inherit;
                    transition: background 0.18s, transform 0.15s, opacity 0.18s;
                    gap: 8px;
                }
                .rf-btn-primary:hover:not(:disabled)  { background: ${T.accentBright}; }
                .rf-btn-primary:active:not(:disabled) { transform: scale(0.98); }
                .rf-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }

                .rf-btn-ghost {
                    display: flex; align-items: center; justify-content: center;
                    height: 54px; border-radius: 0px; flex: 1;
                    border: 1px solid ${T.borderDefault};
                    background: transparent; color: ${T.textSecondary};
                    font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
                    text-transform: uppercase; cursor: pointer; font-family: inherit;
                    transition: background 0.18s, color 0.18s;
                }
                .rf-btn-ghost:hover { background: ${T.borderDefault}; color: ${T.textPrimary}; }

                .rf-player-card {
                    border-radius: 0px;
                    border: 1px solid ${T.borderSubtle};
                    background: #ffffff;
                    padding: 1.25rem 1.25rem 1rem;
                    transition: border-color 0.18s;
                }
                .rf-player-card:hover { border-color: ${T.borderDefault}; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }

                .rf-add-player {
                    width: 100%; padding: 1.5rem; border-radius: 0px;
                    border: 1.5px dashed ${T.borderSubtle};
                    background: transparent;
                    color: ${T.textTertiary}; font-size: 11px; font-weight: 700;
                    letter-spacing: 0.2em; text-transform: uppercase;
                    cursor: pointer; font-family: inherit;
                    transition: border-color 0.18s, color 0.18s, background 0.18s;
                }
                .rf-add-player:hover {
                    border-color: ${T.accentBorder};
                    color: ${T.accent};
                    background: ${T.accentFill};
                }
            `}</style>

            {/* ── Section header ── */}
            <div className="rf-in" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span style={{
                    display: 'inline-block', marginBottom: '1rem',
                    fontSize: '10px', fontWeight: 800,
                    letterSpacing: '0.4em', textTransform: 'uppercase',
                    color: T.accent,
                }}>
                    Official Entry Form
                </span>
                <h2 style={{
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    fontWeight: 900, letterSpacing: '-0.04em',
                    textTransform: 'uppercase', color: T.textPrimary,
                    lineHeight: 1,
                }}>
                    Register Your{' '}
                    <span style={{ color: T.accent, fontStyle: 'italic' }}>Legacy.</span>
                </h2>
                <p style={{
                    marginTop: '1rem',
                    fontSize: '14px', fontWeight: 400,
                    color: T.textSecondary,
                }}>
                    Join the most prestigious basketball tournament in the region.{' '}
                    <span style={{ color: T.textPrimary, fontWeight: 700 }}>One fee: {fixedFee}</span>
                </p>
            </div>

            {/* ── Form shell ── */}
            <div style={{
                borderRadius: '0px',
                border: `1px solid ${T.borderSubtle}`,
                background: T.surface,
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
            }}>

                {/* Progress */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                            <span style={{
                                display: 'block',
                                fontSize: '10px', fontWeight: 800,
                                letterSpacing: '0.35em', textTransform: 'uppercase',
                                color: T.accent,
                            }}>
                                Phase {step} of 3
                            </span>
                            <span style={{
                                display: 'block', marginTop: '4px',
                                fontSize: '16px', fontWeight: 800,
                                letterSpacing: '-0.02em', textTransform: 'uppercase',
                                color: T.textPrimary,
                            }}>
                                {step === 1 ? 'Team Details' : step === 2 ? 'Player Roster' : 'Verification'}
                            </span>
                        </div>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '0px',
                            border: `2px solid ${T.borderDefault}`,
                            background: T.subtle,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '11px', fontWeight: 800,
                            color: T.accent,
                        }}>
                            {Math.round(progress)}%
                        </div>
                    </div>

                    {/* 3-segment bar */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                style={{
                                    flex: 1, height: '4px', borderRadius: '2px',
                                    background: s <= step ? T.accent : T.borderSubtle,
                                    transition: 'background 0.35s',
                                }}
                            />
                        ))}
                    </div>
                </div>

                <form onSubmit={submit}>

                    {/* ══════════════════
                        STEP 1
                    ══════════════════ */}
                    {step === 1 && (
                        <div className="rf-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* Team name */}
                            <div>
                                <label style={labelStyle}>Unit / Team Name</label>
                                <input
                                    type="text"
                                    value={data.team_name}
                                    onChange={(e) => setData('team_name', e.target.value)}
                                    className="rf-input"
                                    style={inputStyle}
                                    placeholder="Enter official team name"
                                />
                                {errors.team_name && <p style={errorStyle}>{errors.team_name}</p>}
                            </div>


                            {/* Coach + Contact */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>Head Coach</label>
                                    <input
                                        type="text"
                                        value={data.coach_name}
                                        onChange={(e) => setData('coach_name', e.target.value)}
                                        className="rf-input"
                                        style={inputStyle}
                                        placeholder="Full name"
                                    />
                                    {errors.coach_name && <p style={errorStyle}>{errors.coach_name}</p>}
                                </div>
                                <div>
                                    <label style={labelStyle}>Contact Number</label>
                                    <input
                                        type="tel"
                                        value={data.contact_number}
                                        onChange={(e) => setData('contact_number', e.target.value)}
                                        className="rf-input"
                                        style={inputStyle}
                                        placeholder="09xx xxx xxxx"
                                    />
                                    {errors.contact_number && <p style={errorStyle}>{errors.contact_number}</p>}
                                </div>
                            </div>

                            <div style={{ marginTop: '0.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!data.team_name}
                                    className="rf-btn-primary"
                                >
                                    Continue to Roster
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════
                        STEP 2
                    ══════════════════ */}
                    {step === 2 && (
                        <div className="rf-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                            {data.players.map((player, i) => (
                                <div key={i} className="rf-player-card">
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        alignItems: 'center', marginBottom: '1rem',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                width: '24px', height: '24px', borderRadius: '6px',
                                                background: T.accent, color: '#0B1120',
                                                fontSize: '10px', fontWeight: 900,
                                            }}>
                                                {i + 1}
                                            </span>
                                            <span style={{
                                                fontSize: '10px', fontWeight: 700,
                                                letterSpacing: '0.25em', textTransform: 'uppercase',
                                                color: T.textTertiary,
                                            }}>
                                                Player #{i + 1}
                                            </span>
                                        </div>
                                        {data.players.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removePlayer(i)}
                                                style={{
                                                    background: 'none', border: 'none', cursor: 'pointer',
                                                    fontSize: '10px', fontWeight: 700,
                                                    letterSpacing: '0.2em', textTransform: 'uppercase',
                                                    color: T.textTertiary,
                                                    transition: 'color 0.15s',
                                                    fontFamily: 'inherit',
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = T.error)}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = T.textTertiary)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'start' }}>
                                        <div>
                                            <label style={labelStyle}>Full Name (PSA Based)</label>
                                            <input
                                                type="text"
                                                value={player.name}
                                                onChange={(e) => handlePlayer(i, 'name', e.target.value)}
                                                className="rf-input"
                                                style={inputStyle}
                                                placeholder="As seen on PSA"
                                            />
                                            {errors[`players.${i}.name` as any] && (
                                                <p style={errorStyle}>{errors[`players.${i}.name` as any]}</p>
                                            )}
                                        </div>
                                        <div style={{ width: '80px' }}>
                                            <label style={labelStyle}>Jersey #</label>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={player.jersey_number}
                                                onChange={(e) => handlePlayer(i, 'jersey_number', e.target.value)}
                                                className="rf-input"
                                                style={inputStyle}
                                                placeholder="00"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {data.players.length < 12 && (
                                <button type="button" onClick={addPlayer} className="rf-add-player">
                                    + Add Another Player
                                </button>
                            )}

                            {/* Roster status */}
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '12px 16px', borderRadius: '10px',
                                border: `1px solid ${T.borderSubtle}`,
                                background: T.raised,
                            }}>
                                <span style={{
                                    fontSize: '10px', fontWeight: 700,
                                    letterSpacing: '0.25em', textTransform: 'uppercase',
                                    color: T.textTertiary,
                                }}>
                                    Roster size
                                </span>
                                <span style={{
                                    fontSize: '14px', fontWeight: 800,
                                    color: data.players.length < 5 ? T.error : T.accent,
                                }}>
                                    {data.players.length} / 12
                                    {data.players.length < 5 && (
                                        <span style={{
                                            marginLeft: '8px', fontSize: '10px', fontWeight: 700,
                                            color: T.error,
                                        }}>
                                            — need {5 - data.players.length} more
                                        </span>
                                    )}
                                </span>
                            </div>

                            {/* Navigation */}
                            <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                <button type="button" onClick={() => setStep(1)} className="rf-btn-ghost">
                                    ← Back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    disabled={data.players.length < 5}
                                    className="rf-btn-primary"
                                    style={{ flex: 2.5 }}
                                >
                                    Proceed to Verification
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════
                        STEP 3
                    ══════════════════ */}
                    {step === 3 && (
                        <div className="rf-in">
                            <div style={{
                                borderRadius: '0px',
                                border: `2px solid ${T.accentBorder}`,
                                background: T.raised,
                                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                            }}>
                                {/* Accent glow */}
                                <div style={{
                                    position: 'absolute', top: '-40px', right: '-40px',
                                    width: '200px', height: '200px', borderRadius: '50%',
                                    background: T.accentGlow, filter: 'blur(60px)',
                                    pointerEvents: 'none',
                                }} />

                                {/* Header */}
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                        flexShrink: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        width: '52px', height: '52px', borderRadius: '0px',
                                        background: T.accent, color: '#ffffff',
                                    }}>
                                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 style={{
                                            fontSize: '1.2rem', fontWeight: 900,
                                            letterSpacing: '-0.02em', textTransform: 'uppercase',
                                            fontStyle: 'italic', color: T.textPrimary,
                                            marginBottom: '4px',
                                        }}>
                                            Integrity Verification
                                        </h3>
                                        <p style={{ fontSize: '13px', color: T.textSecondary, fontWeight: 400 }}>
                                            Confirm compliance with league protocols before submitting.
                                        </p>
                                    </div>
                                </div>

                                {/* Checkbox */}
                                <label style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '1rem 1.125rem',
                                    borderRadius: '12px',
                                    border: `1px solid ${T.borderSubtle}`,
                                    background: T.subtle,
                                    cursor: 'pointer',
                                    marginBottom: '1rem',
                                    position: 'relative', zIndex: 1,
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={data.agreed_to_terms}
                                        onChange={(e) => setData('agreed_to_terms', e.target.checked)}
                                        style={{
                                            width: '22px', height: '22px', flexShrink: 0,
                                            accentColor: T.accent, cursor: 'pointer',
                                        }}
                                    />
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: T.textSecondary, lineHeight: 1.55 }}>
                                        I certify all personnel data is accurate and matches{' '}
                                        <span style={{ color: T.accent, fontWeight: 700 }}>Original PSA Certificates</span>.
                                        All players will present valid government-issued IDs.
                                    </span>
                                </label>

                                {/* Notice */}
                                <div style={{
                                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                                    padding: '1rem 1.125rem',
                                    borderRadius: '12px',
                                    border: `1px solid ${T.accentBorder}`,
                                    background: T.accentFill,
                                    marginBottom: '1.5rem',
                                    position: 'relative', zIndex: 1,
                                }}>
                                    <span style={{
                                        flexShrink: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        width: '20px', height: '20px', borderRadius: '50%',
                                        background: T.accent, color: '#0B1120',
                                        fontSize: '10px', fontWeight: 900,
                                    }}>!</span>
                                    <p style={{
                                        fontSize: '11px', fontWeight: 700,
                                        letterSpacing: '0.06em', textTransform: 'uppercase',
                                        color: T.accent, lineHeight: 1.65,
                                    }}>
                                        Falsified documentation results in immediate disqualification and forfeiture of fees.
                                    </p>
                                </div>

                                {errors.agreed_to_terms && (
                                    <p style={{ ...errorStyle, textAlign: 'center', marginBottom: '1rem' }}>
                                        {errors.agreed_to_terms}
                                    </p>
                                )}

                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    <button type="button" onClick={() => setStep(2)} className="rf-btn-ghost">
                                        ← Review Roster
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing || !data.agreed_to_terms}
                                        className="rf-btn-primary"
                                        style={{ flex: 2.5 }}
                                    >
                                        {processing ? 'Submitting…' : 'Confirm Tournament Entry'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}