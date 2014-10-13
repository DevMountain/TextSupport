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

##Step 2: Make Twilio -> Zapier -> Firebase trigger
We'll use Firebase and a service called Zapier to detect new requests to our TextSupport system. 
* Require the `firebase` library. 
* Create a new Firebase reference to your projet in Node. (One of the cool things about Firebase is that they have the exact same APIs for Javascript, whether front-end or back.) The url should be:

```
https://<my-app-name>.firebaseio.com/numbers
```

* Create a new "zap" on Zapier that triggers when a SMS is sent to your Twilio number. Have the trigger cause a new Firebase child to be added to `/numbers`.

When matching up the Twilio SMS with the Firebase child record, you can use something like this:

![img-firebase-zapier](http://cl.ly/image/332a3T3v2z3T/Screen%20Shot%202014-10-13%20at%2010.07.09%20AM.png)

You can either have the entire Twilio SMS object sent, or just save the fields you need, like `From`, `Date Sent` and `Body`

Test your server.js file and your Zap using the "Test this Zap" section of the Zap editor. If all goes well, you should be able to see your message data added to Firebase when the Zap is tested.

##Step 3: Start Front-end

Create an Angular project in your `/public` directory. Let's start with a few ngRoutes:

####`/`
This will be a static template that will display the Twilio phone number and instructions on how to contact TextSupport. It could look something like this:

![img-home-route](http://cl.ly/image/1U0F212q153w/Screen%20Shot%202014-10-13%20at%209.51.12%20AM.png)

Let's have the `otherwise` catch-all point to this route as well.

####`/support`
This will be the route that will show all numbers and their conversations. When you're finished, it should look something like this:

![first-route-done](http://cl.ly/image/2v1q3v0F453Y/Screen%20Shot%202014-10-13%20at%2010.19.31%20AM.png)

* Set up a controller and a template for this route.
* In the controller, point a scope variable to a $firebase-wrapped object for the `/numbers` url in your Firebase Forge. (Don't forget to include AngularFire in your index.html and inject the dependencies in app.js and your controller).
* In the template, ng-repeat over numbers to show all the conversations for a number. Then ng-repeat over each message for that number.

Remember, Firebase is storing all of this information as objects, not arrays. So it will be much more helpful for you to use the object syntax for ng-repeat:

```
ng-repeat="(key, val) in object"
```

This will help you retrieve the phone number.

##Step 4: Add "reply" ability
Now we'll make it so that messages sent from our dashboard will be saved in Firebase and sent to the user.

Let's start by creating an API endpoint in our server.js:

####`POST /support/messages/`
Using the twilio-node API, make it so that any POST sent to the above endpoint with will send a text to the originating number. You should probably pass the "to" number in the POST JSON data.

Once the text has been sent successfully, add the record to the Firebase collection. You might consider marking support messages differently than user messages in Firebase. That way your interface could make it a little easier to distinguish outgoing from incoming messages. Maybe like this:

![support-route-done](http://cl.ly/image/2u3i3i2Q2m0P/Screen%20Shot%202014-10-13%20at%2011.09.01%20AM.png)

Now, add in front-end necessary (including a service) for a support agent to reply to the conversation.

##Step 5: Add resources endpoint
For our final step, we'll make some resources that will be easy to send to our customers who are needing support. We'll start by making a server-side endpoint:

####`GET /support/resources/:resource_name`

This endpoint will take a `resource_name` and return a support resource. If the resource_name matches one of the resources we've created, we'll return the file. If it doesn't match, we'll return a 404 (not found) page.

* Use this list as your resource list
  * **terms-and-conditions** (download [here](https://devmounta.in/files/FakeTermsandConditions.pdf))
  * **cease-and-desist** (download [here](https://devmounta.in/files/FakeCeaseandDesist.pdf))
  * **helpful-infographic** (download [here](https://devmounta.in/files/helpful-infographic.jpg))

Download these files into your /public directory.

When serving these files based on an endpoint, use the `sendFile` method found on the Express response object. Here's a SO answer that can help: http://stackoverflow.com/a/11569297/1160485

For the 404 page, make a [clever 404 page](http://www.hongkiat.com/blog/60-really-cool-and-creative-error-404-pages/) and serve it up if the `resource_name` doesn't match one of those found above.
