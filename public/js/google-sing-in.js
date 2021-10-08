var url = ( window.location.hostname.includes('localhost') ) 
            ? `http://localhost:${window.location.port}/api/auth/google`
            : `https://restserver-node-gdp.herokuapp.com/api/auth/google`

window.onSignIn = function (googleUser) {

    var profile = googleUser.getBasicProfile();

    console.log('ID: ' + profile.getId());
    console.log('Nombre: ' + profile.getGivenName());
    console.log('Apellido: ' + profile.getFamilyName());
    console.log('Imagen URL: ' + profile.getImageUrl());
    console.log('Correo: ' + profile.getEmail());

    var id_token = googleUser.getAuthResponse().id_token;

    const data = {id_token}

    fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
    })
    .then ( response => response.json() )
    .then ( data => console.log( 'Nuestro Server', data ) )
    .catch(console.log);
};

window.onFailure = function (error) {

    console.log(error);
};

window.renderButton = function () {

    window.gapi.load('auth2', () =>  {

        window.gapi.signin2.render('google-signin-button', {
            
          onsuccess: this.onSignIn,
        });
    });

    gapi.signin2.render('my-signin2', {
        
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        'onfailure': onFailure
    });
};

function signOut() {

    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {

        console.log('Usuario desconectado.');
    });
};

const anchorSingOut = document.getElementById('logout-google');

anchorSingOut.addEventListener('click', () => signOut() );