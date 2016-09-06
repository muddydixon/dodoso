import React, {Component} from "react";
import {Link} from "react-router";

export default class Question extends Component {
  render(){
    const {question} = this.props;
    return <div className="row panel panel-success">
      <div className="panel-heading">
        <h3 className="panel-title">
          <Link to={`/questions/${question.identifier}`}>{question.title}</Link>
        </h3>
      </div>
      <div className="panel-body">
      {question.user.username}
      </div>
    </div>;
  }
};
