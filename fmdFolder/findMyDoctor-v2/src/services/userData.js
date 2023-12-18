import axios from "axios";
import { useNavigate } from "react-router-dom";
import TokenService from "./token.service";
import { baseUrl } from "./baseUrl";

const UserData = () => {
  const { getToken, rememberGet } = TokenService();
  const navigate = useNavigate();
  // const baseUrl = 'https://fmd.arraydigitals.com/api';

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    maxBodyLength: Infinity
  });



  // Function to fetch the token
  const fetchToken = async () => {
    const token = await getToken(rememberGet());
    return token
    // return token?.slice(1, -1);
  };

  // Add request interceptor
  axiosInstance.interceptors.request.use(
    async (config) => {
      // Fetch the token dynamically before sending the request
      const newToken = await fetchToken();
      config.headers['Authorization'] = `Bearer ${newToken}`;
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Process successful responses
      return response;
    },
    (error) => {
      // Handle response error
      // if (error.response.status === 401) {
        // Redirect to the login page or perform any desired logic
        // navigate("/login");
      // }
      console.log(error,'error');
      return Promise.reject(error);
    }
  );

  //Update USER DATA
  const patchUserData = (data) => {
    return axiosInstance.patch(`${baseUrl}/users/update-data`, data);
  };

  // USER META DATA STARTS
  // Post UserMetaData
  const postUserMeta = (data) => {
    return axiosInstance.post(`${baseUrl}/user-meta/create`, data);
  };

  // Update UserMetaData
  const updateUserMeta = (data) => {
    return axiosInstance.patch(`${baseUrl}/user-meta/update`, data);
  };

  // Get UserMetaData
  const getUserData = (data) => {
    return axiosInstance.get(`${baseUrl}/user-meta/${data}`);
  };

  // Add USER Beneficiary
  const postBeneficiary = (data) => {
    return axiosInstance.post(`${baseUrl}/beneficiaries/create-beneficiaries`, data);
  };

  // Get Single Beneficiary
  const getSingleBeneficiaryApi = (id) =>{
    return axiosInstance.get(`${baseUrl}/beneficiaries/${id}`)
  }
  // Get USER Beneficiary
  const getBeneficiary = () => {
    return axiosInstance.get(`${baseUrl}/beneficiaries/`);
  };

  // Delete USER Beneficiary
  const deleteBeneficiaryAPI = (data) => {
    return axiosInstance.delete(`${baseUrl}/beneficiaries/delete`, { data });
  };

  // Update User Password
  const updatePassword = (data) => {
    return axiosInstance.patch(`${baseUrl}/users/update-pass`, data);
  };
  // My Lab Booking Active
  const LabBookingsActive = () => {
    return axiosInstance.get(`${baseUrl}/booking-lab/my-bookings`);
  };
  
  // My Lab Booking History
  const LabBookingsHistory = () => {
    return axiosInstance.get(`${baseUrl}/booking-lab/my-history`);
  };
  // My Lab Booking Details
  const LabBookingDetails = (id) => {
    return axiosInstance.get(`${baseUrl}/booking-lab/my-booking-details/${id}`);
  };
  // My Doctor Booking Details
  const DoctorBookingDetails = (id) => {
    return axiosInstance.get(`${baseUrl}/appointments/doctor/details/${id}`);
  };

  // My Lab Booking History
  const DoctorBookingsHistory = () => {
    return axiosInstance.get(`${baseUrl}/appointments/doctor/my-history/`);
  };
  // My Lab Booking History
  const DoctorBookingActive = () => {
    return axiosInstance.get(`${baseUrl}/appointments/doctor/my-active/`);
  };
  // Add USER Review
  const postReview = (data) => {
    return axiosInstance.post(`${baseUrl}/reviews/`, data);
  };

  //see user Prescription
  const getReviewUser = id =>{
    return axiosInstance.get(`${baseUrl}/prescriptions/user/${id}`)
  }


  return {
    getReviewUser,
    DoctorBookingsHistory,
    DoctorBookingActive,
    getUserData,
    LabBookingsActive,
    getSingleBeneficiaryApi,
    LabBookingsHistory,
    patchUserData,
    LabBookingDetails,
    DoctorBookingDetails,
    postBeneficiary,
    getBeneficiary,
    postUserMeta,
    updatePassword,
    updateUserMeta,
    postReview,
    deleteBeneficiaryAPI,
  };
};

export default UserData;