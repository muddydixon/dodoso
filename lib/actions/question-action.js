import {dispatch} from "../dispatcher";
import fetch from "isomorphic-fetch";
import Const from "../constants";

export default {
  create(qustion){
    return fetch(`${Const.baseUrl}/questions`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(qustion)
    }).then((res)=> res.json()).then((qustion)=>{
      console.log(qustion);
      dispatch({type: Const.QUESTION_CREATE, qustion});
      return qustion;
    }).catch((err)=>{
      dispatch({type: Const.ERROR, err});
    });
  },
  modify(qustion){
    return fetch(`${Const.baseUrl}/questions/${qustion.identifier}`, {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(qustion)
    }).then((res)=> res.json()).then((qustion)=>{
      dispatch({type: Const.QUESTION_MODIFY, qustion});
      return qustion;
    }).catch((err)=>{
      dispatch({type: Const.ERROR, err});
    });
  },
  fetchAll(){
    return fetch(`${Const.baseUrl}/questions`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res)=> res.json()).then((qustions)=>{
      dispatch({type: Const.QUESTION_FETCH_ALL, qustions});
      return qustions;
    }).catch((err)=>{
      dispatch({type: Const.ERROR, err});
    });
  },
  fetch(){
  }
};
