import React from 'react';
// import imgNotFound from '/images/404.jpeg';
export default function NotFound() {
  return (
    <div className="container mt-5">
      {/* <h1 className="text-center">404 page not found</h1> */}
      <div className="row justify-content-center mt-5">
        <img src="/images/404.jpeg" alt="" />
      </div>
    </div>
  );
}
