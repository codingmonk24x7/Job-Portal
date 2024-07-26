import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import useGetJobById from '@/hooks/useGetJobById';
import { ArrowLeft } from 'lucide-react';

const UpdateJob = () => {
    const params = useParams();
    useGetJobById(params.id); // Fetching job by ID

    const { singleJob } = useSelector(store => store.job);

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validation Check
        if (!input.title || !input.description || !input.requirements || !input.salary || !input.location || !input.jobType || !input.experience || !input.position) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const res = await axios.put(`http://localhost:4000/api/v1/job/update/${params.id}`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        setInput({
            title: singleJob?.title || "",
            description: singleJob?.description || "",
            requirements: singleJob?.requirements || "",
            salary: singleJob?.salary || "",
            location: singleJob?.location || "",
            jobType: singleJob?.jobType || "",
            experience: singleJob?.experienceLevel || "",
            position: singleJob?.position || 0,
        });
    }, [singleJob]);

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler} className='shadow-lg p-8'>
                    <div className='flex items-center gap-5 mb-10'>
                        <Button variant="ghost" onClick={() => navigate("/admin/jobs")} className='flex items-center gap-2 text-gray-500 font-semibold'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Update Job</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary <span className='text-xs text-gray-500'>(in LPA)</span></Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Experience Level <span className='text-xs text-gray-500'>(in years)</span></Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input
                                type='number'
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                    </div>
                    <Button type="submit" className='w-full mt-8'>Update Job</Button>
                </form>
            </div>
        </div>
    );
}

export default UpdateJob;
