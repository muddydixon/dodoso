import React, {Component} from "react";

import MeStore from "../stores/me-store";
import MeAction from "../actions/me-action";
import UserStore from "../stores/user-store";
import UserAction from "../actions/user-action";
import QuestionStore from "../stores/question-store";
import QuestionAction from "../actions/question-action";
import AnswerStore from "../stores/answer-store";
import AnswerAction from "../actions/answer-action";

import Header from "../components/header";

export default class App extends Component {
  static getStores(){
    return [MeStore, UserStore, QuestionStore];
  }

  static calculateState(){
    return {
      me:   MeStore.getState(),
      questions: QuestionStore.getState(),
      user: UserStore.getState()
    };
  }
  componentDidMount(){
    MeAction.fetch();
    QuestionAction.fetchAll();
  }
  render(){
    console.log(this.state);
    return <div>
      <Header data={this.state}/>
      {this.props.children && React.cloneElement(this.props.children, {data: this.state})}
      </div>;
  }
}
