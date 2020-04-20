import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

// MUI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  searchBox: {
    marginBottom: 10,
  },
});

class Searchbar extends Component {
  state = {
    search: '',
    foundUser: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userInput = this.state.search;

    this.props.getUserData(userInput);
    axios
      .get(`/user/${userInput}`)
      .then((res) => {
        this.setState({
          foundUser: res.data.user,
        });
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
    } = this.props;
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
                helperText='This feature is still under development. 
                Errors may occur. 
                Search queries must directly match usernames. 
                Ex: searching "Cabbaaage" will give results, but "cabbaaage" will not. '
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
  getUserData: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(
  withStyles(styles)(Searchbar)
);
