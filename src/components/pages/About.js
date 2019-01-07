import React from 'react';

export default function About() {
  return (
    <div className="container mt-5">
      <h1 className="display-4">Lost and found final year project</h1>
      <p className="lead">
        Lost and found is a web application platform, the user can either post
        lost or found stuff, also able to apply the location on Map and can take
        a picture for uploading. The user can communicate by sending text
        message to other users. Frontend React framework, Redux for store, thunk
        middleware for the functions, Router and Switch for switching between
        the components, also take a picture and send it as data URI to the
        backend via "axios" post request to save it in the database. Axios to
        perform the HTTP requests. Backend used NodeJs and Restful API with
        Express, also Implemented user authentication login with Sessions,
        enabling CRUD RESTful API with Node.js Express, and Mongoose with Schema
        for interacting with the MongoDB.
      </p>

      <p className="text-secondary">Version 1.0.0</p>
    </div>
  );
}
