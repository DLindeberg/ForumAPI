let loginButton = document.getElementById("loginButton");
let registerButton = document.getElementById("registerButton");

fetch('https://localhost:7216/api/Forum/GetAllPosts', {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    }).then(response => {

        response.json().then(function (result) {
            console.log(result);

/* Creating a div for each post and adding the title and message to it. 
   Setting the id of the div to "post" */
            result.forEach(post => {

                let mainDiv = document.getElementById("forumPosts");
                let postDiv = document.createElement('div');
                
                //postDiv.style.border = 'solid'

                let titelLabel = document.createElement('label');
                let messageLabel = document.createElement('label');
                let theBreak = document.createElement('br');
                let theBreak1 = document.createElement('br');

                postDiv.setAttribute("id", "post")
                titelLabel.innerHTML = post.title;
                messageLabel.innerHTML = post.message;

                postDiv.append(titelLabel);
                postDiv.append(theBreak);
                postDiv.append(messageLabel);

                mainDiv.append(postDiv);
                mainDiv.append(theBreak1);

            });
        });

        console.log(response);

        if (response.status == "200") {
            console.log("Success!");
        } else if (response.status == "404") {
            console.log("No posts found!");
        } else {
            console.log("wat");
        }
    });

loginButton.onclick = RedirectToLogin
registerButton.onclick = RedirectToRegister

function RedirectToLogin() {
    window.location.href = "http://localhost:5500/login.html"
}

function RedirectToRegister() {
    window.location.href = "http://localhost:5500/register.html"
}