# Phone Book
  

## Getting Started

  

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

  

### Prerequisites

install fake REST API
    ```
    npm install -g json-server
    ```
install local server 
    ```
    npm install -g http-server
    ```


### Installing

  

run `npm install` to install dependencies

  
  

## Running the App

navigate to project folder 

- run the fake server
  ```
  json-server --watch ./db/db.json
  ```
  
 - run `http-server .` to fire up dev server

  

open browser to [`http://127.0.0.1:7070`](http://127.0.0.1:7070)

  

if you want to use other port, run `http-server - {PORT_NUMBER} .`
