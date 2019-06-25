import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openLoginSignUpModal } from '../../actions/login-signup';
import { logOut } from '../../actions/login-signup';
import { loadItems } from '../../actions/itemCrud';

class Header extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <Navbar className="header position-fixed fixed-top " light expand="md">
        <Link
          to="/mainpage"
          onClick={() => {
            this.props.loadItems();
            this.setState({
              isOpen: false
            });
          }}
          className="navbar-brand text-dark no-underline"
        >
          {/* <i className="fas fa-home fa-2x" /> */}
          <img className="fuburo-logo"
            src="/images/fuburo.png"
            alt=""
            
          />
        </Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!this.props.loggedIn && (
              <NavItem className="mr-2">
                <div className="text-dark no-underline navbar-brand">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      this.toggle();
                      this.props.openLoginSignUpModal();
                    }}
                  >
                    <i className="fas fa-sign-in-alt mr-1" />
                    Sign in
                  </span>
                </div>
              </NavItem>
            )}
            {this.props.loggedIn && (
              <NavItem className="mr-2">
                <Link
                  onClick={this.toggle}
                  to="/myaccount"
                  className="text-dark no-underline navbar-brand"
                >
                  <i className="fas fa-user mr-1" />
                  <span>{this.props.loggedInUser.firstName}</span>
                </Link>
              </NavItem>
            )}

            <UncontrolledDropdown nav inNavbar className="mr-3">
              <DropdownToggle
                nav
                caret
                style={{
                  marginTop: '3px',
                  paddingTop: '0px',
                  paddingLeft: '0px',
                  color: '#484848'
                }}
              >
                <span className="lead  mt-0 pt-0" style={{ fontSize: '23px' }}>
                  <i className="fas fa-plus-circle" />
                  Insert
                </span>
              </DropdownToggle>
              <DropdownMenu className="row ">
                {this.props.loggedIn ? (
                  <div>
                    <DropdownItem>
                      <Link
                        onClick={this.toggle}
                        to="/insert/found/item"
                        className="no-underline"
                      >
                        <span>Found</span>
                      </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link
                        onClick={this.toggle}
                        to="/insert/lost/item"
                        className="no-underline"
                      >
                        <span>Lost</span>
                      </Link>
                    </DropdownItem>
                  </div>
                ) : (
                  <DropdownItem>
                    <div className="text-center">
                      <p>Please login or signup</p>
                      <p>to insert</p>
                      <p>your lost or found items! </p>
                    </div>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem className="mr-2">
              <Link
                onClick={this.toggle}
                to="/showmap"
                className="text-dark no-underline navbar-brand"
              >
                <i className="fas fa-map-marked-alt " /> Map
              </Link>
            </NavItem>
            <NavItem className="mr-2">
              <Link
                onClick={this.toggle}
                to="/about"
                className="text-dark no-underline navbar-brand"
              >
                <i className="fas fa-book mr-1" />
                About
              </Link>
            </NavItem>

            {this.props.loggedIn && (
              <NavItem>
                <Link
                  to="/mainpage"
                  className="text-dark no-underline navbar-brand"
                  onClick={() => {
                    this.props.logOut();
                    this.toggle();
                  }}
                >
                  <i className="fas fa-power-off" />
                </Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn,
  loggedInUser: state.userReducer.loggedInUser
});
export default connect(
  mapStateToProps,
  { openLoginSignUpModal, logOut, loadItems }
)(Header);
