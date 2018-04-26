import React, { Component } from 'react';
import { Header, Segment, Button, Message, Form } from 'semantic-ui-react';
import axios from 'axios';

class TextAnalysis extends Component {
    constructor(props){
        super(props);
        this.state = {
            link: '',
            success: null,
            text: '',
            words: [],
        }
    }

    handleInputChange = (e) => {
        this.setState({ link: e.target.value });
    };

    handleAddLinkAnalysis = () => {
        const { link } = this.state;
        axios.post('/text-analysis', { link })
            .then(res => {
                this.setState({ success: true, text: res.data.text, words: res.data.words });
            })
            .catch( err => this.setState({ success: false }));
    };

    render() {
        return (
            <div>
                <Segment>
                    <Header as='h4' textAlign='center'>
                        LINK ANALYSIS (only www.klix.ba/vijesti)
                    </Header>
                    <Form size='large'>
                        <Form.Input
                            fluid
                            iconPosition='left'
                            placeholder='Add link for text analysis...'
                            onChange={this.handleInputChange}
                            value={this.state.link}
                            name="username"
                        />
                        <Button
                            color='white'
                            fluid size='large'
                            onClick={this.handleAddLinkAnalysis}
                        >
                            Add LINK</Button>
                    </Form>
                    <p style={{padding: '20px'}}>
                        {this.state.words
                            ? this.state.words.map(el =>
                                <div> {el.word} | {el.count} </div>
                            )
                            :
                            ''
                        }
                    </p>
                    <p style={{padding: '20px'}}>{this.state.text}</p>
                </Segment>
            </div>

        );
    }
}

export default TextAnalysis;
