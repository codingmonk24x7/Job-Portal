import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import Footer from './shared/Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Jobnotfound from './Jobnotfound';

const Jobs = () => {
    const { authUser } = useSelector((store) => store.auth);
    const { allJobs } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [locationFilter, setLocationFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');
    const [salaryFilter, setSalaryFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let filteredJobs = allJobs;

        // Apply Location Filter
        if (locationFilter) {
            filteredJobs = filteredJobs.filter((job) => job.location?.toLowerCase().includes(locationFilter.toLowerCase()));
        }

        // Apply Title Filter
        if (titleFilter) {
            filteredJobs = filteredJobs.filter((job) => job.title?.toLowerCase().includes(titleFilter.toLowerCase()));
        }

        // Apply Salary Filter
        if (salaryFilter) {
            const [minSalary, maxSalary] = salaryFilter.split(" - ").map((s) => parseInt(s));
            filteredJobs = filteredJobs.filter((job) => {
                const jobSalary = parseInt(job.salary); // Assuming job.salary is a string
                return jobSalary >= minSalary && jobSalary <= maxSalary;
            });
        }

        setFilterJobs(filteredJobs);
    }, [allJobs, locationFilter, titleFilter, salaryFilter]);

    useEffect(() => {
        if (authUser?.role === 'recruiter') {
            navigate("/admin/jobs");
        }
    }, [authUser, navigate]);

    return (
        <div className='bg-gray-100 h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard 
                            setLocationFilter={setLocationFilter} 
                            setTitleFilter={setTitleFilter} 
                            setSalaryFilter={setSalaryFilter} 
                        />
                    </div>
                    {
                        filterJobs.length <= 0 ? <Jobnotfound /> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto no-scrollbar pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs && filterJobs.map((job) => (
                                            <motion.div
                                                key={job._id}
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs;
