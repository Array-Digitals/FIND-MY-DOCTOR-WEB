import React, { useContext, useEffect, useState } from 'react'
import logoImg from '../../assets/images/Logo.png'
import { SidebarContext } from '../../App'
import { NavLink, Link } from 'react-router-dom'
import { ROUTES } from '../../utils/Routes'
import { Appointment } from '../WebPage/appointment/appointment'

export const Sidebar = () => {


    const { sideBar, setSideBar } = useContext(SidebarContext)

    const closeButton = () => {
        setSideBar(!sideBar)
    }

    return (
        <>
            <aside id="sidebar" className={sideBar ? 'sidebarwidth' : 'sidebar'}>
                <div className="sideBarInner">
                    <div className='aSideCloseButton'>
                        <button onClick={closeButton}><i className="bi bi-x"></i></button>
                    </div>
                    <div className="LogoImage">
                        <Link to={ROUTES.HOMEPAGE} >
                            <img src={logoImg} alt="" />
                        </Link >
                    </div>

                    <ul className="sidebar-nav" id="sidebar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.HOMEPAGE}>
                                <i className="bi bi-house sideIcon" /><span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.APPOINTMENT}>
                                <i className="bi bi-person-plus sideIcon" /><span>Appointment</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link  " data-bs-target="#charts-nav1" data-bs-toggle="collapse" href="#">
                                <i className="bi bi-people sideIcon" /><span>Team Members</span><i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul id="charts-nav1" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li>
                                    <NavLink to={ROUTES.ADD_TEAM} className="navLinkB " activeclassname="active">
                                        <span>Add Member</span>

                                    </NavLink >
                                </li>
                                <li>
                                    <NavLink to={ROUTES.MANAGE_TEAM} className="navLinkC " activeclassname="active">
                                        <span>Manage Members</span>
                                    </NavLink >
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link  " data-bs-target="#charts-nav2" data-bs-toggle="collapse" href="#">
                                <i className="bi bi-capsule sideIcon" /><span>Lab Test</span><i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul id="charts-nav2" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li>
                                    <NavLink to={ROUTES.ADD_TEST} className="navLinkB " activeclassname="active">
                                        <span>Add Test</span>
                                    </NavLink >
                                </li>
                                <li>
                                    <NavLink to={ROUTES.MANAGE_TEST} className="navLinkC " activeclassname="active">
                                        <span>Manage Test</span>
                                    </NavLink >
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link  " data-bs-target="#charts-nav3" data-bs-toggle="collapse" href="#">
                                <i className="bi bi-clipboard-pulse sideIcon" /><span>Reports</span><i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul id="charts-nav3" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li>
                                    <NavLink to="{ROUTES.ADD_TEAM}" className="navLinkB " activeclassname="active">
                                        <span>Sales</span>

                                    </NavLink >
                                </li>
                                <li>
                                    <NavLink to="{ROUTES.MANAGE_TEAM}" className="navLinkC " activeclassname="active">
                                        <span>Tests</span>
                                    </NavLink >
                                </li>
                                <li>
                                    <NavLink to="{ROUTES.MANAGE_TEAM}" className="navLinkD " activeclassname="active">
                                        <span>Top User</span>
                                    </NavLink >
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.PROFILE}>
                                <i className="bi bi-person sideIcon" /><span>Profile</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.TERMS}>
                                <i className="bi bi-file-earmark-text sideIcon" /><span>Terms & Condition</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.FAQS}>
                                <i className="bi bi-files sideIcon" /><span>FAQs</span>
                            </NavLink>
                        </li>
                        
                        {/* <li className="nav-item">
                            <NavLink className="nav-link  collapsed" activeclassname="active" to={ROUTES.APPOINTMENT}>
                                <i className="bi bi-person-lines-fill sideIcon" /><span>Reports</span>
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
            </aside>
        </>
    )
}
