import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ROUTING } from '../../utils/routes'
import CountUp from "react-countup";
import Slider from "react-slick";
import VisibilitySensor from "react-visibility-sensor";
import docImg from '../../assets/images/homepage/banDoc.png'
import bookDocImg from '../../assets/images/homepage/bookDoctor.png'
import bookLabImg from '../../assets/images/homepage/bookLab.png'
import bookCovidImg from '../../assets/images/homepage/sehatcard.png'
import bookPharmImg from '../../assets/images/homepage/bookPharm.png'
import aboutImg from '../../assets/images/homepage/aboutPic0.png'
import bubbleOne from '../../assets/images/homepage/bubble01.png'
import bubbleTwo from '../../assets/images/homepage/bubble02.png'
import bubbleThree from '../../assets/images/homepage/bubble03.png'
import bubbleFour from '../../assets/images/homepage/bubble04.png'
import newsImage from '../../assets/images/homepage/aboutUs.png'
import CommaImg from '../../assets/images/homepage/comma.png'
import StarImg from '../../assets/images/homepage/fiveStars.png'
import techJuiceImg from '../../assets/images/homepage/fmdNews/2.png'
import samaaImg from '../../assets/images/homepage/fmdNews/6.png'
import tImg from '../../assets/images/homepage/fmdNews/4.png'
import mashionImg from '../../assets/images/homepage/fmdNews/3.png'
import proImg from '../../assets/images/homepage/fmdNews/5.png'
import geoImg from '../../assets/images/homepage/fmdNews/1.png'
import client1 from '../../assets/images/homepage/fmdClients/1.png'
import client2 from '../../assets/images/homepage/fmdClients/2.png'
import client3 from '../../assets/images/homepage/fmdClients/3.png'
import client4 from '../../assets/images/homepage/fmdClients/4.png'
import client5 from '../../assets/images/homepage/fmdClients/5.png'
import client6 from '../../assets/images/homepage/fmdClients/6.png'
import banner1 from '../../assets/images/banners/desktopBanner/HomeBan1Desk.jpg'
import banner2 from '../../assets/images/banners/desktopBanner/HomeBan2Desk.jpg'
import banner3 from '../../assets/images/banners/desktopBanner/HomeBan3Desk.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/homeBan1.jpg'
import MobBanner2 from '../../assets/images/banners/mobileBanner/homeBan2.jpg'
import MobBanner3 from '../../assets/images/banners/mobileBanner/homeBan3.jpg'
import BannerService from '../../services/bannerService';
import { imageUrl } from '../../services/baseUrl';
import { Loader } from '../Component/loader';
// import { Default } from 'react-toastify/dist/utils';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);

    const { getBanners } = BannerService()

    const [partnerShipCount, setPartnerShipCount] = useState(0);
    const [partnerShipEnd, setPartnerShipEnd] = useState(60000);
    useEffect(() => {
        setPartnerShipCount(0);
        setPartnerShipEnd(60000);
    }, []);

    const [thirdCount, setThirdCount] = useState(0);
    const [thirdCountEnd, setThirdCountEnd] = useState(70);
    useEffect(() => {
        setThirdCount(0);
        setThirdCountEnd(70);
    }, []);

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(90000);
    useEffect(() => {
        setStart(0);
        setEnd(90000);
    }, []);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check the screen width before proceeding with the scroll animation
            let box = document.querySelector(".servicesMain");
            let position = box?.getBoundingClientRect().top;
            let screenPosition = window.innerHeight / 1.3;
            let box2 = document.querySelector(".servicesmainHeading");
            if (window.innerWidth > 991) {
                if (position < screenPosition) {
                    box.classList.add("active");
                    box2.classList.add("activeHeading");
                } else {
                    box?.classList.remove("active");
                    box2?.classList.remove("activeHeading");
                }
            }
            else {
                box.classList.add("active");
                box2.classList.add("activeHeading");
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

    const [settings1, setSettings1] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    const [bannersDesk, setDeskBanners] = useState([])
    const [bannerType, setBannerType] = useState(window.innerWidth >= 991 ? 11 : 17);

    useEffect(() => {
        const handleResize = () => {
            setBannerType(window.innerWidth >= 991 ? 11 : 17);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        fetchData();
    }, [bannerType]);

    const fetchData = async () => {
        // console.log(bannerType, 'bannerrr');
        try {
            const bannerResponse = await getBanners(bannerType);
            const responseData = bannerResponse.data.data;
            console.log(responseData, 'responsee');
            setDeskBanners(responseData);
        } catch (error) {
            console.error('Error fetching banners:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <main>
                <div className="homePage">
                    {
                        isLoading
                            ?
                            <Loader />
                            :
                            <div className="homePageInner">
                                <section>

                                    <Slider {...settings1}>
                                        {
                                            bannersDesk.map((item, keyId) => {
                                                let desktopImage = `${imageUrl}/${item.image}`
                                                return (
                                                    <div className="banner" key={keyId}>
                                                        <div className="bannerInner">
                                                            <img loading="lazy" src={desktopImage} alt="reload page" />
                                                        </div>
                                                    </div>
                                                )
                                            })

                                        }
                                    </Slider>
                                </section>
                                <section>
                                    <div className="container serviceContainer">
                                        <div className='servicesmainHeading'>
                                            <p>
                                                OUR <span>SERVICES</span>
                                            </p>
                                        </div>
                                        <div className="servicesMain">
                                            <div className="row justify-content-center">
                                                <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cardsCenterMob">
                                                    <div className="card redCard">

                                                        <div className="card-body">
                                                            <div className="serviceBody">
                                                                <div className="cardImage">
                                                                    <img loading="lazy" src={bookDocImg} alt="reload page" />
                                                                </div>
                                                                <div className="para">
                                                                    <p className='cardHeading'>BOOK DOCTOR</p>
                                                                    <p className='cardPara'>I need a doctor's appointment</p>
                                                                </div>
                                                                <div className="cardButton">
                                                                    <Link to={ROUTING.BOOK_DOCTOR}>
                                                                        Book Now
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cardsCenterMob">
                                                    <div className="card blackCard">

                                                        <div className="card-body">
                                                            <div className="serviceBody">
                                                                <div className="cardImage">
                                                                    <img loading="lazy" src={bookLabImg} alt="reload page" />
                                                                </div>
                                                                <div className="para">
                                                                    <p className='cardHeading'>BOOK A LAB</p>
                                                                    <p className='cardPara'>I need to get tested</p>
                                                                </div>
                                                                <div className="cardButton">
                                                                    <Link to={ROUTING.BOOK_LAB}>
                                                                        Book Now
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cardsCenterMob">
                                                    <div className="card redCard">

                                                        <div className="card-body">
                                                            <div className="serviceBody">
                                                                <div className="cardImage">
                                                                    <img loading="lazy" src={bookCovidImg} alt="reload page" />
                                                                </div>
                                                                <div className="para">
                                                                    <p className='cardHeading'>INSURE KARO</p>
                                                                    <p className='cardPara'>I want to have insurance</p>
                                                                </div>
                                                                <div className="cardButton">
                                                                    <Link to={ROUTING.INSURE_KARO}>
                                                                        Book Now
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cardsCenterMob">
                                                    <div className="card blackCard">

                                                        <div className="card-body">
                                                            <div className="serviceBody">
                                                                <div className="cardImage">
                                                                    <img loading="lazy" src={bookPharmImg} alt="reload page" />
                                                                </div>
                                                                <div className="para">
                                                                    <p className='cardHeading'>PHARMACY</p>
                                                                    <p className='cardPara'>I need my prescription order</p>
                                                                </div>
                                                                <div className="cardButton">
                                                                    <Link to={ROUTING.PHARMACY}>
                                                                        Book Now
                                                                    </Link>
                                                                </div>
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
                                        <div className="aboutUs">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                                    <div className="aboutPicOutter">
                                                        <img loading="lazy" src={aboutImg} alt="reload page" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                                    <div className="aboutPara">
                                                        <div className="heading">
                                                            <p>Who</p>
                                                            <p className='colored'>We</p>
                                                            <p>Are</p>
                                                        </div>
                                                        <div className="heading2">
                                                            <p>Growing towards Link <span>better</span>  and <span>healthier future</span>  for everyone</p>
                                                        </div>
                                                        <div className="paragraph">
                                                            <p>
                                                                We are a healthcare startup established in 2016; with technology that is acting as a bridge between PMC verified doctors, trusted and leading laboratories and patients. Our basic purpose is to provide better healthcare facilities for your utmost comfort.We want to make healthcare trusted, reliable and convenient. Healthcare is a very essential sector all over the world, however it has sadly been neglected in Pakistan over the years. It is also one of the world's largest and fastest-growing industries. We are here to make a difference and thrive in beneficial ways which will hopefully serve not only us, but all future generations.
                                                            </p>
                                                        </div>
                                                        <div className="aboutButton">
                                                            <Link to={ROUTING.ABOUTUS}>
                                                                Read More
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <VisibilitySensor
                                    onChange={(visibility) => setIsVisible(visibility)}
                                    active={!isVisible}
                                >
                                    <section className='employeeSection'>
                                        <div className="container">
                                            <div className="employee">
                                                <div className="employeeAbout">
                                                    <div className='employeeText'>
                                                        <p className='heading'>For Employers</p>
                                                        <p>If you're looking to hire workers in Link career at home, hire Link job
                                                            interview counselor, hiring manager, and other help.</p>
                                                    </div>
                                                    <div className='employeeContactButton'>
                                                        <Link to={ROUTING.CONTACT}>Contact Us</Link>
                                                    </div>
                                                </div>
                                                <div className="employeeBubbleDiv">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                                            <div className="bubbleOuter">
                                                                <div className="bubble">
                                                                    <div className="bubbleImage">
                                                                        <img loading="lazy" src={bubbleOne} alt="reload page" />
                                                                    </div>
                                                                    <p className='heading bubbleHeading'  > {isVisible ? <CountUp start={start} end={end} duration={2} /> : "0"}+</p>

                                                                    <p>Checkups <br /> and Lab Tests</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                                            <div className="bubbleOuter">
                                                                <div className="bubble">
                                                                    <div className="bubbleImage2">
                                                                        <img loading="lazy" src={bubbleTwo} alt="reload page" />
                                                                    </div>
                                                                    <p className='heading bubbleHeading'> {isVisible ? <CountUp start={partnerShipCount} end={partnerShipEnd} duration={2} /> : "0"} +</p>
                                                                    <p>Satisfied <br /> Customer</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                                            <div className="bubbleOuter">
                                                                <div className="bubble">
                                                                    <div className="bubbleImage">
                                                                        <img loading="lazy" src={bubbleThree} alt="reload page" />
                                                                    </div>
                                                                    <p className='heading bubbleHeading'>{isVisible ? <CountUp start={thirdCount} end={thirdCountEnd} duration={2} /> : "0"}+</p>
                                                                    <p>Partnership & <br /> Collaborations</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                                            <div className="bubbleOuter">
                                                                <div className="bubble">
                                                                    <div className="bubbleImage1">
                                                                        <img loading="lazy" src={bubbleFour} alt="reload page" />
                                                                    </div>
                                                                    <p className='heading bubbleHeading'>{isVisible ? <CountUp start={thirdCount} end={thirdCountEnd} duration={2} /> : "0"}+</p>
                                                                    <p>Professionals <br /> Doctor</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </VisibilitySensor>
                                <section>
                                    <div className="container">
                                        <div className="aboutUs">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                                    <div className="aboutPicOutter">
                                                        <div className="aboutPictures">
                                                            <div className="newsImage">
                                                                <img loading="lazy" src={newsImage} alt="reload page" />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                                    <div className="aboutPara">
                                                        <div className="heading1">
                                                            <p>What They Are Talking <span>About Us</span></p>
                                                        </div>
                                                        <Slider {...settings1}>

                                                            <div className="newsCard">
                                                                <div className="card">

                                                                    <div className="card-body">
                                                                        <div className="serviceBody">

                                                                            <div className="para">
                                                                                <p className='cardHeading'>So Convenient!</p>
                                                                                <p className='cardPara'>I ordered my lab tests through FMD, and the laborist arrived on time. It was so
                                                                                    convenient and preferable that I didn’t have to go to the lab to get tested when I was
                                                                                    sick. Superb service, Can’t recommend it enough!</p>
                                                                            </div>
                                                                            <div className='userReviewOuter'>
                                                                                <div className='userReview'>
                                                                                    <p className='cardHeading'>Sharon Smith</p>
                                                                                    <p className='cardPara'>Our Customer</p>
                                                                                    {/* <img loading="lazy" src={StarImg} alt="reload page" /> */}
                                                                                </div>
                                                                                <div className='rightSide'>
                                                                                    <img loading="lazy" src={CommaImg} alt="reload page" />
                                                                                    <a target='_blank' href="https://www.google.com/maps/place/Find+My+Doctor/@24.8307581,67.0323061,17z/data=!4m19!1m12!4m11!1m3!2m2!1d67.0356962!2d24.8317707!1m6!1m2!1s0x3eb33dd2bc650439:0x569fba265e542df8!2sFind+My+Doctor+CTC+%26+Shopping+Mall+Office+406,+4th+Floor+Khayaban-e-Iqbal+Rd,+Block+8+Clifton,+Karachi!2m2!1d67.0345589!2d24.8307581!3m5!1s0x3eb33dd2bc650439:0x569fba265e542df8!8m2!3d24.8307581!4d67.0345589!16s%2Fg%2F11llx3ch48?entry=ttu">
                                                                                        {/* <img loading="lazy" src={StarImg} alt="reload page" /> */}
                                                                                        Rate Us
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="newsCard">
                                                                <div className="card">

                                                                    <div className="card-body">
                                                                        <div className="serviceBody">

                                                                            <div className="para">
                                                                                <p className='cardHeading'>Got my Medicines on Time!</p>
                                                                                <p className='cardPara'>FMD is the most amazing service introduced in our country. I ran out of my medicines
                                                                                    last week and decided to order them through their app. And they delivered on time! Keep
                                                                                    it up, guys. We need more services like this.</p>
                                                                            </div>
                                                                            <div className='userReviewOuter'>
                                                                                <div className='userReview'>
                                                                                    <p className='cardHeading'>Mirza Hasan</p>
                                                                                    <p className='cardPara'>Our Customer</p>
                                                                                    {/* <img loading="lazy" src={StarImg} alt="reload page" /> */}
                                                                                </div>
                                                                                <div className='rightSide'>
                                                                                    <img loading="lazy" src={CommaImg} alt="reload page" />
                                                                                    <a target='_blank' href="https://www.google.com/maps/place/Find+My+Doctor/@24.8307581,67.0323061,17z/data=!4m19!1m12!4m11!1m3!2m2!1d67.0356962!2d24.8317707!1m6!1m2!1s0x3eb33dd2bc650439:0x569fba265e542df8!2sFind+My+Doctor+CTC+%26+Shopping+Mall+Office+406,+4th+Floor+Khayaban-e-Iqbal+Rd,+Block+8+Clifton,+Karachi!2m2!1d67.0345589!2d24.8307581!3m5!1s0x3eb33dd2bc650439:0x569fba265e542df8!8m2!3d24.8307581!4d67.0345589!16s%2Fg%2F11llx3ch48?entry=ttu">
                                                                                        {/* <img loading="lazy" src={StarImg} alt="reload page" /> */}
                                                                                        Rate Us
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="newsCard">
                                                                <div className="card">

                                                                    <div className="card-body">
                                                                        <div className="serviceBody">

                                                                            <div className="para">
                                                                                <p className='cardHeading'>Thank You For The Appointment!</p>
                                                                                <p className='cardPara'>Find My Doctor is perfect for booking your doctor's appointment. I didn’t want to keep
                                                                                    calling the doctor’s office to get my appointment, and thank God, FMD made it easier.
                                                                                    Booked a Physiotherapist through this app, and he was right on time!
                                                                                    Amazing!</p>
                                                                            </div>
                                                                            <div className='userReviewOuter'>
                                                                                <div className='userReview'>
                                                                                    <p className='cardHeading'>Saira Mansoor</p>
                                                                                    <p className='cardPara'>Our Customer</p>
                                                                                    {/* <img loading="lazy" src={StarImg} alt="reload page" /> */}
                                                                                </div>
                                                                                <div className='rightSide'>
                                                                                    <img loading="lazy" src={CommaImg} alt="reload page" />
                                                                                    <a target='_blank' href="https://www.google.com/maps/place/Find+My+Doctor/@24.8307581,67.0323061,17z/data=!4m19!1m12!4m11!1m3!2m2!1d67.0356962!2d24.8317707!1m6!1m2!1s0x3eb33dd2bc650439:0x569fba265e542df8!2sFind+My+Doctor+CTC+%26+Shopping+Mall+Office+406,+4th+Floor+Khayaban-e-Iqbal+Rd,+Block+8+Clifton,+Karachi!2m2!1d67.0345589!2d24.8307581!3m5!1s0x3eb33dd2bc650439:0x569fba265e542df8!8m2!3d24.8307581!4d67.0345589!16s%2Fg%2F11llx3ch48?entry=ttu">
                                                                                        {/* <img loading="lazy" src={StarImg} alt="reload page" /> */}
                                                                                        Rate Us
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="newsCard">
                                                                <div className="card">

                                                                    <div className="card-body">
                                                                        <div className="serviceBody">

                                                                            <div className="para">
                                                                                <p className='cardHeading'>Amazing Service!</p>
                                                                                <p className='cardPara'>I’m so happy we finally have the service to call doctors at home without any risk. Their
                                                                                    doctors are professional, punctual, and highly skilled. I would never stop recommending
                                                                                    them.</p>
                                                                            </div>
                                                                            <div className='userReviewOuter'>
                                                                                <div className='userReview'>
                                                                                    <p className='cardHeading'>Salman Ali</p>
                                                                                    <p className='cardPara'>Our Customer</p>
                                                                                    {/* <img loading="lazy" src={StarImg} alt="reload page" /> */}
                                                                                </div>
                                                                                <div className='rightSide'>
                                                                                    <img loading="lazy" src={CommaImg} alt="reload page" />
                                                                                    <a target='_blank' href="https://www.google.com/maps/place/Find+My+Doctor/@24.8307581,67.0323061,17z/data=!4m19!1m12!4m11!1m3!2m2!1d67.0356962!2d24.8317707!1m6!1m2!1s0x3eb33dd2bc650439:0x569fba265e542df8!2sFind+My+Doctor+CTC+%26+Shopping+Mall+Office+406,+4th+Floor+Khayaban-e-Iqbal+Rd,+Block+8+Clifton,+Karachi!2m2!1d67.0345589!2d24.8307581!3m5!1s0x3eb33dd2bc650439:0x569fba265e542df8!8m2!3d24.8307581!4d67.0345589!16s%2Fg%2F11llx3ch48?entry=ttu">
                                                                                        {/* <img loading="lazy" src={StarImg} alt="reload page" /> */}
                                                                                        Rate Us
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </Slider>


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
                                <section className='hiringSection'>
                                    <div className="container">
                                        <div className="hiringAbout">
                                            <div className='hiringText'>
                                                <p className='heading'>We are  <span>Hiring</span></p>
                                                <p>We are seeking Link highly skilled and compassionate doctor to join our
                                                    healthcare team and provide exceptional medical care to our patients.</p>
                                            </div>
                                            <div className='hiringContactButton'>
                                                <Link to={ROUTING.CONTACT}>Contact Us</Link>
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
                    }

                </div>
            </main>
        </>
    )
}
export default HomePage;
