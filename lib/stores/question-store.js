import dispatcher from "../dispatcher";
import {ReduceStore} from "flux/utils";
import Const from "../constants";

class QustionStore extends ReduceStore {
  getInitialState(){
    return [];
  }
  reduce(state, action){
    switch(action.type){
    case Const.QUESTION_FETCH_ALL:
      return action.qustions;
    case Const.QUESTION_CREATE:
      console.log(action);
      return state.concat(action.qustion);
    case Const.QUESTION_MODIFY:
      return state.map((qustion)=> qustion.name === action.qustion.name ? action.qustion : qustion);
    default:
      return state;
    }
  }
}

export default new QustionStore(dispatcher);
