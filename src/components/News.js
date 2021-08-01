import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ACTION_TYPE} from "./store/reducers/mainReducer";
import './style/news.scss';

function News(props) {
    const {news} = useSelector(state => state.main);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        numberPage: 1, sort: false,
        buttonSelected: null, statusSelected: null,
        startPage: 0, endPage: 5, pages: 10
    });

    function getRow() {
        return (
            news.length > 0 ?
                news.map(item => (
                    <tr key={item.id}>
                        <td className='desc'>{new Date(item.time).toUTCString()}</td>
                        <td>{item.title}</td>
                        <td className='desc'><span>{item.domain}</span></td>
                    </tr>
                )) : <tr>
                    <th className='desc' colSpan={3}>...loading news</th>
                    <th className='mob'>...loading news</th>
                </tr>
        );

    }

    function getNavPage(col, start, end) {
        const pageNumbers = [];
        for (let i = 1; i < col + 1; i++) {
            pageNumbers.push(i);
        }

        return (
            pageNumbers.slice(start, end).map(page =>
                <div key={page}
                  onClick={() => setState({
                      ...state,
                      numberPage: page,
                      buttonSelected: null
                  })}
                  className='page-number'
                  style={{background: state.numberPage === page && 'rgba(255,61,18,0.34)'}}
            >{page}</div>)
        );
    }

    function addPage() {
        if (state.endPage !== state.pages) {
            setState({
                ...state, startPage: state.startPage + 5,
                endPage: state.endPage + 5, numberPage: state.endPage + 1
            });
        } else {
            return false;
        }
    }

    function minusPage() {
        if (state.startPage !== 0) {
            setState({
                ...state, startPage: state.startPage - 5,
                endPage: state.endPage - 5, numberPage: state.startPage - 4
            });
        } else {
            return false;
        }
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

            dispatch({type: ACTION_TYPE.REVERS_NEWS});
            setState({
                ...state, sort: !state.sort,
                buttonSelected: key, statusSelected: !state.statusSelected
            });
            console.log(news);

        } else {
            dispatch({type: ACTION_TYPE.FETCH_NEWS, payload: rez()});
            setState({...state, sort: !state.sort, buttonSelected: key, statusSelected: true});

        }

    }

    useEffect(() => {

        setTimeout(() => {
            fetch(`https://api.hnpwa.com/v0/news/${state.numberPage}.json`)
                .then(res => res.json())
                .then(json => dispatch({
                    type: ACTION_TYPE.FETCH_NEWS,
                    payload: json
                }))
                .catch(er => console.log(er));
        }, 500);

    }, [state.numberPage]);

    function getStatus(button) {

        if (state.buttonSelected === button && state.statusSelected === true) {
            return (<span>&nbsp; &#9651;</span>);
        }
        if (state.buttonSelected === button && state.statusSelected === false) {
            return (<span>&nbsp; &#9661;</span>);
        }

    }

    return (
        <div className='news'>
            <h1>News</h1>
            <table className='news__table'>
                <thead>
                <tr>
                    <th className='desc'>
                        <button onClick={() =>
                            getSort(news, 'time')
                        } style={{background: state.buttonSelected === 'time' && 'rgba(255,61,18,0.34)'}}>
                            time{getStatus('time')}
                        </button>
                    </th>
                    <th>
                        <button onClick={() =>
                            getSort(news, 'title')
                        } style={{background: state.buttonSelected === 'title' && 'rgba(255,61,18,0.34)'}}>
                            title{getStatus('title')}
                        </button>
                    </th>
                    <th className='desc'>
                        <button onClick={() =>
                            getSort(news, 'domain')
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
            <div className="news__nav-page">
                <div onClick={minusPage}></div>
                {getNavPage(state.pages, state.startPage, state.endPage)}
                <div onClick={addPage}></div>
            </div>
            <div className="news__mob-button">
                <button onClick={() =>
                    getSort(news, 'time')
                } style={{background: state.buttonSelected === 'time' && 'rgba(255,61,18,0.34)'}}>
                    sort by time{getStatus('time')}
                </button>

            </div>
        </div>
    );
}

export default News;