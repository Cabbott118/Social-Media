import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

// Icons
// import Search from '@material-ui/icons/Search';

// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis,
  searchBox: {
    marginBottom: 10,
  },
  textField: {
    width: '68%',
    paddingRight: 15,
  },
});

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userInput = this.state.search;

    if (userInput === '') return false;
    else window.location.href = `/users/${userInput}`;
    if ((window.location.href = 404)) {
      console.log('deal with err');
    }
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
                id='search'
                name='search'
                type='text'
                label='Search for user'
                className={classes.textField}
                value={this.state.search}
                onChange={this.handleChange}
                //   fullWidth
              />
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
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Searchbar.propTypes = {
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(Searchbar));
