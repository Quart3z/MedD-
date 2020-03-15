// Delivery tab - show content
$("#delivery_show").click(function(){
        
    $("#delivery_content").slideToggle(300);
            
})

$("#submit_patient_id").click(function(){
    
    $("#patient_id").attr('readonly', true);
    $("#submit_patient_id").hide("slow");
    $("#patient_medicine_list").slideToggle();
            
})

$("#apply_delivery").click(function(){
        
    $("#apply_delivering_div").toggle();
    $("#delivering").toggle();
            
})


// Checkup tab - show content
$("#checkup_show").click(function(){
        
    $("#checkup_content").slideToggle(300);
            
})

// Consultant tab - show content
$("#consultant_show").click(function(){
        
    $("#consultant_content").slideToggle(300);
            
})