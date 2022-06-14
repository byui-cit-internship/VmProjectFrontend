import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import Squares from '../pages/squares';


function Signin() {
        const handleFailure = (result) => {
            console.log('There was a problem logging in.', result);
          };
        
          const handleLogin = (googleData) => {
            //this is dummy information on where the page should load next. We would just need to enter a link that we want to go to here!
            console.log('You successfully logged in.', googleData);
            window.location.href="VMfaculty_dashboard/facultyview.html"
          };
        
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
            <Squares />
          </body>
                
              </header>
            </div>
    )
}
export default Signin;