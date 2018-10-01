import React from "react";
import PropTypes from "prop-types";

export default class Filter extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  handleChange = () => {
    this.setState({checked: !this.state.checked});
  }

  render() {
    const { label, text, type, id, value, onClick, custom} = this.props;
    const { checked } = this.state;
    return (
      <div className="filter">
        <input
          type={type}
          id={id}
          value={checked}
          onChange={this.handleChange}
          onClick={onClick}
          data-custom={custom}
        />
        <label htmlFor={label}>{text}</label>
      </div>
    )
  }
}
module.export = Filter;
