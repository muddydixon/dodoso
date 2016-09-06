import React, {Component} from "react";
import ErrorAction from "../../actions/error-action";
import MeAction from "../../actions/me-action";

export default class Signin extends Component {
  onSubmit(ev){
    ev.preventDefault();
    const username = this.refs.username.value.trim();
    const password = this.refs.password.value.trim();
    MeAction.signin({username, password});
  }
  componentWillReceiveProps(){
    if(!this.props.data.me){
      this.context.router.push("/");
    }
  }
  render(){
    return <div className="container">
      <div className="panel panel-info">
        <div className="panel-heading">
        <h4>Signin</h4>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group row">
              <label ref="username" htmlFor="username" className="col-xs-2 col-form-label">Username</label>
              <div className="col-xs-10">
                <input ref="username" className="form-control" type="text" id="username" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-xs-2 col-form-label">Password</label>
              <div className="col-xs-10">
                <input ref="password" className="form-control" type="password" id="password" />
              </div>
            </div>
            <div>
              <input className="btn btn-info" type="submit" value="Singin"/>
            </div>
          </form>
        </div>
      </div>
    </div>;
  }
};

Signin.contextTypes = {router: React.PropTypes.object.isRequired};
