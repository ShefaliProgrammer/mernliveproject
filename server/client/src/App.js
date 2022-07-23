import React,{createContext, useReducer} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Errorpage from './components/Errorpage'

import { Route, Switch } from 'react-router-dom'

import { initialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext();
const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)



  return (
    
   

    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Navbar/>
      <Router/>
    </UserContext.Provider>
    </>
  )
}

const Router = ()=>{
  return (
    <>
    <Switch>
    <Route exact path='/'><Home /></Route>
    <Route path='/about'><About /></Route>
    <Route path='/contact'><Contact /></Route>
    <Route path='/login'><Login /></Route>
    <Route path='/signup'><Signup /></Route>
    <Route path='/logout'><Logout /></Route>
    <Route ><Errorpage /></Route>
  </Switch>
    </>
    )
}


export default App