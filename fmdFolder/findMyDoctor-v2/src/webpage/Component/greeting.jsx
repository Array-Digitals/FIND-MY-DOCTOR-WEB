import React from 'react'
import greetDoc from '../../assets/images/bookLab/confirmTest.png'
import { useNavigate } from 'react-router-dom/dist'
import { ROUTING } from "../../utils/routes";

export const Greeting = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='greet'>
                <div className="greetWrapper">
                    <img loading="lazy" src={greetDoc} alt="reload page" />
                    <p>Thank You! <br/> Our Health Representator Will Contact You Soon!</p>
                </div>
                <div className="greetWrapperButton">
                    <button onClick={ () =>{navigate(ROUTING.HOMEPAGE)} }>Go To Homepage</button>
                </div>

            </div>
        </>
    )
}
