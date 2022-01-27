import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <span>Address</span>
                <ul className="adress">
                  <li>
                    <p>
                      <strong>DCI Office, Berlin</strong>
                    </p>
                    <p>Vulkanstraße 1, 10367 Berlin</p>
                  </li>
                  <li>
                    <p>030 364286190</p>
                  </li>
                  <li>
                    <p>info@devugees.org</p>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <span>Contact</span>
                <ul className="contact">
                  <li>
                    <Link to="/mainpage">Home</Link>
                  </li>
                  <li>
                    <Link to="/team">Team</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>

                  <li>
                    <Link to="/">Gallery</Link>
                  </li>
                  <li>Contact</li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <ul className="social">
                  <span>Social</span>
                  <li>
                    <i className="fa fa-github fa-2x" />
                  </li>
                  <li>
                    <i className="fa fa-facebook fa-2x" />
                  </li>
                  <li>
                    <i className="fa fa-linkedin fa-2x" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
