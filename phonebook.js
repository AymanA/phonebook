// singleton phonebook

var phonebook = (function() {
    var instance;
    var pageSize;

    function createInstance(pageSize) {
        var firstPage = '?_page=1&_limit=' + pageSize;
        var contactsList = get(modelEndPoint + firstPage, renderContactsList);
        var oldQuery;

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
                console.log(oldQuery, query);
                if (oldQuery !== query) {
                    filter = '?q=' + query + '&_page=1&_limit=' + pageSize;
                    console.log('search', query, modelEndPoint + filter);
                    get(modelEndPoint + filter, renderContactsList);
                    oldQuery = query;
                }

            },
            list: function(contactsPerPage, page, currentFilter) {
                var pageInfo;
                if (!currentFilter) {
                    pageInfo = '?_page=' + page + '&_limit=' + contactsPerPage;
                } else {
                    pageInfo = '?q=' + currentFilter + '&_page=' + page + '&_limit=' + contactsPerPage;
                }
                get(modelEndPoint + pageInfo, renderContactsList);
                console.log('list contacts', contactsPerPage, page);
            }
        };
    };
    return {
        getInstance: function(pageSize) {
            if (!instance) {
                instance = createInstance(pageSize);
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
//         get(modelEndPoint + queryString, renderContactsList);
//     },
//     list: function(contactsPerPage, page) {
//         console.log('list contacts');
//     }
// }
// phonebook.prototype.constructor = phonebook;