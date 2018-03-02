var book;
var modelEndPoint = 'phonebook';
var currentPage = 1;
var pageSize = 5;
var lastPage;
var queryString;

function fetchBooks() {
    // in case using promises
    // get('phonebook').then(response => {
    //     // this.contacts = response;
    //     console.log(response);
    // }, error => {
    //     console.log('Failed', error);
    // });


    book = phonebook.getInstance(pageSize);
    console.log(book, 'book');
}


function renderContactsList(response, request) {
    if (Array.isArray(response)) {
        if (request.getResponseHeader('X-Total-Count')) {
            lastPage = Math.ceil(request.getResponseHeader('X-Total-Count') / pageSize);
        }

        $("#contactsList").find("tr:not(:first)").remove();

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
    queryString = query[0].value;
    book.search(query[0].value);
    resetPagination();
});


document.getElementById('next').onclick = function(e) {
    if (currentPage === lastPage - 1) {
        e.target.parentElement.classList.add('disabled');
    }
    if (currentPage === 1) {
        e.target.parentElement.parentNode.querySelector('#previous').classList.remove('disabled');
    }
    currentPage++;
    e.target.parentElement.parentNode.querySelector('#currentPage').innerHTML = currentPage;

    if (queryString && queryString.length >= 1) {
        book.list(pageSize, currentPage, queryString);

    } else {
        book.list(pageSize, currentPage);

    }
};

document.getElementById('previous').onclick = function(e) {
    if (currentPage === 2) {
        e.target.parentElement.classList.add('disabled');
    }
    if (currentPage === lastPage) {
        e.target.parentElement.parentNode.querySelector('#next').classList.remove('disabled');
    }
    currentPage--;
    e.target.parentElement.parentNode.querySelector('#currentPage').innerHTML = currentPage;
    book.list(pageSize, currentPage);
};

function resetPagination() {
    currentPage = 1;
    document.querySelector('#currentPage').innerHTML = currentPage;
    document.querySelector('#next').classList.remove('disabled');
    document.querySelector('#previous').classList.add('disabled');
}