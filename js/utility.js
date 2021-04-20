var Utility = function() {
    var hitReq = function(url, param, type, datatype, asyncFlag) {

        return $.ajax({
            url: url,
            data: param,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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

    var convertDateToReadableForm = function(date) {
        return moment(date).fromNow()
    }
    var numberWithCommas = function(number) {
        var parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    var getUrlParameter = function(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };

    var showHideLoader = function(isShow) {
        isShow ? $('body').addClass('center-load-spinner') : $('body').removeClass('center-load-spinner');
    }
    var notifyMsg = function(msgObj) {
        try {

            if (!msgObj.from && !msgObj.align) {
                msgObj.from = 'top';
                msgObj.align = 'right';
            }
            $.notify({
                message: msgObj.msg
            }, {
                type: msgObj.type,
                allow_dismiss: true,
                placement: {
                    from: msgObj.from,
                    align: msgObj.align
                },
                z_index: 9999,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                }
            });
        } catch (e) {
            // TODO: handle exception
        }
    }
    return {
        initEditor: initEditor,
        hitReq: hitReq,
        numberWithCommas: numberWithCommas,
        convertDateToReadableForm: convertDateToReadableForm,
        getUrlParameter: getUrlParameter,
        showHideLoader: showHideLoader,
        notifyMsg: notifyMsg
    }
}();