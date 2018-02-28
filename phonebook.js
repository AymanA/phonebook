// var phonebook = (function() {
//     var instance;

//     function createInstance() {
//         var object = new Object("I am the instance");
//         return object;
//     }
//     phonebook.prototype = {
//         add: function(contactInfo) {
//             console.log('add new contact', this.contactsList);
//             post("phonebook", contactInfo, renderContactsList);
//         },
//         remove: function(index) { console.log('remove  contact'), this.contactsList },
//         search: function(query) { console.log('search'), this.contactsList },
//         list: function(contactsPerPage, page) { console.log('list contacts'), this.contactsList }
//     }

//     return {
//         getInstance: function() {
//             if (!instance) {
//                 instance = createInstance();
//             }
//             return instance;
//         }
//     };
// })();

// function run() {

//     var instance1 = Singleton.getInstance();
//     var instance2 = Singleton.getInstance();

//     alert("Same instance? " + (instance1 === instance2));
// }