import React from "react";
import PropTypes from "prop-types";
import _ from 'lodash';
import './Transaction.scss';

export default class Transaction extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  render() {
    const { data } = this.props;
    const id = window.location.hash.split('/')[2];
    const transaction = _.find(data, {account: id});
    const title = "Transaction " + id;
    let info = [];
    for (let key in transaction) {
      info.push((<h5 key={key}>{_.startCase(key) + ': ' + transaction[key]}</h5>));
    }

    return (
      <div className="transaction">
        <h1> {title} </h1>
        {info}
      </div>
    )
  }
}
module.export = Transaction;
