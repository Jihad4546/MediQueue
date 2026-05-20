"use client";

import { useState, useEffect } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const StudentBook = ({ tutorData }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [tutorInfo, setTutorInfo] = useState(tutorData);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const today = new Date();
  const sessionDate = tutorInfo?.departureDate ? new Date(tutorInfo.departureDate) : null;
  const isDateExpired = sessionDate && today > sessionDate;
  const noSlots = Number(tutorInfo?.totalSlot) === 0;

  useEffect(() => {
    if (user?.email && tutorData._id) {
      fetch(`http://localhost:1000/bookSession/check/${user.email}/${tutorData._id}`)
        .then((res) => res.json())
        .then((data) => setAlreadyBooked(data.alreadyBooked));
    }
   
  }, [user?.email, tutorData._id]);

  const handleBooking = async () => {
    if (!phone) {
      toast.error("Please fill all fields");
      return;
    }

    const bookingData = {
      phone,
      sessionId: tutorData._id,
      tutorId: tutorData._id,
      tutorName: tutorData.destinationName,
      studentEmail: user?.email,
      bookStatus: "padding",
      bookingDate: new Date().toISOString(),
      institutes: tutorData.institution,
    };

    setLoading(true);
    try {
      const res = await fetch("http://localhost:1000/bookSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Session booked successfully!");
        setPhone("");
        setAlreadyBooked(true);

        const updated = await fetch(`http://localhost:1000/addTutor/${tutorData._id}`);
        const updatedData = await updated.json();
        setTutorInfo(updatedData);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      {isDateExpired ? (
        <p style={{ color: "red", fontWeight: "600" }}>⚠️ Session Expired</p>
      ) : noSlots ? (
        <p style={{ color: "orange", fontWeight: "600" }}>⚠️ This session is fully booked.</p>
      ) : alreadyBooked ? (
        <p style={{ color: "blue", fontWeight: "600" }}>✅ Already Booked</p>
      ) : (
        <Button
          variant="outline"
          className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white"
        >
          Book Session
        </Button>
      )}

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="lg:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-center font-bold">Book Session</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted text-center space-y-2">
                Fill in your details to confirm booking
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <div className="flex flex-col gap-4">
                  <TextField className="w-full outline-none" isReadOnly>
                    <Label>Name</Label>
                    <Input value={tutorInfo?.institution || ""} />
                  </TextField>
                  <TextField className="w-full outline-none" isReadOnly>
                    <Label>Tutor Name</Label>
                    <Input value={tutorInfo?.destinationName || ""} />
                  </TextField>
                  <TextField className="w-full" isReadOnly>
                    <Label>Student Email</Label>
                    <Input value={user?.email || ""} />
                  </TextField>
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
              {isDateExpired ? (
                <p style={{ color: "red", fontWeight: "600" }}>⚠️ Session Expired</p>
              ) : noSlots ? (
                <p style={{ color: "orange", fontWeight: "600" }}>⚠️ This session is fully booked.</p>
              ) : (
                <Button
                  onClick={handleBooking}
                  isLoading={loading}
                  isDisabled={alreadyBooked}  // ← already booked হলে disabled
                  className={`text-white ${alreadyBooked
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-violet-500"
                  }`}
                >
                  {alreadyBooked
                    ? "Already Booked"
                    : loading
                    ? "Booking..."
                    : `Confirm Booking (${tutorInfo?.totalSlot} slots left)`}
                </Button>
              )}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default StudentBook;