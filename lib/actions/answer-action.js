import {dispatch} from "../dispatcher";
import fetch from "isomorphic-fetch";
import Const from "../constants";

export default {
  fetchAll(){
  },
  fetch(){
  },
  create(answer){
    return fetch(`${Const.baseUrl}/answers/${answer.identifier}`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(answer)
    }).then((res)=>{
      if(res.status >= 400) throw new Error();
      return res.json();
    }).then((user)=>{
      dispatch({type: Const.SIGNUP, user});
      return user;
    }).catch((err)=>{
      dispatch({type: Const.ERROR, err});
    });
  },
  modify(answer){
  },
  delete(answer){
  }
};
