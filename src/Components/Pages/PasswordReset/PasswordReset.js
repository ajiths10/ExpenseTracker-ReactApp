import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from "notistack";
import './PasswordReset.css'

const PasswordReset = () => {
    const [isLoading,setLoading] = useState(false);
    const emailRef = useRef();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const setAlert = (response) => {
        enqueueSnackbar(response.message, {
          variant: response.type === 1 ? "success" : "error",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
          preventDuplicate: true,
        });
      };

    const resetButtonhandler= async(event) => {
        event.preventDefault();
        const enteredEmail=emailRef.current.value;

        setLoading(true);
        try{
           const response = await axios.post('http://3.86.80.104:7777/auth/user/forgotpassword', { email: enteredEmail})
           setAlert(response.data);
           console.log(response.data)
          if (response.data.url) {
            // history.replace('/auth');
            window.open(response.data.url, '_blank', 'noopener,noreferrer');
           }
           setLoading(false);
        }catch(err){
            setAlert(  { message: "Something went wrong!" , type: 0 } )
            setLoading(false);
        }

    }
    const gotoHandler =(event) => {
        event.preventDefault();
        history.replace("/auth");
    }

    return(
        <div className='MainDiv' >
            <div className='subDiv'>
            <form className='MainForm'>
                <div className='Mainh1'>
                    <h1>Reset Password</h1>
                </div>
                <div className='Mainh1'>
                    <label className='Mainlabel'>Enter the email with you have registered.</label>
                </div >
                <div className='inputfielddiv'>
                    <input  className='inputfield' type='email' placeholder='Email' ref={emailRef} />
                </div>
                <div>
                    <button className='Mainbtn' onClick={resetButtonhandler} > {isLoading? 'Sending...' : 'Send Link'}</button>
                </div>
                <div className='downlabeldiv' >
                    <label className='downlabel' >Know your Password?<span className='downspan' onClick={gotoHandler} >Login </span> </label>
                </div>
            </form>
            </div>
        </div>
    )
}

export default PasswordReset;