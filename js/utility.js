var Utility = function() {
    var hitReq = function(url, param, type, datatype, asyncFlag) {
        if (arguments.length < 5) {
            showSettingErrorMsg("alert-warning", "invalid param length");
            return false;
        }
        return $.ajax({
            url: url,
            data: param,
            type: (type == 'undefined' || type == '') ? 'get' : type,
            datatype: (datatype == 'undefined' || datatype == '') ? 'html' : datatype,
            async: asyncFlag,
        });
    }

    var initEditor = function(id) {
        tinymce.init({
            selector: id,
            height: 300,
            menubar: false,
            statusbar: false,
            branding: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code codesample emoticons wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | codesample | emoticons',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        });
    }
    
    var convertDateToReadableForm = function(date){
        return moment(date).fromNow()
    }
    var numberWithCommas = function(number) {
        var parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    return {
        initEditor: initEditor,
        hitReq: hitReq,
        numberWithCommas: numberWithCommas,
        convertDateToReadableForm : convertDateToReadableForm
    }
}();