import React, { Component } from "react";
import ReactDOM from "react-dom";
import Filter from "../presentational/Filter";
import Utils from '../../utils/utils';
import Transaction from '../presentational/Transaction';
import _ from 'lodash';
import '../../../assets/style.scss';

class ControllerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      transactionFilters: [],
      accountFilters: []
    };
  }

  formatData = (data, transactionFilters, accountFilters) => {
    let result = data.filter(obj => {
      return accountFilters.length < 1 || accountFilters.includes(obj.accountName);
    }).filter(obj => {
      return transactionFilters.length < 1 || transactionFilters.includes(Utils.capitalize(obj.transactionType));
    })
    return result;
  }

  formatTable = (data) => {
    return data.map((obj,i) => {
       let rows = [];
       for (let key in obj) {
          if (key == 'account') {
            rows.push (
              <td key={i + obj[key]}>
                <a href={"/#/details/" + obj[key]}>{obj[key]}</a>
              </td>
            )
          } else if (key == 'transactionType') {
            rows.push(<td key={i + obj[key]}>{Utils.capitalize(obj[key])}</td>);
          } else {
            rows.push(<td key={i + obj[key]}>{obj[key]}</td>);
          }
       }
       return (<tbody key={i+'tbody'} ><tr key={i+'tr'}>{rows}</tr></tbody>)
    })
  }

  filterData = (e) => {
    const { transactionFilters, accountFilters } = this.state;
    let arr = [];
    if (accountFilters.includes(e.target.id)) {
      accountFilters.splice(accountFilters.indexOf(e.target.id), 1);
      this.setState({
        accountFilters: accountFilters
      })
    } else if (transactionFilters.includes(e.target.id)) {
      transactionFilters.splice(transactionFilters.indexOf(e.target.id), 1);
      this.setState({
        transactionFilters: transactionFilters
      })
    } else {
      arr =  e.target.dataset.custom == 'act' ? this.setState({accountFilters: accountFilters.concat(e.target.id)}) : this.setState({transactionFilters: transactionFilters.concat(e.target.id)});
    }
  }

  render() {
    const { data, transactionFilters, accountFilters } = this.state;
    const accountNameFilters = Utils.getUniqueValues(data, 'accountName');
    const transactionTypeFilters = Utils.getUniqueValues(data, 'transactionType');
    let tableHeader = Object.keys(data[0]).map((header, i) => {return (<th key={header + i}>{_.startCase(header)}</th>)});
    let table = this.formatTable(this.formatData(data, transactionFilters, accountFilters));

    return (
      <div className="transactions">
        <h1>My Transactions</h1>
        <div className="filters">
          <h3>Filters</h3>
            <div className="account-name-filters">
              <h5> Account Name </h5>
              { accountNameFilters.map((name, i) => {
                return (<Filter key={name+i} label={name} text={name} type={'checkbox'} id={name} custom={"act"} onClick={this.filterData}/>)
                })
              }
            </div>
            <div className="transaction-type-filters">
              <h5> Transaction Type </h5>
              { transactionTypeFilters.map((name, i) => {
                return (<Filter key={name+i} label={name} text={name} type={'checkbox'} id={name} custom={"trans"} onClick={this.filterData}/>)
                })
              }
            </div>
        </div>
        <table className="table">
          <thead>
            <tr>{tableHeader}</tr>
          </thead>
            {table}
        </table>
      </div>
    );
  }
}

export default ControllerView;
