import React from 'react';
import ReactDOM from "react-dom";
import ControllerView from './ControllerView';
import Transaction from '../presentational/Transaction';
import { Switch, Route } from 'react-router-dom';
import rawData from '../../../../data/data.json';
const allowed = ['account', 'accountName', 'currencyCode', 'amount', 'transactionType'];

export default class App extends React.Component {

 render() {
   let data = rawData.transactions.map((obj, i) => {return _.pick(obj, allowed)});
   return (
     <div>
       <Switch>
        <Route exact path="/" render={(route) => <ControllerView {...this.props} data={data}/>} />
        <Route exact path="/details/:id" render={(route) => <Transaction {...this.props} data={data}/>} />
       </Switch>
     </div>
   )
 }
}
module.export = App;
