import React, {Component} from "react";
import uuid from "uuid";
import Const from "../../constants";

const options = Const.itemTypes;

export default class Item extends Component {
  constructor(props){
    super(props);
    const {item} = this.props;
    this.state = item;
  }
  getTypeComponent(){
    const type = this.state.type;
    switch(type){
    case "header":
      return <div className=""><h4>{this.state.title}</h4></div>;
    case "radio":
    case "checkbox":
      const choices = (this.state.setting.choices || []).filter(choice=> choice.label.length > 0);
      return <div>
        <ul>
        {choices.map((choice, idx)=>{
          return <li key={idx}>{choice.label}</li>;
        })}
        </ul>
      </div>;
    case "text":
    case "textarea":
    default:
      return null;
    }
  }
  getEditTypeComponent(){
    const type = this.state.type;
    switch(type){
    case "header":
      return <div>
        <p>Create radio choice</p>
        </div>;
    case "radio":
    case "checkbox":
      const choices = this.state.setting.choices || [{label: ""}];
      return <div>
        <p>Create radio choice</p>
        <ul>
        {choices.map((choice, idx)=>{
          return <li key={idx} style={{listStyleType: "none"}}>
            <input className="form-control" type="text"
              onChange={(ev)=> this.onChoiceChange.bind(this)(ev, idx)}
              placeholder="some" defaultValue={choice.label}/>
            </li>;
        })}
        </ul>
      </div>;
    case "text":
    case "textarea":
    default:
      return null;
    }
  }
  onChoiceChange(ev, idx){
    if(!this.state.setting.choices || (idx + 1) === this.state.setting.choices.length){
      const choices = (this.state.setting.choices || []).concat({label: ""});
      this.state.setting.choices = choices;
      this.setState({
        setting: this.state.setting
      });
    }
    this.state.setting.choices[idx].label =  ev.target.value.trim();
    this.setState({
      setting: this.state.setting
    });
  }
  onTypeChange(ev){
    this.setState({
      type: ev.target.value
    });
  }
  onTitleChange(ev){
    this.setState({
      title: ev.target.value.trim()
    });
  }
  toggleEdit(){
    if(this.state.isEdit){
      this.props.onItemChange(this.state);
    }
    this.setState({
      isEdit: !this.state.isEdit
    });
  }
  render(){
    if(this.state.isEdit){
      return <div className="panel panel-success">
        <div className="panel-heading">
          <h2 className="panel-title">
            <input className="form-control" type="text" defaultValue={this.state.title} onChange={this.onTitleChange.bind(this)}/>
          </h2>
        </div>
        <div className="panel-body">
          <div className="form-group row">
            <label className="col-xs-2 col-form-label">Type</label>
            <div className="col-xs-10">
              <select className="form-control" onChange={this.onTypeChange.bind(this)} value={this.state.type}>
                {options.map(option => <option key={option} value={option} >{option}</option>)}
              </select>
            </div>
          </div>
          {this.getEditTypeComponent()}
        </div>
        <div className="panel-footer">
          <button className="btn btn-success" onClick={this.toggleEdit.bind(this)}>Done</button>&nbsp;
          <button className="btn btn-danger" onClick={(ev)=> this.props.onCancel(this)}>Cancel</button>
        </div>
      </div>;
    }else{
      return <div className="panel panel-success">
        <div className="panel-heading">
        <h4>{this.state.title} <button className="btn btn-default pull-right">{this.state.type}</button></h4>
        </div>
        <div className="panel-body">
          {this.getTypeComponent()}
        </div>
        <div className="panel-footer">
          <button className="btn btn-success" onClick={this.toggleEdit.bind(this)}>Edit</button>&nbsp;
          <button className="btn btn-danger" onClick={()=> this.props.onCancel(this)}>Delete</button>
        </div>
      </div>;
    }
  }
  static new(){
    return {
      identifier: uuid().replace(/\-/g, ""),
      title: "",
      description: "",
      type: "radio",
      setting: {},
      isEdit: true
    };
  }
};
