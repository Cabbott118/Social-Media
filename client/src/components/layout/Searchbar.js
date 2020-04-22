import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

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
      foundUser: '',
      noResults: false,
      errors: {},
    };
  }

  componentDidMount() {
    this.props.getUsernames();
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
    const { usernames } = this.props.data;
    const { search } = this.state;

    for (let i = 0; i < usernames.length; i++) {
      if (search === usernames[i].handle) {
        this.setState({
          foundUser: usernames[i].handle,
        });
      }
    }
    // TODO: set state to null after search
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { foundUser, noResults } = this.state;
    console.log(noResults);
    const {
      classes,
      UI: { loading },
    } = this.props;

    const userFound = (
      <div style={{ marginTop: 10 }}>
        <MuiLink
          component={Link}
          to={`/users/${foundUser}`}
          color='primary'
          variant='body1'
        >
          {foundUser}
        </MuiLink>
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
                label='Search by username'
                variant='outlined'
                size='small'
                className={classes.textField}
                fullWidth
                value={this.state.search}
                onChange={this.handleChange}
                helperText='A link to searched user will be shown below.'
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
            {userFound}
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
