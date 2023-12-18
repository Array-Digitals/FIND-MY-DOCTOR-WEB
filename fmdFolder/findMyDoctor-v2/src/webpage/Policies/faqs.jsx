import React from 'react'
import banner1 from '../../assets/images/banners/desktopBanner/faqsDesktop.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/faqsMobile.jpg'

 const Faqs = () => {
  return (
    <>
      <main >
        <form className="policy">
          <section className="policyBanner">
            <div className="banner">
              <div className="bannerInner">
                <picture>
                  <source srcSet={banner1} media='(min-width: 991px)' />
                  <img loading="lazy" src={MobBanner1} alt="reload page" />
                </picture>
              </div>
            </div>
          </section>
          <div className="policyMain">
            <div className="container">
              <div className="card">
                <div className="card-body">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          What Services does Find My Doctor offer?
                        </button>
                      </h2>
                      <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          FindMyDoctor is a healthcare startup that aims to give consumers control over all aspects of their healthcare ecosystem. We currently offer Insurance Products, Lab Tests, Scheduled and Urgent Home Doctor Visits and Pharmacy Delivery (in under 100 minutes). We are constantly innovating and increasing our service offering.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          How do I user Find My Doctor?
                        </button>
                      </h2>
                      <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          FindMyDoctor can be accessed via the web (http://www.findmydoctor.pk/) or through the FindMyDoctor Application on the Google Play Store and the iOS App Store. You will need to create an account in order to avail services.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          Are the IOS, Andriod and Web version of Find My Doctor the same?
                        </button>
                      </h2>
                      <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          Yes, you will have full functionality and availability of all services through FindMyDoctor.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                          I don't own a smartphone. Can I still avail FindMyDoctor Services?
                        </button>
                      </h2>
                      <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          Yes, you can request information or order services through our helpline: 0313-LABTEST

                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseThree">
                          Where can I avail Find My Doctor services?
                        </button>
                      </h2>
                      <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          Our Lab Tests and Home Doctor Visits are available in 7 cities across Pakistan. These cities include Karachi, Hyderabad, Lahore, Islamabad, Rawalpindi, Peshawar and Multan. Our Pharmacy Delivery Service is currently only available in Karachi.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
                          Who are the medical professionals on Find My Doctor?
                        </button>
                      </h2>
                      <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          We have Pakistan Medical Commission (PMC) verified leading General Physicians from Pakistan.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseThree">
                          Where are Lab Tests conducted from?
                        </button>
                      </h2>
                      <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          Lab tests are conducted through leading and trusted labs across Pakistan.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseThree">
                          How long does it take to receive my Sehat Card?
                        </button>
                      </h2>
                      <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          Sehat cards are delivered within 14 working days of applying.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseThree">
                          Where can I see my lab test results?
                        </button>
                      </h2>
                      <div id="collapseNine" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          You can access Lab Test Results through the “Medical History” section in the menu on the FindMyDoctor application. Immediately after a new test result is uploaded, you will also receive a push notification on your phone, which will take you to the report.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseThree">
                          Can I order services for my family through the application?
                        </button>
                      </h2>
                      <div id="collapseTen" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          Yes, you can order services for anyone through the application. In the case of Lab Tests, reports will be uploaded to the account that requested the test.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseThree">
                          Does FindMyDoctor offer corporate solutions?
                        </button>
                      </h2>
                      <div id="collapseEleven" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          Yes, we have worked with several organizations for their various requirements in the past. We also have a robust plan of launching corporate-centric solutions to help enable organizations to manage their Healthcare Systems and Incentives more efficiently.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseThree">
                          How can I pay for Find My Doctor's services?
                        </button>
                      </h2>
                      <div id="collapseTwelve" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          We accept card payments via the mobile and web applications and offer Cash on Delivery services as well.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThree">
                          What is the refund policy on FindMyDoctor?
                        </button>
                      </h2>
                      <div id="collapseThirteen" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          Our refund policy varies by product. For Lab Tests, Pharmacy Delivery and At Home Consultations, refunds are applicable if the service has not yet been availed. For our insurance products, you can call our helpline to obtain more information (0313 LABTEST).
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main >
    </>
  )
}

export default Faqs
