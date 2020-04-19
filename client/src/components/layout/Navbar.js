import React, { Component, Fragment } from 'react';
import MyButton from '../../util/MyButton';
import AddPost from '../post/AddPost';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Notifications from './Notifications';

// Redux
import { connect } from 'react-redux';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';

export class Navbar extends Component {
  render() {
    const {
      authenticated,
      credentials: { handle },
    } = this.props.user;

    const userUrl = `/users/${handle}`;

    return (
      <AppBar>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <Fragment>
              <AddPost />
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon />
                </MyButton>
              </Link>
              <Link to={userUrl}>
                <MyButton tip='Profile'>
                  <Person />
                </MyButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color='inherit' component={Link} to='/'>
                <HomeIcon />
              </Button>
              <Button color='inherit' component={Link} to='/login'>
                <Person />
              </Button>
              <Button color='inherit' component={Link} to='/signup'>
                <PersonAdd />
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Navbar);
