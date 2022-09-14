import React from "react";
import header from './header.module.css';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';




function Header() {
    let navigate = useNavigate();

    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    var userFirstName = "";
    if (userInfo == null) {
        userFirstName = "";
    } else {
        userFirstName= userInfo.firstName;
    };

    return(
        <div className={header.header}>
            <div className={header.grid}>
            <img className={header.logo} src="/images/LOGO-VIMA.png" alt="logo" />
            <PersonIcon className={header.material} />
            <p id={header.welcome}>Welcome {userFirstName} |</p>
            <button className={header.signOut} onClick={() => {navigate("/")}}>Sign out</button>
            </div>
        </div>
    )
}

export default Header;