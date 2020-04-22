import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

// MUI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import MuiLink from '@material-ui/core/Link';

// Redux
import { connect } from 'react-redux';
import { getUsernames } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  searchBox: {
    marginBottom: 10,
    width: '100%',
  },
});

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { search, usernames, userMatch } = this.state;
    this.props.getUsernames(search);
    axios
      .get('/username')
      .then((res) => {
        console.log(this.props.data.usernames);
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
      usernames,
    } = this.props;

    console.log(usernames);

    const userFound = (
      <div style={{ marginTop: 10 }}>
        {/* <MuiLink
          component={Link}
          to={`/users/${handle}`}
          color='primary'
          variant='body1'
        >
          {handle}
        </MuiLink> */}
      </div>
    );

    return (
      <div className={classes.searchBox}>
        <Card>
          <CardContent>
            <form
              className={classes.searchForm}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <TextField
                id='outlined-size-small'
                name='search'
                type='text'
                label='Search for user'
                variant='outlined'
                size='small'
                className={classes.textField}
                fullWidth
                value={this.state.search}
                onChange={this.handleChange}
                helperText='IMPORTANT: Searches are case-sensitive. As such, searching a non-existent user may result in errors.'
              />
              <div className={classes.buttons}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  disabled={loading}
                >
                  Search
                  {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Searchbar.propTypes = {
  UI: PropTypes.object.isRequired,
  getUsernames: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

export default connect(mapStateToProps, { getUsernames })(
  withStyles(styles)(Searchbar)
);
