import React,{useState} from 'react'
import Slider from 'react-slick'
import banner1 from '../../assets/images/banners/desktopBanner/HomeBan1Desk.jpg'
import banner2 from '../../assets/images/banners/desktopBanner/HomeBan2Desk.jpg'
import banner3 from '../../assets/images/banners/desktopBanner/HomeBan3Desk.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/homeBan1.jpg'
import MobBanner2 from '../../assets/images/banners/mobileBanner/homeBan2.jpg'
import MobBanner3 from '../../assets/images/banners/mobileBanner/homeBan3.jpg'
import errorImg from '../../assets/images/error404.png'
export const Page404 = () => {
    const [settings1, setSettings1] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    return (
        <React.Fragment>
            <main>
                <div className="homePage">

                    <div className="homePageInner">
                        <section>
                            <Slider {...settings1}>
                                <div className="banner">
                                    <div className="bannerInner">
                                        <picture>
                                            <source srcSet={banner1} media='(min-width: 991px)' />
                                            <img loading="lazy" src={MobBanner1} alt="reload page" />
                                        </picture>
                                    </div>
                                </div>
                                <div className="banner">
                                    <div className="bannerInner">
                                        <picture>
                                            <source srcSet={banner2} media='(min-width: 991px)' />
                                            <img loading="lazy" src={MobBanner2} alt="reload page" />
                                        </picture>
                                    </div>
                                </div>
                                <div className="banner">
                                    <div className="bannerInner">
                                        <picture>
                                            <source srcSet={banner3} media='(min-width: 991px)' />
                                            <img loading="lazy" src={MobBanner3} alt="reload page" />
                                        </picture>
                                    </div>

                                </div>
                            </Slider>
                        </section>
                        <section>
                            <div className="container">
                                <div className='error404'>
                                    <img loading="lazy" src={errorImg} alt="reload page" />
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
            </main>


        </React.Fragment>
    )
}
