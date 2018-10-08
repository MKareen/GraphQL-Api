import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                email: '',
                password: ''
            }
        };
    }

  handleChange = (e) => {
      this.setState({
          fields: { ...this.state.fields, [e.target.name]: e.target.value }
      });
  };

  handleSubmit = (event) => {
      event.preventDefault();
      const { fields } = this.state;

      this.props.mutate({
          variables: {
              email: fields.email,
              password: fields.password
          }
      });
  };

  render() {
      const { fields } = this.state;

      return (
          <div>
              <h1>Login</h1>
              <form className="" onSubmit={e => this.handleSubmit(e)}>
                  <div className="form-group">
                      <label>Email</label>
                      <input
                          className="form-control"
                          type='text'
                          name='email'
                          id='email'
                          value={fields.email}
                          onChange={e => this.handleChange(e)}
                      />
                  </div>
                  <div>
                      <label>Password</label>
                      <input
                          className="form-control"
                          type='password'
                          name='password'
                          id='password'
                          value={fields.password}
                          onChange={e => this.handleChange(e)}
                      />
                  </div> <br />
                  <button type='submit' className='btn primary'>Login</button>
              </form>
          </div>
      );
  }
}

const mutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        fullName
        email
        createdAt
      }
    }
  }
`;

export default graphql(mutation)(Login);
