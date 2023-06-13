import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDate, setNewDate] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);

  const addNote = () => {
    const note = {
      id: Date.now(),
      note: newNote,
      amount: newAmount,
      date: newDate,
    };

    setNotes([...notes, note]);
    setNewNote("");
    setNewAmount("");
    setNewDate("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const editNote = (id) => {
    const note = notes.find((note) => note.id === id);
    setEditNoteId(id);
    setNewNote(note.note);
    setNewAmount(note.amount);
    setNewDate(note.date);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (id, updatedNote, updatedAmount, updatedDate) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              note: updatedNote,
              amount: updatedAmount,
              date: updatedDate,
            }
          : note
      )
    );
  };

  const saveNote = (id) => {
    setEditNoteId(null);
    setNewNote("");
    setNewAmount("");
    setNewDate("");
  };

  const sortNoteByAmount = () => {
    setNotes([...notes.sort((a, b) => a.amount - b.amount)]);
  };

  const sortNoteByDate = () => {
    setNotes([...notes.sort((a, b) => new Date(a.date) - new Date(b.date))]);
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add expense"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
      </form>
      <button onClick={sortNoteByAmount}>Sort by Amount</button>
      <button onClick={sortNoteByDate}>Sort by Date</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {editNoteId === note.id ? (
              <>
                <input
                  type="text"
                  value={note.note}
                  onChange={(e) =>
                    updateNote(note.id, e.target.value, note.amount, note.date)
                  }
                />
                <input
                  type="number"
                  value={note.amount}
                  onChange={(e) =>
                    updateNote(note.id, note.note, e.target.value, note.date)
                  }
                />
                <input
                  type="date"
                  value={note.date}
                  onChange={(e) =>
                    updateNote(note.id, note.note, note.amount, e.target.value)
                  }
                />
                <button onClick={() => saveNote(note.id)}>Save</button>
              </>
            ) : (
              <>
                <span className="note">{note.note}</span>
                <span className="amount">{note.amount}</span>
                <span className="date">{note.date}</span>
                <button onClick={() => editNote(note.id)}>Edit</button>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
