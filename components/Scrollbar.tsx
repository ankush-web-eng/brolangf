'use client';

export function ScrollBarProps({ children }: { children: React.ReactNode }) {
    return (
        <>
            <style jsx global>
                {`
                    /* Basic scrollbar styling */
                    ::-webkit-scrollbar {
                        width: 6px;
                        height: 6px;
                    }

                    /* Track styles */
                    ::-webkit-scrollbar-track {
                        background: transparent;
                        border-radius: 12px;
                        margin: 4px;
                    }

                    /* Handle/thumb styles */
                    ::-webkit-scrollbar-thumb {
                        background: rgb(var(--foreground-rgb) / 0.2);
                        border-radius: 12px;
                        transition: background-color 0.2s ease;
                    }

                    /* Handle on hover */
                    ::-webkit-scrollbar-thumb:hover {
                        background: rgb(var(--foreground-rgb) / 0.3);
                    }

                    /* Handle when active/being dragged */
                    ::-webkit-scrollbar-thumb:active {
                        background: rgb(var(--foreground-rgb) / 0.4);
                    }

                    /* Corner styles where horizontal and vertical scrollbars meet */
                    ::-webkit-scrollbar-corner {
                        background: transparent;
                    }

                    /* For Firefox */
                    html {
                        scrollbar-width: thin;
                        scrollbar-color: rgb(var(--foreground-rgb) / 0.2) transparent;
                    }

                    /* Dark mode adjustments */
                    @media (prefers-color-scheme: dark) {
                        ::-webkit-scrollbar-thumb {
                            background: rgb(var(--foreground-rgb) / 0.3);
                        }

                        ::-webkit-scrollbar-thumb:hover {
                            background: rgb(var(--foreground-rgb) / 0.4);
                        }

                        ::-webkit-scrollbar-thumb:active {
                            background: rgb(var(--foreground-rgb) / 0.5);
                        }
                    }

                    /* Optional: Hide scrollbar when not hovering */
                    .hide-scrollbar-until-hover {
                        scrollbar-width: none;
                    }

                    .hide-scrollbar-until-hover::-webkit-scrollbar {
                        display: none;
                    }

                    .hide-scrollbar-until-hover:hover::-webkit-scrollbar {
                        display: block;
                    }
                `}
            </style>
            {children}
        </>
    );
}