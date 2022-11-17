import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch,NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from './components/auth/LoginFormModal/index';
import SignUpForm from './components/auth/SignUp/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/HomePage';
import TaskForm from './components/TaskForm';
import AllTasks from './components/TaskList';
import OneTask from './components/OneTask';
import OneList from './components/OneList';
import SplashPage from './components/SplashPage/SplashPage';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user)


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar user={user}/>
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage user={user}/>
        </Route>
        <Route path='/login' exact={true}>
          <LoginFormModal />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        {/* <Route path='/' exact={true} >
          <h1>My Home Page</h1>

          <NavLink to='/all' >
            CLICK HERE TO GOTO TASK HOME PAGE
          </NavLink>
        </Route> */}
        <ProtectedRoute path="/all/lists/:id">
          <OneList/>
        </ProtectedRoute>

        <ProtectedRoute path='/all/:id'>
          <OneTask/>
        </ProtectedRoute>
        <ProtectedRoute path='/all' exact={true} >
          <HomePage/>
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
