import React, { useState, useEffect } from 'react';
import dateformat from 'dateformat';

export default function View () {
    const [state, setState] = useState("");
    const [tasks, setTasks] = useState(new Array());
    const [status, setStatus] = useState(true);
    useEffect(() => {
        if (status) {
            loop();
        }
    }, [tasks.length, status])
    const timer = (event) => {
        let rand = Math.random() * (10000 - 1000) + 1000;
        let btn = event.target.id;
        setTasks(tasks => [...tasks, writeLog(rand, btn)]);
    }
    const writeLog = (look, btn) => {
        return () => setTimeout(() => {
            let text = state !== "" ? "\n" : "";
            setState(state => `${state}${text}${dateformat(new Date(), "HH:MM:ss dd.mm.yyyy")}: Button ${btn} was pressed with ${parseInt(look)}s timeout `);
            setStatus(true);
        }, look)
    }
    const loop = () => {
        if (tasks.length > 0) {
            setStatus(false);
            let _tasks = [...tasks];
            _tasks.shift()();
            setTasks([..._tasks]);
        }
    }
    return (
        <>
            <div style={{ marginBottom: "10px" }}>
                <button id="1" onClick={event => timer(event)}>Button 1</button>
                <button id="2" onClick={event => timer(event)}>Button 2</button>
                <button id="3" onClick={event => timer(event)}>Button 3</button>
            </div>
            <textarea
                value={state}
                style={{ width: "500px", height: "500px" }}
                disabled>
            </textarea>
            <div style={{ float: "right" }}>
                <button onClick={() => setState("")} disabled={tasks.length > 0 && !status}>Reset</button>
            </div>
        </>
    )
}