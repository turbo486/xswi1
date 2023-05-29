import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddTask() {
    let navigate = useNavigate()

    const [task, setTask] = useState({
        name:'',
        description:''
    })

    const{name, description} = task

    const onInputChange = (e) => {
        setTask({...task, [e.target.name]:e.target.value})
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/task', task)
        navigate('/')
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className=' border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add new task</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>
                            Task name
                        </label>
                        <input
                            type={'text'}
                            className='form-control'
                            placeholder='Enter name of the task'
                            name='name'
                            value={name}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='description' className='form-label'>
                            Task description
                        </label>
                        <input
                            type={'text'}
                            className='form-control'
                            placeholder='Enter description of the task'
                            name='description'
                            value={description}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>
                        Save
                    </button>
                    <Link className='btn btn-outline-danger mx-2' to='/'>
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
