"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const MyBookings = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState(null);

  // ---------------- FETCH BOOKINGS ----------------
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:1000/bookSession/${user.email}`
        );

        if (!res.ok) throw new Error("Failed to load bookings");

        const data = await res.json();
        setBookings(data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.email]);

  // ---------------- CANCEL BOOKING ----------------
  const handleCancel = async () => {
    if (!cancelTarget?._id) return;

    try {
      const res = await fetch(
        `http://localhost:1000/cancelBooking/${cancelTarget._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Cancel failed");

      setBookings((prev) =>
        prev.map((b) =>
          b._id === cancelTarget._id
            ? { ...b, status: "cancelled" }
            : b
        )
      );

      toast.success("Booking cancelled.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking");
    } finally {
      setCancelTarget(null);
    }
  };

  const handleCancelClose = () => setCancelTarget(null);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <p className="text-center p-10 text-gray-400">
        Loading...
      </p>
    );
  }

  // ---------------- EMPTY ----------------
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold mb-2">
          No bookings found
        </h3>
        <p className="text-gray-400 text-sm">
          You haven't booked any sessions yet.
        </p>
      </div>
    );
  }

  // ---------------- CONSTANTS (UNCHANGED) ----------------
  const avatarColors = [
    { bg: "#EEEDFE", color: "#3C3489" },
    { bg: "#E1F5EE", color: "#085041" },
    { bg: "#FAECE7", color: "#712B13" },
    { bg: "#E6F1FB", color: "#0C447C" },
  ];

  const statusStyles = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-700" },
    confirmed: { bg: "bg-green-100", text: "text-green-700" },
    cancelled: { bg: "bg-red-100", text: "text-red-600" },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* HEADER (UNCHANGED) */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          My Bookings
        </h1>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: "#EEEDFE", color: "#3C3489" }}
        >
          {bookings.length} sessions
        </span>
      </div>

      {/* TABLE (UNCHANGED DESIGN) */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="min-w-[800px] w-full text-sm border-separate border-spacing-y-1">

          <thead>
            <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <th className="text-left px-5 py-4">#</th>
              <th className="text-left px-5 py-4">Tutor</th>
              <th className="text-left px-5 py-4">Student</th>
              <th className="text-left px-5 py-4">Email</th>
              <th className="text-left px-5 py-4">Status</th>
              <th className="text-left px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {bookings.map((booking, index) => {
              const c = avatarColors[index % avatarColors.length];

              const initials = booking.tutorName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              const s =
                statusStyles[booking.status] ??
                statusStyles.pending;

              const isCancelled =
                booking.status === "cancelled";

              return (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-5 py-4 text-gray-400 font-medium">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 min-w-[180px]">
                      <span className="font-medium text-gray-800 whitespace-nowrap">
                        {booking.tutorName}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {booking.studentName}
                  </td>

                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {booking.studentEmail}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap capitalize ${s.bg} ${s.text}`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      disabled={isCancelled}
                      onClick={() =>
                        !isCancelled && setCancelTarget(booking)
                      }
                      className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold transition whitespace-nowrap
                        ${
                          isCancelled
                            ? "border-gray-200 text-gray-300 cursor-not-allowed"
                            : "border-red-200 text-red-500 hover:bg-red-50"
                        }`}
                    >
                      {isCancelled
                        ? "Cancelled"
                        : "Cancel"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL (UNCHANGED) */}
      {cancelTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl text-center">
            <div className="text-5xl mb-4">🚫</div>

            <h2 className="text-lg font-bold mb-2">
              Cancel Booking?
            </h2>

            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to cancel session with{" "}
              <span className="font-semibold text-gray-700">
                {cancelTarget.tutorName}
              </span>
              ?
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handleCancelClose}
                className="px-5 py-2 rounded-full border text-sm text-gray-500 hover:bg-gray-50"
              >
                Go Back
              </button>

              <button
                onClick={handleCancel}
                className="px-5 py-2 rounded-full text-sm font-semibold text-white"
                style={{ background: "#A32D2D" }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;