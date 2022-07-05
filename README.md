# COM519 Resit

A simple file upload and sharing web app built on top of NodeJS, Express and MongoDB for submission as a resit to the COM519 Advanced Database Systems module.

Tested using Node v16.14.2

## Local Development Server

To run a local development server, download the source code from GitHub, and inside the project's main directory run the following command to install the required dependencies.
```
npm install
```
Copy the `.env.default` file and rename it to `.env`. This file is loaded by the server and defines all of the environment variables it should use. Inside this file, change the `MONGODB_URI` field to the connection string for your locally running MongoDB database. The `PORT` number can also be changed to listen for HTTP requests on a different network port. 

To run the server, use the following command.
```
npm start
```