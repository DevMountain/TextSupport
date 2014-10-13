TextSupport
===========

A project for creating a text support portal for Twilio/Angular.

##Objectives
Build a back-end that serves as a go-between between a Tech Support chat and SMS messaging via Twilio.

###The Twilio Node Library
twilio-node is a nicely packaged code library that interacts with the Twilio REST API. Rather than using a library like `request` and making HTTP calls, the makers of twilio-node have abstracted much of the HTTP work out of the equation. You'll find a similar pattern with many other REST APIs.

###Firebase
We'll use Firebase for syncing our back-end. After the Database portion of class, you'll be able to construct your own back-end. For now, Firebase will be a good go-between.

##Check out Demo
Go here to see the project in action.

##Step 1: Prepare the Back-end
Make sure you have a Twilio account set up and that you have your account ID and AuthToken ready.

* Install `twilio-node` as a dependency 
* Install `firebase` as a dependency
* Create a server.js file that uses express and serves static files out of a `/public` directory. Create a simple index.html file in your public directory and test your server.js file to make sure static files are being served.
* Make sure you have express and body-parser installed as dependencies and are using bodyParser.json() as middleware
* Create an account with Zapier.
* Create a new project in Firebase for TextSupport.

##Step 2: Make initial Firebase trigger
We'll use Firebase and a service called Zapier to detect new requests to our TextSupport system. 
* Require the `firebase` library. 
* Create a new Firebase reference to your projet in Node. (One of the cool things about Firebase is that they have the exact same APIs for Javascript, whether front-end or back.) The url should be:

```
https://<my-app-name>.firebaseio.com/tickets
```

* Use the `on()` handler to detect when a new messages have been added to your tickets collection. [Docs here.](https://www.firebase.com/docs/web/api/query/on.html) You'll listen for the `child_added` event. 
* Create a new "zap" on Zapier that triggers when a SMS is sent to your Twilio number. Have the trigger cause a new Firebase child to be added to `/tickets`.

When matching up the Twilio SMS with the Firebase child record, you can use something like this:

![img-firebase-zapier](http://cl.ly/image/1q3k311E0C1Q/Screen%20Shot%202014-10-13%20at%209.32.59%20AM.png)

You can either have the entire Twilio SMS object sent, or just save the fields you need, like `From`, `Date Sent` and `Body`

####`POST /support/messages/`
Using the twilio-node API, make it so that any POST sent to the above endpoint with will send a text to your number. Have the message passed as a JSON object.

Format the text to say something like this:
`New support request from TextSupport: <message_goes_here>`

##Step 3: Use Zapier to receive SMS  

##Step 4: Build Front-end
Use Angular to build the front-end of the application. Keep the HTML, CSS, and JS in the /public folder.
