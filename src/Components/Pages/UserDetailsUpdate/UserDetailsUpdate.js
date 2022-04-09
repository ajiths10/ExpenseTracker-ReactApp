import React, { useRef, useEffect} from "react";
import "./UserDetailsUpdate.css";

const UserDetailsUpdate = () => {
    const nameRef = useRef();
    const photoUrlRef = useRef();

 

        const autogetData=async()=>{
            const token = localStorage.getItem('JWTTOKEN');
            try{
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCrNT0jOFIUrCoslzyrlcZDJIUqzYGvDLc',
                {
                    method: "POST",
                    body: JSON.stringify({
                        idToken: token,
                      returnSecureToken: true,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                if(res.ok){
                    const data = await res.json();
                    data.users.forEach(element => {
                        console.log(data.users);
                        nameRef.current.value=element.displayName;
                        photoUrlRef.current.value=element.photoUrl;
                    });
                }else{
                    const data = await res.json();
                    console.log(data)
                }
    
            }catch(err){
                console.log('Auto fetch error!');
            }
        }
        
useEffect(()=>{
    autogetData();
},[]);



    const updateButtonHandler = async(event) =>{
        event.preventDefault();
        console.log('Updating...')
        const entertedName= nameRef.current.value;
        const entertedPhotoUrl = photoUrlRef.current.value;
        const token = localStorage.getItem('JWTTOKEN');

        try{
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrNT0jOFIUrCoslzyrlcZDJIUqzYGvDLc',
            {
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                    displayName: entertedName,
                    photoUrl: entertedPhotoUrl,
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
                alert('wohoo , Your Data Saved!')
            }else{
                const data = await res.json();
                console.log(data)
                alert(data.error.message)
            }
        }catch(err){
            console('Updaing went wrong!')
        }
    }

  return (
  <div className="userDetailsUpdateDiv">
      <div className="userDetailsdiv">
    <form className="userDetailsForm" >
        <div className="userDetailsFormdiv" >
            <div className="headingdiv">
                Contact details
            </div>
            <div className="contantdiv">
                <div className="contantdivfield">
                    <label>Full Name:</label>
                </div>
                <div className="contantdivfield">
                    <input type='text'  className="contantinputfield" ref={nameRef} />
                </div>
                <div className="contantdivfield">
                    <label>Profile Photo URL</label>
                </div>
                <div className="contantdivfield">
                    <input type='text' className="contantinputfield" ref={photoUrlRef} />
                </div>
                <div className="contantdivfield">
                    <button onClick={updateButtonHandler} className="contantBTNfield"> Update</button>
                </div>
                
            </div>
        </div> 
    </form>  
    </div>  
  </div>
  );
};

export default UserDetailsUpdate;
