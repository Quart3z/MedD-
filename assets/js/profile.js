var currentUser;

// Display profile
firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {

        currentUser = user.uid;
        
        firebase.firestore().collection('users').doc(currentUser).get().then(function(doc){ 
 
            if(doc.exists){
                          
                var name     = doc.data().name;
                var username = doc.data().username;
                var address  = doc.data().address;
                var phone    = doc.data().phone;
                var email    = doc.data().email;
                var rank     = doc.data().rank;
                var url      = doc.data().profile_image;
                
                if(url){
                    
                    firebase.storage().ref().child(url).getDownloadURL().then(function(img){

                        $("#profile_image").attr('src', img);

                    })
                
                }
                
                $("#profile_top_username").text(username);
                
                switch(rank){
                        
                    case 0:
                        $("#profile_ranking").text('Bronze User');
                        $("#medal").attr('src', 'bronze.png');
                    break; 
                        
                    case 1:
                        $("#profile_ranking").text('Silver User');
                        $("#medal").attr('src', 'silver.png');
                    break; 
                        
                    case 2:
                        $("#profile_ranking").text('Gold User');
                        $("#medal").attr('src', 'gold.png');
                    break; 
                        
                    case 3:
                        $("#profile_ranking").text('Platinum User');
                        $("#medal").attr('src', 'platinum.png');
                    break;     
                        
                }
                
                $("#profile_fullname").val(name);
                $("#profile_username").val(username);
                $("#profile_address").val(address);
                $("#profile_phone").val(phone);
                $("#profile_email").val(email);
                             
            }
            
            else{console.log('No')}  
            
        });

    } else {
    
        console.log('No user signed in');
        
  }
    
});

// Edit profile
$("#edit_profile").click(function(){
    
    var flag = $(this).data('value');
    
    if(flag === 1){ 
        
        this.childNodes[0].nodeValue = "Save  ";
        $(this).find('i').toggleClass("fa-edit fa-save");
        $(".profile_item_e").attr("disabled", false).css("background", "white").css("outline", "1px solid rgb(126,125,125)");
        
        $(this).data('value', 0);        
    }
    
    else{
        
        this.childNodes[0].nodeValue = "Edit  ";
        $(this).find('i').toggleClass("fa-save fa-edit");
        $(".profile_item_e").attr("disabled", true).css("background", "none").css("outline", "none");
         
        var data = {

            name    : $('#profile_fullname').val(),
            username: $('#profile_username').val(),
            address : $('#profile_address').val(),
            phone   : $('#profile_phone').val(),

        }
        
        firebase.firestore().collection("users").doc(currentUser).set({
            
            name    : data.name,
            username: data.username,
            address : data.address,
            phone   : data.phone,
            
        }, {merge: true}).then(function(){
            
            console.log("Document successfully written!");
            document.location.href = "profile.html"; 
           
        }).catch(function(error) {
          
            console.error("Error writing document: ", error);
        
        });
        
    }
    
})

// Change profile picture         
$("#change_profile_image").on('change', function(e){
            
    var file = $("#change_profile_image").prop('files')[0];
    
    var image = 'profile_image/' + currentUser + '.jpg';

    firebase.storage().ref(image).put(file).then(function(form_data){
        
         firebase.firestore().collection("users").doc(currentUser).set({
             
             profile_image: image
             
         }, {merge: true}).catch(function(error){
             
             console.log(error.message);
             
         })
        
    }).then(function(){
     
       document.location.href = "profile.html"; 
        
    }).catch(function(error){
        
        console.log(error.message);
        
    });

    
})