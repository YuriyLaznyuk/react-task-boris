import React, {useState} from 'react';
import './app.scss';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import News from "./components/News";
import Jobs from "./components/Jobs";
import Job from "./components/Job";
import {useDispatch, useSelector} from "react-redux";
import {ACTION_TYPE} from "./components/store/reducers/mainReducer";

function App(props) {
    const pathname = window.location.pathname;
    const {activeLink}=useSelector(state => state.main);
    const dispatch=useDispatch();

    function getStyle(name, path) {
        if (pathname === path || activeLink === name) {
            return '5px solid rgba(255,61,18,0.34)';
        } else {
            return "";
        }
    }
    function setLink(name) {
        dispatch({type:ACTION_TYPE.ACTIVE_LINK, payload:name})
    }

    return (
            <BrowserRouter>
                <div className="app__nav">
                    <div className="app__nav-block">
                        <Link to='/' onClick={() => setLink('news')}
                              style={{
                                  borderBottom: getStyle('news', '/')
                              }}
                        >News</Link>

                        <Link to='/jobs' onClick={() => setLink('jobs')}
                              style={{
                                  borderBottom: getStyle('jobs', '/jobs')
                              }}
                        >Jobs</Link>

                    </div>

                </div>
                <Switch>
                    <Route exact path='/'>
                        <News/>
                    </Route>
                    <Route path='/jobs'>
                        <Jobs/>
                    </Route>
                    <Route path='/job/:id'>
                        <Job/>
                    </Route>
                </Switch>
            </BrowserRouter>

    );
}

export default App;