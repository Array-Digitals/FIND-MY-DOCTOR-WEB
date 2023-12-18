import React, { useState, useEffect, useRef } from 'react'
import self from '../../assets/images/BookDoctor/self.png'
import family from '../../assets/images/BookDoctor/family.png'
import { Link, useNavigate } from 'react-router-dom';
import { ROUTING } from '../../utils/routes';
import TokenService from "../../services/token.service";
import { AddBeneficiary } from '../Component/addBeneficiary';
import UserData from '../../services/userData'




 const BuyingFor = ({isForBeneficiary}) => {


    const navigate = useNavigate();
    const { getToken, rememberGet } = TokenService()
    const [beneOption, setBeneOption] = useState(false);
    const [beneSession, setBeneSession] = useState();
    const [isBeneficiary, setisBeneficiary] = useState("");
    const [selectedBene, setSelectedBene] = useState();
    const [allBeneficiary, setAllBeneficiary] = useState([]);
    const { getBeneficiary } = UserData();


    useEffect(() => {
        isForBeneficiary(isBeneficiary)
        // console.log(isForBeneficiary  , 'casdasd');
    }, [isBeneficiary])

    const myDialogRef3 = useRef(null);
    const triggerBenePopup3 = () => {
        if (myDialogRef3.current) {
            myDialogRef3.current.showModal();
        }
    };
    const handleDataBenePopup = (data) => {
        if (data) {
            setisBeneficiary('yes');
        }
    };
    const onChangeBeneficiary = e => {
        setSelectedBene(e.target.value)
        setisBeneficiary('yes');
    }

    useEffect(() => {
        setBeneSession(localStorage.getItem("temporaryBeneficiary"))
    }, [beneSession, isBeneficiary])
    useEffect(() => {
        if (getToken(rememberGet())) {
            getBeneficiary().then((res) => {
                setAllBeneficiary(res?.data?.data);
            }).catch((err) => {
                console.log('error', err);
            })
        }
    }, [])


    const getTestFor = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "LabBookedFor" && value === "self") {
            setisBeneficiary("no");
            setBeneOption(false)
        } else {
            console.log("beneficiary selected")
            //is user Logged in?
            if (getToken(rememberGet())) {

                setBeneOption(true);
                if (selectedBene) {
                    setisBeneficiary('yes');
                }
                else {
                    setisBeneficiary('');
                }
            }
            else {
                if (beneSession) {
                    console.log('user not Logged In beneficiary exist');
                    setisBeneficiary('yes');
                }
                else {
                    console.log('user not Logged In beneficiary not exist');
                    triggerBenePopup3();
                    setisBeneficiary('');

                }
            }
        }
    };

    return (
        <>
            <section>
                <div className="container">

                    <div className="mainBody">
                        <div className="mainBodyHeading">
                            <h1>
                                Who Are You <span>Buying</span> For?
                            </h1>
                        </div>
                        <div className="mainBodyInner">
                            <div className="rowButton wrapper ">
                                <div className='radioButtonCheck'>
                                    <input type="radio" id="option0" name="LabBookedFor" value="self" onChange={getTestFor} />
                                    <label className="radio-button" htmlFor="option0">
                                        <div className="imgDiv">
                                            <img loading="lazy" src={self} alt='' />
                                        </div>
                                        Self
                                    </label>
                                </div>
                                <div className='radioButtonCheck'>
                                    <input type="radio" id="option2" name="LabBookedFor" value="family" onChange={getTestFor} />
                                    <label className="radio-button" htmlFor="option2">
                                        <div className="imgDiv">
                                            <img loading="lazy" src={family} alt='' />
                                        </div>
                                        Beneficiary
                                    </label>
                                </div>

                            </div>
                            {
                                beneOption &&
                                <div className="selectBeneficiary">
                                    {allBeneficiary.length >= 1 ?

                                        <select name="selectBeneficiaryBook" id="" onChange={onChangeBeneficiary}>
                                            <option disabled selected>Select Beneficiary</option>
                                            {allBeneficiary.map((item, keyId) => {
                                                return (
                                                    <option key={keyId} value={item?.id}>{item?.fullname}</option>
                                                )
                                            })}
                                        </select>


                                        :
                                        <div className="missingBene">
                                            <Link to={ROUTING.BENEFICIARY}><i className="ri-add-line"></i> Add Beneficiary</Link>
                                        </div>

                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="pagging">
                    <div className="container">
                        <div className="wrapper">
                            <div className="buttons">
                                <div>
                                    <button href="#" className='nextButton' onClick={() => { navigate(ROUTING.OURPRODUCTS) }} disabled={!isBeneficiary}><i className="bi bi-arrow-right"></i></button>
                                </div>
                                {/* <div className="progressBar">
                                    <progress min="0" max="70" value="10" id='pageProgress' />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </section>


            {/* <LoginPopup myDialogRef1={myDialogRef1} onRegisteredBeneChange={handleRegisteredBeneChange} /> */}
            <AddBeneficiary myDialogRef3={myDialogRef3} sendDataToParent={handleDataBenePopup} />
        </>
    )
}

export default BuyingFor