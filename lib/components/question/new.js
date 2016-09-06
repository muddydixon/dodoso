import React, {Component} from "react";
import QuestionAction from "../../actions/question-action";
import Item from "./item-new";

const Controller = (props)=>{
  return <div>
    <button className="btn btn-warning" onClick={props.addItem}>Add Item</button>&nbsp;
    <button className="btn btn-info" onClick={props.onSubmit}>Create</button>
  </div>;
};

export default class QuestionNew extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      items: []
    };
  }
  onTitleChange(ev){
    this.setState({title: ev.target.value});
  }
  addItem(){
    this.setState({items: this.state.items.concat(Item.new())});
  }
  onItemChange(item){
    this.setState({
      items: this.state.items.map(_item => _item.identifier === item.identifier ? item : _item)
    });
  }
  onSubmit(){
    QuestionAction.create(this.state).then(()=>{
      this.context.router.push("/");
    });
  }
  onItemCancel(item){
    this.setState({
      items: this.state.items.filter(i => i.id !== item.state.id)
    });
  }

  render(){
    return <div className="container">
      <div className="panel panel-info">
        <div className="panel-heading">
          <h4 className="panel-title"><input className="form-control" type="text"
            defaultValue={this.state.title} onChange={this.onTitleChange.bind(this)}/></h4>
        </div>
        <div className="panel-body">
          {this.state.items.map(item =>{
            return <Item key={item.identifier} item={item}
              onItemChange={this.onItemChange.bind(this)}
              onCancel={this.onItemCancel.bind(this)}
              />;
          })}
          <Controller
            addItem={this.addItem.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
          />
        </div>
      </div>
    </div>;
  }
};

QuestionNew.contextTypes = {router: React.PropTypes.object.isRequired};
