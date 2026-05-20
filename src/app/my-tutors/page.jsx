    "use client";

    import { useEffect, useState } from "react";
    import { authClient } from "@/lib/auth-client";
    import { toast } from "react-toastify";
import { Button } from "@heroui/react";

    const MyTutor = () => {
        const { data: session } = authClient.useSession();
        const user = session?.user;

        const [tutors, setTutors] = useState([]);
        const [loading, setLoading] = useState(true);
        const [selectedTutor, setSelectedTutor] = useState(null);
        const [deleteTarget, setDeleteTarget] = useState(null);
        const [updateForm, setUpdateForm] = useState({});

        // ── Fetch tutors by logged-in user email ──
        useEffect(() => {
            if (user?.email) {
                fetch(`http://localhost:1000/myTutors/${user.email}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setTutors(data);
                        setLoading(false);
                    });
            }
        }, [user?.email]);

        // ── Open update modal pre-filled ──
        const handleUpdateOpen = (tutor) => {
            setSelectedTutor(tutor);
            setUpdateForm({ ...tutor });
        };

        // ── Save updated tutor (reflects immediately) ──
        // ── Save updated tutor ──
        const handleUpdateSave = async () => {
            if (!selectedTutor?._id) return; // ← এই line যোগ করো

            const res = await fetch(`http://localhost:1000/updateTutor/${selectedTutor._id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(updateForm),
            });
            const updated = await res.json();
            if (updated) {
                setTutors((prev) =>
                    prev.map((t) => (t._id === selectedTutor._id ? { ...t, ...updateForm } : t))
                );
                setSelectedTutor(null);
                toast.success("Tutor updated successfully!");
            }
        };

        // ── Delete tutor ──
        const handleDelete = async () => {
            if (!deleteTarget?._id) return; // ← এই line যোগ করো

            await fetch(`http://localhost:1000/deleteTutor/${deleteTarget._id}`, {
                method: "DELETE",
            });
            setTutors((prev) => prev.filter((t) => t._id !== deleteTarget._id));
            setDeleteTarget(null);
            toast.success("Tutor deleted.");
        };



        // ── Loading ──
        if (loading)
            return <p className="text-center p-10 text-gray-400">Loading...</p>;

        // ── Empty State ──
        if (tutors.length === 0)
            return (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-xl font-semibold mb-2">No tutors found</h3>
                    <p className="text-gray-400 text-sm">
                        You haven't created any tutor profiles yet.
                    </p>
                </div>
            );

        const avatarColors = [
            { bg: "#EEEDFE", color: "#3C3489" },
            { bg: "#E1F5EE", color: "#085041" },
            { bg: "#FAECE7", color: "#712B13" },
            { bg: "#E6F1FB", color: "#0C447C" },
        ];

        return (
            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* ── Page Header ── */}
                <div className="flex items-center gap-3 mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My Tutors</h1>
                    <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: "#EEEDFE", color: "#3C3489" }}
                    >
                        {tutors.length} tutors
                    </span>
                </div>

                {/* ── Table ── */}
                <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
  <table className="min-w-[900px] w-full text-sm border-separate border-spacing-y-2">

    {/* Head */}
    <thead>
      <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
        <th className="text-left px-4 py-4">#</th>
        <th className="text-left px-4 py-4">Tutor</th>
        <th className="text-left px-4 py-4">Category</th>
        <th className="text-left px-4 py-4">Price</th>
        <th className="text-left px-4 py-4">Location</th>
        <th className="text-left px-4 py-4">Mode</th>
        <th className="text-left px-4 py-4">Actions</th>
      </tr>
    </thead>

    {/* Body */}
    <tbody className="text-left">
      {tutors.map((tutor, index) => {
        const c = avatarColors[index % avatarColors.length];

        const initials = tutor.destinationName
          ?.split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        return (
          <tr
            key={tutor._id}
            className="hover:bg-gray-50 transition duration-200"
          >
            {/* Serial */}
            <td className="px-4 py-4 text-gray-500 font-medium">
              {index + 1}
            </td>

            {/* Tutor */}
            <td className="px-4 py-4 min-w-[220px]">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold flex-shrink-0"
                  style={{ background: c.bg, color: c.color }}
                >
                  {initials}
                </div>
                <span className="font-medium text-gray-800 whitespace-nowrap">
                  {tutor.destinationName}
                </span>
              </div>
            </td>

            {/* Category */}
            <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
              {tutor.category}
            </td>

            {/* Price */}
            <td className="px-4 py-4 font-semibold text-gray-800 whitespace-nowrap">
              ৳{tutor.price}/hr
            </td>

            {/* Location */}
            <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
              {tutor.location}
            </td>

            {/* Mode */}
            <td className="px-4 py-4">
              <span className="rounded-md bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 whitespace-nowrap">
                {tutor.teachingMode}
              </span>
            </td>

            {/* Actions */}
            <td className="px-4 py-4 min-w-[180px]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateOpen(tutor)}
                  className="rounded-full border border-blue-200 px-4 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 whitespace-nowrap"
                >
                  Update
                </button>
                <button
                  onClick={() => setDeleteTarget(tutor)}
                  className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 whitespace-nowrap"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>

  </table>
</div>

                {/* ════════════════════════════════
            UPDATE MODAL
            ════════════════════════════════ */}
                {selectedTutor && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Update Tutor</h2>
                            <p className="text-sm text-gray-400 mb-6">
                                Edit the details and save changes.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
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
                                    <div key={key} className={key === "imageUrl" ? "col-span-2" : ""}>
                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                            {label}
                                        </label>
                                        <input
                                            type={type}
                                            value={updateForm[key] || ""}
                                            onChange={(e) =>
                                                setUpdateForm({ ...updateForm, [key]: e.target.value })
                                            }
                                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-300"
                                        />
                                    </div>
                                ))}

                                {/* Category Select */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={updateForm.category || ""}
                                        onChange={(e) =>
                                            setUpdateForm({ ...updateForm, category: e.target.value })
                                        }
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-300"
                                    >
                                        {["Ict", "Mathematics", "Physics", "Chemistry", "Biology", "English"].map(
                                            (c) => (
                                                <option key={c} value={c}>{c}</option>
                                            )
                                        )}
                                    </select>
                                </div>

                                {/* Teaching Mode Select */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        Teaching Mode
                                    </label>
                                    <select
                                        value={updateForm.teachingMode || ""}
                                        onChange={(e) =>
                                            setUpdateForm({ ...updateForm, teachingMode: e.target.value })
                                        }
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-300"
                                    >
                                        {["Online", "Offline", "Both"].map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 mb-3 border-t border-gray-100">
                                <Button
                                    onClick={() => setSelectedTutor(null)}
                                    variant="outline"
                                    className="text-sm px-5 py-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleUpdateSave}
                                    className="text-sm px-5 py-2 rounded-full text-white font-semibold"
                                    style={{ background: "#185FA5" }}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ════════════════════════════════
            DELETE CONFIRMATION MODAL
            ════════════════════════════════ */}
                {deleteTarget && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl text-center">
                            <div className="text-5xl mb-4">🗑️</div>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">Delete Tutor?</h2>
                            <p className="text-sm text-gray-400 mb-6">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold text-gray-700">
                                    {deleteTarget.destinationName}
                                </span>
                                ? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setDeleteTarget(null)}
                                    className="px-5 py-2 rounded-full border border-gray-200 text-sm text-gray-500 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-5 py-2 rounded-full text-sm font-semibold text-white"
                                    style={{ background: "#A32D2D" }}
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    export default MyTutor;