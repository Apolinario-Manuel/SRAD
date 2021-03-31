import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProvaPage from './ProvaPage';
import ResultProva from './ResultProva';
import ResultAdmin from './ResultAdmin';

export default function ProvasModule() {

  return (
      <Switch>
        <Route path="/admin/prova/:id" component={ProvaPage} />
      </Switch>
  )
}

export const ResultModule = ()=>{

  return (
      <Switch>
        <Route path="/admin/resultado" component={ResultProva} />
      </Switch>
  )
}

export const ResultAdminModule = ()=>{

  return (
      <Switch>
        <Route path="/admin/resultadmin/:id" component={ResultAdmin} />
      </Switch>
  )
}


