// Display username
firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {

        var currentUser = user.uid;

        var username = firebase.firestore().collection('users').doc(currentUser).onSnapshot(function(doc){ 

            $('#profile_name').html(doc.data().username);
            
        });

    } else {
    
        console.log('No user signed in');
        
  }
    
});

// Header menu 'Services' dorpdown animation
$('#header_dropdown').on('show.bs.dropdown', function(e){
    
  $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    
});

$('#header_dropdown').on('hide.bs.dropdown', function(e){
    
  $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    
});
// //

// Store link
$("#store_1").click(function(){
    
    window.location.href = "store_1.html";
    
})    

// Medical Facillity link
$("#medic_1").click(function(){
    
    window.location.href = "medic_1.html";
    
})    

// Logout
$("#logout_btn").click(function(){
    
    // Sign-out successful.
    firebase.auth().signOut().then(function() {
        
        document.location.href = "index.html";
        alert("Sign Out Successfully.");
        
        
    }).catch(function(error) {
    // An error happened.
        
    });
    
})
