import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditSubtask() {
    let navigate = useNavigate()

    const {id} = useParams()

    const [subtask, setSubtask] = useState({
        text:''
    })

    const{text} = subtask

    const onInputChange = (e) => {
        setSubtask({...subtask, [e.target.name]:e.target.value})
    }

    useEffect(() => {
        loadSubtask()
    }, [])

    const onSubmit = async(e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/subtask/${id}`, subtask)
        navigate(`/viewtask/${sessionStorage.getItem("taskId")}`)
    }

    const loadSubtask = async() => {
        const result = await axios.get(`http://localhost:8080/subtask/${id}`)
        setSubtask(result.data)
    }
  return (
    <div className='container'>
        <div className='row'>
            <div className='border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit existing subtask (task: {sessionStorage.getItem("taskName")})</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='text' className='form-label'>
                            Subutask text
                        </label>
                        <input
                            type={'text'}
                            className='form-control'
                            placeholder='Enter text of the subtask'
                            name='text'
                            value={text}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>
                        Save
                    </button>
                    <Link className='btn btn-outline-danger mx-2' to={`/viewtask/${sessionStorage.getItem("taskId")}`} >
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
