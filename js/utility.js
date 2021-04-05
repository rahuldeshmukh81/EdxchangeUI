var initEditor = function(){
    tinymce.init({
        selector: 'textarea#basic-example',
        height: 500,
        menubar: false,
        branding:false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code codesample wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | codesample',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      });
}