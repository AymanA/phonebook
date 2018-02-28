var book;

function fetchBooks() {
    // get('phonebook').then(response => {
    //     // this.contacts = response;
    //     console.log(response);
    // }, error => {
    //     console.log('Failed', error);
    // });

    // get('phonebook', renderContactsList);
    book = new phonebook();
    console.log(book, 'book');
}


function renderContactsList(response) {
    console.log(response);
    if (Array.isArray(response)) {
        for (var i = 0; i < response.length; i++) {
            this.renderRow(response[i]);
        }
    } else {
        this.renderRow(response);
    }
}


function renderRow(row) {
    $('#contactsList').append('<tr> <td>' + row.name + '</td> <td>' + row.phone +
        '</td><td>' + row.email + '<td> <input type="button"  value="Remove" class="btn btn-danger" onclick="book.remove(' + row.id + ')" >' +
        '</tr>'); //onclick="phonebook.removeContact()"
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
    book.add(contactInfo);
    this.reset();

});

$('#searchForm').submit(function(event) {
    event.preventDefault();
    var query = $(this).serializeArray();
    console.log(query[0].value);
    book.search(query[0].value)
});


var phonebook = function() {
    console.log('from phonebook')
    var contactsList = get('phonebook', renderContactsList);
}
phonebook.prototype = {
    add: function(contactInfo) {
        console.log('add new contact', this.contactsList);
        post("phonebook", contactInfo, renderContactsList);
    },
    remove: function(index) {
        console.log('remove  contact', index);
    },
    search: function(query) {
        console.log('search', query);
        queryString = '?name=' + query
        get('phonebook')
    },
    list: function(contactsPerPage, page) {
        console.log('list contacts');
    }
}
phonebook.prototype.constructor = phonebook;