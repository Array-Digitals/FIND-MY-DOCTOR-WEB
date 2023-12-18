import React from 'react'
import banner1 from '../../assets/images/banners/desktopBanner/returnDesktop.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/returnPolicyMob.jpg'

 const ReturnPolicy = () => {
    return (
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
                                    <ol className="paragraphs">
                                        <li className='outerLi'>
                                            <p className='mainHeading'>What Is Find My Doctors Return Policy?</p>
                                            <p className='normalPara'>Order can be returned under the following condition that items delivered are faulty or do not match the specification as mentioned on the website
                                                If the item is opened or used it is not eligible for return so kindly check the package when you receive it
                                                If product is damaged it is not eligible for return
                                                If the product, packaging have been dismantled the customer should not accept the order</p>

                                        </li>
                                        <li>
                                            <p className='mainHeading'>How Can I Return The Item?</p>
                                            <p className='normalPara'>You can request return at our helpline 0313-LABTEST within 24 hours of delivery
                                                You are requested to return the item with all its original packing and its original condition
                                                The timeframe of the refund of the item will be processed on the day of request of return</p>
                                        </li>

                                    </ol>

                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </main >
        </>
    )
}
export default ReturnPolicy