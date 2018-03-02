function get(url, success_function) {
    $.ajax({
        url: base_url + url,
        type: 'GET',
        dataType: 'json',
    }).done(function(response) {
        success_function(response);
    }).error(function() {

    });
}

function post(url, data, success_function) {
    $.ajax({
        url: base_url + url,
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(data),
    }).done(function(response) {
        console.log("post done");
        success_function(response);
    });
}

function deleteContact(url, index, success_function) {
    $.ajax({
        url: base_url + url + '/' + index,
        type: 'DELETE',
        contentType: "application/json",
        dataType: 'json',
    }).done(function(response) {
        console.log("delete done");
        success_function();
    });
}

function formValidation(form) {
    var errorMessage = '';
    errorMessage += validateName(form.name) ? '' : "name should be 1:100 characters, ";
    errorMessage += validateEmail(form.email) ? '' : "Email not valid, ";
    errorMessage += validatePhone(form.phone) ? '' : "phone not valid";
    return errorMessage;
}

function validateName(name) {
    if (!name || name.length === 0 || name.length > 100) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    var re = /[0-9]{2}-[0-9]{3}-[0-9]{4}/g;
    var isPhoneValid = re.test(phone);
    return isPhoneValid;
}

// in case using promises
// function get(route) {
//     // Return a new promise.
//     const url = base_url + route;
//     return new Promise(function(resolve, reject) {
//         // Do the usual XHR stuff
//         let req = new XMLHttpRequest();
//         req.open('GET', url);

//         req.onload = function() {
//             // This is called even on 404 etc
//             // so check the status
//             if (req.status == 200) {
//                 // Resolve the promise with the response text
//                 resolve(req.response);
//             } else {
//                 // Otherwise reject with the status text
//                 // which will hopefully be a meaningful error
//                 reject(Error(req.statusText));
//             }
//         };

//         // Handle network errors
//         req.onerror = function() {
//             reject(Error("Network Error"));
//         };

//         // Make the request
//         req.send();
//     });
// };


// function post(route) {
//     // Return a new promise.
//     const url = base_url + route;
//     return new Promise(function(resolve, reject) {
//         // Do the usual XHR stuff
//         let req = new XMLHttpRequest();
//         req.open('GET', url);

//         req.onload = function() {
//             // This is called even on 404 etc
//             // so check the status
//             if (req.status == 200) {
//                 // Resolve the promise with the response text
//                 resolve(req.response);
//             } else {
//                 // Otherwise reject with the status text
//                 // which will hopefully be a meaningful error
//                 reject(Error(req.statusText));
//             }
//         };

//         // Handle network errors
//         req.onerror = function() {
//             reject(Error("Network Error"));
//         };

//         // Make the request
//         req.send();
//     });
// }