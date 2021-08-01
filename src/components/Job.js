import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import "./style/job.scss"

const Job = () => {
    const {jobs}=useSelector(state => state.main);
    const {id} = useParams();
    const job=jobs.find(job=>job.id===+id);
    console.log(job);
    return (
        <div className='job'>
            <h1>Job</h1>
            <div><strong>title:</strong> {job.title}</div>
            <div><strong>time:</strong> {new Date(job.time).toUTCString()}</div>
            <div><strong>time_ago:</strong> {job.time_ago}</div>
            <div><strong>url:</strong> <a href={job.url} target='_blank'>{job.url}</a></div>
            <div><strong>domain:</strong> {job.domain}</div>
        </div>
    );
};

export default Job;