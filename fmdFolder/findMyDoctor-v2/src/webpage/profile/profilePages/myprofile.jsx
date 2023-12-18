import React, { useState, useEffect } from 'react'
import personImg from '../../../assets/images/profile/guy.png'
import AuthService from '../../../services/auth.service';
import tokenService from '../../../services/token.service';
import userDATA from '../../../services/userData';
import { Link } from 'react-router-dom';
import coverPhoto from '../../../assets/images/profile/profileBg.png'
import { ROUTING } from '../../../utils/routes';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imageUrl } from '../../BookLab/labImports';
import { Loader } from '../../Component/loader';

const Myprofile = () => {

    // let imageUrl = "http://fmd.arraydigitals.com/"
    const { getStorageData, rememberGet, setUserObject } = tokenService();
    const { getUserData, patchUserData, postUserMeta, updateUserMeta } = userDATA();
    const [myData, setMyData] = useState(getStorageData(rememberGet()));
    const [imageUploaded, setImageUploaded] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const [profileData, setProfileData] = useState({
        fullname: myData?.fullname,
        email: myData?.email,
        phone: myData?.phone,
        id: myData?.id,
    })

    const [metaAddress, setMetaAddress] = useState({
        meta_key: "",
        meta_value: ""
    });
    const [metaAge, setMetaAge] = useState({
        meta_key: "",
        meta_value: ""
    });
    const [metaHeight, setMetaHeight] = useState({
        meta_key: "",
        meta_value: ""
    });
    const [metaWeight, setMetaWeight] = useState({
        meta_key: "",
        meta_value: ""
    });
    const [metaImage, setMetaImage] = useState({
        meta_key: "",
        meta_value: ""
    });
    const [metaBanner, setMetaBanner] = useState({
        meta_key: "",
        meta_value: ""
    });

    useEffect(() => {
        const isNotEmptyValue = (value) => value && value.trim() !== '';
        const isNotEmpty = isNotEmptyValue(metaAddress.meta_value) && isNotEmptyValue(metaAge.meta_value) && isNotEmptyValue(metaHeight.meta_value) && isNotEmptyValue(metaWeight.meta_value);
        setIsButtonDisabled(!isNotEmpty);
        // console.log(!isNotEmpty, 'consolleee');
    }, [metaAddress.meta_value, metaAge.meta_value, metaHeight.meta_value, metaWeight.meta_value]);

    //get Input from Form
    const getInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProfileData({ ...profileData, [name]: value })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const user = myData?.id;
        const updatedData = { ...myData, fullname: profileData?.fullname, email: profileData?.email, phone: profileData?.phone };
        let successFlag = false;

        // Update userData
        const userData = { ...profileData };
        const userDataPromise = patchUserData(userData)
            .then((res) => {
                setUserObject(updatedData)
                setMyData(updatedData);
                successFlag = true;
                console.log(res, 'response');
            })
            .catch((err) => {
                console.log(err.message);

            }).finally(() => {
                setIsLoading(false);
            })
        // Update userAddress
        const userAddress = { user, value: metaAddress?.meta_value };
        const addressPromise = !metaAddress?.meta_key ? postUserMeta({ ...userAddress, key: "address" }) : updateUserMeta({ ...userAddress, key: "address" });

        // Update userAge
        const userAge = { user, value: metaAge?.meta_value };
        const agePromise = !metaAge?.meta_key ? postUserMeta({ ...userAge, key: "age" }) : updateUserMeta({ ...userAge, key: "age" });

        // Update userHeight
        const userHeight = { user, value: metaHeight?.meta_value };
        const heightPromise = !metaHeight?.meta_key ? postUserMeta({ ...userHeight, key: "height" }) : updateUserMeta({ ...userHeight, key: "height" });

        // Update userWeight
        const userWeight = { user, value: metaWeight?.meta_value };
        const weightPromise = !metaWeight?.meta_key ? postUserMeta({ ...userWeight, key: "weight" }) : updateUserMeta({ ...userWeight, key: "weight" });

        // Check if userBanner and userImage contain base64 images
        const hasBase64Banner = /^data:image\/(jpeg|png|gif);base64,/.test(metaBanner?.meta_value);
        const hasBase64Image = /^data:image\/(jpeg|png|gif);base64,/.test(metaImage?.meta_value);
        const promises = [userDataPromise, addressPromise, agePromise, heightPromise, weightPromise];

        // If userBanner has a base64 image, include its promise
        if (hasBase64Banner) {
            const userBanner = { user, value: metaBanner?.meta_value };
            const bannerPromise = !metaBanner?.meta_key ? postUserMeta({ ...userBanner, key: "banner_image" }) : updateUserMeta({ ...userBanner, key: "banner_image" });
            promises.push(bannerPromise);

        } else {
            // console.log("No base64 image for userBanner");
        }

        // If userImage has a base64 image, include its promise
        if (hasBase64Image) {
            const userImage = { user, value: metaImage?.meta_value };
            const imagePromise = !metaImage?.meta_key ? postUserMeta({ ...userImage, key: "image" }) : updateUserMeta({ ...userImage, key: "image" });
            promises.push(imagePromise);
        } else {
            // console.log("No base64 image for userImage");
        }

        Promise.all(promises)
            .then((responses) => {
                let hasFailedUpdate = false;
                let hasEmptyRequest = false;
                console.log(responses, 'response');

                responses.forEach((response) => {
                    if (response?.data?.success === 0) {
                        hasFailedUpdate = true;

                        // Check if the failure is due to an empty request
                        if (response?.data?.message === 'Empty request') {
                            hasEmptyRequest = true;
                        }
                    }
                });

                if (hasFailedUpdate) {
                    if (hasEmptyRequest) {
                        toast.error("Update failed due to empty request");
                    } else {
                        toast.error("Update failed");
                    }
                } else {
                    toast.success("Successfully updated");
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        const getMetaId = myData?.id
        getUserData(getMetaId).then((response => {
            const address = response?.data?.data?.find(item => item?.meta_key === 'address');
            const age = response?.data?.data?.find(item => item?.meta_key === 'age');
            const height = response?.data?.data?.find(item => item?.meta_key === 'height');
            const weight = response?.data?.data?.find(item => item?.meta_key === 'weight')
            const image = response?.data?.data?.find(item => item?.meta_key === 'image');
            const banner = response?.data?.data?.find(item => item?.meta_key === 'banner_image');


            if (address) {
                setMetaAddress({
                    meta_key: address.meta_key,
                    meta_value: address.meta_value
                })
            }
            if (age) {
                setMetaAge({
                    meta_key: age.meta_key,
                    meta_value: age.meta_value
                })
            }
            if (height) {
                setMetaHeight({
                    meta_key: height.meta_key,
                    meta_value: height.meta_value
                })
            }
            if (weight) {
                setMetaWeight({
                    meta_key: weight.meta_key,
                    meta_value: weight.meta_value
                })
            }
            if (image) {
                setMetaImage({
                    meta_key: image.meta_key,
                    meta_value: image.meta_value
                })
            }
            if (banner) {
                setMetaBanner({
                    meta_key: banner.meta_key,
                    meta_value: banner.meta_value
                })
            }
        })
        ).catch((res) => {
            console.log(res)
        })

    }, [])


    const profileImageInput = (e) => {
        const file = e.target.files[0];
        // setImageUploaded(file)

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const imageVar = reader.result
            setMetaImage({ ...metaImage, meta_value: imageVar });
        };
    };
    const profileBannerInput = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const bannerVar = reader.result
            setMetaBanner({ ...metaBanner, meta_value: bannerVar });
        };
    };

    // const [isAge, setIsAge] = useState(false)
    // const [isHeight, setIsHeight] = useState(false)
    // const [isWeight, setIsWeight] = useState(false)

    // useEffect(() => {
    //     setIsAge(isNaN(Number(metaAge?.meta_value)));
    //     console.log(isAge, 'isageee');
    // }, [metaAge.meta_value]);
    
    // useEffect(() => {
    //     setIsHeight(isNaN(Number(metaHeight?.meta_value)));
    // }, [metaHeight.meta_value]);
    
    // useEffect(() => {
    //     setIsWeight(isNaN(Number(metaWeight?.meta_value)));
    // }, [metaWeight.meta_value]);

    return (
        <>
            {isLoading ?
                <Loader />
                :
                <div className="profileInner">
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
                    <div className="profileHead">
                        <div className="photoContent">

                            {/* <div className="coverPhoto" style={{ backgroundImage: `url(${coverPhoto})` }}>  </div> */}
                            {metaBanner?.meta_value && metaBanner?.meta_value.startsWith("data:image") ? (
                                <div className="coverPhoto">
                                    <img loading="lazy" className='profileBannerImg' src={metaBanner.meta_value ? metaBanner.meta_value : coverPhoto} alt="reload page" />
                                </div>
                            ) : (
                                <div className="coverPhoto">
                                    <img loading="lazy" className='profileBannerImg' src={metaBanner?.meta_value ? `${imageUrl}/${metaBanner.meta_value}` : coverPhoto} alt="reload page" />
                                </div>
                            )}

                        </div>
                        <div className="profileInfo">
                            <div className="profilePhoto">
                                {metaImage?.meta_value && metaImage?.meta_value.startsWith("data:image") ? (
                                    <img loading="lazy" src={metaImage.meta_value ? metaImage.meta_value : personImg} className="img-fluid rounded-circle" alt="reload pageprofile" />
                                ) : (
                                    <img loading="lazy" src={metaImage.meta_value ? `${imageUrl}/${metaImage.meta_value}` : personImg} className="img-fluid rounded-circle" alt="reload pageprofile" />
                                )}
                            </div>
                            <div className="profileDetails">
                                <div className="profileName px-3 pt-2">
                                    <h4 className="textPrimary mb-0">{myData?.fullname}</h4>
                                    <p>Update and personalize your details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={formSubmit}>
                        <div className="profileForm">
                            <div className="fields">
                                <label htmlFor="userName">Name</label>
                                <div className='inputField'>
                                    <input type="text" id='userName' autoComplete='off' name='fullname' placeholder={myData?.fullname} value={profileData.fullname} onChange={getInput} required />
                                </div>
                            </div>
                            <hr />
                            <div className="fields">
                                <label htmlFor="number">Phone Number</label>
                                <div className='inputField'>
                                    <input type="text" id='number' autoComplete='off' name='phone' placeholder={myData?.phone} value={profileData.phone} onChange={getInput} required />
                                </div>
                            </div>
                            <hr />
                            <div className="fields">
                                <label htmlFor="email">Email</label>
                                <div className='inputField'>
                                    <input type="text" id='email' autoComplete='off' name='email' placeholder={myData?.email} value={profileData.email} onChange={getInput} required />
                                </div>
                            </div>
                            <hr />
                            <div className="fields">
                                <label htmlFor="address">Address</label>
                                <div className='inputField'>
                                    <textarea type="text" id='address' autoComplete='off' rows={2} placeholder="Enter Address..." value={metaAddress?.meta_value} onChange={(event) => setMetaAddress({ ...metaAddress, meta_value: event.target.value })} name='meta_key' />
                                </div>
                            </div>
                            <hr />
                            <div className="fields">
                                <label htmlFor="password">Password</label>
                                <div className='inputField'>
                                    <Link className='passwordButton' to={ROUTING.PASSWORD}>Change Password</Link>
                                </div>
                            </div>
                            <hr />
                            <div className="fields">
                                <label htmlFor="">Image</label>
                                <div className='inputField inputField3'>
                                    {metaImage?.meta_value && metaImage?.meta_value.startsWith("data:image") ? (
                                        <img loading="lazy" className='pfpImg' src={metaImage.meta_value ? metaImage.meta_value : personImg} alt="reload page" />

                                    ) : (
                                        <img loading="lazy" className='pfpImg' src={metaImage.meta_value ? `${imageUrl}/${metaImage.meta_value}` : personImg} alt="reload pagebanner" />
                                    )}
                                    <input id='dpImageUpload' type="file" accept="image/*" name='image' onChange={profileImageInput} />
                                    <label htmlFor='dpImageUpload'>Update</label>
                                </div>
                            </div>
                            <hr />
                            <div className="fields">
                                <label htmlFor="">Banner</label>
                                <div className='inputField inputField3'>
                                    {metaBanner?.meta_value && metaBanner?.meta_value.startsWith("data:image") ? (
                                        <img loading="lazy" className='profileBannerImg' src={metaBanner.meta_value ? metaBanner.meta_value : coverPhoto} alt="reload page" />

                                    ) : (
                                        <img loading="lazy" className='profileBannerImg' src={metaBanner?.meta_value ? `${imageUrl}/${metaBanner.meta_value}` : coverPhoto} alt="reload page" />

                                    )}
                                    <input id='bannerUserUpload' type="file" accept="image/*" name='banner' onChange={profileBannerInput} />
                                    <label htmlFor='bannerUserUpload'>Update</label>
                                </div>
                            </div>
                            <hr />
                            <div className="fields">
                                <label htmlFor="age">Age</label>
                                <div className='inputField'>
                                    <input type="number" id='age' placeholder='Enter Age... (In Years)' autoComplete='off' value={metaAge?.meta_value} onChange={(event) => setMetaAge({ ...metaAge, meta_value: event.target.value })} name='meta_key' />
                                </div>
                            </div>
                            {/* {isAge &&
                                <div className="signupError">
                                    <p className="errorMessage">* Enter in number</p>
                                </div>
                            } */}
                            <hr />
                            <div className="fields">
                                <label htmlFor="age">Height</label>
                                <div className='inputField'>
                                    <input type="number" id='age' placeholder='Enter Height... (In Foot)' autoComplete='off' name='height' value={metaHeight?.meta_value} onChange={(event) => setMetaHeight({ ...metaHeight, meta_value: event.target.value })} />
                                </div>
                            </div>
                            <hr />
                            <div className="fields">
                                <label htmlFor="age">Weight</label>
                                <div className='inputField'>
                                    <input type="number" id='age' placeholder='Enter Weight...(In Kg)' autoComplete='off' name='weight' value={metaWeight?.meta_value} onChange={(event) => setMetaWeight({ ...metaWeight, meta_value: event.target.value })} />
                                </div>
                            </div>
                            <hr />

                            {isButtonDisabled &&
                                <div className="signupError">
                                    <p className="errorMessage">* Enter All Above Details</p>
                                </div>
                            }

                            <div className="fields">
                                <button type='submit' disabled={isButtonDisabled}>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            }

        </>
    )
}

export default Myprofile