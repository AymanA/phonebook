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
                var validationResult = formValidation(contactInfo);
                var message;
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
                deleteContact(modelEndPoint, index, function() {
                    el.closest('tr').remove();
                });
            },
            search: function(query) {
                var isValidPhone = validatePhone(query);
                var filter;
                if (oldQuery === query) {
                    return;
                }
                if (isValidPhone) {
                    filter = '?phone=' + query + '&_page=1&_limit=' + pageSize;
                } else {
                    filter = query.length === 0 ? '?_page=1&_limit=' + pageSize : '?name=' + query + '&_page=1&_limit=' + pageSize;
                }
                get(modelEndPoint + filter, renderContactsList);
                oldQuery = query;

            },
            list: function(contactsPerPage, page, currentFilter) {
                var pageInfo;
                if (!currentFilter) {
                    pageInfo = '?_page=' + page + '&_limit=' + contactsPerPage;
                } else {
                    pageInfo = '?q=' + currentFilter + '&_page=' + page + '&_limit=' + contactsPerPage;
                }
                get(modelEndPoint + pageInfo, renderContactsList);
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