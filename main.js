function fetchBooks() {
    // get('phonebook').then(response => {
    //     // this.contacts = response;
    //     console.log(response);
    // }, error => {
    //     console.log('Failed', error);
    // });


    get('phonebook', renderContactsList);
}


function renderContactsList(response) {
    console.log(response);

    for (var i = 0; i < response.length; i++) {

        $('#contactsList').append('<tr> <td>' + response[i].name + '</td> <td>' + response[i].phone +
            '</td><td>' + response[i].email + '<td> <input type="button"  value="Remove" class="btn btn-danger" >' +
            '</tr>'); //onclick="phonebook.removeContact()"
    }

}

$('#contactInputForm').submit(function(event) {

    event.preventDefault();
    var dataArray = $(this).serializeArray();
    console.log(dataArray);

    var contact = {};
    for (var l = 0; l < dataArray.length; l++) {
        contact[dataArray[l].name] = dataArray[l].value;
    }

    console.log(contact);

    post("phonebook", contact);
});