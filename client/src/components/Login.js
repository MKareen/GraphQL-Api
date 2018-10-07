import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        email: "",
        password: ""
      }
    };
  }

  handleChange = (e) => {
    this.setState({
      fields: {...this.state.fields, [e.target.name]: e.target.value}
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { fields } = this.state;

    this.props.mutate({
      variables: {
        email: fields.email,
        password: fields.password
      }
    });
  }

  render() {
    return (
      <>
        <h1>Login</h1>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type='input'
              name='email'
              id='email'
              onChange={e => this.handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type='password'
              name='password'
              id='password'
              onChange={e => this.handleChange(e)}
            />
          </FormGroup>
          <Button type='submit' className='btn primary'>Login</Button>
        </Form>
      </>
    );
  }
}

const mutation = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      accessToken
      user {
        _id
        fullName
        email
        createdAt
      }
    }
  }
`;

export default graphql(mutation)(Login);
