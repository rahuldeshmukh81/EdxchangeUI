var searchFromGoogle = function() {
    $('#inHouseSearch').hide();
    $('#googleSearch').removeClass('d-none');

    var searchValue = $('#searchText').val();
    var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCBPw1I6otxI7rwV6XWz5x-fdelUqPgpfE&cx=06ff160cd84c89407&q=" + searchValue;
    Utility.hitReq(url, null, 'get', 'json', true).done(function(response) {
        var searchResult = '';
        $.each(response.items, function(index, result) {
            searchResult += ' <div class="card-body py-3">' +
                '<div class="row no-gutters align-items-center">' +
                '<div class="col-sm-12">' +
                '<a href="' + result.link + '" class="result-data text-primary " data-abc="true">' + result.title + '</a>' +

                '</div>' +

                '</div>' +
                '</div>' +
                '<hr class="m-0"></hr>'
        });
        $(searchResult).insertAfter("#googleSearchHdr");
    });

}