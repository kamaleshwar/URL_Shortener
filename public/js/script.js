
function loadData() {

    var $body = $('body');
    var urlField = $("#longURL");
    var data = {};
    data.longURL = $('#longURL').val();
    var errorDiv = $('.errorDiv');
    var errorOccured;
    var urlButton = $("#slashBtn");
    var emptyURL = $('#emptyURL');


    if(data.longURL == ''){
        emptyURL.css('hidden', 'visibility');
        urlButton.focus(function(){
                this.blur();
            });
        return false;
    }
    
    if (urlButton.text() !== 'Copy') {

        if(data.longURL.indexOf('localhost') > -1) {
            errorDiv.toggleClass('show');
            errorOccured = "True";                

            setTimeout(function () {
                if(errorOccured) {
                    errorDiv.toggleClass('show');         
                }        
            }, 3000);   
            return false;
        }
        
        $.ajax({
        url: "/add",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json",
        cache: false,
        timeout: 5000,        
        success: function(response) {
        urlField.val(response);
        urlButton.html('Copy');      

        urlButton.click(function() {
            var $temp = $("<input>")
            $("body").append($temp);
            $temp.val(urlField.val()).select();
            document.execCommand("copy");
            $temp.remove();
            urlButton.focus(function(){
                this.blur();
            });
        }); 


       },
        error: function() {
          console.log('process error');
        },
      });    
    }             
        

    return false;
};

$('#form-container').submit(loadData);

$('#longURL').keyup(function(){
    $('#longURL').css('color', '#336699');
    if ($('#longURL').val() == ''){        
        $("#slashBtn").html('Slash');        
    }    
});
