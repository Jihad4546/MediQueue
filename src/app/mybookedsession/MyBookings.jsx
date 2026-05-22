"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const token = session?.session?.token;

  useEffect(() => {
    if (isPending) return;
    if (!user?.email) {
      setLoading(false);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookSession/${user.email}`, {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setBookings(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load bookings");
        setLoading(false);
      });
  }, [user?.email, isPending]);

  const handleCancel = async () => {
    if (!cancelTarget?._id) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/cancelBooking/${cancelTarget._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === cancelTarget._id ? { ...b, bookStatus: "cancelled" } : b
          )
        );
        toast.success("Booking cancelled.");
      } else {
        toast.error("Failed to cancel");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setCancelTarget(null);
    }
  };

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400",
    confirmed: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
    cancelled: "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  };

  if (loading)
    return (
      <p className="text-center p-10 text-gray-400 dark:text-gray-500">Loading...</p>
    );

  if (bookings.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          No bookings found
        </h3>
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          You haven't booked any sessions yet.
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-gray-900 dark:text-gray-100">

      {/* ── Page Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          My Bookings
        </h1>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          {bookings.length} sessions
        </span>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden-on-mobile overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <style>{`
          .hidden-on-mobile { display: none; }
          @media (min-width: 768px) { .hidden-on-mobile { display: block; } }
          .hidden-on-desktop { display: flex; flex-direction: column; gap: 1rem; }
          @media (min-width: 768px) { .hidden-on-desktop { display: none; } }
        `}</style>

        <table className="w-full text-sm text-center border-separate border-spacing-y-1" style={{ minWidth: "800px" }}>
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th className="text-left px-5 py-4">#</th>
              <th className="text-left px-5 py-4">Tutor</th>
              <th className="text-left px-5 py-4">Student</th>
              <th className="text-left px-5 py-4">Email</th>
              <th className="text-left px-5 py-4">Status</th>
              <th className="text-left px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              const currentStatusClass =
                statusStyles[booking.bookStatus] ?? statusStyles.pending;
              const isCancelled = booking.bookStatus === "cancelled";
              return (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition duration-200"
                >
                  <td className="px-5 py-4 text-gray-400 dark:text-gray-500 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    {booking.tutorName}
                  </td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {booking.studentName}
                  </td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {booking.studentEmail}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${currentStatusClass}`}>
                      {booking.bookStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      disabled={isCancelled}
                      onClick={() => !isCancelled && setCancelTarget(booking)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition whitespace-nowrap
                        ${isCancelled
                          ? "border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed"
                          : "cursor-pointer border-red-200 dark:border-red-900/60 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                        }`}
                    >
                      {isCancelled ? "Cancelled" : "Cancel"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Cards ── */}
      <div className="hidden-on-desktop">
        {bookings.map((booking, index) => {
          const currentStatusClass =
            statusStyles[booking.bookStatus] ?? statusStyles.pending;
          const isCancelled = booking.bookStatus === "cancelled";
          return (
            <div
              key={booking._id}
              className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                    #{index + 1}
                  </span>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    {booking.tutorName}
                  </h3>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize whitespace-nowrap shrink-0 ${currentStatusClass}`}>
                  {booking.bookStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500 font-medium mb-0.5">
                    Student
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {booking.studentName}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500 font-medium mb-0.5">
                    Email
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {booking.studentEmail}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  disabled={isCancelled}
                  onClick={() => !isCancelled && setCancelTarget(booking)}
                  className={`w-full rounded-full border py-2 text-xs font-semibold transition
                    ${isCancelled
                      ? "border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed"
                      : "cursor-pointer border-red-200 dark:border-red-900/60 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                    }`}
                >
                  {isCancelled ? "Cancelled" : "Cancel Booking"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Cancel Modal ── */}
      {cancelTarget && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-xl text-center border border-gray-100 dark:border-gray-800">
            <div className="text-5xl mb-4">🚫</div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Cancel Booking?
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
              Are you sure you want to cancel session with{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {cancelTarget.tutorName}
              </span>
              ?
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setCancelTarget(null)}
                className="px-5 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Go Back
              </Button>
              <Button
                onClick={handleCancel}
                className="px-5 py-2 rounded-full text-sm font-semibold text-white transition bg-red-600 hover:bg-red-700"
              >
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;