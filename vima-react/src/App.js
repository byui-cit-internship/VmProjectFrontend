import './App.css';
import {useState} from 'react';
// import FacultyDashboard from './FacultyDashboard';
// import StudentDashboard from './StudentDashboard';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const handleFailure = (result) => {
    console.log('There was a problem logging in.', result);
  };

function App() {


  const [userIsLoggedIn, setUserLoggedIn] = useState(false);//this creates a placeholder for the user logged in state
  // let userIsAdministrator = useRef(false);//this is similar to state but won't re-render
  
  const handleLogin = (googleData) => {
    const googleCredentials=jwt_decode(googleData.credential);
    const email = googleCredentials.email;

    const isAdmin = [
    'shaecarnahan@gmail.com',
    'danieluribe@gmail.com'
    ];
  
    setUserLoggedIn(true);
    // userIsAdministrator=true;//we will need to change this to look up the user from the backend
    //this is dummy information on where the page should load next. We would just need to enter a link that we want to go to here!
    console.log(`Welcome ${email} You successfully logged in.`, googleData);
    
    if(isAdmin.includes(googleCredentials.email)){
      return (//View could work instead of div here, but not sure  
          // <FacultyDashboard></FacultyDashboard>
        window.location.href="VMfaculty_dashboard/facultyview.html"
      )
      } 
      else {
        return (
          window.location.href="VMstudent_dashboard/studentview.html"
            // <StudentDashboard></StudentDashboard>
        )
      }
    };
  
  if (!userIsLoggedIn){

  return (
    <div className="App">
    
      <header className="App-header">
        {/* <h1>React Google Login App</h1> */}
        <body>
    <div id="back_mobile" >
      
    </div>
    <div class="container">
      <div class="text">
      <img  class="logo" src="images/LOGO-VIMA.png" alt='logo'/>
      <h2>Welcome to <span id="vima">vima</span><br/>the VM self-service app</h2>
      {/* <!-- <div class="image"><img src='/images/hero.png' width="300px"/></div> --> */}
      <div class="imagehero">
        <img src="/images/mobile-hero.png" alt='heroimg'/>
      </div>
      <p>Login with your BYUI account.</p>
      {/* <div class="g-signin2" data-onsuccess="onSignIn" onclick="loadPage()" data-theme="dark"></div> */}
      <div id='googlebutton'>
            <GoogleOAuthProvider
            clientId='705504613323-8lejrhq0knt36ltf4fkbth2l8aosrhrb.apps.googleusercontent.com'
            ><GoogleLogin
            onSuccess={handleLogin}
            onError={handleFailure}
            ></GoogleLogin>          
            </GoogleOAuthProvider>
        </div>
    </div>

    </div>
    <div class="area" >
      <ul class="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
      </ul>
</div >
  </body>
        
      </header>
    </div>
  );
} else{

  
}
}

export default App;
