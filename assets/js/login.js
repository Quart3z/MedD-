// Authentication
$("#back").click(function(){
    
    window.location.href = "index.html";

})

// Register user panel
$("#register_user").click(function(){
    
    $("#sign_in").hide(500);   
    $("#register").show(500);
     
});

// Sign in user panel
$("#sign_in_user").click(function(){
    
    $("#sign_in").show(500);   
    $("#register").hide(500);
     
});

// Sign in 
$("#existing_user").click(function(e){
    
    e.preventDefault();
    
    var data = {
        
        email   : $("#email").val(),
        password: $("#password").val()
        
    }
    
    firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(function(){
        
        document.location.href = "delivery.html"; 
        
    }).catch(function(error) {
        
        $("#email_error").hide();
        $("#password_error").hide();

        switch(error.code){

            case "auth/user-not-found":
                 $("#email_error").show().html("Account does not exists.");
            break;

            case "auth/wrong-password":
                 $("#password_error").show().html("Incorrect password.");
            break;
        
        }
        
    });

})

// Sign in with Google
$('#google_sign_in').click(function(e){
    
    e.preventDefault();
    
    var provider = new firebase.auth.GoogleAuthProvider(); 
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
       
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        
        var store = firebase.firestore().collection('users').doc(user.uid);
        
        user.providerData.forEach(function (profile) {
            
            var gname =  profile.displayName;
            var gemail = profile.email;
            
            store.get().then(function(doc){

               if(!doc.exists){

                    store.set({

                        name    : gname,
                        username: gname,
                        email   : gemail,
                        rank    : 0

                    })

                }
                
                document.location.href = "delivery.html";
                
            }).catch(function(error){

                console.log(error.message);

            })

        })
        
    }).catch(function(error) {
       
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
         console.log(errorMessage);
    });
        
})

// Sign in with Facebook
$('#facebook_sign_in').click(function(e){
    
    e.preventDefault();
    
    var provider = new firebase.auth.FacebookAuthProvider();
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
   
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        firebase.firestore().collection('users').doc(cred.user.uid).set({
                    
                name    : data.name,
                username: data.username,
                address : data.address,
                phone   : data.phone,
                email   : data.email,
                rank    : 0
                    
        }).then(function(){
                
                 document.location.href = "delivery.html";
            });
        
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorMessage);
        // ...
        
    });
    
})


// Create new user
$("#new_user").click(function(e){   
    
    e.preventDefault();
    
    var  data = {
        
        name    : $("#new_name").val(),
        username: $("#new_username").val(),
        address : $("#new_address").val(),
        phone   : $("#new_phone").val(),
        email   : $("#new_email").val(),
        password: $("#new_password").val(),
        repeat  : $("#new_rPassword").val()
    
    }
    
    if(data.password == data.repeat){
        
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function(cred) {

            firebase.firestore().collection('users').doc(cred.user.uid).set({
                    
                name    : data.name,
                username: data.username,
                address : data.address,
                phone   : data.phone,
                email   : data.email,
                rank    : 0
                    
            }).then(function(){
                
                 document.location.href = "delivery.html";
                
            });
        
        }).catch(function(error){ 
            
            $("#new_email_error").hide();
            $("#new_password_error").hide();
            $("#rPassword_error").hide();
            
            switch(error.code){
                    
                case "auth/email-already-in-use":
                     $("#new_email_error").show().html("Emaiil already in used.");
                break;
                    
                case "auth/weak-password":
                     $("#new_password_error").show().html("Password must be at least 6 characters.");
                break;
                    
            }

        });
        
    }
    
    else{

        $("#rPassword_error").toggle().html("Password does not match.");

    }
     
})
