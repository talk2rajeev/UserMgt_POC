import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from './components/Layout';
import UserGroup from './pages/UserGroup';
import Roles from './pages/Roles';
import Permission from './pages/Permission';
import UsersTable from './pages/UsersTable';
import Login from './pages/Login';
import Client from './pages/Client';


const Routes = () => (
  
    <Switch>
      <Route exact path='/' component={Login}/>
      <Layout>
        <Route exact path='/dashboard' component={UsersTable}/>
        <Route exact path='/client' component={Client}/>
        <Route path='/users' component={UsersTable}/>      
        <Route path='/usergroup' component={UserGroup}/>
        <Route path='/roles' component={Roles}/>
        <Route path='/permission' component={Permission}/> 
      </Layout>     
    </Switch>
  
)

export default Routes;
