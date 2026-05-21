"use client";

import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFound = () => {
    return (
        <div className="space-y-5 relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-100 via-white to-blue-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 flex items-center justify-center px-4 transition-colors duration-300">

            {/* Background Blur */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400/20 blur-3xl rounded-full"></div>

            {/* Main Card */}
            <div className="relative z-10 max-w-xl w-full">

                <div className="backdrop-blur-xl bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-3xl  p-8 md:p-12 text-center transition-colors duration-300">

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-white/10 border border-blue-200 dark:border-white/20 flex items-center justify-center shadow-lg">
                            <SearchX className="w-12 h-12 text-blue-600 dark:text-cyan-400" />
                        </div>
                    </div>

                    {/* 404 */}
                    <h1 className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300   focus:outline-none focus:ring-2 focus:ring-blue-400
    bg-blue-600 text-black hover:bg-blue-700
    
    dark:bg-transparent dark:text-blue-400 dark:border dark:border-blue-500/40 dark:hover:bg-blue-950/30">
                        404
                    </h1>

                    {/* Title */}
                    <h2 className="my-5 inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300  focus:outline-none focus:ring-2 focus:ring-blue-400
    bg-blue-600 text-black hover:bg-blue-700
    
    dark:bg-transparent dark:text-blue-400 dark:border dark:border-blue-500/40 dark:hover:bg-blue-950/30">
                        Oops! Page Not Found
                    </h2>

              

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                        {/* Home Button */}
                        <Link
                            href="/"
                            className="
    inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400
    bg-blue-600 text-black hover:bg-blue-700
    
    dark:bg-transparent dark:text-blue-400 dark:border dark:border-blue-500/40 dark:hover:bg-blue-950/30
  "
                        >

                            Back to Home
                        </Link>

                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
                    © 2026 Your Platform. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default NotFound;