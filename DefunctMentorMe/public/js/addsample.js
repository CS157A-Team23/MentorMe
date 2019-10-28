$(document).ready(function() {
    $('#btn').on('click', function() {
        let text = $('textarea#text').val();
        $('#textlist').append(`<li>${text}</li>`);
        req = $.ajax({
            url : '/sample',
            type : 'POST',
            data : {t : text}
        });

    })
});