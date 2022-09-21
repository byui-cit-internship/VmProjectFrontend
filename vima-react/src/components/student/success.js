import Background from '../../background';
import Header from '../../header';
import success from "./success.module.css";
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { getApiRoot } from '../../utils/getApiRoot';

function CreatedSuccessfully() {

    let navigate = useNavigate();

    return (
        <div className={success.success}>
            <div className={success.container}>
                <Header />
                <span onClick={() => {navigate("/createvm")}} id={success.backbtn}>&#8592; Back</span>
                <h1>VM Created Successfully!</h1>
                <br></br>
                <p>You created a <span>{}</span> VM for your <span>{}</span> class</p>
                <br></br>
                <h3>Click on the link to access the VM</h3>
                <br></br>
                <button>Click Here</button>
                <br></br>
                <h4>Or click here to create a new VM</h4>
            </div>
            <Background />
        </div>
    )
}

export default CreatedSuccessfully;