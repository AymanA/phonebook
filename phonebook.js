// singleton phonebook

var phonebook = (function() {
    var instance;

    function createInstance() {
        var contactsList = get(modelEndPoint, renderContactsList);
        return {
            getContactList: function() {
                return this.contactsList;
            },
            add: function(contactInfo, accountAddedCb) {
                console.log('add new contact', this.contactsList);
                var validationResult = formValidation(contactInfo);

                if (validationResult.length > 1) {
                    message = validationResult;
                } else {
                    post(modelEndPoint, contactInfo, renderContactsList);
                    message = 'Account Add Successfully';
                    accountAddedCb();
                }
                alert(message);

            },
            remove: function(index, el) {
                console.log('remove  contact', index, el);
                deleteContact(modelEndPoint, index, function() {
                    el.closest('tr').remove();
                });
            },
            search: function(query) {

                queryString = '?q=' + query;
                console.log('search', query, modelEndPoint + queryString);
                get(modelEndPoint + queryString, renderSearchResult);
            },
            list: function(contactsPerPage, page) {
                console.log('list contacts');
            }
        };
    };
    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


// non singleton 
// var phonebook = function() {
//     console.log('from phonebook')
//     var contactsList = get(modelEndPoint, renderContactsList);
// }
// phonebook.prototype = {
//     add: function(contactInfo) {
//         console.log('add new contact', this.contactsList);
//         var validationResult = formValidation(contactInfo);

//         if (validationResult.length > 1) {
//             message = validationResult;
//         } else {
//             post(modelEndPoint, contactInfo, renderContactsList);
//             message = 'Account Add Successfully';
//         }
//         alert(message);

//     },
//     remove: function(index, el) {
//         console.log('remove  contact', index, el);
//         deleteContact(modelEndPoint, index, function() {
//             el.closest('tr').remove();
//         });
//     },
//     search: function(query) {

//         queryString = '&q=' + query;
//         console.log('search', query, modelEndPoint + queryString);
//         get(modelEndPoint + queryString, renderSearchResult);
//     },
//     list: function(contactsPerPage, page) {
//         console.log('list contacts');
//     }
// }
// phonebook.prototype.constructor = phonebook;