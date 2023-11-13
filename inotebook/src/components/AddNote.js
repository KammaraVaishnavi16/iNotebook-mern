import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleAddNoteSubmit = (e) => {
    //whenever we click on submit button, to not reload the page, we run preventDefault()
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Added Successfully", "success");
  };
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="container my-3"
      style={{
        // border: "1px solid #ccc",
        border: "1px solid #343a40",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            placeholder="Add a title of atleast 5 Characters"
            onChange={handleOnChange}
            minLength={5}
            required
            style={{ width: "1000px" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            // placeholder="Add a description of atleast 5 Characters"
            onChange={handleOnChange}
            minLength={5}
            required
            rows={5}
            // cols="50" // Set the number of visible columns
            style={{ width: "1000px" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleOnChange}
            minLength={5}
            required
            style={{ width: "1000px" }}
          />
        </div>

        <button
          type="submit"
          disabled={note.title.length < 5 || note.description.length < 5}
          className="btn btn-primary"
          onClick={handleAddNoteSubmit}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
