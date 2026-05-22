'use client';

import DatePickers from '@/Component/DatePickers';
import TutorCard from '@/Component/TutorCard';
import { Button, Spinner } from '@heroui/react'; // ✅ Input বাদ
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

            const formatDate = (dateVal) => {
                if (!dateVal) return null;
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
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addTutor?${params.toString()}`);
                const data = await res.json();
                setAddTutors(Array.isArray(data) ? data : data.data ?? []);
            } catch (error) {
                console.error("Error fetching tutors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTutors();
    }, [search, startDate, endDate]);

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

            <div className="flex flex-wrap justify-center items-end gap-4 bg-gray-50 dark:bg-zinc-900 p-5 rounded-2xl max-w-5xl mx-auto shadow-sm">

                {/* ✅ HeroUI Input বাদ, plain HTML input */}
                <div className="flex flex-col gap-1 sm:w-64">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Search Tutor
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter tutor name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Start Date */}
                <div className="flex flex-col gap-1 sm:w-auto">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Start Date
                    </label>
                    <DatePickers key={startDate ? startDate.toString() : 'start'} value={startDate} onChange={setStartDate} />
                </div>

                {/* End Date */}
                <div className="flex flex-col gap-1 sm:w-auto">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        End Date
                    </label>
                    <DatePickers key={endDate ? endDate.toString() : 'end'} value={endDate} onChange={setEndDate} />
                </div>

                <div className="sm:w-auto">
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
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8'>
                    {addTutors.map(addtutor => (
                        <TutorCard key={addtutor._id} addtutor={addtutor} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllTutorPage;