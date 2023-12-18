import React, { useState } from 'react'

export const AddBeneficiary = ({myDialogRef3, sendDataToParent }) => {

    const [phoneError, setPhoneError] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const modalClose3 = () => {
        const myDialog3 = document.getElementById('myDialog3');
        myDialog3.close();
    }

    const formSubmitBeneSession = (e) => {
        e.preventDefault();
        try {
          localStorage.setItem("temporaryBeneficiary", JSON.stringify(beneficiaryInSession));
          modalClose3();
          sendDataToParent(true);
        } catch (err) { 
          console.log(err);
        }
    };

    const [beneficiaryInSession, setBeneficiaryInSession] = useState({
        fullname: "",
        relation: "",
        nick: "",
        gender: "",
        dob: "",
        phone:"",
        city:"",
        address:"",
        policyno:"",
        cnic:"",
    });
    const getSignupInput = e => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'phone') {
            const phoneValue = value.trim();
            // Check if the value is empty or exactly 13 characters long
            if (phoneValue.length === 11 || phoneValue.length === 12) {
                setPhoneError(false);
                setSubmitButtonDisabled(false);
            } else {
                setPhoneError(true);
                setSubmitButtonDisabled(true);
            }
        }

        setBeneficiaryInSession({ ...beneficiaryInSession, [name]: value })
    }



    return (
        <React.Fragment>

            <div className="SignupPopMain">

                <dialog id="myDialog3" ref={myDialogRef3}>
                    <div className="dialogMain">
                        <div className="closeButton" onClick={modalClose3}>
                            <i className="ri-close-line"></i>
                        </div>
                        <div className="dialogInner">
                            <h1>Add Beneficiary</h1>
                            <form className="authFormMain" onSubmit={formSubmitBeneSession}>
                                <div className="authField">
                                    <i className="formIcon ri-user-3-line"></i>
                                    <div className="formFieldsInner form-floating mb-3 ">
                                        <input type="text" placeholder='Name' className="form-control userInputName" id="floatingInput10" name='fullname' onChange={getSignupInput} required />
                                        <label htmlFor="floatingInput10">Enter Name...</label>
                                    </div>
                                </div>
                                <div className="authField">
                                    <i className="formIcon ri-phone-line"></i>
                                    <div className={`formInputRelative formFieldsInner form-floating mb-3 ${phoneError ? 'error' : ''}`}>
                                        <input placeholder= 'phone Number' type="number" className="form-control userInputName" id="floatingInput11" name='phone' onChange={getSignupInput} required />
                                        <label htmlFor="floatingInput11">Enter Phone Number...</label>
                                        {phoneError && <p className="errorMessage">Enter Valid Phone Number</p>}
                                    </div>
                                </div>
                                <div className="authField">
                                    <i className="formIcon ri-parent-line"></i>
                                    <div className="formFieldsInner form-floating mb-3 ">
                                        <input placeholder='Relation' type="text" className="form-control userInputName" id="floatingInput13" name='relation' onChange={getSignupInput} required />
                                        <label htmlFor="floatingInput13">Enter Relationship...</label>
                                    </div>
                                </div>
                                <div className={`authField ${submitButtonDisabled ? 'beneErrorButton' : ''}`}>
                                    <button className="themeButton authPopupButton" disabled={submitButtonDisabled} >Submit</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </dialog>

            </div>

        </React.Fragment>
    )
}
