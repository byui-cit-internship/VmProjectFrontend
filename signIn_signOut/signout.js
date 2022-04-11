import { getApiRoot } from "./getApiRoot.js"

function signOut() {
    gapi.load('auth2', async ()=>  {
        await axios.delete(`${getApiRoot()}/api/token`, { withCredentials: true })
        await gapi.auth2.init();
        let auth2 = await gapi.auth2.getAuthInstance()
        auth2.signOut().then( ()=> {
            console.log('User signed out.');
            window.location.href = "/"
        });
        
    });

}

function onLoad() {
    gapi.load('auth2', function () {
        gapi.auth2.init();
    });
}

Array.from(document.getElementsByClassName("signOut")).forEach(element => {
   element.addEventListener("click", signOut) 
});