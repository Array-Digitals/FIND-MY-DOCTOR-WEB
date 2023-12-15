import axios from 'axios'
import TokenService from './tokenService';
import { baseUrl } from "./baseUrl";


const AdminService = () => {
    const { getToken } = TokenService();
    // const baseUrl = 'https://fmd.arraydigitals.com/api';
    const token = getToken()
    let newToken = token?.slice(1, -1);

    const doctorTypeUpdate = (data) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctor-types/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const updateUserDetails = (data) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/users/update-data`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const updateUserMeta = (data) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/user-meta/update`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }

    const deleteTest = (data) =>{
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/lab-tests`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const getSingleAdmin = (id) =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/users/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const getUserMeta = (id) =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/user-meta/${id}`,
            // headers: {
            //     'Authorization': `Bearer ${newToken}`,
            //     'Content-Type': 'application/json'
            // },
        };
        return axios.request(config)
    }

    const doctorRegister = (data) => {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/register`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const getDoctor = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/`,
        };
        return axios.request(config)
    }
    const getDoctorSingle = (doctorId) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/${doctorId}`,
        };
        return axios.request(config)
    }
    const doctorUpdate = (data) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/update-doctor`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const deleteDoctor = (data) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const getSpecilistCategory = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/specialist-categories`,
        };
        return axios.request(config)
    }
    const getSingleSpecialistCategory = (id) =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/specialist-categories/${id}`,
        };
        return axios.request(config)
    }
    const deleteSpecialistCategory = (data) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/specialist-categories`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const addSpecilitY = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/specialist-categories`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const patchSpecilitY = (data) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/specialist-categories/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const getDoctorType = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctor-types`,
        };
        return axios.request(config)
    }
    const addDoctorType = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctor-types`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const deleteDoctorType = (data) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctor-types`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }

    //Lab APIS
    const labRegister = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/labs/create`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const getLab = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/labs/`,
        };
        return axios.request(config)
    }
    const labUpdate = (data) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/labs/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const deleteLab = (data) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/labs/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }

    const getTestByLab = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/lab/test/lab/${id}`,
        };
        return axios.request(config)
    }

    const getSingleLab = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/labs/${id}`,
        };
        return axios.request(config)
    }
    const testRegister = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/lab-tests`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const testToLabRegister = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/lab/test`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const doctorBookingModification = (data) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/booking-modification/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }


    const doctorActiveBookingApi = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/doctor/all-active/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const doctorHistoryBookingApi = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/doctor/all-history/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }


    const getAllTest = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/lab-tests/`,
        };
        return axios.request(config)
    }

    const postConsultation = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/consultation-type/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const postAssitant = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/labs/add-lab-assistant/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const getAllCities = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/cities/`,
        };
        return axios.request(config)
    }
    const getSingleCity = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/cities/${id}`,
        };
        return axios.request(config)
    }
    const getAllCity = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/cities/`,
        };
        return axios.request(config)
    }
    const getAppointmentDetailsLab = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/lab/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const getAppointmentHistoryOrders = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/lab-history/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }

    const getTestAssign = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/all-lab-appointment/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const getTestAssignHistory = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/all-lab-history/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const getAllAssitant = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/all-labortionist/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const labBookingDetails = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/booking-lab/my-booking-details/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const postAssignBooking = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/assign-lab-test/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }

    const postUploadLabReport = (bookId, testId, data) => {
        console.log(bookId, testId, data, 'notTest');
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/upload-report/${bookId}/${testId}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'multipart/form-data'
            },
            data: data
        };

        return axios.request(config)
    }

    const getAllCategories = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctor-types`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const getDoctorBookingDiscusion = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/doctor/details/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const getSingleCategories = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctor-types/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const getAllSpecialistCategory = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/specialist-categories`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }


    //USER META
    const postUserMeta = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/user-meta/create`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }

    
    const deleteTestFromLab = (data) =>{
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/lab/test`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)

    }



    // SERVICES
    const cityPost = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/cities/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const cityDelete = (data) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/cities/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }


    return {
        postAssignBooking,
        doctorHistoryBookingApi,
        testToLabRegister,
        getAllSpecialistCategory,
        labBookingDetails,
        getSingleAdmin,
        doctorTypeUpdate,
        getTestByLab,
        getAllCategories,
        deleteTest,
        getAllAssitant,
        postUserMeta,
        doctorActiveBookingApi,
        getTestAssign,
        getDoctorBookingDiscusion,
        getSingleCategories,
        getTestAssignHistory,
        doctorRegister,
        doctorUpdate,
        patchSpecilitY,
        deleteLab,
        getSingleLab,
        labUpdate,
        getUserMeta,
        deleteSpecialistCategory,
        labRegister,
        deleteTestFromLab,
        getDoctor,
        getLab,
        testRegister,
        getSingleSpecialistCategory,
        getAllTest,
        postConsultation,
        getDoctorSingle,
        deleteDoctor,
        cityDelete,
        updateUserMeta,
        getSpecilistCategory,
        addSpecilitY,
        addDoctorType,
        getDoctorType,
        updateUserDetails,
        postAssitant,
        cityPost,
        getAllCities,
        getSingleCity,
        getAppointmentDetailsLab,
        deleteDoctorType,
        getAppointmentHistoryOrders,
        getAllCity,
        postUploadLabReport,
        doctorBookingModification
    }
}

export default AdminService