'use client';
import { Button, Card } from '@heroui/react';
import Link from "next/link";
import Image from 'next/image';

const TutorCard = ({ addtutor }) => {

    const startDay = addtutor.availableDays?.[0] || '';
    const endDay = addtutor.availableDays?.[addtutor.availableDays.length - 1] || '';
    const daysString = startDay && endDay ? `${startDay} - ${endDay}` : 'N/A';

    return (
        <Card className="p-5 rounded-2xl border border-gray-100 bg-white flex flex-col justify-between transform transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-gray-200">
            {/* Image */}
            <div className="relative w-full h-56">
                <Image
                    src={addtutor.imageUrl}
                    alt={addtutor.tutorName}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">

                {/* Name & Category */}
                <div>
                    <h2 className="text-lg font-bold">{addtutor.destinationName}</h2>
                    <p className="text-gray-500 text-sm">{addtutor.category}</p>
                </div>

                {/* Info */}
                <div className="text-sm space-y-2 border-t border-default-100 pt-3">

                    <div className="flex justify-between">
                        <span className="text-gray-500">Available Days</span>
                        <span className="font-medium">{daysString}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Time Slot</span>
                        <span className="font-medium">{addtutor.availableTimeSlot}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Start Date</span>
                        <span className="font-medium">{addtutor.startDate || 'N/A'}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Total Slot</span>
                        <span className="font-medium">{addtutor.totalSlot}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Experience</span>
                        <span className="font-medium">{addtutor.experience}</span>
                    </div>

                    {/* Fee highlighted */}
                    <div className="flex justify-between items-center border-t border-default-100 pt-2">
                        <span className="text-gray-500">Hourly Fee</span>
                        <span className="font-bold text-indigo-600 text-base">৳{addtutor.price}/hr</span>
                    </div>

                </div>

                {/* Button */}
                <Link href={`/tutor/${addtutor._id.toString()}`}>
                    <Button className="w-full text-base bg-gradient-to-r from-indigo-600 to-violet-500 text-white">
                        Book Session
                    </Button>
                </Link>

            </div>
        </Card>
    );
};

export default TutorCard;