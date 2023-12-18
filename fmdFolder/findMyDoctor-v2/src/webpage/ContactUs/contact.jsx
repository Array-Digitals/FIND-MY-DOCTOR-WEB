import React, { useState } from 'react'
import ContactImg from '../../assets/images/contactUsImg.png'
import banner1 from '../../assets/images/banners/desktopBanner/contactUsDesk.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/contactMob.jpg'
import contactUsService from '../../services/contact'
import { Loader } from '../Component/loader';
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {
    const { contactUsPost } = contactUsService();

    const [isLoading, setIsLoading] = useState(false);
    const [contactModal, setContactModal] = useState({
        name: '',
        subject: '',
        email: '',
        message: '',
        phone: '',
    })
    const onInput = (e) => {
        setContactModal({ ...contactModal, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        console.log(contactModal, 'contacttt');
        contactUsPost(contactModal).then((res) => {
            toast.success('Message Sent')
            console.log(res.data, 'responseContact');
        }).catch((res) => {
            console.log(res, 'errorContact');
        }).finally(() => {
            setIsLoading(false)
        })
    }
    return (
        <>
            <main >
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
                <div className='contactUs'>
                    <section className="contactBanner">

                        <div className="banner">
                            <div className="bannerInner">
                                <picture>
                                    <source srcSet={banner1} media='(min-width: 991px)' />
                                    <img loading="lazy" src={MobBanner1} alt="reload page" />
                                </picture>
                            </div>
                        </div>


                    </section>
                    <section className='contactSection'>
                        <div className="container">
                            <div className="contactWrapper">
                                <div className="card cardForm cardRelativeField">
                                    {
                                        !isLoading &&
                                        <img loading="lazy" className='contactImgClass' src={ContactImg} alt="reload page" />
                                    }
                                    <div className="card-body">
                                        {
                                            isLoading ?
                                                <Loader />
                                                :
                                                <form className="contactForm" onSubmit={onSubmit}>
                                                    <div className="row g-4">
                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                            <div className="fields">
                                                                <p>
                                                                    Get In Touch
                                                                </p>

                                                                <p className='heading'>Write Us A Message</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                            <div className="fields">
                                                                <label htmlFor="contactName">Name</label>
                                                                <input type="text" id='contactName' name='name' placeholder='Enter Name...' onChange={onInput} required />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                            <div className="fields fieldRight">
                                                                <label htmlFor="contactSubject">Subject</label>
                                                                <input type="text" id='contactSubject' name="subject" placeholder='Enter Subject...' onChange={onInput} required />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                            <div className="fields">
                                                                <label htmlFor="contactEmail">Email</label>
                                                                <input type="email" id='contactEmail' name='email' placeholder='Enter Email...' onChange={onInput} required />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                                                            <div className="fields">
                                                                <label htmlFor="contactPhone">Phone</label>
                                                                <input type="number" id='contactPhone' name='phone' placeholder='Enter Number...' onChange={onInput} required />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                            <div className="fields">
                                                                <label htmlFor="contactMessage">Message</label>
                                                                <textarea id="contactMessage" name='message' placeholder='Enter Message...' onChange={onInput} required />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                                                            <div className="fields">
                                                                <button >Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                        }
                                    </div>
                                </div>
                                <div className="card cardAbout">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 ">
                                                <div className="contactAbout">
                                                    <i className="bi bi-telephone-fill" />
                                                    <p>Call Us Now:</p>
                                                    <p>(+92) 313-5228378</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 ">
                                                <div className="contactAbout">
                                                    <i className="bi bi-geo-alt-fill" />
                                                    <p>Address:</p>
                                                    <p>Office # 404, CTC Building, Block-8 Clifton, Karachi.</p>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 ">
                                                <div className="contactAbout">
                                                    <i className="bi bi-envelope-fill" />
                                                    <p>Email:</p>
                                                    <p>info@findmydoctor.pk</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1810.4832541419769!2d67.03429067605832!3d24.830818940173806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33dd2bc650439%3A0x569fba265e542df8!2sFind%20My%20Doctor!5e0!3m2!1sen!2s!4v1678089933612!5m2!1sen!2s" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </main >
        </>
    )
}

export default Contact
