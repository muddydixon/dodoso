import React, {Component} from "react";
import {Link} from "react-router";
import Question from "./question";

export default class QuestionList extends Component {
  render(){
    const {questions} = this.props.data;
    if(!questions || questions.length === 0) return <div className="container">
      <h3><Link to="/questions/new">Question not found. Create Question!</Link></h3>
      </div>;

    return <div className="container">
      {questions.map(q => <Question key={q.identifier} question={q} />)}
      </div>;
  }
};
