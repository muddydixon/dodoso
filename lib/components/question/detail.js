import React, {Component} from "react";
import Item from "./item";
import AnswerAction from "../../actions/answer-action";

const Controller = (props)=>{
  return <div>
    <button className="btn btn-info" onClick={props.onSubmit}>Submit</button>
  </div>;
};
export default class QuestionDetail extends Component {
  onSubmit(ev){
    ev.preventDefault();
    const {questions} = this.props.data;
    const question = questions.find(q => q.identifier === this.props.params.questionId);

    const items = [].slice.apply(this.refs.form.querySelectorAll(".item"));
    const responses = items.map((item)=>{
      const type = item.classList[item.classList.length - 1];
      const id = item.id;

      let value = "";
      switch(type){
      case "text":
        value = item.querySelector("input[type='text']").value.trim();
        break;
      case "textarea":
        value = item.querySelector("textarea").value.trim();
        break;
      case "radio":
        value = [].slice.apply(item.querySelectorAll("input[type='radio']"))
          .find(i => i.checked).value;
        break;
      case "checkbox":
        value = [].slice.apply(item.querySelectorAll("input[type='checkbox']"))
          .filter(i => i.checked).map(i => i.value.trim()).join(", ");
        break;
      default:
        break;
      }

      return {
        identifier: id,
        response: value
      };
    });
    AnswerAction.create({
      identifier: question.identifier,
      responses
    });
  }
  render(){
    const {questions} = this.props.data;
    const question = questions.find(q => q.identifier === this.props.params.questionId);
    if(!question) return null;
    question.items.forEach(item => item.setting = JSON.parse(item.setting));

    return <div className="container">
      <form ref="form" onSubmit={this.onSubmit.bind(this)}>
      <div className="panel panel-info">
        <div className="panel-heading">
          <h4 className="panel-title">{question.title}</h4>
        </div>
        <div className="panel-body">
          {question.items.map(item =>{
            return <Item key={item.identifier} item={item} />;
          })}
          <Controller onSubmit={this.onSubmit.bind(this)} />
        </div>
      </div>
      </form>
    </div>;
  }
};
