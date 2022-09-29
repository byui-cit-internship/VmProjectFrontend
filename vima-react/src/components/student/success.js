import Background from '../../background';
import Header from '../../header';
import success from "./success.module.css";
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { getApiRoot } from '../../utils/getApiRoot';
import { FaCheck } from "react-icons/fa";


function CreatedSuccessfully() {
    let navigate = useNavigate();
    return (
        <div className={success.success}>
            <div className={success.container}>
                <Header />
                {/* <span onClick={() => {navigate("/createvm")}} id={success.backbtn}>&#8592; Back</span> */}
                <div className={success.main}>
                    <div className={success.main}>
                        <div className={success.iconPlaceholder}>
                            <FaCheck className={success.checkicon}/>
                        </div>
                        <h4 className={success.title}> VM created successfully!</h4>
                        <p className={success.created}>You have created a <span>{}</span> VM for your <span>{}</span> class</p>
                        <div className={success.goToVm}>
                            <p className={success.click}>Click on the link to access the VM</p>
                            <button id={success.button} onClick={() => {navigate("/#")}}>Click Here</button>
                        </div>
                        <span onClick={() => {navigate("/createvm")}} className={success.newVm}>Or click here to create a new VM</span>
                    </div>     
                </div>                
            </div>
            <Background />
        </div>
    )
}



export default CreatedSuccessfully;