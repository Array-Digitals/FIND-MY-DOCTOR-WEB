import React, { useState } from 'react';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'npm i ';

 const googleLogin = () => {

    const handleLoginSuccess = (response) => {
        const { email, name, phoneNumber } = response.profileObj;
        console.log(`Logged in as ${name} (${email}) with phone number ${phoneNumber}`);
      };
    
      const handleLoginFailure = (response) => {
        console.error(response);
      };

    return (
        <div>
            <button onClick={handleLogin}>Login with Google</button>
            {loggedIn && <p>You are logged in with Google.</p>}
        </div>
    )
}

export default googleLogin
