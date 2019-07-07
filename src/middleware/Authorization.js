import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';

const Authorization = (WrappedComponent, allowedRoles, userType) => {
  return class WithAuthorization extends React.Component {
    render() {
      if (allowedRoles.includes(userType)) {
        return <WrappedComponent {...this.props} />;
      } else {
        return (
          <Jumbotron className="mt-5 bg-white">
            <h4 className="text-center">
              Sorry you can't access this Page please login! or go Home
              Dashboard!
            </h4>
            <div className="text-center mt-5">
              <Link to="/mainpage">Go Back</Link>
            </div>
          </Jumbotron>
        );
      }
    }
  };
};

export default Authorization;
