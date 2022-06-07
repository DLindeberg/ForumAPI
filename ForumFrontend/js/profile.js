(function() {
    let token = localStorage.getItem("Token");

    /* Sending a GET request to the API with the token in the header. */
    fetch('https://localhost:7216/api/Account/Profile', {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        
        console.log(response.status);
        
/* Checking the response status and if it is 200 it will log "Welcome, young paddawan!" to the console.
If it is 401 it will log "No Auth!" to the console and remove the token from local storage and
redirect to the login page. If it is neither 200 or 401 it will log "wat" to the console and
redirect to the login page. */
        response.json().then(function (result) {
            console.log(result.username);
            localStorage.setItem("Username", result.username);
        });

        if (response.status == "200") {
            console.log("Welcome, young paddawan!");
        }else if(response.status == "401"){
            console.log("No Auth!");
            localStorage.removeItem("Token");
            window.location.href = "http://localhost:5500/login.html"
        }else{
            console.log("wat");
            window.location.href = "http://localhost:5500/login.html"
        }

    });

 })();