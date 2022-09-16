import React from "react";
import header from './header.module.css';
// import navbar from './navbar.module.css';
import professorlist from './components/faculty/professorlist.js';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
{/* <section class="top-nav">
    <div>
      Logo Here
    </div>
    <input id="menu-toggle" type="checkbox" />
    <label class='menu-button-container' for="menu-toggle">
    <div class='menu-button'></div>
  </label>
    <ul class="menu">
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
      <li>Four</li>
      <li>Five</li>
    </ul>
  </section>

  function NavBar() {
    let hamburger = hamburgerMenu();
    return(
        <div>
         <input className={navbar.menutoggle} type='checkbox'></input>
         <label className={navbar.menubuttoncontainer} for='menu-toggle'> 
        
         <div className={navbar.menubutton}></div>
         </label>
         <ul className={navbar.menu}>
            <li className={navbar.list}>One</li>
            <li className={navbar.list}>Four</li>
            <li className={navbar.list}>Three</li>
            <li className={navbar.list}>Five</li>
         </ul>
         </div>
    )
  }

  export default NavBar; */}



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