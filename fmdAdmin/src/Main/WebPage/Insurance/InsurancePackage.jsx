import React, { useEffect, useState } from 'react'
import AdminService from '../../../services/adminApi';
import insurancePicLogo from '../../../assets/images/Insurance.svg'
import insuranceService from '../../../services/insurance';
import { useRef } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { Loader } from '../../Component/loader';
// import { imageUrl } from '../../../services/baseUrl';

export const InsurancePackage = () => {

  // const { testRegister } = AdminService();

  const [isLoading, setIsLoading] = useState(false);
  const { insurancePlanPost, insuranceProviderGetAll } = insuranceService();
  const [testData, setTestData] = useState({
    name: "",
    // provider_name: "",
    annual_cost: "",
    for_parents: "1"
  })

  // useEffect(() => {
  //   console.log(testData, 'testtt');
  // }, [testData])

  const [allProvider, setAllProvider] = useState([])
  useEffect(() => {
    insuranceProviderGetAll().then((res) => {
      setAllProvider(res?.data?.data)
      // console.log(res.data.data, '');
    }).catch((res) => {
      console.log(res, 'error');
    })
  })

  const getLoginInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.type === 'select-one') {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const selectedValue = selectedOption.value;
      setTestData({ ...testData, [name]: selectedValue });
    } else {
      setTestData({ ...testData, [name]: value });
    }
  }
  const [newFeatures, setFeatures] = useState([])

  const getFeatureInput = (e, keyid) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;
    const updatedFeatures = [...newFeatures];
    const existingFeature = updatedFeatures.find((feature) => feature.keyid === keyid);

    if (existingFeature) {
      existingFeature[name] = value;
    } else {
      const newFeature = { keyid, [name]: value };
      updatedFeatures.push(newFeature);
    }

    setFeatures(updatedFeatures);
  };

  const formSubmit = (e) => {
    e.preventDefault()
    const features = JSON.stringify(newFeatures);
    const testSubmit = { ...testData, features }
    console.log(testSubmit, 'dafwff')
    // console.log(features, 'dddddd');
    setIsLoading(true)
    insurancePlanPost(testSubmit).then((res) => {
      console.log(res)
      toast.success("Package Added");
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const [addDesc, setAddDesc] = useState([1]);
  function handleAddMoreClick(e) {
    e.preventDefault();
    if (addDesc.length <= 8) {
      setAddDesc([...addDesc, ""]);
    }
    else {
      setAddDesc(addDesc);
    }

  }
  const handleServiceDelete = (index) => {
    index.preventDefault();
    console.log("clicked")
    const list = [...addDesc]
    list.splice(index, 1);
    setAddDesc(list)
  }

  return (
    <React.Fragment>
      <section className='mainSection'>
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <img src={insurancePicLogo} alt="" />
              <p>
                Insurance Package
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                {
                  isLoading
                    ?
                    <Loader />
                    :
                    <form className="additionForm" onSubmit={formSubmit}>
                      <div className="row g-4">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Package Name</label>
                            <input type="text" id='doctorName' name='name' placeholder='Enter Name...' required onChange={getLoginInput} />
                          </div>
                        </div>
                        {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Provider Name</label>
                            <select name="provider_name" onChange={getLoginInput}>
                           {
                            allProvider.map((item, keyId)=>(
                              <option key={keyId} value={item.id}>{item.fullname}</option>
                            ))
                           }
                            </select>
                          </div>
                        </div> */}
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Package For</label>
                            <select name="for_parents" onChange={getLoginInput} required>
                              <option value="1">Parents</option>
                              <option value="0">Children</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Annual Cost</label>
                            <input type="number" id='doctorName' name='annual_cost' placeholder='Enter Cost...' required onChange={getLoginInput} />
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div className="fields">

                            {addDesc.map((item, keyid) => (
                              <div key={keyid}>
                                <div className="packages">
                                  <div className="package1">
                                    <label htmlFor="doctorName">Package Features {keyid + 1} </label>
                                    <input type="text" id='doctorName' name='featureKey' placeholder='Enter Description...' onChange={(e) => getFeatureInput(e, keyid)} required />
                                  </div>
                                  <div className="package2">
                                    <label htmlFor="doctorName">Pricing</label>
                                    <input type="text" name='featureValue' placeholder='Enter Pricing...' onChange={(e) => getFeatureInput(e, keyid)} required />
                                  </div>
                                </div>
                              </div>
                            ))}

                          </div>

                          <div className='addMoreButton' >
                            {addDesc.length > 1 &&
                              <button onClick={handleServiceDelete}>remove</button>
                            }
                            {addDesc.length <= 8 &&
                              <button onClick={handleAddMoreClick}>add more</button>
                            }
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div className="fields">
                            <button type='Submit' >Submit</button>
                          </div>
                        </div>
                      </div>
                    </form>
                }

              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
