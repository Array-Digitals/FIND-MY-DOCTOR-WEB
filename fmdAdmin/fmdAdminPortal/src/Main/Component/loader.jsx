import React from 'react'
import loaderImg from '../../assets/images/loader.gif'

export const Loader = () => {
    return (
        <React.Fragment>
            <div className='LoaderMain'>
         
                    <img src={loaderImg} alt="" />
         
            </div>
        </React.Fragment>
    )
}
