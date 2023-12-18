import React, { useState } from 'react'
import ceo from '../../assets/images/aboutus/ceo.png'
import person1 from '../../assets/images/aboutus/person1.png'
import person2 from '../../assets/images/aboutus/person2.png'
import person3 from '../../assets/images/aboutus/person3.png'
import person4 from '../../assets/images/aboutus/person4.png'
import person5 from '../../assets/images/aboutus/person5.png'
import person6 from '../../assets/images/aboutus/person6.png'
import person7 from '../../assets/images/aboutus/person7.png'
import person8 from '../../assets/images/aboutus/person8.png'
import person9 from '../../assets/images/aboutus/person9.png'
import comp1 from '../../assets/images/aboutus/jwt.png'
import comp2 from '../../assets/images/aboutus/buzz.png'
import comp3 from '../../assets/images/aboutus/citi.png'
import comp4 from '../../assets/images/aboutus/comp1.png'
import comp5 from '../../assets/images/aboutus/comp2.png'
import comp6 from '../../assets/images/aboutus/dell.png'
import comp7 from '../../assets/images/aboutus/origo.png'
import comp8 from '../../assets/images/aboutus/tesla.png'
import storyImg from '../../assets/images/aboutus/ourStory.png'
import missionImg from '../../assets/images/aboutus/mission.png'
import client1 from '../../assets/images/homepage/fmdClients/1.png'
import client2 from '../../assets/images/homepage/fmdClients/2.png'
import client3 from '../../assets/images/homepage/fmdClients/3.png'
import client4 from '../../assets/images/homepage/fmdClients/4.png'
import client5 from '../../assets/images/homepage/fmdClients/5.png'
import client6 from '../../assets/images/homepage/fmdClients/6.png'
import techJuiceImg from '../../assets/images/homepage/fmdNews/2.png'
import samaaImg from '../../assets/images/homepage/fmdNews/6.png'
import tImg from '../../assets/images/homepage/fmdNews/4.png'
import mashionImg from '../../assets/images/homepage/fmdNews/3.png'
import proImg from '../../assets/images/homepage/fmdNews/5.png'
import geoImg from '../../assets/images/homepage/fmdNews/1.png'
import banner1 from '../../assets/images/banners/desktopBanner/aboutUsDesk.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/aboutUsMob.jpg'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
 const Aboutus = () => {
    const [settings, setSettings] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    return (
        <>
            <main >
                <div className='aboutUs'>
                    <section className="aboutBanner">
                        <div className="banner">
                            <div className="bannerInner">
                                <picture>
                                    <source srcSet={banner1} media='(min-width: 991px)' />
                                    <img loading="lazy" src={MobBanner1} alt="reload page" />
                                </picture>
                            </div>
                        </div>

                    </section>
                    <section className='aboutSection'>
                        <div className="container">
                            <div className="aboutWrapper">
                                <div className="ourTeam">
                                    <div className="ourTeamInner">
                                        <p className="teamHeading">Our <span>Team</span> </p>
                                        <div className="ceo">
                                            <a href="https://www.linkedin.com/in/saadsiddiqui92/" className="image">
                                                <img loading="lazy" src={ceo} alt="reload page" />
                                                <div className="borderCircle"></div>
                                            </a>
                                            <p className="nameheading">Saad Wahab Siddiqui</p>
                                            <small>Founder & CEO</small>
                                            <a className='linkedAnchor' href="https://www.linkedin.com/in/saadsiddiqui92/"><i className="bi bi-linkedin" /></a>
                                        </div>
                                        <div className="team">
                                            <div className="teamProfile">
                                                <div className="profile">
                                                    <div className="image">
                                                        <img loading="lazy" className="profilePic" src={person1} alt="reload page" />
                                                        <div className="borderCircle"></div>
                                                        <img loading="lazy" className="company" src={comp8} alt="reload page" />
                                                    </div>
                                                    <p className="nameheading">Hadi</p>
                                                    <small>Co-Founder & CTO</small>
                                                    <a href="https://www.linkedin.com/in/abdulhadikhan/"><i className="bi bi-linkedin" /></a>


                                                </div>
                                                <div className="profile">
                                                    <div className="image">
                                                        <img loading="lazy" className="profilePic" src={person2} alt="reload page" />
                                                        <div className="borderCircle"></div>
                                                        <img loading="lazy" className="company" src={comp1} alt="reload page" />
                                                    </div>
                                                    <p className="nameheading">Amal</p>
                                                    <small>CMO</small>
                                                    <a href="https://www.linkedin.com/in/amalnadeemalam/"><i className="bi bi-linkedin" /></a>
                                                </div>
                                                <div className="profile">
                                                    <div className="image">
                                                        <img loading="lazy" className="profilePic" src={person3} alt="reload page" />
                                                        <div className="borderCircle"></div>
                                                        <img loading="lazy" className="company" src={comp4} alt="reload page" />
                                                    </div>
                                                    <p className="nameheading">Dr. Haresh</p>
                                                    <small>Chief Health Officer</small>
                                                    <a href="https://www.linkedin.com/in/dr-haresh-kumar-29a2b7231/"><i className="bi bi-linkedin" /></a>
                                                </div>

                                                <div className="profile">
                                                    <div className="image">
                                                        <img loading="lazy" className="profilePic" src={person5} alt="reload page" />
                                                        <div className="borderCircle"></div>
                                                        <img loading="lazy" className="company" src={comp7} alt="reload page" />
                                                    </div>
                                                    <p className="nameheading">Basalat</p>
                                                    <small>Head of Operations</small>
                                                    <a href="https://www.linkedin.com/in/basalat-ali-3a1229127/"><i className="bi bi-linkedin" /></a>
                                                </div>
                                                <div className="profile">
                                                    <div className="image">
                                                        <img loading="lazy" className="profilePic" src={person4} alt="reload page" />
                                                        <div className="borderCircle"></div>
                                                        <img loading="lazy" className="company" src={comp2} alt="reload page" />
                                                    </div>
                                                    <p className="nameheading">Faryal</p>
                                                    <small>Talent Acquistion Specialist</small>
                                                    <a href="https://www.linkedin.com/in/faryal-siraj-zuberi-430624207/"><i className="bi bi-linkedin" /></a>
                                                </div>
                                                <div className="profile">
                                                    <div className="image">
                                                        <img loading="lazy" className="profilePic" src={person6} alt="reload page" />
                                                        <div className="borderCircle"></div>
                                                        <img loading="lazy" className="company" src={comp3} alt="reload page" />
                                                    </div>
                                                    <p className="nameheading">Fasih</p>
                                                    <small>Talent Acquistion Specialist</small>
                                                    <a href="https://www.linkedin.com/in/fasih-ahmed-186379134/"><i className="bi bi-linkedin" /></a>
                                                </div>
                                                <div className="profile">
                                                    <div className="image">
                                                        <img loading="lazy" className="profilePic" src={person7} alt="reload page" />
                                                        <div className="borderCircle"></div>
                                                        <img loading="lazy" className="company" src={comp1} alt="reload page" />
                                                    </div>
                                                    <p className="nameheading">Amna</p>
                                                    <small>Talent Acquistion Specialist</small>
                                                    <a href="https://www.linkedin.com/in/amna-yousuf-batavia-a4a798199/"><i className="bi bi-linkedin" /></a>
                                                </div>
                                                <div className="profile">
                                                    <div className="image">
                                                        <img loading="lazy" className="profilePic" src={person9} alt="reload page" />
                                                        <div className="borderCircle"></div>
                                                        <img loading="lazy" className="company" src={comp6} alt="reload page" />
                                                    </div>
                                                    <p className="nameheading">Mustafa</p>
                                                    <small>Talent Acquistion Specialist</small>
                                                    <a href="https://www.linkedin.com/in/mustafasparacha/"><i className="bi bi-linkedin" /></a>
                                                </div>
                                                <div className="profile">
                                                    <div className="image">
                                                        <img loading="lazy" className="profilePic" src={person8} alt="reload page" />
                                                        <div className="borderCircle"></div>
                                                        <img loading="lazy" className="company" src={comp5} alt="reload page" />
                                                    </div>
                                                    <p className="nameheading">Areeba</p>
                                                    <small>Talent Acquistion Specialist</small>
                                                    <a href="https://www.linkedin.com/in/areeba-kashmiri-51332b17b/"><i className="bi bi-linkedin" /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="ourStory">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                        <div className="aboutPicOutter">
                                            <img loading="lazy" src={storyImg} alt="reload page" />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                        <div className="aboutPara">
                                            <div className="heading">
                                                <p className="teamHeading">Our <span>Story</span> </p>


                                            </div>

                                            <div className="paragraph">
                                                <p>
                                                    We are a healthcare startup that started in 2016, a technology that is acting as a bridge between PMC verified doctors, trusted and leading laboratories, and the patients.
                                                    The basic purpose is to provide better healthcare facilities at your utmost comfort. We offer Lab tests at home, Covid-19 Rapid & PCR Tests at home, PMC verified doctor visits at home, Health Insurance, and Medicine delivery. We have successfully expanded our operations in Islamabad, Pindi, Hyderabad, Lahore, Peshawar, and Multan!
                                                </p>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="ourStory">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                        <div className="aboutPara2">
                                            <div className="heading">
                                                <p className="teamHeading">Our <span>Mission & Vision</span> </p>


                                            </div>
                                            <div className="paragraph">
                                                <p>
                                                    Find My Doctor's basic purpose is to provide better healthcare facilities for your utmost comfort. We are here to make a difference and thrive in beneficial ways which will hopefully serve not only us but all future generations.
                                                    We want to make healthcare trusted, reliable and convenient. Healthcare is a very essential sector all over the world, however, it has sadly been neglected in Pakistan over the years. It is also one of the world's largest and fastest-growing industries.
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                        <div className="aboutPicOutter">
                                            <img loading="lazy" src={missionImg} alt="reload page" />
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="newsCarousel">
                                <div className="CarouselHeading">
                                    <p> Find My Doctor In <span>News</span></p>
                                </div>
                                <div className="carouselDiv">
                                    <div className="carouselInner">
                                        <Slider {...settings}>
                                            <div className='carouselItem'>
                                                <div className='carouselItemInner'>

                                                    <img loading="lazy" src={samaaImg} alt="reload page" />
                                                </div>
                                            </div>
                                            <div className='carouselItem'>
                                                <div className='carouselItemInner'>
                                                    <img loading="lazy" src={techJuiceImg} alt="reload page" />
                                                </div>
                                            </div>
                                            <div className='carouselItem'>
                                                <div className='carouselItemInner'>
                                                    <img loading="lazy" src={tImg} alt="reload page" />
                                                </div>

                                            </div>

                                            <div className='carouselItem'>
                                                <div className='carouselItemInner'>
                                                    <img loading="lazy" src={mashionImg} alt="reload page" />
                                                </div>

                                            </div>

                                            <div className='carouselItem'>
                                                <div className='carouselItemInner'>
                                                    <img loading="lazy" src={proImg} alt="reload page" />
                                                </div>

                                            </div>

                                            <div className='carouselItem'>
                                                <div className='carouselItemInner'>
                                                    <img loading="lazy" src={geoImg} alt="reload page" />
                                                </div>

                                            </div>
                                        </Slider>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="newsCarousel">
                                <div className="CarouselHeading">
                                    <p> Our <span>Clients</span></p>
                                </div>
                                <div className="carouselDiv">
                                    <div className="carouselInner">
                                        <Slider {...settings}>
                                            <div className='carouselItem'>
                                                <div className='carouselItemInner1'>

                                                    <img loading="lazy" src={client1} alt="reload page" />
                                                </div>
                                            </div>
                                            <div className='carouselItem'>
                                                <div className='carouselItemInner1'>
                                                    <img loading="lazy" src={client2} alt="reload page" />
                                                </div>
                                            </div>
                                            <div className='carouselItem'>
                                                <div className='carouselItemInner1'>
                                                    <img loading="lazy" src={client3} alt="reload page" />
                                                </div>

                                            </div>

                                            <div className='carouselItem'>
                                                <div className='carouselItemInner1'>
                                                    <img loading="lazy" src={client4} alt="reload page" />
                                                </div>

                                            </div>

                                            <div className='carouselItem'>
                                                <div className='carouselItemInner1'>
                                                    <img loading="lazy" src={client5} alt="reload page" />
                                                </div>

                                            </div>

                                            <div className='carouselItem'>
                                                <div className='carouselItemInner1'>
                                                    <img loading="lazy" src={client6} alt="reload page" />
                                                </div>

                                            </div>
                                        </Slider>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main >
        </>
    )
}

export default Aboutus
