'use client';

import DatePickers from '@/Component/DatePickers';
import TutorCard from '@/Component/TutorCard';
import { Button, Input, Spinner } from '@heroui/react';
import { useEffect, useState } from 'react';

const AllTutorPage = () => {
    const [addTutors, setAddTutors] = useState([]);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTutors = async () => {
            setLoading(true);
            const params = new URLSearchParams();

            if (search.trim()) params.append('search', search);

            // 📝 ডেট অবজেক্ট বা স্ট্রিং যাই আসুক, নিরাপদে YYYY-MM-DD ফরম্যাট করার ফাংশন
            const formatDate = (dateVal) => {
                if (!dateVal) return null;
                // যদি HeroUI এর নিজস্ব CalendarDate অবজেক্ট হয় (যাতে .toString() থাকে)
                const dateStr = dateVal.toString();
                const parsed = Date.parse(dateStr);
                if (!isNaN(parsed)) {
                    return new Date(parsed).toISOString().split("T")[0];
                }
                return null;
            };

            const formattedStart = formatDate(startDate);
            const formattedEnd = formatDate(endDate);

            if (formattedStart) params.append('startDate', formattedStart);
            if (formattedEnd) params.append('endDate', formattedEnd);

            try {
                // ✅ এই দুই লাইন যোগ করো

                const res = await fetch(`http://localhost:1000/addTutor?${params.toString()}`);
                const data = await res.json();
                setAddTutors(data);
            } catch (error) {
                console.error("Error fetching tutors:", error);
            }
            finally {
                setLoading(false);
            }
        };

        // একটি ছোট Debounce বা ট্রিপল ডিপেন্ডেন্সি লজিক
        fetchTutors();
    }, [search, startDate, endDate]);

    // 🔄 ফিল্টার সম্পূর্ণ ক্লিয়ার করার ফাংশন
    const handleReset = () => {
        setSearch('');
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <div className="p-4 md:p-8">
            <h1 className='text-center font-bold text-xl md:text-3xl my-6 text-gray-800 dark:text-white'>
                All Tutors
            </h1>

            {/* ফিল্টার সেকশন */}
            <div className="flex flex-wrap justify-center items-end gap-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl max-w-5xl mx-auto shadow-sm">

                {/* Search input */}
                <div className="flex flex-col gap-1  sm:w-64">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Search Tutor
                    </label>
                    <Input
                        aria-label="Search by Name"
                        placeholder="Enter tutor name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        isClearable

                    />
                </div>

                {/* Start Date */}
                <div className="flex flex-col gap-1  sm:w-auto">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Start Date
                    </label>
                    {/* ভ্যালু নাল থাকলেও যাতে ক্র্যাশ না করে তার জন্য key প্রপ ব্যবহার করা হয়েছে */}
                    <DatePickers key={startDate ? startDate.toString() : 'start'} value={startDate} onChange={setStartDate} />
                </div>

                {/* End Date */}
                <div className="flex flex-col gap-1  sm:w-auto">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        End Date
                    </label>
                    <DatePickers key={endDate ? endDate.toString() : 'end'} value={endDate} onChange={setEndDate} />
                </div>

                <div className=" sm:w-auto">
                    <Button
                        color="danger"
                        variant="outline"
                        className="h-[40px] w-full sm:w-auto font-medium"
                        onPress={handleReset}
                    >
                        Reset Filter
                    </Button>
                </div>

            </div>


            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Spinner size="lg" />
                </div>
            ) : addTutors.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    No tutors match your search criteria.
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                    {addTutors.map(addtutor => (
                        <TutorCard key={addtutor._id} addtutor={addtutor} />
                    ))}
                </div>
            )}

        </div>
    );
};

export default AllTutorPage;