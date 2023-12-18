import React from 'react'

 const Billing = () => {
  return (
    <>
      <div className="profileWrapper">
        <div className="header">
          <div className="heading">
            <p className='mainHeading'>Billing</p>
            <p>Billing made simple, so you can focus on what matters most.</p>
          </div>
        </div>
        <div className="body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>List Payments</th>
                  <th>Title</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Booking</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lorem, ipsum.</td>
                  <td>Lorem ipsum dolor sit.</td>
                  <td>22:00</td>
                  <td>09/05/2022</td>
                  <td>Lorem, ipsum.</td>

                </tr>
                <tr>
                <td>Lorem, ipsum.</td>
                  <td>Lorem ipsum dolor sit.</td>
                  <td>22:00</td>
                  <td>09/05/2022</td>
                  <td>Lorem, ipsum.</td>

                </tr>
                <tr>
                <td>Lorem, ipsum.</td>
                  <td>Lorem ipsum dolor sit.</td>
                  <td>22:00</td>
                  <td>09/05/2022</td>
                  <td>Lorem, ipsum.</td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default Billing