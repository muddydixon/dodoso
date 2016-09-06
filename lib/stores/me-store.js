import dispatcher from "../dispatcher";
import {ReduceStore} from "flux/utils";
import Const from "../constants";

class MeStore extends ReduceStore {
  getInitialState(){
    return null;
  }
  reduce(state, action){
    switch(action.type){
    case Const.SIGNUP:
      return action.user;
    case Const.SIGNIN:
      return action.user;
    case Const.SIGNOUT:
      return null;
    default:
      return state;
    }
  }
}

export default new MeStore(dispatcher);
