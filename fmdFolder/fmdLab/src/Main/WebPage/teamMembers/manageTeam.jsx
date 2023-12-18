import React from 'react'
import { Link } from 'react-router-dom';

export const ManageTeam = () => {
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "PMDA ID", key: "pmda_id" },
    { label: "CNIC", key: "cnic" },
    { label: "Availability", key: "availability" },
    { label: "Sspeciality", key: "speciality" },

  ];

  const data = [
    {id:"1", name: "tobi", email_address: "tobi@gmail.com", phone: "0123456789",address:"    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, ipsum.", timing:"12:00 - 8:00"},
    {id:"1", name: "tobi", email_address: "tobi@gmail.com", phone: "0123456789",address:"    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, ipsum.", timing:"12:00 - 8:00"},
    {id:"1", name: "tobi", email_address: "tobi@gmail.com", phone: "0123456789",address:"    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, ipsum.", timing:"12:00 - 8:00"},
    {id:"1", name: "tobi", email_address: "tobi@gmail.com", phone: "0123456789",address:"    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, ipsum.", timing:"12:00 - 8:00"},
    {id:"1", name: "tobi", email_address: "tobi@gmail.com", phone: "0123456789",address:"    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, ipsum.", timing:"12:00 - 8:00"},
  ]
  return (
    <>
      <section className='mainSection'>
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <p>
                Manage Test
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">EmpID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Phone#</th>
                        <th scope="col">Address</th>
                        <th scope="col">Timing</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, keyid) => {
                        return (
                          <tr key={keyid}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email_address}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.timing}</td>
                            <td><Link href=""><i className="bi bi-pen"></i></Link> <Link href=""><i className="bi bi-trash3"></i></Link> </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
