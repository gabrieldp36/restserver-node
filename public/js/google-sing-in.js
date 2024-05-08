const url = ( window.location.hostname.includes('localhost') ) 
            ? `http://localhost:${window.location.port}/api/auth/google`
            : `https://restserver-node-production-87fa.up.railway.app/api/auth/google`

const googleClientID = '778480152819-frrdc59gqm61ldn9lj8db7l0qn2l8gm1.apps.googleusercontent.com';

function handleCredentialResponse(response) {
    
    const body = {
        id_token: response.credential
    };

    fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
    })
    .then ( response => response.json()
    )
    .then ( data => {
        window.location.reload();

        console.log( 'Nuestro Server', data );

        localStorage.setItem('correo', data.usuario.correo);
    })
    .catch(console.log);
};

window.onload = function () {

    google.accounts.id.initialize({

      client_id: googleClientID,

      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(

      document.getElementById('buttonDiv'),
      
      {
        type:'standard',
        size:'large',
        theme: 'filled_blue', 
        text:'signin_with',
        shape:'circle',
        logo_alignment:'left',
        width: '275',}
    );
};

const signOut =  () => {

    google.accounts.id.disableAutoSelect();
    
    google.accounts.id.revoke(localStorage.getItem('correo'), () => {
        window.location.reload();

        localStorage.clear();

        location.reload();
    });
};

const anchorSingOut = document.getElementById('logout-google');

anchorSingOut.addEventListener('click',  () => signOut() );