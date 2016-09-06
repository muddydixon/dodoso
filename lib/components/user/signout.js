import React, {Component} from "react";
import MeAction from "../../actions/me-action.js";

export default class Signout extends Component {
  componentWillMount(){
    MeAction.signout().then(()=>{
      this.context.router.push("/signin");
    });
  }
  render(props){
    return <div>Signout</div>;
  }
}

Signout.contextTypes = {router: React.PropTypes.object.isRequired};
