import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Noida", "Gurugram", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"]
    },
    {
        filterType: "Role",
        array: ["Frontend Developer", "Backend Developer", "Data Science", "Full Stack Developer", "Graphic Designer", "Business Analyst", "Digital Marketer", "IT Consultant", "Sales Engineer"]
    },
    {
        filterType: "Salary",
        array: ["1 - 10 LPA", "10 - 20 LPA", "20 - 50 LPA"]
    },
];

const FilterCard = ({ setLocationFilter, setTitleFilter, setSalaryFilter }) => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    const dispatch = useDispatch();

    const handleLocationChange = (value) => {
        setSelectedLocation(value);
        setLocationFilter(value);
    };

    const handleTitleChange = (value) => {
        setSelectedTitle(value);
        setTitleFilter(value);
    };

    const handleSalaryChange = (event) => {
        setSalaryFilter(event.target.value);
    };

    useEffect(() => {
        dispatch(setSearchText(`${selectedLocation} ${selectedTitle}`.trim()));
    }, [selectedLocation, selectedTitle, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
            </div>
            <hr className='mt-3' />

            {/* Location Filter */}
            <div className='my-4'>
                <h1 className='font-medium text-lg'>Location</h1>
                <RadioGroup value={selectedLocation} onValueChange={handleLocationChange}>
                    {filterData.find(data => data.filterType === "Location").array.map((item, idx) => {
                        const itemId = `loc-${idx}`; // Ensure unique id for each radio button
                        return (
                            <div key={idx} className="flex items-center space-x-2 mt-1">
                                <RadioGroupItem value={item} id={itemId} />
                                <Label htmlFor={itemId}>{item}</Label>
                            </div>
                        );
                    })}
                </RadioGroup>
            </div>

            {/* Role Filter */}
            <div className='my-4'>
                <h1 className='font-medium text-lg'>Role</h1>
                <RadioGroup value={selectedTitle} onValueChange={handleTitleChange}>
                    {filterData.find(data => data.filterType === "Role").array.map((item, idx) => {
                        const itemId = `role-${idx}`; // Ensure unique id for each radio button
                        return (
                            <div key={idx} className="flex items-center space-x-2 mt-1">
                                <RadioGroupItem value={item} id={itemId} />
                                <Label htmlFor={itemId}>{item}</Label>
                            </div>
                        );
                    })}
                </RadioGroup>
            </div>

            {/* Salary Filter */}
            <div className='my-4'>
                <h1 className='font-medium text-lg'>Salary</h1>
                <select onChange={handleSalaryChange} className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                    <option value="">Select Salary Range</option>
                    {filterData.find(filter => filter.filterType === "Salary").array.map((salary, index) => (
                        <option key={index} value={salary}>{salary}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterCard;

