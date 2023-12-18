import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useMatch } from 'react-router-dom'
import { ROUTING } from '../../utils/routes'
import  Myprofile  from '../profile/profilePages/myprofile'
import banner1 from '../../assets/images/banners/desktopBanner/profileBanDesk.jpg'
import MobBanner1 from '../../assets/images/banners/desktopBanner/profileBanDesk.jpg'
import Slider from 'react-slick'

 const ProfileLayout = () => {
    const isMatch = useMatch("/:children");
    const [defaultActive, setDefaultActive] = useState(false)
    // const [settings, setSettings] = useState({
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // })

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === ROUTING.PROFILE) {
            setDefaultActive(true)
        }
        else {
            setDefaultActive(false)
        }
    }, [location.pathname])


    return (
        <>
            <main >
                <div className="profileMain">
                    <section className="profileBanner">
                        <div className="banner">
                            <div className="bannerInner">
                                <picture>
                                    <source srcSet={banner1} media='(min-width: 991px)' />
                                    <img loading="lazy" src={MobBanner1} alt="reload page" />
                                </picture>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="profile">
                                <div className="profileSide">
                                    <ul>
                                        <li> <NavLink activeclassname="active" className={defaultActive && 'active'} to={ROUTING.MYPROFILE} > Profile</NavLink> </li>
                                        <li> <NavLink activeclassname="active" to={ROUTING.BENEFICIARY}>Beneficiaries</NavLink> </li>
                                        <li> <NavLink activeclassname="active" to={ROUTING.PRESCIPTION} >Prescriptions</NavLink> </li>
                                        {/* <li> <NavLink activeclassname="active" to={ROUTING.REPORT}>Lab Reports</NavLink> </li> */}
                                        <li> <NavLink activeclassname="active" to={ROUTING.ORDERS}>My Orders</NavLink> </li>
                                        {/* <li> <NavLink activeclassname="active" to={ROUTING.MY_INSURANCE}> Insurance</NavLink> </li> */}
                                        <li> <NavLink activeclassname="active" to={ROUTING.BILLING}>Billing</NavLink> </li>
                                        <li> <NavLink activeclassname="active" to={ROUTING.PAYMENT}>Payment</NavLink> </li>
                                        <li> <NavLink activeclassname="active" to={ROUTING.LOGOUT}>Logout</NavLink> </li>
                                    </ul>
                                </div>
                                <div className="profileBody">
                                    <div className="row gx-0"> {!!isMatch ? <Myprofile /> : <Outlet />}</div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main >


        </>

    )
}

export default ProfileLayout