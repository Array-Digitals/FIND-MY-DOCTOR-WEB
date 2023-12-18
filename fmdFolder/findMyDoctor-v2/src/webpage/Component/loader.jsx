import React from 'react'
import loaderImg from '../../assets/images/loader.gif'

export const Loader = () => {
    return (
        <React.Fragment>
            <div className='LoaderMain'>
         
                    <img loading="lazy" src={loaderImg} alt="reload page" />
         
            </div>
        </React.Fragment>
    )
}
