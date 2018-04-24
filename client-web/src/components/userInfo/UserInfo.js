import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import axios from 'axios';

class UserInfo extends Component {

    render() {
        const { user } = this.props;
        return (
            <div>
                <Segment>
                    <Header as='h4' textAlign='center'>
                        USER INFO!
                    </Header>
                    {this.props.user
                        ?
                        <div>
                        <h5 style={{textAlign: 'center'}}>
                            Ime i prezime:
                            {this.props.user.Fname} {this.props.user.Lname} |
                            username: {this.props.user.username}
                            </h5>
                        </div>
                        : ''
                    }
                </Segment>
            </div>
        );
    }
}

export default UserInfo;
