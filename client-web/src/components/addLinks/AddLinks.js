import React, { Component } from 'react';
import { Header, Segment, Button, Message, Form } from 'semantic-ui-react';
import axios from 'axios';

class AddLinks extends Component {
    constructor(props){
        super(props);
        this.state = {
            link: '',
            success: null,
        }
    }

    handleInputChange = (e) => {
        this.setState({ link: e.target.value });
    };

    handleAddLink = () => {
        const { link } = this.state;
        axios.post('/add-link', { link })
            .then(res => {
                this.setState({ success: true, link: '' });
            })
            .catch( err => this.setState({ success: false }));
    };

    render() {
        return (
            <div>
                    <Segment>
                            <Header as='h4' textAlign='center'>
                                Add links
                            </Header>
                            <Form size='large'>
                                <Form.Input
                                    fluid
                                    iconPosition='left'
                                    placeholder='Add link...'
                                    onChange={this.handleInputChange}
                                    value={this.state.link}
                                    name="username"
                                />
                                <Button
                                    color='white'
                                    fluid size='large'
                                    onClick={this.handleAddLink}
                                >
                                    Add LINK</Button>
                            </Form>
                    </Segment>
            </div>

        );
    }
}

export default AddLinks;
