const initState = {news: [], jobs: [], activeLink: ''};
export const ACTION_TYPE = {
    FETCH_NEWS: 'FETCH_NEWS',
    FETCH_JOBS: 'FETCH_JOBS',
    REVERS_NEWS: 'REVERS_NEWS',
    REVERS_JOBS: 'REVERS_JOBS',
    ACTIVE_LINK: 'ACTIVE_LINK'
};

export function mainReducer(state = initState, action) {
    switch (action.type) {
        case ACTION_TYPE.FETCH_NEWS:
            return {...state, news: action.payload};
        case ACTION_TYPE.REVERS_NEWS:
            return {...state, news: state.news.reverse()};
        case ACTION_TYPE.FETCH_JOBS:
            return {...state, jobs: action.payload};
        case ACTION_TYPE.REVERS_JOBS:
            return {...state, jobs: state.jobs.reverse()};
        case ACTION_TYPE.ACTIVE_LINK:
            return {...state, activeLink: action.payload};
        default:
            return state;
    }
}