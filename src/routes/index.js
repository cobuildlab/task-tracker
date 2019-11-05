import React from 'react';
import {ProtectedRoute} from 'shared/components';
import {Redirect, Route, Switch} from 'react-router-dom';

/* Import UI Components */
import {NavBar} from '../components';

/* Import Route Components */
import {Home} from './home';
import {Profile} from './profile';
import {AuthCallback} from './auth';
import {NewTaskForm} from "./NewTaskForm";

export default class Router extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/auth" component={AuthCallback}/>
        <Route>
          <div>
            <NavBar/>
            <hr/>
            <div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/new" component={NewTaskForm}/>
                <ProtectedRoute exact path="/profile" component={Profile}/>
                <Redirect to="/"/>
              </Switch>
            </div>
          </div>
        </Route>
      </Switch>
    );
  }
}
