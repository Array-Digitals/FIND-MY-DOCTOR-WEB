import React, { useState } from 'react'
import AdminService from '../../services/adminApi';

export const UploadFile = ({ myDialogRef1, booking, test_id }) => {

    const { postUploadLabReport } = AdminService();
    const [file, setFile] = useState(null);


    const modalClose1 = () => {
        const myDialogClose = document.getElementById('myDialog1');
        myDialogClose.close();
    }



    const reportSubmit = () => {
        // console.log(booking, test_id, 'testt');

        if (!file) {
            console.log('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        postUploadLabReport(booking, test_id, formData).then((res) => {
            modalClose1();
            console.log(res, 'res');
        }).catch((res) => {
            console.log(res, 'err');
        })
    }


    return (
        <React.Fragment>
            <dialog id="myDialog1" ref={myDialogRef1}>
                <div className="dialogInner">
                    <button className="closeButton" onClick={modalClose1}>x</button>
                    <h3>Upload Report</h3>
                    <hr />
                    <input type="file" className='form-control' onChange={(e) => { setFile(e.target.files[0]) }} />
                    <hr />
                    <button className='submitButton' onClick={reportSubmit}>Upload</button>
                </div>
            </dialog>
        </React.Fragment>
    )
}
