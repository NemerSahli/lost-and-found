import React from 'react';
import Team from './Team';
export default function About() {
  window.scrollTo(0, 0);

  return (
    <div className="container header-team">
      <Team />
      <div className="lead mt-4 p-3">
        <div>
          <h3>Fuburo - Das Online Fundbüro</h3>
          <hr className="my-2" />
          <p>
            Fuburo - Das Online Fundbüro is a web application which gives you
            the opportunity to help others by inserting their property on our
            list.
          </p>
          <p>
            The users are able to communicate through this platform and to find
            a solution together. By filtering the search results it makes it
            comfortable to find this, what you're really searching for.
          </p>
          <p>
            Farhtermore it's possible to insert items you lost to let the
            community help you by finding this. By adding a picture to the item
            you found or lost makes it much easier to recognize it and to begin
            a contact with the person who needs it.
          </p>
        </div>

        <p>For this school project, the following technologies were used: </p>
        <ul>
          <li>- ReactJS with the Redux.</li>
          <li>- JavaScript including HTML and CSS</li>
          <li>
            - NodeJs and a Mongoose Schema to interacting with the MongoDB
            database
          </li>
          <li>- CRUD RESTful API with NodeJS Express</li>
          <li>- Thunk middleware</li>
          <li>- Router and Switch to switch between components</li>
          <li>- Axios to perform HTML requests.</li>
        </ul>
      </div>
      <p className="text-secondary">Version 3.0</p>
    </div>
  );
}
