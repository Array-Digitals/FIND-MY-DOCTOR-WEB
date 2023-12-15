import React from 'react'
import image404 from "../../assets/images/error404.png"

export const Page404 = () => {
    return (

        <React.Fragment>
            <section className='mainSection'>
                <div className="container">
                    <div className="mainSectionWrapper">
                        <div className='page404'>
                            <img src={image404} alt="" />
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}
