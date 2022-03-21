function signOut() {
    gapi.load('auth2', async ()=>  {
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