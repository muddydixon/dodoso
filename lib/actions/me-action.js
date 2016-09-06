import {dispatch} from "../dispatcher";
import fetch from "isomorphic-fetch";
import Const from "../constants";

export default {
  fetch(){
    return fetch(`${Const.baseUrl}/users/authed`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res)=>{
      if(res.status >= 400) throw new Error();
      return res.json();
    }).then((user)=>{
      dispatch({type: Const.SIGNIN, user});
      return user;
    }).catch((err)=>{
      dispatch({type: Const.ERROR, err});
    });
  },
  signup(user){
    return fetch(`${Const.baseUrl}/users/signup`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
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
  signin(user){
    return fetch(`${Const.baseUrl}/users/signin`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then((res)=>{
      if(res.status >= 400) throw new Error();
      return res.json();
    }).then((user)=>{
      dispatch({type: Const.SIGNIN, user});
      return user;
    }).catch((err)=>{
      dispatch({type: Const.ERROR, err});
    });
  },
  signout(){
    console.log("signout");
    return fetch(`${Const.baseUrl}/users/signout`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res)=>{
      if(res.status >= 400) throw new Error();
      return res.json();
    }).then(()=>{
      dispatch({type: Const.SIGNOUT});
      return null;
    }).catch((err)=>{
      dispatch({type: Const.ERROR, err});
    });
  },
  modify(user){
  },
  disengate(){
  }
};
