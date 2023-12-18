import React from 'react'

export const AddTeam = () => {
  return (
 <>
       <section className='mainSection'>
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <p>
                Add Member
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">
                <form className="additionForm" >
                  <div className="row g-4">

                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="labName">Name</label>
                        <input type="text" id='labName' name='fullname' placeholder='Enter Name...' />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="labEmail">Email</label>
                        <input type="email" id='labEmail' name='email' placeholder='Enter Email...' />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="labPhone">Phone</label>
                        <input type="number" id='labPhone' name='phone' placeholder='Enter Number...' />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="labMemberAddress">Address</label>
                        <input type="text" id='labMemberAddress' name='address' placeholder='Enter Address...' />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="timeFrom">Time From</label>
                        <input type="time" id='timeFrom' name='timeStarts' />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <div className="fields">
                        <label htmlFor="timeTo">Time To</label>
                        <input type="time" id='timeTo' name='timeEnds' />
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
