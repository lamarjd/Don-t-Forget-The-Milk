import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { createNoteThunk } from "../../store/notes";
import { useHistory, useParams } from "react-router-dom";

function NoteForm({ filtered }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = filtered
    let task_id = id
    console.log("ID", id)
    console.log("filtered", filtered)
    // const { taskId } = useParams();
    // console.log("task ID", taskId);

    const [body, setBody] = useState('');

    useEffect(() => {
    }, [dispatch, body])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            body,
            task_id
        }
        console.log("PAYLOAD------------------",payload)
        let noteCreated = await dispatch(createNoteThunk(payload, id))
        console.log(noteCreated)
        if (noteCreated) {
            history.push(`/all/${task_id}`)
        }
    }




    return (
        <form className="containerNoteCreationTaskDetails" onSubmit={handleSubmit}>
        <div className="Note">
        <label>
          <input
            placeholder="Write Note here"
            id="inputBoxnoteTaskDetails"
            type="text"
            value={body}

            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <button className="NoteButtonTaskDetails" type="submit">Add a note to the task</button>
        </div>
      </form>
    )
}

export default NoteForm;
