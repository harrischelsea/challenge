import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser } from "../../actions/userActions";
import {Grid, Container} from 'semantic-ui-react';
import AddLinks from "../../components/addLinks/AddLinks";
import AllLinks from "../../components/allLinks/AllLinks";
import UserInfo from "../../components/userInfo/UserInfo";

class Home extends Component {

    componentDidMount() {
        this.props.getCurrentUser();
    }

    render() {
        return (
            <div>
                 <Container>
                    <Grid>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <UserInfo user={this.props.user.user}/>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={6}>
                            <AddLinks/>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={10}>
                            <AllLinks/>
                        </Grid.Column>
                    </Grid>
                 </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps, { getCurrentUser })(Home);