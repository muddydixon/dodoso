import React, {Component} from "react";
import uuid from "uuid";

const options = ["text", "textarea", "radio", "checkbox"];

export default class Item extends Component {
  getTypeComponent(){
    const {item} = this.props;
    switch(item.type){
    case "radio":
      let choices = (item.setting.choices || []).filter(choice=> choice.label.length > 0);
      return <div>
        {choices.map((choice, idx)=>{
          return <label className="radio-inline" key={idx}><input type="radio" name={item.identifier} value={choice.label}/>{choice.label}</label>;
        })}
      </div>;
    case "checkbox":
      choices = (item.setting.choices || []).filter(choice=> choice.label.length > 0);
      return <div>
        {choices.map((choice, idx)=>{
          return <label className="checkbox-inline" name={item.identifier} key={idx}><input type="checkbox" value={choice.label} />{choice.label}</label>;
        })}
      </div>;
    case "text":
      return <div>
        <input className="form-control" type="text" name={item.identifier} />
        </div>;
    case "textarea":
      return <div>
        <textarea className="form-control" type="text" name={item.identifier} />
        </div>;
    default:
      return null;
    }
  }
  render(){
    const {item} = this.props;
    return <div id={item.identifier} className={`item panel panel-success ${item.type}`}>
      <div className="panel-heading">
        <h4 className="panel-title">{item.title}</h4>
      </div>
      <div className="panel-body">
        {this.getTypeComponent()}
      </div>
    </div>;
  }
};
