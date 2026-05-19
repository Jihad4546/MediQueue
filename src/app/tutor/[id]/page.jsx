
import StudentBook from "@/Component/StudentBook";
import { Card, Chip, Button } from "@heroui/react";

const TutorDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:1000/addTutor/${id}`, {
        cache: 'no-store'
    });
    const tutorData = await res.json();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
            <Card className="max-w-3xl w-full shadow-lg p-8">
                <div className="flex md:flex-row gap-8 flex-col ">

                    {/* Left - Image */}
                    <div className="flex-shrink-0 md:1/2">
                        <img
                            src={tutorData.photo}
                            alt={tutorData.name}
                            className="w-96 h-72 object-cover rounded-xl"
                        />
                    </div>

                    {/* Right - Info */}
                    <div className="flex flex-col gap-3 flex-1">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {tutorData.tutorName}
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">
                                {tutorData.subjectCategory}
                            </p>
                        </div>

                        {/* Divider এর বদলে সাধারণ hr */}
                        <hr className="border-gray-200" />

                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                          
                            <p><span className="font-semibold">Experience:</span> {tutorData.institutionExperience}</p>
                            <p><span className="font-semibold">Location:</span> {tutorData.location}</p>
                            
                            <p><span className="font-semibold">Available  Time Slot:</span> {tutorData.availableDays}</p>
                            <p><span className="font-semibold">Hourly Fee:</span> {tutorData.hourlyFee}</p>
                            <p><span className="font-semibold">Remaining Slots:</span> {tutorData.totalSlot}</p>
                            <p><span className="font-semibold">Session Start Date:</span> {tutorData.sessionStartDate}</p>
                        </div>

                        <div className="mt-4">
                          <StudentBook></StudentBook>
                        </div>
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default TutorDetailsPage;