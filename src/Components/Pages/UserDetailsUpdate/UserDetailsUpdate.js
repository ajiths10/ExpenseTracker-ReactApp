import React, { useRef } from "react";
import "./UserDetailsUpdate.css";

const UserDetailsUpdate = () => {
    const nameRef = useRef();
    const photoUrlRef = useRef();

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
                console.log('Updated success');
                nameRef.current.value='';
                photoUrlRef.current.value='';
            }else{
                const data = await res.json();
                alert(data.error.message)
            }
        }catch(err){
            console('Updaing went wrong!')
        }
    }

  return (
  <div className="userDetailsUpdateDiv">
    <form>
        <div>
            <div>
                Contact details
            </div>
            <div>
                <div>
                    <label>Full Name:</label>
                </div>
                <div>
                    <input type='text' ref={nameRef} />
                </div>
                <div>
                    <label>Profile Photo URL</label>
                </div>
                <div>
                    <input type='text' ref={photoUrlRef} />
                </div>
                <div>
                    <button onClick={updateButtonHandler} > Update</button>
                </div>
            </div>
        </div> 
    </form>    
  </div>
  );
};

export default UserDetailsUpdate;
