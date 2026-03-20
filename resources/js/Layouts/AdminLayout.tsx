import { Link, usePage } from '@inertiajs/react';
import { ReactNode, useState } from 'react';
import admin from '@/routes/admin';

interface Props {
    children: ReactNode;
    title?: string;
}

interface SharedPageProps {
    [key: string]: unknown;
    flash?: {
        success?: string | null;
        error?: string | null;
    };
}

/* ── Design tokens ── */
const T = {
    bgBase:        '#0B1120',
    bgSurface:     '#111827',
    bgRaised:      '#1A2236',
    bgSubtle:      '#1E2A40',
    accent:        '#D4A843',
    accentBright:  '#EAB84A',
    accentFill:    'rgba(212,168,67,0.08)',
    accentBorder:  'rgba(212,168,67,0.22)',
    textPrimary:   '#F0EDE6',
    textSecondary: '#9BA3B4',
    textTertiary:  '#5A6478',
    borderSubtle:  'rgba(255,255,255,0.06)',
    borderDefault: 'rgba(255,255,255,0.10)',
};

const NAV_ITEMS = [
    {
        label: 'Dashboard',
        href: '/admin/dashboard',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
        label: 'Teams',
        href: '/admin/teams',
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
        label: 'Schedule',
        href: '/admin/games',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
    {
        label: 'Stats Management',
        href: '/admin/stats',
        icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14', // Hashtag icon
    },
    {
        label: 'Settings',
        href: '/admin/settings',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    },
];

export default function AdminLayout({ children, title = 'Management Console' }: Props) {
    const page  = usePage<SharedPageProps>();
    const flash = page.props.flash ?? {};
    const url   = page.url;

    const [isCollapsed, setIsCollapsed] = useState(false);
    const sidebarWidth = isCollapsed ? '78px' : '240px';

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: T.bgBase, color: T.textPrimary, fontFamily: 'inherit' }}>

            <style>{`
                .al-nav-link {
                    display: flex; align-items: center; gap: 10px;
                    padding: 8px 11px; /* adjusted slightly to account for the border */
                    border: 1px solid transparent;
                    border-radius: 10px;
                    font-size: 11px; font-weight: 700;
                    letter-spacing: 0.18em; text-transform: uppercase;
                    text-decoration: none; color: ${T.textTertiary};
                    transition: background 0.15s, color 0.15s, border-color 0.15s;
                }
                .al-nav-link:hover, .al-nav-link.active {
                    background: ${T.accentFill};
                    color: ${T.accent};
                    border-color: ${T.accentBorder};
                }
                .al-nav-link:hover svg, .al-nav-link.active svg { opacity: 1; }
                .al-nav-link svg { opacity: 0.55; transition: opacity 0.15s; }
            `}</style>

            {/* ── Sidebar ── */}
            <aside style={{
                position: 'fixed', inset: '0 auto 0 0',
                width: sidebarWidth, zIndex: 50,
                backgroundColor: T.bgSurface,
                borderRight: `1px solid ${T.borderSubtle}`,
                display: 'flex', flexDirection: 'column',
                transition: 'width 0.3s ease',
            }}>
                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{
                        position: 'absolute',
                        top: '50%', right: '-14px',
                        transform: 'translateY(-50%)',
                        width: '28px', height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#1E2A40',
                        border: `1px solid ${T.borderSubtle}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', zIndex: 60,
                        color: T.accent,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    }}
                >
                    <svg
                        width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        style={{ transform: isCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Logo */}
                <div style={{
                    height: '64px', display: 'flex', alignItems: 'center',
                    padding: isCollapsed ? '0' : '0 1.25rem',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    borderBottom: `1px solid ${T.borderSubtle}`,
                    gap: '10px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        minWidth: '32px', height: '32px', borderRadius: '8px',
                        background: T.accent, color: '#0B1120',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '13px', fontWeight: 900,
                    }}>
                        E
                    </div>
                    {!isCollapsed && (
                        <span style={{
                            fontSize: '13px', fontWeight: 800,
                            letterSpacing: '-0.01em', textTransform: 'uppercase',
                            color: T.textPrimary,
                            whiteSpace: 'nowrap',
                        }}>
                            Elite <span style={{ color: T.accent }}>Console</span>
                        </span>
                    )}
                </div>

                {/* Nav items */}
                <nav style={{ padding: '1rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', overflowX: 'hidden' }}>
                    {NAV_ITEMS.map((item) => {
                        const active = url.startsWith(item.href);
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`al-nav-link${active ? ' active' : ''}`}
                                style={{ justifyContent: isCollapsed ? 'center' : 'flex-start', padding: isCollapsed ? '11px 0' : '8px 11px' }}
                            >
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d={item.icon} />
                                </svg>
                                {!isCollapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div style={{ padding: '0.75rem', borderTop: `1px solid ${T.borderSubtle}`, overflowX: 'hidden' }}>
                    {/* User chip */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: isCollapsed ? '10px 0' : '10px 12px', borderRadius: '10px',
                        background: T.bgRaised,
                        marginBottom: '8px',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                    }}>
                        <div style={{
                            minWidth: '30px', height: '30px', borderRadius: '50%',
                            background: T.bgSubtle, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '11px', fontWeight: 800, color: T.textTertiary,
                        }}>
                            A
                        </div>
                        {!isCollapsed && (
                            <div style={{ whiteSpace: 'nowrap' }}>
                                <div style={{ fontSize: '11px', fontWeight: 700, color: T.textPrimary }}>Administrator</div>
                                <div style={{ fontSize: '10px', color: T.textTertiary }}>Elite League</div>
                            </div>
                        )}
                    </div>

                    {/* Logout */}
                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            width: '100%', padding: isCollapsed ? '12px 0' : '9px 12px', borderRadius: '10px',
                            border: `1px solid rgba(176,44,44,0.2)`,
                            background: 'rgba(176,44,44,0.06)',
                            color: '#C0392B',
                            fontSize: '11px', fontWeight: 700,
                            letterSpacing: '0.18em', textTransform: 'uppercase',
                            cursor: 'pointer', fontFamily: 'inherit',
                            transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(176,44,44,0.12)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(176,44,44,0.06)')}
                    >
                        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {!isCollapsed && <span style={{ whiteSpace: 'nowrap' }}>Logout</span>}
                    </Link>
                </div>
            </aside>

            {/* ── Main ── */}
            <main style={{ flex: 1, marginLeft: sidebarWidth, display: 'flex', flexDirection: 'column', minHeight: '100vh', transition: 'margin-left 0.3s ease' }}>

                {/* Top bar */}
                <header style={{
                    height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 2rem',
                    borderBottom: `1px solid ${T.borderSubtle}`,
                    backgroundColor: T.bgSurface,
                    position: 'sticky', top: 0, zIndex: 40,
                }}>
                    <h1 style={{
                        fontSize: '11px', fontWeight: 700,
                        letterSpacing: '0.3em', textTransform: 'uppercase',
                        color: T.textTertiary,
                    }}>
                        {title}
                    </h1>
                    <button style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        border: `1px solid ${T.borderSubtle}`,
                        background: T.bgRaised,
                        color: T.textTertiary, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'color 0.15s',
                    }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = T.textPrimary)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = T.textTertiary)}
                    >
                        <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                </header>

                {/* Content */}
                <div style={{ padding: '2rem', flex: 1 }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

                        {/* Flash messages */}
                        {flash.success && (
                            <div style={{
                                marginBottom: '1.25rem',
                                padding: '1rem 1.25rem',
                                borderRadius: '12px',
                                border: '1px solid rgba(46,125,82,0.25)',
                                background: 'rgba(46,125,82,0.08)',
                                color: '#4CAF80',
                                fontSize: '13px', fontWeight: 600,
                            }}>
                                {flash.success}
                            </div>
                        )}
                        {flash.error && (
                            <div style={{
                                marginBottom: '1.25rem',
                                padding: '1rem 1.25rem',
                                borderRadius: '12px',
                                border: '1px solid rgba(176,44,44,0.25)',
                                background: 'rgba(176,44,44,0.08)',
                                color: '#E57373',
                                fontSize: '13px', fontWeight: 600,
                            }}>
                                {flash.error}
                            </div>
                        )}

                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}