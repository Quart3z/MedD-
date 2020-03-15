firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {

        currentUser = user.uid;
        
        firebase.firestore().collection('users').doc(currentUser).get().then(function(doc){ 
 
            if(doc.exists){

                var rank     = doc.data().rank;
                
                switch(rank){
                        
                    case 0:
                        $("#reward_ranking").text('Bronze User');
                        $("#reward_medal").attr('src', 'bronze.png');
                    break; 
                        
                    case 1:
                        $("#reward_ranking").text('Silver User');
                        $("#reward_medal").attr('src', 'silver.png');
                    break; 
                        
                    case 2:
                        $("#reward_ranking").text('Gold User');
                        $("#reward_medal").attr('src', 'gold.png');
                    break; 
                        
                    case 3:
                        $("#reward_ranking").text('Platinum User');
                        $("#reward_medal").attr('src', 'platinum.png');
                    break;     
                        
                }
            }    
        
        })
        
    }

});    