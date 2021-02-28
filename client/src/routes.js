import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DataOutput } from './components/dataoutput';
import { About } from './components/about';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <About />
      </Route>
      <Route path="/facemasks" exact>
        <DataOutput item="facemasks" />
      </Route>
      <Route path="/gloves" exact>
        <DataOutput item="gloves" />
      </Route>
      <Route path="/beanies" exact>
        <DataOutput item="beanies" />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
