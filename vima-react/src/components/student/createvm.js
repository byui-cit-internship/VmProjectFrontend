import createVM from "./createvm.module.css";
import Background from '../../background';
import Header from "../../header";
import LaptopIcon from '@mui/icons-material/Laptop';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import React, { useState, useRef } from 'react';
import { getApiRoot } from '../../utils/getApiRoot';

function CreateVM() {

    let navigate = useNavigate();
    const [userIsLoggedIn, setUserLoggedIn] = useState(false);//this creates a placeholder for the user logged in state
    const [authorization, setAuthorization] = useState({});
    const [googleJwt, setGoogleJwt] = useState("");
    const googleCredentials = useRef({});
    useEffect(()=>{
      const verifyJwt = async()=>{
        const jwtResponse = await fetch(getApiRoot()+'/student/api/studentcourse',
        {
          credentials:'include',
          headers:{
            'content-type':'application/json'
          },
          method:'POST',
          body:JSON.stringify({accessTokenValue: googleJwt})
        });
              const authorizationObject = await jwtResponse.json();
        sessionStorage.setItem('userInfo', JSON.stringify(authorizationObject))
        setAuthorization(authorizationObject);
        }
    },[googleJwt])

    return (
        <div className={createVM.createvm}>
            <div className={createVM.container}>
            {/* <Header /> */}
            <Header />
            <span onClick={() => {navigate("/student")}} id={createVM.backbtn}>&#8592; back</span>
            <h4 className={createVM.lets}>Let's create a VM</h4>
                <div className={createVM.body}>
                {/* <!-- course dropdown -->  */}
                <span className={createVM.material}><LibraryBooksIcon className={createVM.material} /></span>
                <p className={createVM.description}>1. Select Course</p>
                <select className="course" id={createVM.course}>
                <option value="Default">- Select -</option>
                </select>
                {/* <!-- template vm dropdown --> */}
                <span className={createVM.material}><LaptopIcon className={createVM.material} /></span>
                <p className={createVM.description}>2. Select VM</p>
                <select name="templatevm" id={createVM.course}>
                <option value="Default">-  Select -</option>
                </select>
                {/* <!--Create the VM--> */}
                <span className={createVM.material}><CheckCircleOutlineIcon className={createVM.material} /></span>
                <p className={createVM.description}>3. Create the VM</p>
                <input id ="vm_name" type="hidden" value ='Default Vm' />
                <button id={createVM.buttonVm}>Create</button>
            </div>
            <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
            </div>
            <Background />
        </div>
    )
}
export default CreateVM;


// create an array for the list of classes to be stored in 
//then create a loop to go through and create an option in the drop down select for each class
//
// let class = []
