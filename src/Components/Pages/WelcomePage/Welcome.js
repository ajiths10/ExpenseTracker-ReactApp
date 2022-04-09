import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () =>{
    const [checkVerified , setverified] = useState(false)


    const autoVerifyEmailCheck = async() =>{
        const jwttoken = localStorage.getItem('JWTTOKEN');

        const token = localStorage.getItem('JWTTOKEN');

        try{
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrNT0jOFIUrCoslzyrlcZDJIUqzYGvDLc',
            {
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                    oobCode: 'User Verified. Thank you!!',
                    returnSecureToken: true,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            if(res.ok){
                const data = await res.json();
                console.log(data.emailVerified);
                console.log('Send success');
                if(data.emailVerified){
                    setverified(true);
                }
            }

        }catch(err){
            console.log(`Error = ${err}`);
        }
    }

useEffect(()=>{
    autoVerifyEmailCheck();
},[])


    const verifyHandler = async() =>{
        const token = localStorage.getItem('JWTTOKEN');

        try{
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCrNT0jOFIUrCoslzyrlcZDJIUqzYGvDLc',
            {
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                    requestType: 'VERIFY_EMAIL',
                    returnSecureToken: true,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            if(res.ok){
                const data = await res.json();
                console.log(data);
                console.log('Send success');
                alert('Verification Mail sent!');
            }

        }catch(err){
            console.log(`Error = ${err}`);
        }
    } 

    return(
    <div className="WelcomebackgroundDiv" >
        <div className="headingh1">
            <div>
                <h1 >Welcome to Expense Tracker</h1>
            </div>
            <div className="message">
                <label className="labelText" > Your Profile is Incomplete. <Link to='/user' className="ComleteNow" >Complete Now</Link> </label>
            </div>
            <div className="verifyDiv" >
                {!checkVerified && <button onClick={verifyHandler} className="verifyBtn" > Verify Email</button>}
            </div>
        </div>
    </div>)
}

export default Welcome;