// import './app.css';
// import './background.css';
import {useState, useRef} from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import Background from './background';
import styles from './app.module.css';
import { Navigate } from 'react-router-dom';
import FacultyDashboard from './facultydashboard';
import StudentDashboard from './components/student/studentdashboard';
// import background from './background.module.css';

const handleFailure = (result) => {
    console.log('There was a problem logging in.', result);
  };

const isAdmin = [
    'shaecarnahan@gmail.com',
    'danielu35@gmail.com',
    'kar18004@byui.edu',
    'marvinomeccozi@gmail.com'
    ];

function App() {

  const [userIsLoggedIn, setUserLoggedIn] = useState(false);//this creates a placeholder for the user logged in state
  // let userIsAdministrator = useRef(false);//this is similar to state but won't re-render
  const googleCredentials = useRef({});
  const handleLogin = (googleData) => {
    googleCredentials.current = jwt_decode(googleData.credential);

    const email = googleCredentials.current.email;

    setUserLoggedIn(true);
    // userIsAdministrator=true;//we will need to change this to look up the user from the backend
    //this is dummy information on where the page should load next. We would just need to enter a link that we want to go to here!
    console.log(`Welcome ${email} You successfully logged in.`, googleData);
  } 
  
  if (!userIsLoggedIn){

  return (
    <div className={styles.app}>
    
      <div className={styles.appheader}>
        {/* <h1>React Google Login App</h1> */}
    {/* <div id="back_mobile" >
      
    </div> */}
    <div className={styles.container}>
      <div className={styles.text}>
      <img className={styles.logo} src="images/LOGO-VIMA.png" alt='logo'/>
      <h2>Welcome to <span id="vima">vima</span><br/>the VM self-service app</h2>
      {/* <!-- <div class="image"><img src='/images/hero.png' width="300px"/></div> --> */}
      <div className={styles.imagehero}>
        <img src="/images/mobile-hero.png" alt='heroimg'/>
      </div>
      <p>Login with your BYUI account.</p>
      {/* <div class="g-signin2" data-onsuccess="onSignIn" onclick="loadPage()" data-theme="dark"></div> */}
      <div className={styles.google_button}>
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
    <Background />
    </div>
    </div>
  );
} else{
    console.log(googleCredentials.current.email);
   if(isAdmin.includes(googleCredentials.current.email)){
      return (//View could work instead of div here, but not sure  
          <Navigate to='/faculty' element={<FacultyDashboard />} />
        // window.location.href="VMfaculty_dashboard/facultyview.html"
      )
      } 
      else {
        return (
          // window.location.href="VMstudent_dashboard/studentview.html"
            <Navigate to='/student' element={<StudentDashboard />} />
        )
      }}
}

export default App;
