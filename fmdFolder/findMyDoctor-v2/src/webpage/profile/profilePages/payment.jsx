
import React from 'react'
import { Link } from 'react-router-dom'

 const Payment = () => {
  return (
    <>
      <div className="profileWrapper">
        <div className="header">
          <div className="heading">
            <p className='mainHeading'>Payment</p>
            <p>Payment made easy, so you can worry less and enjoy more.</p>
          </div>
          <div className="headerButton">
            <button >Add Account</button>
          </div>

        </div>
        <div className="body">
          <div className="card">
            <div className="card-body">
              <div className="heading">
                <p className='cardHeading'>Habib Bank Limited</p>
                <div className="circles">
                  <div className="circle1"></div>
                  <div className="circle2"></div>
                </div>
              </div>
              <div className="cardNumber">
                  1234 4299 4242 000
              </div>
              <div className="aboutCard">
                Master Card
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Payment
