(function($) {

    "use strict";

    $(".toggle-password").click(function() {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });


})(jQuery);

var authenticate = function() {
    var userId = $('#usr-id').val();
    var pwd = $('#password-field').val();
    $('#usr-id').val('');
    $('#password-field').val('');
    if (userId && pwd && pwd == 'password') {
        window.location.href = "../homepage/homepage.html";
    } else {
        Utility.notifyMsg({ msg: 'Invalid user id or password', type: 'danger' });
    }
}