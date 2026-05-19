import React from 'react';

const MybookedSessionPage = async() => {
    const res = await fetch('http://localhost:1000/bookSession');
    const bookData = await res.json()
    console.log(bookData)

    return (
        <div>
            <h1>how to do</h1>
        </div>
    );
};

export default MybookedSessionPage;