import "./header.css"
import PersonIcon from '@mui/icons-material/Person';


function Header() {
    return (
        <div class="topright">
            <img  class="logo" src="/images/LOGO-VIMA.png" alt="vima-logo" />
            <div class="right">
                {/* <span class="material-icons"> */}
                    <PersonIcon color="primary" />
                {/* </span> */}
                <div class="signOut">Welcome Student | <button class="signOut" id="signOut">Sign out</button></div>
            </div>
        </div>
    )
}
export default Header;