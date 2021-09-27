import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { loadBugs, getUnresolvedBugs } from "../store/bugs";

const BugsList = () => {

    const dispatch = useDispatch();
    const bugs = useSelector(getUnresolvedBugs => getUnresolvedBugs.entities.bugs.list);
    console.log(bugs);
    useEffect(() => {
        dispatch(loadBugs());

    }, [])

    return (
        <>
            <ul>
                {bugs.map((bug) => (
                    <li key={bug.id}>
                        {bug.description}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default BugsList
