'use client';

import DatePickers from '@/Component/DatePickers';
import TutorCard from '@/Component/TutorCard';
import { Button, Input } from '@heroui/react';
import { useEffect, useState } from 'react';

const AllTutorPage = () => {
    const [addTutors, setAddTutors] = useState([]);

    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    useEffect(() => {
        const fetchTutors = async () => {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (startDate) params.append('startDate', startDate.toString());
            if (endDate) params.append('endDate', endDate.toString());

            const res = await fetch(`http://localhost:1000/addTutor?${params}`);
            const data = await res.json();
            setAddTutors(data);
        };

        fetchTutors();
    }, [search, startDate, endDate]);

    return (
        <div>
            <h1 className='text-center font-bold text-xl md:text-2xl my-5'>
                All Tutor
            </h1>

            <div className="flex justify-center items-end gap-6 mb-5 flex-wrap">

                {/* Search */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                        Search Text
                    </label>

                    <Input
                        aria-label="Name"
                        className="w-64"
                        placeholder="Enter Tutor name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Start Date */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                        Start Date
                    </label>
                    <DatePickers value={startDate} onChange={setStartDate} ></DatePickers>
                </div>

                {/* End Date */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                        End Date
                    </label>

                    <DatePickers value={endDate} onChange={setEndDate}></DatePickers>
                </div>

                {/* Button */}
                <div className="flex items-end">
                    <Button className="h-[42px]" onPress={() => { setSearch(''); setStartDate(null); setEndDate(null); }}>
                        Reset Filter
                    </Button>
                </div>

            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                {
                    addTutors.map(addtutor => <TutorCard key={addtutor._id} addtutor={addtutor}></TutorCard>)
                }
            </div>
        </div>
    );
};

export default AllTutorPage;