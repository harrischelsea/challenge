import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser } from "../../actions/userActions";
import { getAllLinks, addLink } from '../../actions/linksActions';

import {Grid, Container} from 'semantic-ui-react';
import AddLinks from "../../components/addLinks/AddLinks";
import AllLinks from "../../components/allLinks/AllLinks";
import UserInfo from "../../components/userInfo/UserInfo";

class Home extends Component {

    componentDidMount() {
        this.props.getCurrentUser();
        this.props.getAllLinks();
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
                            <AddLinks addLink={this.props.addLink}/>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={10}>
                            <AllLinks links={this.props.links.links}/>
                        </Grid.Column>
                    </Grid>
                 </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ user, links }) => ({ user, links });
export default connect(mapStateToProps, { getCurrentUser, getAllLinks, addLink })(Home);