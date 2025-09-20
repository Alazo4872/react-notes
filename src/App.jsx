import Course from './components/Course'
import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './Services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('Some error happened...')
  const hook = () => {
    console.log('effect')
    noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
        })
  }

  useEffect(hook, [])

console.log('render', notes.length, 'notes')

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important:Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(addedNotes => {
        setNotes(notes.concat(addedNotes))
        setNewNote('')
    })
    
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const toggleImportance = (id) =>{
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService
        .update(id, changedNote)
        .then(updatedNotes => {
      setNotes(notes.map(note => note.id === id ? updatedNotes: note))
    }).catch(error => {
      setErrorMessage(`Note '${note.content}' has already been removed`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }
  const course = [{
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
      {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }

]
  return( 
    <div>
    <div>
      <h1>Web development curriculum</h1>
      <Course course={course} />
    </div>
        <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <ul>
        <button onClick={
          () => setShowAll(!showAll)}>
            {showAll ? 'Show Important':'Show All'}</button>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
        onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
    <Footer />
    </div>
  )
}

export default App