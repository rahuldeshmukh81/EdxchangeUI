$(function() {
    Utility.initEditor('#postQueRte');
});
var openAskQueModel = function() {
    $('#askQueModel').modal().on('shown.bs.modal', function() {

        $('#queTtag').tagsInput();
        $('#file-upload-que').change(function(e) {
            var fileName = e.target.files[0].name;
            $('#queAttachement').text(fileName);
        });
    })
}

var openQueBrowseWin = function(params) {
    $('#file-upload-que').click();
}