import Background from '../../background';
import Header from '../../header';
import success from "./success.module.css";
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { getApiRoot } from '../../utils/getApiRoot';
import PersonAddIcon from '@mui/icons-material/PersonAdd';




const iconStyles = {
    color: 'white', fontSize: '35px'
}



function CreatedSuccessfully() {
    let navigate = useNavigate();
    return (
        <div className={success.success}>
            <div className={success.container}>
                <Header />
                <span onClick={() => {navigate("/createvm")}} id={success.backbtn}>&#8592; Back</span>
                <div className={success.main}>
                    <div className={success.main}>
                        <h4 className={success.title}> VM Created Successfully!</h4>
                        <p className={success.created}>You have created a <span>{}</span> VM for your <span>{}</span> class</p>
                        <p className={success.click}>Click on the link to access the VM</p>
                        <button id={success.button}>Click Here</button>
                        <div className={success.button} onClick={() => {navigate("/#")}}>
                            <span className={success.materialicons}>
                            <PersonAddIcon style={iconStyles}/>
                            </span>
                            <button>Click Here</button>
                        </div>
                        <span onClick={() => {navigate("/VmProjectFrontend/vima-react/src/components/student/createvm.js")}} id={success.newVm}>Or click here to create a new VM</span>
                    </div>     
                </div>                
            </div>
            <Background />
        </div>
    )
}



export default CreatedSuccessfully;