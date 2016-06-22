
function loadData() {

    var $body = $('body');
    var urlField = $("#longURL");
    var data = {};
    data.longURL = $('#longURL').val();
    var warningDiv = $('.WarningDiv');
    var errorOccured;
    var urlButton = $("#slashBtn");
    var emptyURL = $('#emptyURL');

    if(data.longURL == ''){
        emptyURL.css('hidden', 'visibility');
    }

    if(data.longURL.indexOf('localhost') > -1) {
        warningDiv.toggleClass('show');
        errorOccured = "True";    
    }   

    setTimeout(function () {
        if(errorOccured) {
            warningDiv.toggleClass('show');         
        }        
    }, 3000)   


    $.ajax({
        url: "http://localhost:3000/",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json",
        cache: false,
        timeout: 5000,        
        success: function(response) {
        urlField.val(response);
        urlButton.html('Copy');                                              
       },
        error: function() {
          console.log('process error');
        },
      });

    return false;
};

$('#form-container').submit(loadData);

$('#longURL').keyup(function(){    
    if ($('#longURL').val() == ''){        
        $("#slashBtn").html('Slash');        
    }    
});

