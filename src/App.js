import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import cookies from 'react-cookies';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Login from './components/Login'

function App() {

  let deployed_uri
  if (process.env.NODE_ENV === 'development') {
    deployed_uri = 'http://localhost:8888'
  } else {
    deployed_uri = "https://app-to-do-assessment.herokuapp.com"
  }
  // Data state handler
  const [data, setData] = useState([])
  const [addPost, setAddPost] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 10)
  })
  const [items, setItems] = useState(data)

  // error,loading and success handlers 
  const [loading, setLoading] = useState(false)
  const [postLoading, setPostLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  // Todo toggle handler

  const [toggle, setToggle] = useState(false)

  const token = cookies.load('access_token')

  const headers = {
    'Content-Type': 'application/json',
    'authorization': token
  }
  const getData = async () => {
    setLoading(true)
    setError(false)

    axios.get("https://app-to-do-assessment.herokuapp.com/todos", headers)
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(true)

      })
    setLoading(false)

  }

  const addData = async (e) => {
    e.preventDefault()

    setPostLoading(true)
    setError(false)
    setSuccess(false)

    axios.post(`${deployed_uri}/todos`, addPost, headers)
      .then(res => {
        console.log(res.data)
        setPostLoading(false)
        setSuccess(true)
      })
      .catch(err => {
        console.log(err)
        setError(true)

      })
    setPostLoading(false)

  }


  const handleToggle = (e) => {
    e.preventDefault();
    setToggle(!toggle)
  }


  const onInputChange = (e, p) => {
    setAddPost({
      ...addPost,
      [p]: e.target.value
    })
  }


  useEffect(() => {
    getData()
  }, [data])



  const sendMail = () => {
    if (data.data !== new Date().toISOString().slice(0, 10)) {
      console.log(new Date().toISOString().slice(0, 10))
    }
  }
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(items)
  }

  return (
    <div className="App">
      {!token ? <Login deployed_uri={deployed_uri} /> :
        <div className='container'>
          <h1>To do app</h1>
          <button onClick={(e) => handleToggle(e)}>Add a new task</button>
          {toggle ?
            <form className='formWrapper'>
              <div className='wrap'>
                <div className='inputWrapper'>
                  <label>Title</label>
                  <input style={{ textTransform: 'capitalize' }} onChange={e => onInputChange(e, 'title')} type='text' placeholder='Enter the todo title' required />
                </div>
                <div className='inputWrapper'>
                  <label>Description</label>
                  <input onChange={e => onInputChange(e, 'description')} type='text' placeholder='Enter the description' />
                </div>
                <div className='inputWrapper'>
                  <label>Date</label>
                  <input onChange={e => onInputChange(e, 'date')} type='date' placeholder='Enter the due date' />
                </div>
              </div>
              {postLoading ? <button disabled>Adding task...</button>
                : success ?
                  <>
                    <p style={{ color: 'var(--main)' }}>Task added!</p>
                    <button onClick={(e) => addData(e)}>Add</button>
                  </>
                  : <button onClick={(e) => addData(e)}>Add</button>

              }
            </form>
            : ''}
          <div className='todoListWrapper'>
            {/* <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        > */}
            <ul className='todoList'>
              {!loading ?
                data.map((e, i) => {
                  return (
                    <li key={i} className='checkboxWrapper'>
                      <div>
                        <div key={i}>
                          <input type='checkbox' id='checkbox' />
                          <label>{e.title}</label>
                        </div>
                        <span>{e.date.slice(0, 10)}</span>
                      </div>
                      <p>{e.description}</p>
                    </li>)
                })

                : <p>Loading data...</p>}
            </ul>
            {/* </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext> */}
          </div>
        </div>
      }
    </div>
  );
}

export default App;
