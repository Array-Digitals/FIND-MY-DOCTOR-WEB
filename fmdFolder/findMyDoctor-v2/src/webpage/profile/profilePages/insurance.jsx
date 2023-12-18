import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTING } from '../../../utils/routes'

const Insurance = () => {
  return (
    <>
      <div className="profileWrapper">
        <div className="header">
          <div className="heading">
            <p className='mainHeading'>Insurance - Plan B</p>
            <p>Payment made easy, so you can worry less and enjoy more.</p>
          </div>
          {/* <div className="headerButton">
            <Link to={ROUTING.INSURANCE}>Change Plan</Link>
          </div> */}

        </div>
        <div className="body">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Insurance Payment Plan A
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>

                          <th >Coverage</th>
                          <th >Limit</th>
                          <th >Deduction</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Lorem ipsum dolor sit.</td>
                          <td>1,000,000 RS</td>
                          <td>1,000 RS</td>
                        </tr>
                        <tr>
                          <td>Lorem ipsum dolor sit.</td>
                          <td>1,000,000 RS</td>
                          <td>1,000 RS</td>
                        </tr>
                        <tr>
                          <td>Lorem ipsum dolor sit.</td>
                          <td>1,000,000 RS</td>
                          <td>1,000 RS</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="totalBill">
                    <p> Your Bill: 3,000,000 RS</p>
                    <button>See Bill</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Insurance Payment Plan B
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>

                          <th >Coverage</th>
                          <th >Limit</th>
                          <th >Deduction</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Lorem ipsum dolor sit.</td>
                          <td>142454 RS</td>
                          <td>142454 RS</td>
                        </tr>
                        <tr>
                          <td>Lorem ipsum dolor sit.</td>
                          <td>142454 RS</td>
                          <td>142454 RS</td>
                        </tr>
                        <tr>
                          <td>Lorem ipsum dolor sit.</td>
                          <td>142454 RS</td>
                          <td>142454 RS</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="totalBill">
                    <p> Your Bill: 124155 RS</p>
                    <button>See Bill</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Insurance
