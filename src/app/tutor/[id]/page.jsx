
import StudentBook from "@/Component/StudentBook";
import { Card, Chip, Button } from "@heroui/react";

const TutorDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:1000/addTutor/${id}`, {
        cache: 'no-store'
    });
    const tutorData = await res.json();

    const decreaseGlobalSlot = () => {
        setTutor((prev) => ({
            ...prev,
            totalSlot: Number(prev?.totalSlot || 0) > 0 ? Number(prev.totalSlot) - 1 : 0
        }));
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-8">
            <Card className="max-w-3xl w-full shadow-lg p-8">
                <div className="flex md:flex-row gap-8 flex-col ">

                    {/* Left - Image */}
                    <div className="flex-shrink-0 md:1/2">
                        <img
                            src={tutorData.imageUrl}
                            alt={tutorData.destinationName}
                            className="w-96 h-72 object-cover rounded-xl"
                        />
                    </div>

                    {/* Right - Info */}
                    <div className="flex flex-col gap-3 flex-1">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                {tutorData.destinationName}
                            </h1>
                            <p className="text-default-400 text-sm mt-1">

                                {tutorData.category}
                            </p>
                        </div>

                        {/* Divider এর বদলে সাধারণ hr */}
                        <hr className="border-default-200" />


                        <div className="flex flex-col gap-2 text-sm text-default-600">

                            <p><span className="font-semibold">Experience:</span> {tutorData.experience}</p>
                            <p><span className="font-semibold">Location:</span> {tutorData.location}</p>
                            <p><span className="font-semibold">Hourly Fee:</span> {tutorData.price}</p>
                            <p><span className="font-semibold">Remaining Slots:</span> {tutorData.availableTimeSlot}</p>
                            <p><span className="font-semibold">availableDays:</span> {tutorData.availableDays[0]}-{tutorData.availableDays[1]}</p>
                            <p><span className="font-semibold">Session Start Date:</span> {tutorData.departureDate}</p>
                            <p><span className="font-semibold">startDate:</span> {tutorData.startDate}</p>
                            <p><span className="font-semibold">totalSlot:</span> {tutorData.totalSlot}</p>
                        </div>

                        <div className="mt-4">
                            <StudentBook  tutorData={tutorData}></StudentBook>
                        </div>
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default TutorDetailsPage;