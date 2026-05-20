"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const MyBooking = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:1000/bookSession/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;
    await fetch(`http://localhost:1000/bookSession/${id}`, { method: "DELETE" });
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  if (loading) return <p className="text-center p-10 text-gray-400">Loading...</p>;

  if (bookings.length === 0) return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="text-6xl mb-4">📭</div>
      <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
      <p className="text-gray-400 text-sm">You haven't booked any sessions yet.</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Booked Sessions</h1>
        <span className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: "#EEEDFE", color: "#3C3489" }}>
          {bookings.length} sessions
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {bookings.map((booking, index) => {
          const initials = booking.tutorName
            ?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
          const colors = [
            { bg: "#EEEDFE", color: "#3C3489" },
            { bg: "#E1F5EE", color: "#085041" },
            { bg: "#FAECE7", color: "#712B13" },
            { bg: "#E6F1FB", color: "#0C447C" },
          ];
          const c = colors[index % colors.length];

          return (
            <div key={booking._id}
              className="bg-white rounded-2xl p-5 flex items-center justify-between gap-6"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #F3F3F3" }}>

              {/* Avatar + Tutor */}
              <div className="flex items-center gap-3 w-48 flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                  style={{ background: c.bg, color: c.color }}>
                  {initials}
                </div>
                <div>
                  <p className="text-[14px] text-gray-500">Tutor</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{booking.tutorName}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-gray-100 flex-shrink-0" />

              {/* Student */}
              <div className="w-28 flex-shrink-0">
                <p className="text-[14px] text-gray-500">Student</p>
                <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-gray-100 flex-shrink-0" />

              {/* Email */}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-gray-500">Email</p>
                <p className="text-sm text-gray-600 truncate">{booking.studentEmail}</p>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-gray-100 flex-shrink-0" />

              {/* Status */}
              <div className="flex-shrink-0">
                <p className="text-xs text-gray-400 mb-1">Status</p>
                <span className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "#EAF3DE", color: "#27500A" }}>
                  ✓ {booking.bookStatus}
                </span>
              </div>

              {/* Cancel */}
              <button
                onClick={() => handleCancel(booking._id)}
                className="flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-colors hover:bg-red-50"
                style={{ border: "1px solid #F09595", color: "#A32D2D" }}>
                Cancel
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBooking;