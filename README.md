TextSupport
===========

A project for creating a text support portal for Twilio/Angular.

##Objectives
Build a back-end that serves as a go-between between a Tech Support chat and SMS messaging via Twilio.

##Check out Demo
Go here to see the project in action.

##Step 1: Prepare the Back-end
Make sure you have a Twilio account set up and that you have your account ID and AuthToken ready.

* Create a server.js file that uses express and serves static files out of a `/public` directory.
* Install `twilio-node` as a dependency

##Step 2: Make endpoints
Make sure you have express and body-parser installed as dependencies and are using bodyParser.json() as middleware

####`POST /support/messages/`
Using the twilio-node API, make it so that any POST sent to the above endpoint with will send a text to your number. Have the message passed as a JSON object.

Format the text to say something like this:
`New support request from TextSupport: <message_goes_here>`

##Step 3: Use Zapier to receive SMS  

##Step 4: Build Front-end
Use Angular to build the front-end of the application. Keep the HTML, CSS, and JS in the /public folder.
