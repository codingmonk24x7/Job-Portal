import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetJobById = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `https://job-portal-2-25ly.onrender.com/api/v1/job/${id}`
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log("Error occured while fetching job details", error);
      }
    };
    fetchJobDetails();
  }, [id, dispatch]);
};
export default useGetJobById;
