'use client';
import { Button, Card } from '@heroui/react';
import Link from "next/link";
import Image from 'next/image';

const TutorCard = ({ addtutor }) => {


    const startDay = addtutor.availableDays?.[0] || '';

    const endDay =
        addtutor.availableDays?.[
        addtutor.availableDays.length - 1
        ] || '';

    const daysString =
        startDay && endDay
            ? `${startDay} - ${endDay}`
            : 'N/A';

    const formattedDate =
        addtutor.sessionStartDate
            ? new Date(
                addtutor.sessionStartDate
            ).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
            : 'N/A';

    return (
        <Card
            className="p-4 rounded-2xl shadow-sm"
        >
            {/* Image */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4">
                <Image
                    src={addtutor.photo}
                    alt={addtutor.tutorName}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Name */}
            <h2 className="text-xl font-bold">
                {addtutor.tutorName}
            </h2>

            {/* Subject */}
            <p className="text-gray-500">
                {addtutor.subjectCategory}
            </p>

            {/* Available Days */}
            <p className="mt-2">
                <span className="font-semibold">
                    Available:
                </span>{' '}
                {daysString}
            </p>

            {/* Session Date */}
            <p>
                <span className="font-semibold">
                    Start Date:
                </span>{' '}
                {formattedDate}
            </p>

            {/* Fee */}
            <p>
                <span className="font-semibold">
                    Fee:
                </span>{' '}
                ৳{addtutor.hourlyFee}/hr
            </p>

            {/* Button */}
            <div className="mt-5">
        
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