import React, { Component } from 'react';
import { Header, Segment, List } from 'semantic-ui-react';
import axios from 'axios';

class AllLinks extends Component {
    render() {
        return (
            <div>
                <Segment>
                    <Header as='h4' textAlign='center'>
                        All Links
                    </Header>
                    {this.props.links
                        ?
                        <List>
                        {this.props.links.map(el =>
                            <List.Item>{el.name}</List.Item>
                        )}
                        </List>
                        :
                        <p>Empty!</p>
                    }
                </Segment>
            </div>
        );
    }
}

export default AllLinks;
