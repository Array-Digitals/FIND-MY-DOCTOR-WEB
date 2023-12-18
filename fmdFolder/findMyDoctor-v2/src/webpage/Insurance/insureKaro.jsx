import React, { useRef, useState } from 'react'
import marketImg from '../../assets/images/Insurance/marketPlace.png'
import roshanDigitalImg from '../../assets/images/Insurance/roshanDigital.png'
import sehatCardImg from '../../assets/images/Insurance/sehatCard.png'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTING } from '../../utils/routes'

export const InsureKaro = () => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <div className="switchDiv firstSwitchDiv">
                <section>
                    <div className="container">

                        <div className="mainBody">
                            <div className="mainBodyHeading">
                                <h1>
                                    Choose Your Type of <span>Takaful</span>
                                </h1>
                            </div>
                            <div className="mainBodyInner">
                                <div className="rowButton wrapper ">

                                    <div className="columnButtons">
                                        <div className='radioButtonCheck'>
                                            <input type="radio" id="heartId" name="takafulType" value="InsuranceMarket" selected />
                                            <label className="radio-button" htmlFor="heartId" onClick={() => { navigate(ROUTING.INSURANCE) }} >


                                                <div className="imgDiv">
                                                    <img loading="lazy" src={marketImg} alt='' />
                                                </div>
                                                Insurance
                                                <br />
                                                Marketplace

                                            </label>
                                        </div>
                                    </div>
                                    {/* <div className="columnButtons">
                                        <div className='radioButtonCheck'>
                                            <input type="radio" id="kidneyId" name="takafulType" value="roshanDigital" />
                                            <label className="radio-button" htmlFor="kidneyId" onClick={() => { navigate(ROUTING.DIGITAL_ROSHAN) }}>
                                                <div className="imgDiv1">
                                                    <img loading="lazy" src={roshanDigitalImg} />
                                                </div>
                                                Roshan Digital <br /> Account
                                            </label>
                                        </div>
                                    </div>
                                    <div className="columnButtons">
                                        <div className='radioButtonCheck'>
                                            <input type="radio" id="orthoId" name="takafulType" value="sehatCard" />
                                            <label className="radio-button" htmlFor="orthoId " onClick={() => { navigate(ROUTING.SEHAT_CARD) }}>
                                                <div className="imgDiv">
                                                    <img loading="lazy" src={sehatCardImg} />
                                                </div>
                                                Sehat
                                                <br />
                                                Card
                                            </label>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>


    )
}
