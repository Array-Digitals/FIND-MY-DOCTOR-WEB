import React, { useEffect, useState } from 'react'
import AdminService from '../../../services/adminApi';
import profilePic from '../../../assets/images/guy.png'
import insurancePicLogo from '../../../assets/images/Insurance.svg'
import insuranceService from '../../../services/insurance';
import { useParams } from 'react-router';
import { imageUrl } from '../../../services/baseUrl';
import { Loader } from '../../Component/loader';
import { ToastContainer, toast } from 'react-toastify';


export const InsuranceProviderUpdate = () => {

  const { insuranceProviderUpdate, insuranceProviderGet } = insuranceService();
  const { updateUserMeta,getUserMeta } = AdminService();
  const { providerId } = useParams();

  // let imageUrl = "http://192.168.18.96:3000"
  // let imageUrl = "http://fmd.arraydigitals.com"


  const [insuranceImg, setInsuranceImg] = useState("");
  const [testData, setTestData] = useState({})
  const [imageFromApi, setImageFromApi] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  // console.log(testData, 'dasdasdcccc');

  // console.log(imageFromApi, 'imageFromApi');
  // console.log(testData, 'testDataa');

  // console.log(testData, 'ddd');
  const getLoginInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTestData({ ...testData, [name]: value })
  }

  const setInsuranceImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setInsuranceImg(reader.result);
    };
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const testSubmit = { ...testData, id: providerId };

    // if (insuranceImg) {
    //   testSubmit.logo = insuranceImg;
    // }
    setIsLoading(true);
    // console.log(testSubmit);

    insuranceProviderUpdate(testSubmit)
      .then((res) => {
        console.log(res);
        const userMeta = {
          user: testData?.id, key: 'image', value: insuranceImg
      }
      // console.log(userMeta, 'asddddddd');
      if (insuranceImg) {
          updateUserMeta(userMeta)
              .then((res) => {
                  console.log(res, 'res');
              })
              .catch((res) => {
                  console.log(res, 'err');
              })
      }
        toast.success("Provider Updated")
      })
      .catch((err) => {
        console.log(err.message);
      }).finally(() => {
        setIsLoading(false)
      })
  };

const [adminMetaImage, setAdminMetaImage] = useState('')
  useEffect(() => {
    insuranceProviderGet(providerId).then((res) => {
      setImageFromApi(res?.data?.data[0].logo)
      const { logo, type, ...newData } = res?.data?.data[0]
      setTestData(newData)
    }).catch((res) => {
      console.log(res, 'error');
    })
    getUserMeta(providerId).then((res) => {
      setAdminMetaImage(res.data.data[0].meta_value)
    }).catch((res) => {
      console.log(res, 'error');
    })
  }, [])





  return (
    <React.Fragment>
      <section className='mainSection'>
        <div className="container">
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
          <div className="mainSectionWrapper">
            <div className="heading">
              <img src={insurancePicLogo} alt="" />
              <p>
                Insurance Provider
              </p>
            </div>
            {
              isLoading ?
                <Loader />
                :
                <div className="card cardForm">
                  <div className="card-body">
                    <form className="additionForm" onSubmit={formSubmit}>
                      <div className="row g-4">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div className="fields">
                            <div className="profileImage">
                              <img src={insuranceImg || `${imageUrl}/${adminMetaImage}` || profilePic} alt="" className='profileImage' />
                            </div>

                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Name</label>
                            <input type="text" id='doctorName' name='fullname' placeholder={testData.fullname} onChange={getLoginInput} />
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Email</label>
                            <input type="email" id='doctorName' name='email' placeholder={testData.email} onChange={getLoginInput} />
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Logo</label>
                            <input type="file" className='form-control' id='doctorName' name='logo' onChange={setInsuranceImage} />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Number</label>
                            <input type="number" id='doctorName' name='phone' placeholder={testData.phone} onChange={getLoginInput} />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Website</label>
                            <input type="text" id='doctorName' name='website' placeholder={testData.website} onChange={getLoginInput} />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Head Office Address</label>
                            <input type="text" id='doctorName' name='headofficeAddress' placeholder={testData.headofficeAddress} onChange={getLoginInput} />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Contact Person Number</label>
                            <input type="text" id='doctorName' name='contactPersonNumber' placeholder={testData.contactPersonNumber} onChange={getLoginInput} />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                          <div className="fields">
                            <label htmlFor="doctorName">Contact Person Name</label>
                            <input type="text" id='doctorName' name='name' placeholder={testData.name} onChange={getLoginInput} />
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                          <div className="fields">
                            <button type='Submit' >Submit</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
            }

          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
