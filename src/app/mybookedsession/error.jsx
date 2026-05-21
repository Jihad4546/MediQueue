"use client";

import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

const ErrorPage = ({ error, reset }) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-100 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">

            {/* Background Blobs */}
            <div className="absolute -top-16 -left-16 w-72 h-72 bg-red-400/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-orange-400/15 blur-3xl rounded-full pointer-events-none" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="backdrop-blur-xl bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-[28px] p-10 md:p-12 text-center">

                    {/* Icon */}
                    <div className="mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100/80 dark:bg-white/8 border border-red-200/50 dark:border-white/15" style={{ width: 88, height: 88 }}>
                        <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400" />
                    </div>

                    {/* Badge */}
                    <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-100/90 dark:bg-white/6 border border-red-200/60 dark:border-red-400/30 text-red-600 dark:text-red-400">
                        Something went wrong
                    </span>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 leading-snug">
                        Unexpected Error
                    </h1>

                    {/* Error Message */}
                    {error?.message && (
                        <p className="text-xs font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-500 dark:text-slate-400 mb-4 text-left break-all">
                            {error.message}
                        </p>
                    )}

                    {/* Description */}
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                        An unexpected error occurred. You can try again or return to the home page.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                            onClick={reset}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                        >
                            Try Again
                        </button>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-semibold transition-all duration-200"
                        >
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-400 dark:text-slate-600 text-xs mt-5">
                    © 2026 Your Platform. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;