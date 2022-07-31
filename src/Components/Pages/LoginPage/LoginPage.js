import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginPage.css";
import { authActions } from "../../../store/auth";
import Context from "../../../Context/Context";
import axios from "axios";
import { useSnackbar } from "notistack";
import { premiumActions } from "../../../store/PremiumBtn";

const LoginPage = () => {
  const dispatch = useDispatch();
  const CTX = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();
  const { forReload } = CTX;
  const emailRef = useRef();
  const passwordOneRef = useRef();
  const passwordTwoRef = useRef();
  const FullNameRef = useRef();
  const [swapCheck, setSwap] = useState(false);
  const history = useHistory();

  const setAlert = (response) => {

    enqueueSnackbar(response.message, {
      variant: response.type === 1 ? "success" : "error",
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
      preventDuplicate: true,
    });
  };

  const swapHandler = (event) => {
    event.preventDefault();
    setSwap((preValue) => !preValue);
  };

  const SignupBtnHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordOneRef.current.value;
    const enteredName = FullNameRef?.current?.value? FullNameRef.current.value : '';
    const reqBody = {
      email: enteredEmail,
      password: enteredPassword,
      name: enteredName,
    };
    console.log(reqBody);

    //Login
    if (swapCheck) {
      if (
        passwordOneRef.current.value.trim().length > 5 &&
        emailRef.current.value.includes("@") &&
        emailRef.current.value.includes(".com")
      ) {
        try {
          const response = await axios.post(
            "http://3.86.80.104:7777/auth/user/login",
            reqBody
          );
          console.log(response);
          setAlert(response.data);
          if (response.data.response) {
            const data = response.data
            localStorage.setItem("JWTTOKEN", data.jwttoken);
            localStorage.setItem("username", data.userData.username);
            localStorage.setItem("email", data.userData.email);
            // emailRef.current.value = "";
            // passwordOneRef.current.value = "";
            // FullNameRef.current.value = "";
            //forReload();
            if(data.userData.isPreminum){
              dispatch(premiumActions.activatePremium()); 
            }

            dispatch(authActions.login());
            history.replace("/welcome");
          }
        } catch (err) {
        
          setAlert(  { message: "Something went wrong!" , type: 0 } )

        }
      } else {
        alert("Login Credential Wrong!");
      }
    }
    //Signup
    else if (!swapCheck) {
      if (
        passwordOneRef.current.value === passwordTwoRef.current.value &&
        passwordOneRef.current.value.trim().length > 5 &&
        emailRef.current.value.includes("@") &&
        emailRef.current.value.includes(".com")
      ) {
        try {
          const response = await axios.post(
            "http://3.86.80.104:7777/auth/user/signup",
            reqBody
          );
          console.log(response);
          setAlert(response.data);
          if (response.ok) {
            console.log("User has successfully signed up.");
            // emailRef.current.value = "";
            // passwordOneRef.current.value = "";
            // passwordTwoRef.current.value = "";
            setSwap(true);
          } else {
            //const data = await response.json();
            // alert(data.error.message);
          }
        } catch (err) {
          setAlert({ message: "Something went wrong!" , type: 0 })
          console.log("Something went wrong");
          console.log(err);
        }
      } else {
        alert("Please enter field properly");
      }
    }
  };
  const forgotbtnHandler = (event) => {
    event.preventDefault();
    history.replace("/reset");
  };

  return (
    <div className="backgroundDiv">
      <div className="maindivtagg">
        <form className="mainform">
          <div>
            <div>
              <h1>{swapCheck ? "Login" : "SignUp"}</h1>
            </div>
            <div className="inputFulldiv">
              {!swapCheck && (
                <div className="emaildiv">
                  <input
                    type="text"
                    ref={FullNameRef}
                    className="btnclass"
                    maxLength="24"
                    placeholder="Full Name"
                    minLength="6"
                    required
                  />
                </div>
              )}
              <div className="emaildiv">
                <input
                  type="email"
                  htmlFor="email"
                  className="btnclass"
                  placeholder="Email"
                  ref={emailRef}
                  required
                />
              </div>
              <div className="emaildiv">
                <input
                  type="password"
                  minLength="6"
                  className="btnclass"
                  ref={passwordOneRef}
                  maxLength="16"
                  placeholder="Password"
                  required
                />
              </div>
              {!swapCheck && (
                <div className="emaildiv">
                  <input
                    type="password"
                    ref={passwordTwoRef}
                    className="btnclass"
                    maxLength="16"
                    placeholder="Confirm Password"
                    minLength="6"
                    required
                  />
                </div>
              )}
              <div className="signup-container">
                <button onClick={SignupBtnHandler} className="submitbtn">
                  {swapCheck ? "Login" : "SignUp"}
                </button>
                {swapCheck && (
                  <label className="forgotpassword" onClick={forgotbtnHandler}>
                    {" "}
                    Forgot password
                  </label>
                )}
              </div>
            </div>
          </div>
          <div>
            <button onClick={swapHandler} className="changebtn">
              {swapCheck
                ? "Don't have an account? Sign up"
                : "Have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
