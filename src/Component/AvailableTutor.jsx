import { Card, Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import TutorCard from './TutorCard';

const AvailableTutor = async () => {
    const res = await fetch(`http://localhost:1000/addTutor?limit=6`);
    const addTutors = await res.json();
    
    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-center font-bold text-2xl sm:text-3xl mb-8 text-gray-800'>
                Available Tutors
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                
                   
                {
                    addTutors.map((addtutor) => (
                        <TutorCard
                            key={addtutor._id}
                            addtutor={addtutor}
                        />
                    ))
                }
                    
            </div>
        </div>
    );
};

export default AvailableTutor;