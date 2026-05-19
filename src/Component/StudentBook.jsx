"use client";

import { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const StudentBook = ({ tutorData }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const noSlots = Number(tutorData?.totalSlot) === 0;
  const today = new Date();
  const sessionDate = tutorData?.startDate ? new Date(tutorData.startDate) : null;
  const isDateExpired = sessionDate && today > sessionDate;
  const isBlocked = noSlots || isDateExpired;
  const institutes = tutorData?.institution;
  
  const handleBooking = async () => {
    if (!phone) {
      toast.error("Please fill all fields");
      return;
    }

    const bookingData = {
      phone,
      tutorId: tutorData._id,
      tutorName: tutorData.destinationName,
      studentEmail: user?.email,
      bookStatus: "Pending",
      bookingDate: new Date().toISOString(),
      institutes:tutorData.institution,

    };
     console.log(bookingData)
    setLoading(true);
    try {
      const res = await fetch("http://localhost:1000/bookSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (data.insertedId) {
        toast.success("Session booked successfully!");
        setPhone("");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      {/* Trigger Button */}
      <Button
        variant="outline"
        isDisabled={isBlocked}
        className={` text-white ${
          isBlocked
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-600 to-violet-500"
        }`}
      >
        {noSlots ? "No Slots Available" : isDateExpired ? "Session Expired" : "Book Session"}
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="lg:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-center font-bold ">Book Session</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted text-center space-y-2">
                Fill in your details to confirm booking
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <div className="flex flex-col gap-4">

                  {/* Auto-filled */}
                  <TextField className="w-full outline-none" isReadOnly>
                    <Label>Name</Label>
                    <Input   className="focus:outline-none focus:ring-0" value={tutorData?.institution || ""} />
                  </TextField>
                  <TextField className="w-full outline-none" isReadOnly>
                    <Label>Tutor Name</Label>
                    <Input value={tutorData?.destinationName || ""} />
                  </TextField>

                  <TextField className="w-full" isReadOnly>
                    <Label>Student Email</Label>
                    <Input value={user?.email || ""} />
                  </TextField>

                  {/* User fill করবে */}
                
                  <TextField className="w-full" name="phone" type="tel">
                    <Label>Phone</Label>
                    <Input
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </TextField>

                </div>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleBooking}
                isLoading={loading}
                className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white"
              >
                Confirm Booking
              </Button>
            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default StudentBook;