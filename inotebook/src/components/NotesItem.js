import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const NotesItem = (props) => {
  // ({ data: { note, updateNote } }
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;
  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <p className="card-text">{note.tag}</p>
        {/* <FontAwesomeIcon icon="fa-solid fa-trash" /> */}
        <i
          className="fa-solid fa-trash mx-2"
          onClick={() => {
            deleteNote(note._id);
            showAlert("deleted Successfully", "success");
          }}
        ></i>
        <i
          className="fa-solid fa-pen-to-square mx-2"
          onClick={() => {
            updateNote(note);
          }}
        ></i>
      </div>
    </div>
  );
};

export default NotesItem;
