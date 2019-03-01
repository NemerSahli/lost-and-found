import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import Profile from './Profile';
import ConversationItems from './ConversationItems';
import ConversationBody from './ConversationBody';
import MyItems from './MyItems';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              My Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              Messages
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => {
                this.toggle('3');
              }}
            >
              My Items
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1" className="mt-4">
            <Profile />
          </TabPane>
          <TabPane tabId="2" style={{ height: '800px' }}>

            <Row>
              <Col sm="6">
                <ConversationItems />
              </Col>

              <Col sm="6">
                <ConversationBody />
              </Col>
            </Row>

          </TabPane>
          <TabPane tabId="3" style={{ height: '100%' }} className="mt-4">
            <Row>
              <Col sm="12">
                <MyItems />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default MyAccount;
