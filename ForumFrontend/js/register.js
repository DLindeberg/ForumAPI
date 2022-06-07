var form = document.getElementById("registerForm");
var title = document.getElementById("usernameField")
var description = document.getElementById("passwordField")
var confirmPassword = document.getElementById("confirmPasswordField")


form.onsubmit = event => {
    event.preventDefault();
    fetch('https://localhost:7216/api/Account', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Username: title.value,
            Password: description.value,
            ConfirmPassword: confirmPassword.value
        })
    }).then(response => {
        console.log(response.status);

        /* Redirecting the user to the home page if the response status is 200. */
        if (response.status == '200') {
            window.location.href = "http://localhost:5500";
        } else if (response.status == '400') {

            response.json().then(function (result) {
                console.log(result.title)
                /* Checking if the title is null and if it is, it is checking if the result includes
                the string "Username already exists.". If it does, it creates a label element and
                appends it to the element with the id "Username". */
                if  (result.title == null){

                    if (result.includes("Username already exists.")) {
                        let alreadyExists = document.createElement('label');
                        var theElement = document.getElementById("Username");
                        alreadyExists.innerHTML = result;
                        theElement.append(alreadyExists);
                        return;
                    }
                    
                }  

                console.log("There were errors!")
                console.log(Object.entries(result.errors))

                let errors = Object.entries(result.errors);
                console.log("errors");

                errors.forEach(error => {
                    console.log("Property: " + error[0]);

                    var theElement = document.getElementById(error[0]);

                    
                    for (let index = 1; index < error.length; index++) {
                        const errorArray = error[index];

                        errorArray.forEach(elem => {

                            let labelElem = document.createElement('label');
                            let br = document.createElement('br');
                            labelElem.innerHTML = error[0] + " " + elem;
                            theElement.append(labelElem);
                            theElement.append(br);
                            console.log("Msg: " + elem);
                        });
                    }
                });
            });

        } else {
            console.log("<:");
        }

    });
}