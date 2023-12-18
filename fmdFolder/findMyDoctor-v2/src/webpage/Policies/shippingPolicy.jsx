import React from 'react'
import banner1 from '../../assets/images/banners/desktopBanner/shippingDesktop.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/shippingPolicyMob.jpg'

 const ShippingPolicy = () => {
    return (
        <>
            <>
                <main >
                    <form className="policy">
                        <section className="policyBanner">
                            <div className="banner">
                                <div className="bannerInner">
                                    <picture>
                                        <source srcSet={banner1} media='(min-width: 991px)' />
                                        <img loading="lazy" src={MobBanner1} alt="reload page" />
                                    </picture>
                                </div>
                            </div>
                        </section>
                        <div className="policyMain">
                            <div className="container">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="paragraphs">
                                            <div className='outerLi'>

                                                <p className='normalPara'>Delivery is free for orders above Rs 500
                                                    For orders under Rs 500, certain delivery charges will be applied
                                                    Delivery will be processed at earliest for consumers</p>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>
                </main >
            </>
        </>
    )
}

export default ShippingPolicy
