import React from 'react'
import profilePic from '../../../assets/images/guy.png'
import AdminService from '../../../services/adminApi'
import { useEffect } from 'react'
import TokenService from '../../../services/tokenService'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from '../../Component/loader'
import { imageUrl } from '../../../services/baseUrl'


export const Profile = () => {
    // let imageUrl = "http://fmd.arraydigitals.com"

    const [isLoading, setIsLoading] = useState(false);
    const { getStorageData } = TokenService();

    const { getSingleAdmin, getUserMeta, updateUserMeta, updateUserDetails } = AdminService()
    const adminId = getStorageData().id;

    const [userImage, setUserImage] = useState({});
    const [toastTrigger, setToastTrigger] = useState(false);
    const [userUpdateImage, setUserUpdateImage] = useState('');
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
    });
    // useEffect(()=>{
    //     console.log(userData,'userDATA');
    // },[userData])

    useEffect(() => {
        getSingleAdmin(adminId)
            .then((res) => {
                setUserData(res?.data?.data[0])
            })
            .catch((res) => {
                console.log(res?.data?.data, 'err');
            })
        getUserMeta(adminId).then((res) => {
            console.log(res?.data, 'res');
            setUserImage(res?.data?.data[0])
        }).catch((res) => {
            console.log(res, 'err');
        })
    }, [adminId])


    const getInputValue = (e) => {
        const nameTag = e.target.name
        const valueTag = e.target.value
        setUserData({ ...userData, [nameTag]: valueTag })
    }

    const getImageValue = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setUserUpdateImage(reader.result);
        };
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const metaValues = {
            user: adminId,
            key: 'image',
            value: userUpdateImage
        };
        const userApiData = { ...userData };

        setIsLoading(true);

        let imageApiSuccess = false;
        let dataApiSuccess = false;

        try {
            if (userUpdateImage) {
                await updateUserMeta(metaValues);
                imageApiSuccess = true;
            }

            if (Object.keys(userApiData).length > 0) {
                await updateUserDetails(userApiData);
                dataApiSuccess = true;
            }

            setIsLoading(false);

            if (!imageApiSuccess) {
                toast.error('Image failed to update');
            } else {
                if (!dataApiSuccess) {
                    toast.info('Data updated but image failed to update');
                } else {
                    toast.success('Updated');
                }
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            toast.error('Failed to update');
        }
    };


    return (
        <>
            <section className='mainSection'>
                <div className="container">
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <div className="mainSectionWrapper">
                        <div className="heading">
                            <p>
                                Profile
                            </p>
                        </div>

                        <div className="card cardForm">
                            <div className="card-body">
                                {
                                    isLoading ?

                                        <Loader />
                                        :
                                        <form className="additionForm" onSubmit={onSubmitForm}>
                                            <div className="row g-4">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <div className="profileImage">
                                                            <img src={userUpdateImage ? userUpdateImage : (userImage ? `${imageUrl}/${userImage.meta_value}` : profilePic)} alt="" className='profileImage' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorName">Name</label>
                                                        <input type="text" id='doctorName' name='fullname' placeholder={userData?.fullname} onChange={getInputValue} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="uploadImg">Upload Profile</label>
                                                        <input type="file" className='form-control' id='uploadImg' name='image' onChange={getImageValue} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorEmail">Email</label>
                                                        <input type="email" id='doctorEmail' name='email' placeholder={userData?.email} onChange={getInputValue} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                    <div className="fields">
                                                        <label htmlFor="doctorPhone">Phone</label>
                                                        <input type="number" id='doctorPhone' name='phone' placeholder={userData?.phone} onChange={getInputValue} />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                    <div className="fields">
                                                        <button type='Submit' >Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
