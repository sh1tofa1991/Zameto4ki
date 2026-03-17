import { useState } from 'react'

function App() {
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')

  function getRandomColor() {
    var colors = [
      '#FFD1DC', '#FFE4B5', '#FFFACD', '#D4F0C0',
      '#B5EAD7', '#C1E1FF', '#D5C6FF', '#FADADD',
      '#E8D5B7', '#F0E68C', '#E0BBE4', '#FEC8D8'
    ]
    var index = Math.floor(Math.random() * colors.length)
    return colors[index]
  }

  function addNote() {
    if (text.trim() === '') return
    var newNote = {
      id: Date.now(),
      text: text.trim(),
      color: getRandomColor()
    }
    setNotes([...notes, newNote])
    setText('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      addNote()
    }
  }

  function deleteNote(id) {
    var updated = notes.filter(function (note) {
      return note.id !== id
    })
    setNotes(updated)
  }

  function swapFirstAndLast() {
    if (notes.length < 2) return
    var copy = [...notes]
    var temp = copy[0]
    copy[0] = copy[copy.length - 1]
    copy[copy.length - 1] = temp
    setNotes(copy)
  }

  var filteredNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="container">
      <h1>Заметки</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Введите текст заметки..."
          value={text}
          onChange={function (e) { setText(e.target.value) }}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addNote}>Добавить</button>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Поиск по заметкам..."
        value={search}
        onChange={function (e) { setSearch(e.target.value) }}
      />

      <button className="swap-btn" onClick={swapFirstAndLast}>
        Поменять первую и последнюю местами
      </button>

      <div className="notes-list">
        {filteredNotes.length === 0 && notes.length === 0 && (
          <p className="empty-text">Пока нет заметок. Добавьте первую!</p>
        )}
        {filteredNotes.length === 0 && notes.length > 0 && (
          <p className="empty-text">Ничего не найдено</p>
        )}
        {filteredNotes.map(function (note) {
          return (
            <div
              className="note-card"
              key={note.id}
              style={{ backgroundColor: note.color }}
            >
              <span>{note.text}</span>
              <button
                className="delete-btn"
                onClick={function () { deleteNote(note.id) }}
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
