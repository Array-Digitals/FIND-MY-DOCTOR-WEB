import React, { useEffect, useContext } from 'react'
import headerLogo from '../../assets/images/headerLogo.png'
import { Link } from 'react-router-dom';
import { ROUTING } from '../../utils/routes';
import tokenService from '../../services/token.service'
import { rememberContext } from '../../context/contextFile';
import { useState } from 'react';
const Header = () => {
    const { clearToken, getStorageData, rememberGet } = tokenService();
    const handleSignOut = () => {
        clearToken();
    }

    const [userName, setUserName] = useState('')
    const myData = getStorageData(rememberGet());
    useEffect(() => {
        setUserName(myData?.fullname)
    }, [myData]);



    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById('sticky-header'); // Add an ID to the sticky header element
            const thresholdElement = document.getElementById('threshold-element'); // Add an ID to the element at which the header should become sticky

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const threshold = thresholdElement.offsetTop; // Get the top offset of the threshold element
            setIsSticky(scrollTop > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header>
                <div className="header">
                    <div className="container">
                        <div className="headerInner " >
                            <div className="headerFirst">
                                <a className='iconOutter' target="_blank" href='https://www.facebook.com/findmydoctor.pakistan'>
                                    <i className="ri-facebook-fill" />
                                </a>
                                <a className='iconOutter' target="_blank" href='https://twitter.com/FindMyDoctorPAK?s=09 '>
                                    <i className="bi bi-twitter" />
                                </a>
                                <a className='iconOutter' target="_blank" href='https://www.youtube.com/c/FindMyDoctorPakistan'>
                                    <i className="bi bi-youtube" />
                                </a>
                                <a className='iconOutter' target="_blank" href='https://www.instagram.com/findmydoctorpakistan/?utm_medium=copy_link'>
                                    <i className="bi bi-instagram" />
                                </a>


                            </div>
                            <div className="headerSecond">
                                <i className="bi bi-headset" />
                                <p>Call us for information (+11 222 333 44)</p>
                            </div>

                            {!myData ? (

                                <div className="headerThird">
                                    <Link to={ROUTING.LOGIN}>Login</Link>
                                    <Link to={ROUTING.SIGNUP}>Sign Up</Link>

                                </div>
                            )
                                : (
                                    <div className="userProfileDiv">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="ri-user-line"></i> {userName}
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><Link className="dropdown-item" to={ROUTING.PROFILE}>User Profile</Link></li>
                                                <li><a className="dropdown-item" href="#">Notifications</a></li>
                                                <li><button className="dropdown-item" onClick={handleSignOut}>Sign Out</button></li>
                                            </ul>
                                        </div>

                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
                <div className="mainHeader">
                    <div className="container headerContainer" id="threshold-element">
                        <div className={`headerInner  ${isSticky && 'stickyHeader'}`}>
                            <Link className="" to={ROUTING.HOMEPAGE}> <img loading="lazy" src={headerLogo} alt="reload page" /></Link>
                            <div className='menu'>
                                <div className="menuInner">
                                    <Link to={ROUTING.HOMEPAGE}>Home</Link>
                                    <Link to={ROUTING.INSURE_KARO}>Insure Karo</Link>
                                    <Link to={ROUTING.PHARMACY}>Pharmacy</Link>
                                    <Link to={ROUTING.BOOK_DOCTOR}>Consultation</Link>
                                    <Link to={ROUTING.ABOUTUS}>About Us</Link>
                                    <Link to={ROUTING.BLOGS}>Blog</Link>
                                    <Link to={ROUTING.CONTACT}>Contact Us</Link>
                                </div>
                                <div className="shoppingButton">
                                    <Link to={ROUTING.CART}> <i className="bi bi-cart"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar bg-body-tertiary mobileHeader">

                    <div className="container">
                        <Link className="navbar-brand" to={ROUTING.HOMEPAGE}><img loading="lazy" src={headerLogo} alt="reload page" /></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><img loading="lazy" src={headerLogo} alt="reload page" /></h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                    {!myData ? (
                                        <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                            <Link className="nav-link active" aria-current="page" to={ROUTING.LOGIN}>Login</Link>
                                            <Link className="nav-link active" aria-current="page" to={ROUTING.SIGNUP}>SignUp</Link>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <div className="userProfileDiv">
                                                <div className="dropdown">
                                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="ri-user-line"></i> {userName}
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"><Link className="dropdown-item" to={ROUTING.PROFILE}>User Profile</Link></li>
                                                        <li data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"><a className="dropdown-item" href="#">Notifications</a></li>
                                                        <li data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"><button className="dropdown-item" onClick={handleSignOut}>Sign Out</button></li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </li>

                                    )}

                                    <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                        <Link className="nav-link active " aria-current="page" to={ROUTING.HOMEPAGE}>Home</Link>
                                    </li>
                                    <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                        <Link className="nav-link active" aria-current="page" to={ROUTING.INSURE_KARO}>Insure Karo</Link>
                                    </li>
                                    <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                        <Link className="nav-link active" aria-current="page" to={ROUTING.PHARMACY}>Pharmacy</Link>
                                    </li>
                                    <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                        <Link className="nav-link active" aria-current="page" to={ROUTING.BOOK_DOCTOR}>Consultation</Link>
                                    </li>
                                    <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                        <Link className="nav-link active" aria-current="page" to={ROUTING.ABOUTUS}>About Us</Link>
                                    </li>
                                    <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                        <Link className="nav-link active" aria-current="page" to={ROUTING.BLOGS}>Blog</Link>
                                    </li>
                                    <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                        <Link className="nav-link active" aria-current="page" to={ROUTING.CONTACT}>Contact Us</Link>
                                    </li>
                                    <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                        <Link className="nav-link active" aria-current="page" to={ROUTING.CART} >Cart</Link>
                                    </li>
                                    <li>
                                        <div className='mobileNavIcon'>
                                            <a className='iconOutter' target="_blank" href='https://www.facebook.com/findmydoctor.pakistan'>
                                                <i className="ri-facebook-fill" />
                                            </a>
                                            <a className='iconOutter' target="_blank" href='https://twitter.com/FindMyDoctorPAK?s=09 '>
                                                <i className="bi bi-twitter" />
                                            </a>
                                            <a className='iconOutter' target="_blank" href='https://www.youtube.com/c/FindMyDoctorPakistan'>
                                                <i className="bi bi-youtube" />
                                            </a>
                                            <a className='iconOutter' target="_blank" href='https://www.instagram.com/findmydoctorpakistan/?utm_medium=copy_link'>
                                                <i className="bi bi-instagram" />
                                            </a>
                                        </div>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;
