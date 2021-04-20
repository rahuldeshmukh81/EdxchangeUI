//Global variables
var uId = Utility.getUrlParameter('uId');
var queId = Utility.getUrlParameter('queId');
var loggedInUserId = 4;

// Shorthand for $( document ).ready()
$(function() {
    console.log("ready!");
    Utility.showHideLoader(true);
    Utility.initEditor('#postAnswerRte');

    loadUserDetails();
    loadQuestionAnswer();
    init();
});

var init = function(params) {
    $('[data-toggle="tooltip"]').tooltip();
    $('#file-upload-ans').change(function(e) {
        var fileName = e.target.files[0].name;
        $('#ansAttachement').text(fileName);
    });

}

var viewFile = function(ele) {
    window.open('../upload/' + $(ele).text().trim(), 'Download');
}
var openBrowseWin = function(params) {
    $('#file-upload-ans').click();
}

var loadUserDetails = function() {
    var url = "http://localhost:8080/api/user/" + uId;
    Utility.hitReq(url, null, 'get', 'json', true).done(function(response) {
        $('#userImage').attr('src', '../images/profile/' + response.profileImage)
        $('#profileName').html(response.firstName + ' ' + response.lastName);
        $('#profileRole').html(response.role);
        $('#profileRating').html(Utility.numberWithCommas(response.rating));
        $('#bio').html(response.about);
        $('#userSkills').html(getSkills(response.skills));
        $('#userImage').removeClass('invisible');
    });
}

var loadQuestionAnswer = function() {
    var url = "http://localhost:8081/api/questions/get/" + queId;
    Utility.hitReq(url, null, 'get', 'json', true).done(function(response) {
        $('#queTitle').html(response.title);
        $('#queDesc').html(response.description);
        $('#queAskedTime').html(Utility.convertDateToReadableForm(response.created_date));
        $('#queAttachment').html(response.attachement);
        $('#queTags').html(getSkills(response.tags));
        $('.answer-wrapper').remove();
        $(loadAnswer(response.answers)).insertAfter("#threadReply");
        response.resolved ? $('#isResolved').removeClass('d-none') : $('#isResolved').addClass('d-none');
        $('[data-toggle="tooltip"]').tooltip();
        $('.container-fluid').removeClass('d-none');
        Utility.showHideLoader(false);
    });
}

var loadAnswer = function(answers) {
    var answer = '';
    $.each(answers, function(index, ans) {
        answer += '<div class="answer-wrapper row mt-3 m-3 p-3 shadow-lg bg-white rounded" data-id=' + ans.id + '>' +
            '<div class="col-sm-2">' +
            '<img src="../images/profile/' + ans.created_by.profileImage + '" class="mx-auto d-block rounded-circle img-thumbnail w-80" alt="...">' +
            '</div>' +
            '<div class="col-sm-10">' +
            '<div class="row">' +
            '<div class="col-sm-6">' +
            '<div class="text-primary  font-weight-bold c-link cursor-pointer">' +
            ans.created_by.firstName + ' ' + ans.created_by.lastName +
            '</div>' +
            '<span class="text-secondary font-08">' + Utility.convertDateToReadableForm(ans.created_date) + '</span>' +
            '</div>' +
            '<div class="col-sm-6 ">' +
            (ans.accepted ? '<span class="badge badge-success p-04 float-right accepted-tag">Answer Accepted</span>' : '<button onclick="acceptAnswer(this)" type="button" class="btn btn-primary mark-as-correct-btn btn-sm float-right">Mark As Correct</button>') +
            '</div>' +
            '<div class="col-sm-12 mt-2 font-09 answer-body">' +
            ans.answer +

            '</div>' + (ans.attachment ?
                '<div class="col-sm-12 mt-2">' +
                '<div class="font-weight-bold font-09">Attachments</div>' +
                '<div class="attachment-file c-link download-file"  onclick="viewFile(this)">' + ans.attachment + '</div>' +

                '</div>' : '') +
            '<div class="col-sm-12 mb-1">' +
            '<span data-toggle="tooltip" data-placement="top" title="I like this answer" class="like-wrapper c-link cursor-pointer">' +
            '<i class="fa fa-thumbs-up text-primary cursor-pointer c-link " ></i>' +
            '<span class="ml-1 font-09 text-secondary font-weight-bold">' + ans.vote + '</span>' +
            '</span>' +
            '</div>' +
            '</div>' +

            '</div>' +
            '</div>';
    });
    return answer;
}

var getSkills = function(skills) {
    var skillStr = '';
    skills = skills.split(',');
    $.each(skills, function(index, skill) {
        skillStr += '<span class="badge badge-primary">' + skill + '</span>';
    });
    return skillStr;
}

var postAnswer = function() {
    if (tinyMCE.activeEditor.getContent().length == 0) {
        Utility.notifyMsg({ msg: 'Please type your answer in the editor', type: 'danger' });
        return false;
    }
    var param = {};
    param.answer = tinyMCE.activeEditor.getBody().innerHTML;
    param.attachment = $('input[type=file]').val().split('\\').pop();
    var url = "http://localhost:8081/api/answers/post-ans/" + queId + "/" + uId;
    Utility.showHideLoader(true);
    Utility.hitReq(url, JSON.stringify(param), 'post', 'json', true).done(function(response) {
        tinyMCE.activeEditor.setContent('')
        loadQuestionAnswer();
        Utility.notifyMsg({ msg: 'Your answer posted successfully', type: 'success' });
    });
}

var acceptAnswer = function(ele) {

    var url = "http://localhost:8081/api/answers/accept-ans/" + queId + "/" + $(ele.closest('.answer-wrapper')).data('id');
    Utility.hitReq(url, null, 'post', 'json', true).done(function(response) {
        Utility.notifyMsg({ msg: 'Answer accepted successfully', type: 'success' });
        $(ele).hide();
        $('#isResolved').removeClass('d-none');
        $(ele).parent().html('<span class="badge badge-success p-04 float-right accepted-tag">Answer Accepted</span>')
    });
}