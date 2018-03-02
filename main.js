var book;
var modelEndPoint = 'phonebook';

function fetchBooks() {
    // in case using promises
    // get('phonebook').then(response => {
    //     // this.contacts = response;
    //     console.log(response);
    // }, error => {
    //     console.log('Failed', error);
    // });

    // get('phonebook', renderContactsList);
    book = phonebook.getInstance();
    console.log(book, 'book');
}


function renderContactsList(response) {

    console.log(response, 'request');
    if (Array.isArray(response)) {
        response.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        for (var i = 0; i < response.length; i++) {
            this.renderRow(response[i]);
        }
    } else {
        this.renderRow(response);
    }
}

function renderSearchResult(response) {
    $("#contactsList").find("tr:not(:first)").remove();
    this.renderContactsList(response);
}


function renderRow(row) {
    $('#contactsList').append('<tr> <td>' + row.name + '</td> <td>' + row.phone +
        '</td><td>' + row.email + '<td> <input type="button"  value="Remove" class="btn btn-danger" onclick="book.remove(' + row.id + ', this)" >' +
        '</tr>');
}

$('#contactInfo').submit(function(event) {

    event.preventDefault();
    var dataArray = $(this).serializeArray();
    console.log(dataArray);

    var contactInfo = {};
    for (var l = 0; l < dataArray.length; l++) {
        contactInfo[dataArray[l].name] = dataArray[l].value;
    }

    console.log(contactInfo, book, 'add');
    book.add(contactInfo, function() {
        this.reset();
    }.bind(this));


});

$('#searchForm').submit(function(event) {
    event.preventDefault();
    var query = $(this).serializeArray();
    book.search(query[0].value);
});