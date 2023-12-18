import React, { useContext, useEffect, useState } from 'react'
import ProfileImg from '../../assets/images/profile-img.jpg'
import { SidebarContext } from '../../App'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/Routes'
import TokenService from '../../services/tokenService'
import DoctorService from '../../services/doctorService'
import { imageUrl } from '../../services/contants'

export const Header = () => {
    const { clearToken, getDoctorData } = TokenService();
    const { getDoctorSingle, getSingleSpecialist, getSingleType } = DoctorService();
    const [doctorData, setDoctorData] = useState([]);
    const [specialistData, setSpecialistData] = useState([]);
    const { sideBar, setSideBar } = useContext(SidebarContext)
    const handleSignout = () => {
        clearToken()
    }

    const [doctorDataVar, setDoctorDataVar] = useState()
    useEffect(() => {
        // Function to handle changes in localStorage
        const handleStorageChange = () => {
            // Update doctorDataVar when localStorage changes
            setDoctorDataVar(getDoctorData());
        };

        // Attach the event listener
        window.addEventListener('storage', handleStorageChange);

        // Fetch initial data
        setDoctorDataVar(getDoctorData());

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [doctorData]);
    useEffect(() => {
        setDoctorData((prevDoctorData) => ({
            ...prevDoctorData,
            image: doctorDataVar?.image,
            fullname: doctorDataVar?.fullname
        }));
    }, [doctorDataVar?.image, doctorDataVar?.fullname]);
    useEffect(() => {

        getDoctorSingle(doctorDataVar?.id).then((res) => {
            setDoctorData(res?.data?.data[0])
            // console.log(res?.data?.data, 'res');
        }).catch((err) => {
            console.log(err, 'err');
        })
    }, [doctorData])
    useEffect(() => {
        if (doctorData && doctorData.specialist_category) {
            // Second API call to get specialist data based on specialist_category
            getSingleSpecialist(doctorData.specialist_category)
                .then((res) => {
                    setSpecialistData(res?.data?.data[0]);
                    // console.log(res.data?.data[0], 'specialist data');
                })
                .catch((err) => {
                    console.log(err, 'err');
                });
        }
        else if (doctorData && doctorData.doctor_type) {
            getSingleType(doctorData.doctor_type)
                .then((res) => {
                    setSpecialistData(res?.data?.data[0]);
                    // console.log(res.data?.data[0], 'specialist data');
                })
                .catch((err) => {
                    console.log(err, 'err');
                });
        }
    }, [doctorData]);

    return (
        <>
            <header>
                <div className="headerInner">
                    <button className='menuButton' onClick={() => setSideBar(!sideBar)}><i className="bi bi-list"></i></button>
                    <div className="navRight">
                        <div className="dropdown notificationDropDown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-bell"></i>
                                <div className="notificationShow">
                                </div>

                            </button>
                            <ul className="dropdown-menu notificationMenu">
                                <li className=''><a className="dropdown-item " href="#">
                                    <div className='notificationItem'>
                                        <p className='notificationHeading'>Heading</p>
                                        <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                                    </div>
                                </a></li>
                                <li><a className="dropdown-item" href="#">
                                    <div className='notificationItem'>
                                        <p className='notificationHeading'>Heading</p>
                                        <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                                    </div>
                                </a></li>
                                <li><a className="dropdown-item" href="#">
                                    <div className='notificationItem'>
                                        <p className='notificationHeading'>Heading</p>
                                        <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                                    </div>
                                </a></li>
                            </ul>
                        </div>

                        <div className="dropdown notificationDropDown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-envelope"></i>
                                <div className="notificationShow">
                                </div>

                            </button>
                            <ul className="dropdown-menu notificationMenu">
                                <li className=''><a className="dropdown-item " href="#">
                                    <div className='notificationItem'>
                                        <p className='notificationHeading'>Heading</p>
                                        <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                                    </div>
                                </a></li>
                                <li><a className="dropdown-item" href="#">
                                    <div className='notificationItem'>
                                        <p className='notificationHeading'>Heading</p>
                                        <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                                    </div>
                                </a></li>
                                <li><a className="dropdown-item" href="#">
                                    <div className='notificationItem'>
                                        <p className='notificationHeading'>Heading</p>
                                        <p className='notificationMessage'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ducimus.</p>
                                    </div>
                                </a></li>
                            </ul>
                        </div>

                        <div className='aboutDoctor'>
                            <p className='doctorName'>{doctorData?.fullname}</p>
                            <p className='doctorSpeciality'>{specialistData?.title}</p>
                        </div>
                        <div className="dropdown profileDropDown">
                            {/* {console.log(doctorData, 'docData')} */}
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={doctorData?.image ? `${imageUrl}/${doctorData?.image}` : ProfileImg} alt="" />
                                <div className="notificationShow">
                                </div>
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link to={ROUTES.PROFILE} className="dropdown-item" href="#"><i className="bi bi-person" />Profile</Link></li>
                                {/* <li><a className="dropdown-item" href="#"><i className="bi bi-envelope" />Inbox</a></li> */}
                                <li onClick={handleSignout}><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-in-left" />Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}
