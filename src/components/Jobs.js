import React, {useEffect, useState} from 'react';
import './style/jobs.scss';
import {useDispatch, useSelector} from "react-redux";
import {ACTION_TYPE} from "./store/reducers/mainReducer";
import {useHistory} from "react-router-dom";

function Jobs(props) {
    console.log(window.location.pathname);
    const {jobs} = useSelector(state => state.main);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        sort: false, defaultJobs: false,
        buttonSelected: null, statusSelected: null
    });

    const history = useHistory();

    useEffect(() => {

        setTimeout(() => {
            fetch('https://api.hnpwa.com/v0/jobs/1.json')
                .then(res => res.json())
                .then(json => dispatch({type: ACTION_TYPE.FETCH_JOBS, payload: json}))
                .catch(err => console.log(err));

        }, 1000);

    }, [state.defaultJobs]);

    function getRow() {
        return (
            jobs.length > 0 ?
                jobs.map(item => (
                    <tr className='jobs__tr-active' key={item.id} onClick={() => {
                        history.push(`/job/${item.id}`);
                        dispatch({type: ACTION_TYPE.ACTIVE_LINK, payload: ''});
                    }}>
                        <td className='desc'>{new Date(item.time).toUTCString()}</td>
                        <td>{item.title}</td>
                        <td className='desc'><span>{item.domain}</span></td>
                    </tr>
                )) : <tr>
                    <th className='desc' colSpan={3}>...loading jobs</th>
                    <th className='mob'>...loading jobs</th>
                </tr>
        );

    }

    function getSort(arr, key) {
        setState({...state, statusSelected: null});
        let rez = () => arr.sort((a, b) => {
            if (a[key] > b[key]) {
                return 1;
            }
            if (a[key] < b[key]) {
                return -1;
            }
            return 0;
        });
        if (state.buttonSelected === key) {

            dispatch({type: ACTION_TYPE.REVERS_JOBS});
            setState({
                ...state, sort: !state.sort,
                buttonSelected: key, statusSelected: !state.statusSelected
            });
            console.log(jobs);

        } else {
            dispatch({type: ACTION_TYPE.FETCH_JOBS, payload: rez()});
            setState({...state, sort: !state.sort, buttonSelected: key, statusSelected: true});

        }

    }

    function getStatus(button) {

        if (state.buttonSelected === button && state.statusSelected === true) {
            return (<span>&nbsp; &#9651;</span>);
        }
        if (state.buttonSelected === button && state.statusSelected === false) {
            return (<span>&nbsp; &#9661;</span>);
        }

    }

    function getDefault() {
        setState({
            ...state, defaultJobs: !state.defaultJobs,
            buttonSelected: null, statusSelected: null
        });
    }

    return (
        <div>
            <div className='jobs'>
                <h1>Jobs &nbsp;
                    <button onClick={getDefault}>default jobs</button>
                </h1>

                <table className='jobs__table'>
                    <thead>
                    <tr>
                        <th className='desc'>
                            <button onClick={() =>
                                getSort(jobs, 'time')
                            } style={{background: state.buttonSelected === 'time' && 'rgba(255,61,18,0.34)'}}>
                                time{getStatus('time')}
                            </button>
                        </th>
                        <th>
                            <button onClick={() =>
                                getSort(jobs, 'title')
                            } style={{background: state.buttonSelected === 'title' && 'rgba(255,61,18,0.34)'}}>
                                title{getStatus('title')}
                            </button>
                        </th>
                        <th className='desc'>
                            <button onClick={() =>
                                getSort(jobs, 'domain')
                            } style={{background: state.buttonSelected === 'domain' && 'rgba(255,61,18,0.34)'}}>
                                domain{getStatus('domain')}
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {getRow()}
                    </tbody>
                </table>


                <div className="jobs__mob-button">
                    <button onClick={() =>
                        getSort(jobs, 'time')
                    } style={{background: state.buttonSelected === 'time' && 'rgba(255,61,18,0.34)'}}>
                        sort by time{getStatus('time')}
                    </button>

                </div>
            </div>

        </div>
    );
}

export default Jobs;