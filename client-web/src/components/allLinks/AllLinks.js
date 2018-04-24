import React, { Component } from 'react';
import { Header, Segment, List } from 'semantic-ui-react';
import axios from 'axios';

class AllLinks extends Component {
    constructor(props){
        super(props);
        this.state = {
            links: [],
            success: null,
        }
    }

    componentDidMount() {
        axios.get('/get-all-links')
            .then(res => {
                this.setState({links: res.data, success: true});
            })
            .catch( err => this.setState({ success: false }));
    }

    render() {
        return (
            <div>
                <Segment>
                    <Header as='h4' textAlign='center'>
                        All Links
                    </Header>
                    {this.state.links
                        ?
                        <List>
                        {this.state.links.map(el =>
                            <List.Item>{el.name}</List.Item>
                        )}
                        </List>
                        :
                        ''
                    }
                </Segment>
            </div>

        );
    }
}

export default AllLinks;
