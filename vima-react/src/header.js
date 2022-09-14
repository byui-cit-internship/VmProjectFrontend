import React from "react";
import header from './header.module.css';
import professorlist from './components/faculty/professorlist.js';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

function Header() {
    let navigate = useNavigate();
    return(
        <div className={header.header}>
            <div className={header.grid}>
                <img className={header.logo} src="/images/LOGO-VIMA.png" alt="logo" />
                <div className={header.menu}>
                    <div className={header.userprofile}>
                        <PersonIcon className={header.material} />
                        <p id={header.welcome}>Welcome |</p>
                    </div>
                    <button className={header.signOut} onClick={() => {navigate("/")}}>Sign out</button>
                </div>
            </div>
        </div>
    )
}

export default Header;