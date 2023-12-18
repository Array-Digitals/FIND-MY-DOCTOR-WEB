import React from 'react'
import { Link } from 'react-router-dom';

export const ManageTest = () => {
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
    {id:"1", name: "Blood Test", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", price: "Rs 500"},
    {id:"1", name: "Blood Test", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", price: "Rs 500"},
    {id:"1", name: "Blood Test", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", price: "Rs 500"},
    {id:"1", name: "Blood Test", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", price: "Rs 500"},
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
                      <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, keyid) => {
                        return (
                          <tr key={keyid}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                           
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
