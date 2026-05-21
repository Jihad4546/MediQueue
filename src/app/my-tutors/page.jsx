"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";

const MyTutor = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [updateForm, setUpdateForm] = useState({});

  useEffect(() => {
    if (isPending) return;

    if (user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/myTutors/${user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          setTutors(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.email, isPending]);

  const handleUpdateOpen = (tutor) => {
    setSelectedTutor(tutor);
    setUpdateForm({ ...tutor });
  };

  const handleUpdateSave = async () => {
    if (!selectedTutor?._id) return;
      
        const {data:tokenData} = await authClient.token()
        console.log(tokenData)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/updateTutor/${selectedTutor._id}`,
        {
          method: "PUT",
          headers: { 
            "content-type": "application/json" , 
            authorization:`Bearer ${tokenData?.token}`},
          body: JSON.stringify(updateForm),
        }
      );
      const updated = await res.json();
      if (updated.success || updated) {
        setTutors((prev) =>
          prev.map((t) =>
            t._id === selectedTutor._id ? { ...t, ...updateForm } : t
          )
        );
        setSelectedTutor(null);
        toast.success("Tutor updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;
      const { data: tokenData } = await authClient.token();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/deleteTutor/${deleteTarget._id}`, {
        method: "DELETE",
        headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      });
      setTutors((prev) => prev.filter((t) => t._id !== deleteTarget._id));
      setDeleteTarget(null);
      toast.success("Tutor deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete.");
    }
  };

  const handleUpdateCancel = () => setSelectedTutor(null);
  const handleDeleteCancel = () => setDeleteTarget(null);

  if (loading)
    return <p className="text-center p-10 text-gray-400 dark:text-gray-500">Loading...</p>;

  if (tutors.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">No tutors found</h3>
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          You haven't created any tutor profiles yet.
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-gray-900 dark:text-gray-100">

      {/* ── Page Header ── */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tutors</h1>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
        >
          {tutors.length} tutors
        </span>
      </div>

      {/* ── Table Container ── */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <table className="min-w-[800px] w-full text-sm border-separate border-spacing-y-1">

          {/* Head */}
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th className="text-left px-5 py-4 rounded-tl-2xl">#</th>
              <th className="text-left px-5 py-4">Tutor</th>
              <th className="text-left px-5 py-4">Category</th>
              <th className="text-left px-5 py-4">Price</th>
              <th className="text-left px-5 py-4">Location</th>
              <th className="text-left px-5 py-4">Mode</th>
              <th className="text-left px-5 py-4 rounded-tr-2xl">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {tutors.map((tutor, index) => (
              <tr
                key={tutor._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition duration-200"
              >
                {/* Serial */}
                <td className="px-5 py-4 text-gray-400 dark:text-gray-500 font-medium">
                  {index + 1}
                </td>

                {/* Tutor */}
                <td className="px-5 py-4">
                  <span className="font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    {tutor.destinationName}
                  </span>
                </td>

                {/* Category */}
                <td className="px-5 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {tutor.category}
                </td>

                {/* Price */}
                <td className="px-5 py-4 font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                  ৳{tutor.price}/hr
                </td>

                {/* Location */}
                <td className="px-5 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {tutor.location}
                </td>

                {/* Mode */}
                <td className="px-5 py-4">
                  <span className="rounded-full bg-green-100 dark:bg-green-950/40 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400 whitespace-nowrap">
                    {tutor.teachingMode}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleUpdateOpen(tutor)}
                      className="rounded-full border border-blue-200 dark:border-blue-800 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 transition hover:bg-blue-50 dark:hover:bg-blue-950/30 whitespace-nowrap"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDeleteTarget(tutor)}
                      className="rounded-full border border-red-200 dark:border-red-900 px-4 py-1.5 text-xs font-semibold text-red-500 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-950/30 whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── UPDATE MODAL ── */}
      {selectedTutor && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Update Tutor</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
              Edit the details and save changes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Name", key: "destinationName" },
                { label: "Image URL", key: "imageUrl" },
                { label: "Price (৳/hr)", key: "price", type: "number" },
                { label: "Available Days", key: "availableDays" },
                { label: "Time Slot", key: "availableTimeSlot" },
                { label: "Institution", key: "institution" },
                { label: "Experience", key: "experience" },
                { label: "Location", key: "location" },
                { label: "Total Slots", key: "totalSlot", type: "number" },
              ].map(({ label, key, type = "text" }) => (
                <div key={key} className={key === "imageUrl" ? "col-span-1 sm:col-span-2" : ""}>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={updateForm[key] || ""}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, [key]: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500"
                  />
                </div>
              ))}

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Category
                </label>
                <select
                  value={updateForm.category || ""}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, category: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-blue-400"
                >
                  {["Ict", "Mathematics", "Physics", "Chemistry", "Biology", "English"].map(
                    (c) => <option key={c} value={c}>{c}</option>
                  )}
                </select>
              </div>

              {/* Teaching Mode */}
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Teaching Mode
                </label>
                <select
                  value={updateForm.teachingMode || ""}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, teachingMode: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-blue-400"
                >
                  {["Online", "Offline", "Both"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              <Button
                onClick={handleUpdateCancel}
                className="text-sm px-5 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateSave}
                className="text-sm px-5 py-2 rounded-full text-white font-semibold transition bg-blue-600 hover:bg-blue-700"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE MODAL ── */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-sm shadow-xl text-center border border-gray-100 dark:border-gray-800">
            <div className="text-5xl mb-4">🗑️</div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete Tutor?</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {deleteTarget.destinationName}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleDeleteCancel}
                className="px-5 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="px-5 py-2 rounded-full text-sm font-semibold text-white transition bg-red-600 hover:bg-red-700"
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTutor;