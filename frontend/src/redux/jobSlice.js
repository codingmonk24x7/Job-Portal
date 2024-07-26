import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: null,
        singleJob: null,
        singleJobById: null,
        searchText: "", 
        apply: false,
        adminJobs: null,
        searchAdminJobs: ""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setSingleJobById: (state, action) => {
            state.singleJobById = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setApply: (state, action) => {
            state.apply = action.payload;
        },
        setAdminJobs: (state, action) => {
            state.adminJobs = action.payload;
        },
        setSearchAdminJobs: (state, action) => {
            state.searchAdminJobs = action.payload;
        }
    }
});
export const {
    setAllJobs,
    setSingleJob,
    setSingleJobById,
    setSearchText,
    setApply,
    setAdminJobs,
    setSearchAdminJobs,
} = jobSlice.actions;
export default jobSlice.reducer;