import React, { Component } from 'react';
import { Grid, Header, Segment, Button, Message, Form, Container, Image } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import '../register/Register.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            success: null,
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLogin = () => {
        const { username, password } = this.state;
        //TODO add validation
        if (!username || !password) return;
        axios.post('/users/login', { username, password })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')?localStorage.getItem('token'): '';
                this.setState({ success: true });
            })
            .catch( err => this.setState({ success: false }));
    }

    render() {
        if (this.state.success){
            return <Redirect to='/' />
        }
        if (this.state.success === false ) {
            return <div>Error</div>
        }
        return (
            <div className='background'>
                <Container>
                    <Grid centered>
                        <Grid.Column mobile={16} tablet={8} computer={6}>
                            <Header as='h4' textAlign='center'>
                                Log in!
                            </Header>
                            <Form size='large'>
                                <Form.Input
                                    fluid
                                    iconPosition='left'
                                    placeholder='Username'
                                    onChange={this.handleInputChange}
                                    value={this.state.username}
                                    name="username"
                                />
                                <Form.Input
                                    fluid
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.handleInputChange}
                                    value={this.state.password}
                                    name="password"
                                />
                                <Button
                                    color='white'
                                    fluid size='large'
                                    onClick={this.handleLogin}
                                >
                                    Login</Button>
                            </Form>
                            <Message>
                                <h3>Not regustered?</h3> <Link to="/register"> Register </Link>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>

        );
    }
}

export default Login;
