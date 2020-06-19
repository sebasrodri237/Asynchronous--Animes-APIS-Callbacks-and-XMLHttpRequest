let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//Require the xmlhttprequest module  for make HTTP requests from NodeJS.
let API = 'https://ghibliapi.herokuapp.com/films/';
//URL to get The Studio Ghibli Films

function fetchData(url_api, callback){

    let xhttp = new XMLHttpRequest();//New XMLHttpRequest object
    xhttp.open('GET', url_api, true);//Initializes a request or re-initializes with the XMLHttpRequest method open()
    //The first parameter is the method (In this case GET to retrieve data from the API)
    //Second parameter is the url API
    //Third parameter is to indicate to perform the operation asynchronously
    xhttp.onreadystatechange = function(ev){
    //Define a function to the
    //EventHandler, this function is called when the readyState attribute change
        if(xhttp.readyState === 4){
            //This property of the XMLHttpRequest object
            //returns the state an XMLHttpRequest client is in
            //4 when the operation is done
            if(xhttp.status === 200){
            //This property of the XMLHttpRequest object
            //returns the numerical HTTP status code
            //200 when successful responses
                callback(null, JSON.parse(xhttp.responseText));
                //The callback receive null(not error) 
                //and the data from the API. The method JSON.parse is 
                //used to transform the data(is a text) in a JSON 
            }else{
                //Unsuccessful responses
                const error = new Error('Error' + url_api);
                //Create a new error to pass like a parameter to the callback
                //and the data is null
                return callback(error, null);
            }
        }

    }
    xhttp.send();
    //This method of the XMLHttpRequest object sends the request to the server
}

fetchData(API, function(error1, data1){

    if(error1){

        return console.error(error1);
    }
    fetchData(data1[8].people[0], function(error2, data2){

        if(error2){

            return console.error(error2);
        }
        fetchData(data2.species, function(error3, data3){
            if(error3){

                return console.error(error3);
            }
            console.log(`The name of the movie is: ${data1[8].title}`);
            console.log(`The main character is: ${data2.name}`);
            console.log(`His species is: ${data3.name}`);
        })
    })
    //Printing in console the data received from the API
    //when response is succesful
})
