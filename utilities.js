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

function post(url, data) {
    $.ajax({
        url: base_url + url,
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(data),
    }).done(function(response) {
        console.log("post done");
        //success_function(response);
    });
}






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