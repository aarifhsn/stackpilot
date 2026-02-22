export default function BlogNavbar({ settings }) {
    return (
        <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                {/* Logo */}
                <a
                    href="/"
                    className="group flex items-center gap-3"
                    style={{ textDecoration: 'none' }}
                >
                    <div className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="38"
                            height="38"
                        >
                            <rect
                                width="48"
                                height="48"
                                rx="9"
                                fill="#0F172A"
                            />
                            <g transform="translate(9, 9) scale(0.513, 0.513)">
                                <path
                                    fill="white"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.001,60.789c-0.035-1.043,0.688-1.877,1.143-2.73c1.366-2.564,2.773-5.168,4.073-7.799c0.877-1.774,1.632-3.578,2.682-5.266c1.522-2.443,2.786-5.109,4.123-7.748c1.328-2.621,2.551-5.293,3.974-7.896c0.907-1.66,1.74-3.559,2.781-5.115c1.132-1.693,2.556-2.883,5.066-3.031c1.251-0.072,2.631,0.051,4.023,0.051c2.819,0,5.181,0.096,8.146,0c0.917-0.029,3.203-0.285,3.477,0.397c0.23,0.572-0.667,1.922-0.993,2.533C33.044,34.4,27.843,44.621,22.402,54.879c-1.497,2.822-2.565,5.977-6.358,6.408c-1.579,0.178-3.569,0.088-5.513,0.049c-2.601-0.051-5.559-0.049-8.245-0.049C1.479,61.287,0.464,61.498,0.001,60.789z"
                                />
                                <path
                                    fill="white"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M59.852,60.84c-0.643,0.906-2.301,0.648-3.725,0.596c-2.814-0.105-5.394-0.051-8.344-0.051c-1.988,0-4.132,0.225-5.563-0.348c-2.343-0.936-3.468-3.621-4.619-5.91c-0.661-1.314-1.435-2.611-2.136-3.873c-0.689-1.24-1.352-2.598-2.086-3.975C33.049,46.66,32.7,46,32.336,45.293c-0.449-0.869-1.65-2.438-0.199-2.682c1.135-0.191,2.587,0,3.924,0c2.558,0,5.311-0.101,7.848,0c2.417,0.096,4.574-0.219,6.159,0.744c1.861,1.131,2.852,3.371,3.725,5.414c0.437,1.024,1.022,2.033,1.54,3.029c1.026,1.978,2.035,3.959,3.08,5.961C58.934,58.76,59.591,59.713,59.852,60.84z"
                                />
                            </g>
                        </svg>
                    </div>
                    <div>
                        <div className="text-[15px] leading-none font-black tracking-widest text-slate-500 dark:text-white">
                            arif<span className="font-light"> hassan</span>
                        </div>
                        <div className="mt-0.5 text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase">
                            Full-Stack Dev
                        </div>
                    </div>

                    <span className="ml-3 text-xs font-bold text-slate-400 dark:text-slate-500">
                        BLOG
                    </span>
                </a>
                <a
                    href="/"
                    className="text-xs font-bold tracking-widest text-slate-500 uppercase transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                    style={{ textDecoration: 'none' }}
                >
                    ← Portfolio
                </a>
            </div>
        </header>
    );
}
