import React from "react";
import {IndexRoute, Route, Router, hashHistory} from "react-router";
import {Container} from "flux/utils";

import App from "./container/app";
import Authed  from "./components/authed";
import Signin  from "./components/user/signin";
import Signup  from "./components/user/signup";
import Signout from "./components/user/signout";

import QuestionList from "./components/question/list";
import QuestionNew from "./components/question/new";
import QuestionDetail from "./components/question/detail";

export default <Router history={hashHistory}>
        <Route path="/" component={Container.create(App)} >
          <Route component={Authed} >
            <IndexRoute component={QuestionList} />
            <Route path="/questions" component={QuestionList} />
            <Route path="/questions/new" component={QuestionNew} />
            <Route path="/questions/:questionId" component={QuestionDetail} />
            <Route path="/signout" component={Signout} />
          </Route>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Route>
  </Router>;
