//const { fchown } = require("fs");
//post messages on the board
$(document).ready(function(){
    console.log('Ready');
    $('#submit').click(()=>{
        let message = $('#messageBox').val();
        let data = {
            message
        }
        $.get('/message', data, function(){

        })
    })

    //retrieve and adds them on board
    //get message
    setInterval(() => {
        $.get('/messages',function(messages){
            $('#messages').empty();
            messages.forEach((message) => {
                $('#messages').append('<div class"row">'+message.message+'</div>');
            });
        })
    }, 1000);
    
})