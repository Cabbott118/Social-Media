import React, { Component, Fragment } from 'react';
import MyButton from '../../util/MyButton';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import Close from '@material-ui/icons/Close';

// Redux
import { connect } from 'react-redux';
import {
  getPost,
  submitComment,
  clearErrors,
} from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '80%',
    top: '5%',
  },
});

class CommentButton extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getPost(this.props.postId);
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitComment(this.props.postId, { body: this.state.body });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton
          color='primary'
          onClick={this.handleOpen}
          tip='Comment on post'
        >
          <ChatIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <Close />
          </MyButton>
          <DialogTitle>Comment on a Post</DialogTitle>
          <DialogTitle>!!!THIS FEATURE IS STILL IN DEVELOPMENT!!!</DialogTitle>
          <DialogTitle>SUBMITTING WILL CAUSE AN ERROR</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                label='Comment content'
                placeholder='Write Something...'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
                disabled={loading}
              >
                Comment
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CommentButton.propTypes = {
  user: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  getPost,
  submitComment,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CommentButton));
