import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts, deletePost } from "../actions/postActions";
import PropTypes from "prop-types";

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.items.push(nextProps.newPost);
    }
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const postItems = this.props.items.map(post => (
      <div key={post.id}>
        <p id="destlist">{post.name}</p>{" "}
        <button
          className="common"
          onClick={this.onDeleteClick.bind(this, post._id)}
          type="button"
        >
          X
        </button>
      </div>
    ));
    return <div className="common">{postItems}</div>;
  }
}

Posts.propTypes = {
  deletePost: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  //мы используем state.posts, тк в rootReducer мы установили post: postReducer
  items: state.posts.items,
  newPost: state.posts.item
});

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost }
)(Posts);
