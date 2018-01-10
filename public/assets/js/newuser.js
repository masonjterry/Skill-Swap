$(document).ready(function(){

  $(".button-collapse").sideNav();
  $("select").material_select();

  $("#create-user-btn").on("click", function() {
    let firstName = $("#firstName").val().trim();
    console.log("new firstName", firstName);
    let lastName = $("#lastName").val().trim();
    console.log("new lastName", lastName);
    let email = $("#email").val().trim();
    console.log("new email", email);
    let username = $("#username").val().trim();
    console.log("new username", username);
    let password = $("#password").val().trim();
    console.log("new password", password);
    if (verify(lastName, firstName, email, username, password)) {

      let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password
      }

      $.ajax({
        url: "/api/user",
        method: "POST",
        data: newUser
      }).then(function(result) {
        
      });

      localStorage.clear();
      localStorage.setItem("username", username);

    }


  });

  function verify(lname, fname, email, username, password) {
    var verifyBool = false;
    if (lname.length < 2) {
      console.log("lastname is too short");
      verifyBool = false;
    } else {
      console.log("lastname is valid");
      verifyBool = true;
    }

    if (fname.length < 2) {
      console.log("firstname is too short");
      verifyBool = false;
    } else {
      console.log("firstname is valid");
      verifyBool = true;
    }

    for (var i = 0; i < email.length; i++) {
      if (email[i] === "@") {
        console.log("email is valid");
        verifyBool = true;
      } else {
        console.log("email is invalid");
        verifyBool = false;
      }
    }

    if (username.length < 5) {
      console.log("username is too short");
      verifyBool = false;
    } else {
      console.log("username is valid");
      verifyBool = true;
    }

    if (password.length >= 6) {
      for (var i = 0; i < password.length; i++) {
        if (password[i] === "!" || password[i] === "?" || password[i] === "." || password[i] === "$") {
          console.log("password is valid");
          verifyBool = true;
        } else {
          console.log("password is invalid");
          verifyBool = false;
        }
      }
    } else {
      console.log("password is invalid");
      verifyBool = false;
    }
    return verifyBool;
  }

});