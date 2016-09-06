import React, {Component} from "react";
import {Link} from "react-router";
import MeAction from "../actions/me-action";

export default class Header extends Component {
  render(){
    const {me} = this.props.data;
    const nav = me ?
      <ul className="nav navbar-nav">
        <li><Link to="/questions/new">Create Question</Link></li>
        <li><Link to="/questions">Question</Link></li>
        <li><Link to="/signout">Signout</Link></li>
      </ul> :
      <ul className="nav navbar-nav">
        <li><Link to="/signin">Signin</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>;

    return <header className="navbar navbar-static-top bs-docs-nav">
             <div className="container">
               <Link to="/" className="navbar-brand"><i className="fa fa-cubes" />&nbsp;DoDoSo</Link>
                 <nav className="collapse navbar-collapse">
                   {nav}
                 </nav>
             </div>
           </header>;
  }
}
