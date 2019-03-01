import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class inputTest extends React.Component {
  state = {
    email: '',
    password: ''
  };

  submitHandler = event => {
    event.preventDefault();
    var email = event.target.email;
    var password = event.target.password;
    // console.log(email.value, password.value);

    var dataObj = {
      email: email.value,
      password: password.value
    };
    // console.log(dataObj);
  };

  render() {
    return (
      <Form inline onSubmit={this.submitHandler}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="something@idk.cool"
            defaultValue="test@email.com"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="don't tell!"
            defaultValue="test2"
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default inputTest;
