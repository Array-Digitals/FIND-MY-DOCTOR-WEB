import React, { useState } from 'react'
import logo from '../../assets/images/headerLogo.png'
import { Link } from 'react-router-dom';
import { ROUTING } from '../../utils/routes';
import contactUsService from '../../services/contact';
import { toast, ToastContainer } from "react-toastify";

export const Footer = () => {
  const { newsLetter } = contactUsService();
  const [isEmail, setIsEmail] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault();
    newsLetter({ email: isEmail }).then((res) => {
      console.log(res.data, 'responsee');
      setIsEmail('')
      toast.success('submitted')
    }).catch((res) => {
      console.log(res, 'error');
    })
  }
  return (
    <>
      <section className='footer'>
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
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className='footerForm'>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    <div className='footerFormWrapper'>
                      <p className='para1'>Subscribe to our <span>Newsletter</span></p>
                      <p className='para2'>signup for our weekly newsletter to get latest news, update and amazing offers delivered directly to your inbox</p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    <div className="footerInput">
                      <form className="footerBorder" onSubmit={onFormSubmit}>
                        <input type="email" placeholder='Email Address' name="email" id="" onChange={(e) => { setIsEmail(e.target.value) }} required/>
                        <button type='submit'><i className="ri-send-plane-fill"></i></button>

                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 6 col-xl-4">
              <div className="footerMain">

                <h5>Get in Touch</h5>
                <p>Office # 404, CTC Building, <br /> block-8 Clifton Karachi</p>
                <p>info@findmydoctor.pk <br /> (+92) 313-5228378</p>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 6 col-xl-4">
              <div className="footerMain">
                <h5>Find My Doctor</h5>
                <Link to={ROUTING.BOOK_DOCTOR}>Book A Doctor</Link>
                <Link to={ROUTING.BOOK_LAB}>Lab Test</Link>
                {/* <Link to="">Covid-19 Test</Link> */}
                <Link to={ROUTING.PHARMACY}>Pharmacy</Link>
                <Link to={ROUTING.SEHAT_CARD}>Sehat Card</Link>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 6 col-xl-4">
              <div className="footerMain">
                <h5>Quick Links</h5>
                <div className='linkFlex'>
                  <div>
                    <Link to={ROUTING.HOMEPAGE}>Home</Link>
                    <Link to={ROUTING.PHARMACY}>Pharmacy</Link>
                    <Link to={ROUTING.ABOUTUS}>About Us</Link>
                    <Link to={ROUTING.CONTACT}>Contact Us</Link>
                    <Link to={ROUTING.PRIVACY_POLICY}>Privacy Policy</Link>
                  </div>
                  <div>
                    <Link to={ROUTING.SHIPPING_POLICY} >Shipping Policy</Link>
                    <Link to={ROUTING.RETURN_POLICY}>Return Policy</Link>
                    <Link to={ROUTING.FAQS}>Faq's</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className='footerHeader'>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-2">
                    <div className='footerImg'>
                      <img loading="lazy" src={logo} alt="reload page" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <div className='list'>
                      <Link to={ROUTING.HOMEPAGE}>HOME </Link>
                      <Link to={ROUTING.INSURANCE}>INSURE KARO</Link>
                      <Link to={ROUTING.PHARMACY}>PHARMACY</Link>
                      <Link to={ROUTING.BOOK_DOCTOR}>CONSULTATION</Link>
                      <Link to={ROUTING.ABOUTUS}>ABOUT US</Link>
                      <Link to={ROUTING.BLOGS}>BLOG </Link>
                      <Link to={ROUTING.CONTACT}>CONTACT US</Link>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
                    <div className='icons'>
                      <a className='iconOutter' target="_blank" href='https://www.facebook.com/findmydoctor.pakistan'>
                        <i className="ri-facebook-fill" />
                      </a>
                      <a className='iconOutter' target="_blank" href='https://twitter.com/FindMyDoctorPAK?s=09'>
                        <i className="bi bi-twitter" />
                      </a>
                      <a className='iconOutter' target="_blank" href='https://www.youtube.com/c/FindMyDoctorPakistan'>
                        <i className="bi bi-youtube" />
                      </a>
                      <a className='iconOutter' target="_blank" href='https://www.instagram.com/findmydoctorpakistan/?utm_medium=copy_link '>
                        <i className="bi bi-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className='footer2'>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className='footer2Main'>

                <div >
                  <p>© Find My Doctor 2023 - Design By Array Digitals</p>
                </div>
                <div className='footer2Link'>
                  <Link to={ROUTING.PRIVACY_POLICY} >Privacy Policy</Link>
                  <a href="#">Term of Use</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
