import React from 'react';
import banner1 from '../../assets/images/banners/desktopBanner/termOfUseDesktop.jpg';
import MobBanner1 from '../../assets/images/banners/mobileBanner/termOfUseMob.jpg';

 const TermsOfUse = () => {
    return (
        <React.Fragment>
            <main >
                <div className="policy">
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
                                    <ul className="paragraphs termsOfUse">
                                        <li className="outerLi">
                                            <p className="normalPara">
                                                Welcome to Find My Doctor! These terms of use ("Terms") govern your use of the Find My
                                                Doctor website, mobile apps, and online or mobile-enabled technology or digital tools
                                                (collectively referred to as the "Online Services"). By accessing or using our Online Services,
                                                you agree to these Terms. Please read them carefully.
                                            </p>
                                        </li>
                                        <li className='outerLi'>
                                            <p className='mainHeading'>Medical Information Disclaimer</p>
                                            <p className='normalPara'>The information provided on the Find My Doctor website, mobile application, and associated
                                                social media platforms (including Facebook, Instagram, Twitter, etc.) is for general
                                                informational purposes only and does not provide or substitute medical advice.</p>
                                            <p className='normalPara'>We make no representation or warranty of any kind, express or implied, regarding the
                                                accuracy, adequacy, validity, reliability, availability, or completeness of any information
                                                represented on our website or platforms.</p>
                                            <p className='normalPara'> Under no circumstances shall Find My Doctor be liable to you for any loss or damage
                                                incurred as a result of the use of information available on the website or associated platforms.
                                                User discretion is advised.</p>
                                            <p className="normalPara">
                                                In case of a medical emergency, call your local emergency helpline number and immediately
                                                seek professional medical advice.
                                            </p>

                                        </li>
                                        <li>
                                            <p className='mainHeading'>Medical Disclaimer</p>
                                            <p className='normalPara'>While we strive to provide accurate general information, no material on our site is intended
                                                to be a substitute for professional medical advice, diagnosis, or treatment, and it does not
                                                establish any kind of patient-doctor relationship through your use of this website.</p>
                                            <p className='normalPara'>While we strive to provide accurate general information, no material on our site is intended
                                                to be a substitute for professional medical advice, diagnosis, or treatment, and it does not
                                                establish any kind of patient-doctor relationship through your use of this website.</p>
                                            <p className='normalPara'>A patient/doctor relationship is established only after you have directly booked an
                                                appointment with a doctor/specialist/consultant. Find My Doctor acts as a third party and does
                                                not hold responsibility for the medical advice/opinion provided by the doctor you are consulting
                                                with, whether online or in person.</p>
                                            <p className='normalPara'>Always seek the advice of your physician or another qualified healthcare provider for any
                                                questions you may have regarding a medical condition, symptoms, or treatment before
                                                undertaking a new healthcare regimen. Never disregard professional medical advice or delay
                                                seeking it because of something you have read on this website or the associated social platforms.</p>
                                            <p className='normalPara'>Always seek the advice of your physician or another qualified healthcare provider for any
                                                questions you may have regarding a medical condition, symptoms, or treatment before
                                                undertaking a new healthcare regimen. Never disregard professional medical advice or delay
                                                seeking it because of something you have read on this website or the associated social platforms.</p>
                                            <p className='normalPara'> The doctors/general physicians on the Find My Doctor platform provide unbiased medical
                                                advice/opinions based on their clinical expertise. Find My Doctor is not responsible for the
                                                medical advice/opinion of individual doctors either via online consultation, in-person
                                                appointments, or on the health portal.</p>
                                        </li>
                                        <li>
                                            <p className='mainHeading'>Disclaimer of Endorsement</p>
                                            <p className='normalPara'>Third-party names, product names, and logos, particularly of pharmaceutical and healthcare
                                                companies, mentioned on our website may be the trademarks of their respective owners. We do
                                                not endorse or sponsor any product/company unless explicitly stated.</p>
                                            <p className='normalPara'> Find My Doctor makes no guarantees about the efficacy or safety of the drugs, products, or
                                                treatments described on the web pages. Health conditions and drug information are subject to
                                                change and are not intended to cover all possible uses, directions, precautions, warnings, drug
                                                interactions, allergic reactions, or adverse effects.</p>
                                            <p className='normalPara'> Find My Doctor does not recommend or endorse any specific test, clinician, clinical care
                                                provider, product, procedure, opinion, service, or other information that may be mentioned on
                                                our websites, mobile app, and other platforms.</p>

                                        </li>
                                        <li>
                                            <p className='mainHeading'>Physician Information</p>
                                            <p className='normalPara'>While we strive to obtain accurate data concerning physicians (including specialty,
                                                credentials, and training) from sources believed to be reliable and accurate, Find My Doctor
                                                cannot guarantee or warranty the accuracy, timeliness, or completeness of the information.</p>
                                            <p className='normalPara'> All medical and non-medical views, including religious and political beliefs and opinions
                                                shared by the doctors/medical specialists, are those of the individuals only and do not necessarily
                                                represent the views of Find My Doctor.</p>


                                        </li>
                                        <li>
                                            <p className='mainHeading'>External Links Disclaimer</p>
                                            <p className='normalPara'>The Find My Doctor website or its associated platforms may contain links to other websites
                                                or content belonging to or originating from third parties. Such external links are not monitored
                                                for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>
                                            <p className='normalPara'> Find My Doctor does not warrant, endorse, guarantee, or assume responsibility for the
                                                information and content offered by third-party websites.</p>

                                        </li>
                                        <li>
                                            <p className='mainHeading'>Privacy Policy</p>
                                            <p className='normalPara'>We value your privacy and have a separate Privacy Policy that explains how we collect, use,
                                                share, disclose, and protect personal information about users of our services. Please refer to our
                                                Privacy Policy for detailed information.</p>
                                            <p className='normalPara'> By using our services, you consent to the practices and policies outlined in our Privacy
                                                Policy.</p>
                                        </li>
                                        <li>
                                            <p className='mainHeading'>Intellectual Property Rights</p>
                                            <p className='normalPara'>All content, images, graphics, text, videos, materials, structure, and arrangement on the Find
                                                My Doctor platform are the property of Find My Doctor and are protected under copyright laws.
                                                Reproduction or copying of any part or whole of the site is, therefore, illegal. Any person or
                                                organization found guilty will be dealt with as per the law.</p>
                                        </li>
                                        <li>
                                            <p className='mainHeading'>Limitation of Liability</p>
                                            <p className='normalPara'> Find My Doctor is not liable for any personal injury, harm, including death, or infringement
                                                caused by the use or misuse of the services, content, or comments available on this website and
                                                associated online platforms. In no event shall Find My Doctor, its affiliates, licensors,
                                                contractors, or any of their respective employees or agents be liable for any damages, including
                                                but not limited to incidental and consequential damages.</p>
                                        </li>
                                        <li>
                                            <p className='mainHeading'>Changes to Terms of Use</p>
                                            <p className='normalPara'> Find My Doctor may update these Terms of Use at any time without prior notice. It is your
                                                responsibility to review the most current version of the Terms regularly. By continuing to use the
                                                Online Services after any changes are made, you accept and agree to the revised Terms.</p>
                                        </li>
                                        <li style={{ marginTop: '50px', textAlign: 'center' }}>
                                            <p className='normalPara'>If you have any questions or concerns about these Terms of Use, please contact us at
                                                info@findmydoctor.pk.</p>
                                            <p>
                                                Thank you for choosing Find My Doctor!
                                            </p>
                                        </li>


                                    </ul>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main >
        </React.Fragment>
    )
}

export default TermsOfUse