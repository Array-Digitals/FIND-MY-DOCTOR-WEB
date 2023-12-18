import React, { useContext, useState } from 'react'
import ProfileImg from '../../assets/images/profile-img.jpg'
import {SidebarContext} from '../../App'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/Routes'

export const Header = (props) => {

    const { sideBar, setSideBar } = useContext(SidebarContext )

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
                                    {/* <div className="spinner-grow text-danger " role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> */}
                                </div>

                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Notification</a></li>
                                <li><a className="dropdown-item" href="#">Notification</a></li>
                                <li><a className="dropdown-item" href="#">Notification</a></li>
                            </ul>
                        </div>
                      
                        <div className='aboutDoctor'>
                            <p className='doctorName'>Doctor Name</p>
                            <p className='doctorSpeciality'>Specialist</p>
                        </div>
                        <div className="dropdown profileDropDown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={ProfileImg} alt="" />
                                <div className="notificationShow">
                                </div>

                            </button>
                            <ul className="dropdown-menu">
                                <li><Link to={ROUTES.PROFILE} className="dropdown-item" href="#"><i className="bi bi-person"/>Profile</Link></li>
                                <li><a className="dropdown-item" href="#"><i className="bi bi-envelope"/>Inbox</a></li>
                                <li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-in-left"/>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}
