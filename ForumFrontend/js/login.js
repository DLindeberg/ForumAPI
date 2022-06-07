    var form = document.getElementById("loginForm");
    var title = document.getElementById("usernameField")
    var description = document.getElementById("passwordField")

/* Sending a POST request to the API with the username and password. */
    form.onsubmit = event => {
        event.preventDefault();
        fetch('https://localhost:7216/api/Account/Login', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Username: title.value,
                Password: description.value,
            })
        }).then(response => {
            
            console.log(response.status);

            /* Checking if the response status is 200, if it is, it will get the token from the
            response and store it in local storage. Then redirects to profile */
            if (response.status == "200") {
                response.json().then(function (token) {
                    console.log(token);
                    localStorage.setItem("Token", token);
                    window.location.href = "http://localhost:5500/profile.html";
                });
            }/* This is checking if the response status is 404, if it is, it will log "User not found!"
            to the console and display it on the page. */
            else if(response.status == "404"){
                console.log("User not found!");
                let errorDiv = document.getElementById("errors")
                errorDiv.innerHTML = response.status + " User not found!"
            }else{
                console.log("wat");
            }
        });
    }