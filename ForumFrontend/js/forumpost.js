let form = document.getElementById("PostForm");
let title = document.getElementById("titleText")
let description = document.getElementById("descriptionText")


form.onsubmit = event => {
    let token = localStorage.getItem("Token");
    event.preventDefault();

    /* Creating a post object with the username, title and message. */
    var post = {
        Account: {
            Username: localStorage.getItem("Username")
        },
        Title: title.value,
        Message: description.value
    };

/* Sending a post request to the server. */
    fetch('https://localhost:7216/api/Forum/CreatePost', {

        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(response => {

        console.log(response.status);

        /* Checking if the response is 200, if it is it will reload the page. If it is 404 it will log
        "User not found!" and if it is anything else it will log "wat" and reload the page. */
        if (response.status == "200") {
            console.log("Success!");
            location.reload();
        } else if (response.status == "404") {
            console.log("User not found!");
        } else {
            console.log("wat");
            location.reload(); 
        }
    });
}

/* Getting the token from the local storage and sending a post request to the server to get the posts
of the user. */
(function () {
    let token = localStorage.getItem("Token");

    fetch('https://localhost:7216/api/Forum/GetUserPosts', {

        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(localStorage.getItem('Username'))
    }).then(response => {
        console.log(response.status);

        if (response.status == "200") {
            console.log("Woo!");

            response.json().then(function (result) {
                console.log(result);

                result.forEach(post => {

                    console.log(post.id)
                    /* Creating a div, a button, a label and a break. It is also setting the innerHTML
                    of the label and button. It is also setting the id of the div and button. It is
                    also setting the onclick function of the button. It is also appending the label,
                    break, button and div to the mainDiv. */
                    let mainDiv = document.getElementById("MyPosts");
                    let postDiv = document.createElement('div');
                    let deleteButton = document.createElement('button');
                    let updateButton = document.createElement('button')
    
                    //postDiv.style.border = 'solid'
    
                    let titelLabel = document.createElement('label');
                    let messageLabel = document.createElement('label');
                    let theBreak = document.createElement('br');
                    let theBreak1 = document.createElement('br');
                    
                    postDiv.setAttribute("id", "post")
                    titelLabel.innerHTML = post.title;
                    messageLabel.innerHTML = post.message
                    deleteButton.innerHTML = "❌";
                    updateButton.innerHTML = "Update";
                    deleteButton.setAttribute("id", post.id)
                    updateButton.setAttribute("id", post.id)
                    deleteButton.onclick = function(){
                        deletePost(post.id); 
                    } 
                    updateButton.onclick = function(){
                        updatePost(post.id);
                    }
    
                    postDiv.append(titelLabel);
                    postDiv.append(theBreak);
                    postDiv.append(messageLabel);
                    postDiv.append(deleteButton);
                    postDiv.append(updateButton);
    
                    mainDiv.append(postDiv);
                    mainDiv.append(theBreak1);
                })
            });
            
        } else if (response.status == "401") {
            console.log("??????");
        } else {
            console.log("wat");
        }
        
    });
    
})();

/**
 * It takes the id of the post and sends it to the server to be deleted.
 * @ param myId - the id of the post that is being deleted
 */
function deletePost(myId){
    let token = localStorage.getItem("Token");
    fetch('https://localhost:7216/api/Forum/DeleteUserPost', {
            
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Id: myId
        })
    }).then(response => {
        if (response.status == "200") {
            location.reload();
        }
    })
}
/**
 * It takes the id of the post and the new message and sends it to the server.
 * @ param myId - the id of the post that is being updated
 */
function updatePost(myId){
    let token = localStorage.getItem("Token");
    let updateMessage = document.getElementById('updateText')
    fetch('https://localhost:7216/api/Forum/UpdatePost', {
            
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Id: myId,
            Message: updateMessage.value
        })
    }).then(response => {
        if (response.status == "200") {
            location.reload();
        }
    })
}