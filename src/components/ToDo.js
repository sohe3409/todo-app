import React, { useState, useEffect } from 'react';
import axios from 'axios';
const url = "http://127.0.0.1:1338";

const ToDo = () => {
    const [tasks, setTasks] = useState({});
    const [current, setCurrent] = useState("");
    const [style, setStyle] = useState({1: 'line-through', 0: 'none'});

    useEffect(() => {
        axios.get(`${url}/task`)
        .then(res => {
            setTasks(res.data);
        });
    },[]);

    const handleAdd = async () => {
      await axios.post(`${url}/task`, {
          desc: current,
          status: false,
      })
    };

    const reverseTasks = () => {
      const mapReverse = tasks.slice(0).reverse().map(element => {return element});
      setTasks(mapReverse);
      console.log(tasks);
    }

    const handleChecked = (id, status) => {
      axios.put(`${url}/task/${id}`, {
          status: !status
      })
      window.location.reload(false);
    };

    const handleDelete = (id) => {
      axios.delete(`${url}/task/${id}`)
    };

    return (
      <div className="frame">
          <header>
            <h1 id="day">Things to do</h1>
            <form onSubmit={handleAdd}>
                <input type="text" className="add-task" onChange={e => setCurrent(e.target.value)} placeholder="Add a new task here.." />
                <button className="btn-add"><i className="fa fa-plus"></i></button>
            </form>
          </header>
          <button onClick={reverseTasks} className="btn-reverse"><i className="fa fa-long-arrow-up"></i><i className="fa fa-long-arrow-down"></i></button>
          <div className="task-contrainer">
          {
            (tasks.length > 0) ? tasks.map((item) =>
            <form>
              <ul className="list">
                  <li>
                      <button onClick={() => handleDelete(item.id)} className="btn-delete"><i className="fa fa-trash"></i></button>
                      <input  checked={item.status} className="check" type="checkbox" onChange={() => handleChecked(item.id, item.status)}></input>
                      <label style={{textDecoration: style[item.status]}}>{item.desc}</label>
                  </li>
              </ul>
            </form>
          ) : <div className="task-message">No Tasks</div>
          }
          </div>
      </div>
    );
};
export default ToDo;
