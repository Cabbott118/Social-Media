import React, { Component, Fragment } from 'react';
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import PostSkeleton from '../util/PostSkeleton';
import Searchbar from '../components/layout/Searchbar';

// MUI
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

export class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = loading ? (
      <PostSkeleton />
    ) : (
      posts.map((post) => <Post key={post.postId} post={post} />)
    );
    return (
      <Fragment>
        <Searchbar />
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
          <Grid item sm={8} xs={12}>
            {recentPostsMarkup}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(home);
