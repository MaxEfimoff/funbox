import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createDestination } from "../actions/postActions";

class DestinationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const post = {
      name: this.state.name
    };

    this.props.createDestination(post);
    this.setState({ name: "" });
  }

  render() {
    return (
      <div id="form">
        <form onSubmit={this.onSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Новая точка маршрута"
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>
        </form>
      </div>
    );
  }
}

DestinationForm.propTypes = {
  createDestination: PropTypes.func.isRequired
};

export default connect(
  null,
  { createDestination }
)(DestinationForm);
