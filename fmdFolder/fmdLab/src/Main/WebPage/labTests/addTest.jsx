import React from 'react'

export const AddTest = () => {
  return (
    <>
      <section className='mainSection'>
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <p>
                Add Test
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">
                <form className="additionForm" >
                  <div className="row g-4">

                
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="labEmail">Lab Test</label>
                        <input type="text" id='description' name='test' placeholder='Enter Test Name...' />
                       {/* <select name="" id="">
                        <option value="">Blood Test</option>
                       </select> */}
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="description">Description</label>
                        <input type="number" id='description' name='description' placeholder='Enter Description...' />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="price">Price</label>
                        <input type="number" id='price' name='price' placeholder='Enter Price...' />
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
          </div>
        </div>
      </section>
    </>
  )
}
