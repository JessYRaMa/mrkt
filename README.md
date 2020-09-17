# Welcome to MRKT

<img width="200" align = "center" alt="mrkt" src="https://user-images.githubusercontent.com/61812035/93033257-54ad0900-f5ea-11ea-9247-3c462b9c6ce9.png">

MRKT by JessYRaMa. Check out our individual GitHub Repositories!<br>
[Jessica Vaiana-Cavanagh](https://github.com/jessicavc)<br>
[Yssabel Pangilinan](https://github.com/YPangilinan)<br>
[Rafael Jimenez](https://github.com/Raffaj1208)<br>
[Marc Martinez](https://github.com/MarcM987)<br>

## Project Description
**MRKT** is the newest social marketplace! Similar to Facebook, MRKT is a react-based single-page application which allows users to add/edit/delete their own listings,
look through other user's listings, like and comment listings and also add to cart and checkout. This application utilizes React components, 
helper/util functions, and lifecycle methods in order to query and display books based on the user searches. 
This application uses the full MERN (MongoDB, Express, React, Node) stack so that users can save items to their cart for later purchase or have the chance
to reference and edit their listings later! <br>

<img width="800" align = "center" alt="mrkt" src="https://user-images.githubusercontent.com/61812035/93152634-082e0000-f6b4-11ea-9157-8b8d00d3e9ab.png">

### See it in action!
*MRKT* is deployed to Heroku. Please check it out [here](https://mrkt-jessyrama.herokuapp.com/)


### How was this app created?
This assignment utilizes the MERN stack!<br>
The specific technologies used to create this app are:
- HTML
- JavaScript
- React
- Express
- Express-Validator
- Formidable
- Mongoose
- OAuth
- JSON Web Token
- Lodash
- Canva
- [Create-React-App](https://github.com/facebook/create-react-app)
- [Braintree](https://www.braintreepayments.com/)
- [GetStream.io](https://getstream.io/)
- [Material Design for Bootstrap](https://mdbootstrap.com/docs/react/)
- [MaterialUI](https://material-ui.com/)


## Want to run it locally?
To install the application follow the instructions below:

	git clone git@github.com:JessYRaMa/mrkt.git
	cd mrkt
	npm install
  
  
This should install the necessary packages from the Package.JSON needed for the server-side portion of the application. 

	cd client
	npm install
  
  
This should install the necessary packages from the Package.JSON needed for the client-side portion of the application. 

In the terminal,run the Node.js application with the command below.

	npm run demo
  
The application will now be running locally on `PORT`, in this case that is port 3000. You can then access it locally from your browser at the URL `localhost:PORT`, in this case `localhost:3000`.


### Project Instructions/Requirements
Your project must:
* Must use ReactJS in some way (even if minimal)
* Must use a Node and Express Web Server
* Must be backed by a MySQL or MongoDB Database with a Sequelize or Mongoose ORM
* Be deployed using Heroku (with Data);
* Must have both GET and POST routes for retrieving and adding new data
* Must utlize at least two libraries, packages, or technologies that we haven't discussed
* Must allow for or involve the authentication of users in some way
* Have a polished frontend / UI
* Have folder structure that meets MVC Paradigm
* Meet good quality coding standards (indentation, scoping, naming)
* Must not expose sensitive API key information on the server, see Protecting-API-Keys-In-Node.md
