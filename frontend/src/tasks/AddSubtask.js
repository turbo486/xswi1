import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddSubtask() {
    let navigate = useNavigate()

    const [subtask, setSubtask] = useState({
        text:''
    })

    const{text} = subtask

    const onInputChange = (e) => {
        setSubtask({...subtask, [e.target.name]:e.target.value})
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        await axios.post(`http://localhost:8080/task/${sessionStorage.getItem("taskId")}/subtask`, subtask)
        navigate(`/viewtask/${sessionStorage.getItem("taskId")}`)
    }
  return (
    <div className='container'>
        <div className='row'>
            <div className=' border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add new subtask (task: {sessionStorage.getItem("taskName")})</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='text' className='form-label'>
                            Task name
                        </label>
                        <input
                            type={'text'}
                            className='form-control'
                            placeholder='Enter name of the task'
                            name='text'
                            value={text}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>
                        Save
                    </button>
                    <Link className='btn btn-outline-danger mx-2' to={`/viewtask/${sessionStorage.getItem("taskId")}`}>
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
