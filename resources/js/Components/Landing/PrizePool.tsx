import React from 'react';

export default function PrizePool() {
    return (
        <section id="prizes" className="w-full bg-[#f8f9fa] py-20 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="h-[3px] w-12 sm:w-16 bg-[#c1121f]" />
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-wide uppercase text-[#1a1a1a]">
                        The Prize Pool
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full shadow-2xl">
                    
                    {/* Champion */}
                    <div className="bg-[#cc0000] p-8 lg:p-10 relative overflow-hidden flex flex-col justify-end text-white min-h-[320px]">
                        {/* Faint Trophy Icon */}
                        <div className="absolute top-10 lg:top-12 left-1/2 -translate-x-1/2 opacity-20">
                            <svg className="w-24 h-24 lg:w-32 lg:h-32" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.831 6.304c-1.121-1.041-3.136-1.503-4.831-1.554V3h-4v1.75C8.305 4.8 6.29 5.263 5.169 6.304 4.016 7.375 3.328 9.07 3.328 11.026c0 1.968.694 3.666 1.854 4.743.832.77 1.944 1.258 3.167 1.488L10 18.06V20H7v2h10v-2h-3v-1.94l1.651-1.125h.001c1.222-.231 2.335-.718 3.167-1.488 1.159-1.077 1.853-2.775 1.853-4.743 0-1.956-.688-3.651-1.841-4.721zm-13.43 4.22c0-1.233.39-2.277 1.059-2.898.663-.615 1.637-.992 2.54-.992v6.456c-.903 0-1.877-.378-2.54-.993-.669-.621-1.059-1.666-1.059-2.573zm13.197 2.574c-.663.615-1.637.993-2.54.993V6.634c.903 0 1.877.377 2.54.992.67.621 1.059 1.665 1.059 2.573 0 .907-.39 1.952-1.059 2.574z" />
                            </svg>
                        </div>
                        
                        <div className="relative z-10 pt-28">
                            <div className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-1">
                                Champion
                            </div>
                            <div className="text-5xl lg:text-6xl font-black uppercase mb-5 tracking-tighter">
                                ₱100k
                            </div>
                            <div className="w-full h-[1px] bg-white/20 mb-5" />
                            <div className="text-[13px] md:text-sm font-bold leading-snug">
                                Trophy + Custom Championship Jerseys + VIP Complex Access
                            </div>
                        </div>
                    </div>

                    {/* 1st Runner Up */}
                    <div className="bg-[#1a1a1a] p-8 lg:p-10 flex flex-col justify-end min-h-[320px] transition-colors hover:bg-[#222]">
                        <div className="pt-24 mt-auto">
                            <div className="text-[#c1121f] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-1">
                                1st Runner Up
                            </div>
                            <div className="text-4xl lg:text-[2.75rem] font-black uppercase mb-5 tracking-tighter text-white">
                                ₱50,000
                            </div>
                            <div className="w-full h-[1px] bg-white/10 mb-5" />
                            <div className="text-[13px] md:text-sm font-semibold text-gray-300 leading-snug">
                                Medals + Team Training Vouchers
                            </div>
                        </div>
                    </div>

                    {/* 2nd Runner Up */}
                    <div className="bg-[#262626] p-8 lg:p-10 flex flex-col justify-end min-h-[320px] transition-colors hover:bg-[#2d2d2d]">
                        <div className="pt-24 mt-auto">
                            <div className="text-[#c1121f] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-1">
                                2nd Runner Up
                            </div>
                            <div className="text-3xl lg:text-4xl font-black uppercase mb-5 tracking-tighter text-white">
                                ₱25,000
                            </div>
                            <div className="w-full h-[1px] bg-white/10 mb-5" />
                            <div className="text-[13px] md:text-sm font-semibold text-gray-300 leading-snug">
                                Medals + Sports Merchandise Package
                            </div>
                        </div>
                    </div>

                    {/* 3rd Runner Up */}
                    <div className="bg-[#333333] p-8 lg:p-10 flex flex-col justify-end min-h-[320px] transition-colors hover:bg-[#3d3d3d]">
                        <div className="pt-24 mt-auto">
                            <div className="text-[#c1121f] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-1">
                                3rd Runner Up
                            </div>
                            <div className="text-3xl lg:text-4xl font-black uppercase mb-5 tracking-tighter text-white">
                                ₱10,000
                            </div>
                            <div className="w-full h-[1px] bg-white/10 mb-5" />
                            <div className="text-[13px] md:text-sm font-semibold text-gray-300 leading-snug">
                                Team Practice Set Vouchers
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
