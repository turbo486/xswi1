import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewTask() {
    const [task, setTask] = useState({
        name:"",
        description:""
    })

    const {id} = useParams()

    useEffect(() => {
        loadTask()
    }, [])

    const  loadTask = async() => {
        const result = await axios.get(`http://localhost:8080/task/${id}`)
        setTask(result.data)
    }

    const [subtasks ,setSubtasks] = useState([])

    useEffect(() => {
        loadSubtasks()
    }, [])

    const loadSubtasks = async() => {
        const result = await axios.get(`http://localhost:8080/task/${id}/subtasks`)
        setSubtasks(result.data)
    }

    const deleteSubtask = async(id) => {
        await axios.delete(`http://localhost:8080/subtask/${id}`)
        loadSubtasks()
    }

    sessionStorage.setItem("taskId", id)
    sessionStorage.setItem("taskName", task.name)

  return (
    <div className='container'>
        <div className='row'>
            <div className='border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Task details</h2>
                <div className='card'>
                    <div className='card-header'>
                        <b>Detail of task ID: {task.id}</b>
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Name:</b><br />
                                {task.name}
                            </li>
                            <li className='list-group-item'>
                                <b>Description:</b><br />
                                {task.description}
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                </div>
                <div className='container'>
                    <div className='py-4'>
                        <table class='table border shadow'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Subtask</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subtasks.map((subtask, index) => (
                                        <tr>
                                            <th scope='row' key={index}>{index + 1}</th>
                                            <td>{subtask.text}</td>
                                            <td>
                                                <Link className='btn btn-outline-primary mx-2'
                                                to={`/editsubtask/${subtask.id}`}>
                                                    Edit
                                                </Link>
                                                <button className='btn btn-danger mx-2'
                                                onClick={() => deleteSubtask(subtask.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Link className='btn btn-outline-primary my-2'
                        to='/addsubtask'>
                            Add subtask
                        </Link>
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to='/'>
                    Return
                </Link>
            </div>
        </div>
    </div>
  )
}
