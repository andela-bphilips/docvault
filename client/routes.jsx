import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import requireAuth from './utils/requireAuth.jsx';
import requireAdminAuth from './utils/requireAdminAuth.jsx';
import HomePage from './components/HomePage.jsx';
import SignupPage from './components/authentication/SignupPage.jsx';
import LoginPage from './components/authentication/LoginPage.jsx';
import DashboardPage from './components/dashboard/DashboardPage.jsx';
import myDocument from './components/documents/MyDocument.jsx';
import MyProfilePage from './components/users/MyProfilePage.jsx';
import UsersPage from './components/users/UsersPage.jsx';


export default (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="login" component={LoginPage} />
      <Route path="signup" component={SignupPage} />
      <Route path="dashboard" component={requireAuth(DashboardPage)} />
      <Route path="mydocuments" component={requireAuth(myDocument)} />
      <Route path="myprofile" component={requireAuth(MyProfilePage)} />
      <Route path="userslist" component={requireAdminAuth(UsersPage)} />
    </Route>
  </div>
);
