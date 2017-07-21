This is my URL Shortener Microservice
=========================

## The Tech Stack
* MongoDB
* Express.JS
* Node.JS

## The Service

If one were to pass any ofthe number of example cases to the back end of the url's new api then you will get a (relatively) shortened url of the original link that you can visit at anytime and it will take you directly to that original link

## The Application

[To the GLITCH](https://sulky-chess.glitch.me/)


## Examples and Case Scenarios

----

### Creation Usage

#Note the use of the /new/[PUT_YOUR_URL_HERE]

*`https://sulky-chess.glitch.me//new/https://www.google.com`
*`https://sulky-chess.glitch.me//new/http://foo.com:80`

----

### Example creation

*`{ 
"original_url":"http://foo.com:80",
"short_url":"https://sulky-chess.glitch.me//8170"
 }`

-----

### Usage
* Put `https://sulky-chess.glitch.me/35` into your browser url

----

### Will Redirect to
* `https://www.google.com`