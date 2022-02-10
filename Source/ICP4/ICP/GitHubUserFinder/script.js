function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'https://api.github.com/users/' + user, false)

    // xhttp.addEventListener("readystatechange", function() {
    //     if(this.readyState === 4) {
    //         return xhttp;
    //     }
    // });

    xhttp.send();
    // add a wait so the request finishes before it returns
    setTimeout(10000)
    return xhttp
}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    // add the user name and Id
    $("h2").text(user.name + '\n' + 'ID: '+ user.id)
    //add the user's github profile avatar
    $(".avatar").append(`<img src="${user.avatar_url}" width="150" height="250">`)
    // add the users link to github
    $(".information").append(`<h3><a href="${user.html_url}">Github site</a></h3>`)
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    // set the header to no user found
    $("h2").text("No User Found")
}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
