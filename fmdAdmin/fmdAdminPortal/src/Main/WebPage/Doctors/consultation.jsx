import React, { useState } from 'react'

import AdminService from '../../../services/adminApi'
import DoctorImageLogo from '../../../assets/images/Doctor.svg'

export const Consultation = () => {

    const { postConsultation } = AdminService();

    const [image, setConsultationImage] = useState();
    const [consultationData, setConsultationData] = useState({
      title: "",
      description: "",
    })
  
    const getLoginInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setConsultationData({ ...consultationData, [name]: value })
    }
  
    const setConImage = e => {
      const file = e.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // setdoctorImage(reader.result.split(',')[1]);
        setConsultationImage(reader.result);
      };
    }
  
    const submitForm = (e) => {
      e.preventDefault();
      const consultationRegister = { ...consultationData,image }
      console.log(consultationRegister, "doctorRegisterData");

      postConsultation(consultationRegister).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err, "Doctor Register Error")
      })
    }
  
    return (
      <>
        <section className='mainSection'>
          <div className="container">
            <div className="mainSectionWrapper">
              <div className="heading">
              <img src={DoctorImageLogo} alt="" /> 
                <p>
                  Add Doctor
                </p>
              </div>
              <div className="card cardForm">
                <div className="card-body">
                  <form className="additionForm" onSubmit={submitForm}>
                    <div className="row g-4">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorImage">Image</label>
                          <input type="file" className='form-control' id='doctorImage' name='image' onChange={setConImage} />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorName">Name</label>
                          <input type="text" id='doctorName' name='title' placeholder='Enter Name...' onChange={getLoginInput} />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                        <div className="fields">
                          <label htmlFor="doctorEmail">Description</label>
                          <input type="text" id='doctorEmail' name='description' placeholder='Enter Email...' onChange={getLoginInput} />
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                        <div className="fields">
                          <button type='Submit'>Submit</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
}
