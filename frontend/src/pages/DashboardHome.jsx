import React, { useEffect, useState } from 'react';

import axios from 'axios';

const DashboardHome = () => {

    const [totalStd, setTotalStudent] = useState(0);

    const [totalFood, setTotalFood] = useState(0);

    const [totalDistribution, setTotalDistribution] = useState(0);


    useEffect(() => {

        const handleCount = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/totalcounts`, {
                    headers: {
                        token: JSON.parse(localStorage.getItem('token')),
                    }
                });
                setTotalStudent(res.data.students);
                setTotalFood(res.data.foods);
                setTotalDistribution(res.data.distributions);
            } catch (error) {
                console.error(error);
            }
        }

        handleCount();

    }, [])

    return (
        <>
            <section>
                <div className="flex gap-16">
                    <div className="card w-1/3 hover:bg-orange-500 bg-orange-400 py-10 px-3 rounded shadow">
                        <h4 className="text-2xl font-bold text-white">Total Student</h4>
                        <h4 className="text-2xl font-bold text-white">{totalStd}</h4>
                    </div>
                    <div className="card w-1/3 hover:bg-green-500 bg-green-400 py-10 px-3 rounded shadow">
                        <h4 className="text-2xl font-bold text-white">Total Food item</h4>
                        <h4 className="text-2xl font-bold text-white">{totalFood}</h4>
                    </div>
                    <div className="card w-1/3 hover:bg-amber-500 bg-amber-400 py-10 px-3 rounded shadow">
                        <h4 className="text-2xl font-bold text-white">Total Distribution</h4>
                        <h4 className="text-2xl font-bold text-white">{totalDistribution}</h4>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DashboardHome;