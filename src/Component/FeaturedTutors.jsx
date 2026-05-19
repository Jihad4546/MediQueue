import { Card, Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const FeaturedTutors = async () => {
    // ডাটাবেজ বা এপিআই থেকে টিউটরদের ডাটা ফেচ করা
    const res = await fetch('http://localhost:1000/addTutor');
    const allTutors = await res.json();

    // হোম পেজের জন্য প্রথম ৩ জন টপ-রেটেড টিউটরকে ফিল্টার করে নেওয়া
    const featuredTutors = allTutors.slice(0, 3);

    return (
        <section className="bg-gradient-to-b from-white to-gray-50/50 py-16 sm:py-24">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* সেকশন হেডার */}
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2E9A86] bg-[#2E9A86]/10 px-3 py-1 rounded-full">
                        Top Rated
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Meet Our Featured Tutors
                    </h2>
                    <p className="text-gray-500 text-base sm:text-lg">
                        Learn from highly experienced and verified expert tutors tailored to your learning needs.
                    </p>
                </div>

                {/* টিউটর কার্ড গ্রিড */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {
                        featuredTutors.map(tutor => {
                            // দিনগুলোকে সংক্ষেপে দেখানোর জন্য (যেমন: Sun - Thu)
                            const startDay = tutor.availableDays?.[0] || '';
                            const endDay = tutor.availableDays?.[tutor.availableDays.length - 1] || '';
                            const daysString = startDay && endDay ? `${startDay} - ${endDay}` : 'N/A';

                            // ডেট সুন্দরভাবে ফরম্যাট করার জন্য
                            const formattedDate = tutor.sessionStartDate
                                ? new Date(tutor.sessionStartDate).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })
                                : 'N/A';

                            return (
                                <Card
                                    key={tutor._id}
                                    className="p-5 rounded-2xl border border-gray-100 bg-white flex flex-col justify-between transform transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-gray-200"
                                >
                                    <div>
                                        {/* টিউটরের ছবি (গ্রুপ হোভার ইফেক্টসহ) */}
                                        <div className="relative w-full h-56 rounded-xl overflow-hidden mb-5 group">
                                            <Image
                                                src={tutor.photo}
                                                alt={tutor.tutorName}
                                                fill
                                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority
                                            />
                                            {/* সাবজেক্টের একটি ছোট ব্যাজ ছবির উপরে */}
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                                                {tutor.subjectCategory}
                                            </div>
                                        </div>

                                        {/* টিউটরের বিস্তারিত তথ্য */}
                                        <div className="space-y-2 px-1">
                                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                                                {tutor.tutorName}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                                                <span>🏫</span> {tutor.institutionExperience || "Expert Tutor"}
                                            </p>

                                            <hr className="my-3 border-gray-100" />

                                            <div className="space-y-1.5 text-sm text-gray-600 font-normal">
                                                <p className="flex items-center gap-2">
                                                    <span className="text-gray-400">📅</span>
                                                    <span><strong className="text-gray-800">Available:</strong> {daysString} ({tutor.availableTimeSlot})</span>
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span className="text-gray-400">🚀</span>
                                                    <span><strong className="text-gray-800">Starts:</strong> {formattedDate}</span>
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span className="text-gray-400">💵</span>
                                                    <span><strong className="text-gray-800">Fee:</strong> ৳{tutor.hourlyFee}/hr</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* বুকিং বাটন */}
                                    <div className="mt-6">
                                        <Button className="w-full text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-500 hover:shadow-lg transition-all duration-300 active:scale-98 py-2.5 rounded-xl">
                                            Book Live Session
                                        </Button>
                                    </div>
                                </Card>
                            );
                        })
                    }
                </div>

                {/* 'See All Tutors' বাটন সেকশন (ডুপ্লিকেট কোড রিমুভড) */}
                <div className="text-center mt-12">
                    <Button className="text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-500 hover:shadow-lg transition-all duration-300 active:scale-98 px-6 py-2.5 rounded-xl">
                        See All Available Tutors
                    </Button>
                </div>

            </div>
        </section>
    );
};

export default FeaturedTutors;