"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const StudentBook = ({ tutorData }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [tutorInfo, setTutorInfo] = useState(tutorData);

 // ==========================================
  // 📅 DATE & SLOT VALIDATION (স্লট এবং ডেট পার হলে ব্লক)
  // ==========================================
  const todayStr = new Date().toISOString().split("T")[0]; 
  const today = new Date(todayStr);

  const sessionDateStr = tutorInfo?.startDate
    ? tutorInfo.startDate.split("T")[0]
    : null;

  const bookingNotStarted = sessionDateStr
    ? new Date(sessionDateStr) < today  
    : false;

  const noSlots = Number(tutorInfo?.totalSlot || 0) <= 0;
 

  useEffect(() => {
    if (user?.email && tutorData?._id) {
      fetch(
        `http://localhost:1000/bookSession/check/${user.email}/${tutorData._id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setAlreadyBooked(data?.alreadyBooked);
        });
    }
  }, [user?.email, tutorData?._id]);

  // =========================
  // HANDLE BOOKING
  // =========================
  const handleBooking = async () => {
    if (!phone) {
      toast.error("Please enter phone number");
      return;
    }

    // শর্ত ১: টোটাল স্লট ০ হলে বুকিং ব্লক
    if (noSlots) {
      toast.error("This session is fully booked. You can't join at the moment.");
      return;
    }

    // শর্ত ২: সেশন ডেট কারেন্ট ডেটের চেয়ে বড় বা আগে হলে বুকিং ব্লক
    if (bookingNotStarted) {
      toast.error("Booking is not available yet for this tutor");
      return;
    }

    if (alreadyBooked) {
      toast.error("You already booked this session");
      return;
    }

    const bookingData = {
      studentName: user?.name,
      phone,
      tutorId: tutorInfo?._id,
      tutorName: tutorInfo?.destinationName || tutorInfo?.name, // 🛠️ আপনার ডাটাবেজ ফিল্ড: destinationName
      studentEmail: user?.email,
      bookStatus: "Booked", // 🛠️ অটো-জেনারেটেড স্ট্যাটাস
      bookingDate: new Date().toISOString(),
    };

  // ====================================================
  // 🎯 শর্ত ৩: অটো স্লট ডিক্রিস লজিক (After Successful Booking)
  // ====================================================
    try {
      setLoading(true);

      const res = await fetch("http://localhost:1000/bookSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (data.success) {
        // সফল বুকিংয়ের পর আপনার তৈরি করা প্যাচ এপিআই দিয়ে ডাটাবেজের স্লট ১ কমানো
        await fetch(
          `http://localhost:1000/addTutor/decrease-slot/${tutorInfo._id}`,
          { method: "PATCH" }
        );

        toast.success("Session booked successfully");
        setAlreadyBooked(true);

        // পেজ রিফ্রেশ ছাড়াই সাথে সাথে স্ক্রিনে ১টি স্লট কমিয়ে দেখানো (Optimistic UI)
        setTutorInfo((prev) => {
          const freshSlot = Number(prev?.totalSlot || 0);
          return {
            ...prev,
            totalSlot: freshSlot > 0 ? freshSlot - 1 : 0,
          };
        });

        setPhone("");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 🎟️ TRIGGER BUTTON / STATUS MESSAGES
  // ==========================================
  const renderTrigger = () => {
    if (bookingNotStarted) {
      return (
        <p className="text-red-500 font-semibold bg-red-50 p-2.5 rounded-xl inline-block border border-red-200">
          ⚠️ Booking is not available yet for this tutor
        </p>
      );
    }

    if (noSlots) {
      return (
        <p className="text-orange-500 font-semibold bg-orange-50 p-2.5 rounded-xl inline-block border border-orange-200">
          ⚠️ No available slots left.
        </p>
      );
    }

    if (alreadyBooked) {
      return (
        <p className="text-blue-500 font-semibold bg-blue-50 p-2.5 rounded-xl inline-block border border-blue-200">
          ✅ Already Booked
        </p>
      );
    }

    return (
      <Modal.Trigger>
        <Button className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-medium">
          Book Session
        </Button>
      </Modal.Trigger>
    );
  };

  return (
    <Modal>
      {renderTrigger()}

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="lg:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-center font-bold">
                Book Session
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <div className="flex flex-col gap-4">
                  <TextField isReadOnly>
                    <Label>Student Name</Label>
                    <Input value={user?.name || ""} />
                  </TextField>

                  <TextField isReadOnly>
                    <Label>Tutor ID</Label>
                    <Input value={tutorInfo?._id || ""} />
                  </TextField>

                  <TextField isReadOnly>
                    <Label>Tutor Name</Label>
                    <Input value={tutorInfo?.destinationName || ""} />
                  </TextField>

                  <TextField isReadOnly>
                    <Label>Student Email</Label>
                    <Input value={user?.email || ""} />
                  </TextField>

                  <TextField>
                    <Label>Phone</Label>
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </TextField>

                  <div className="text-sm font-medium text-gray-600 bg-gray-50 p-2.5 rounded-xl flex justify-between items-center">
                    <span>Available Slots :</span>
                    <span
                      className={`font-bold ${
                        noSlots ? "text-red-500" : "text-indigo-600"
                      }`}
                    >
                      {tutorInfo?.totalSlot}
                    </span>
                  </div>
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
                isDisabled={loading}
                className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-medium"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default StudentBook;