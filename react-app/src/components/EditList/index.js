import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createListThunk, editListThunk } from "../../store/lists"


function EditList({list}) {
    const {id,name} = list
  const dispatch = useDispatch();
  const [listName, setListName] = useState(name)
  const history = useHistory()

    console.log("list",list)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      id
    }
    console.log("payload",payload)
    let listUpdated = await dispatch(editListThunk(payload,id))
    if (listUpdated) {
      history.push(`/all`)
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="welcome">( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°)</div>
      <div className="List">
      <label>
        <input
          type="text"
          required pattern="(?!\s+$)[a-zA-Z,'. ! ? -]+"
          onChange={(e) => setListName(e.target.value)}
          value={listName}
        />
      </label>
      <button className="ListButton" type="submit">Edit the list</button>
      </div>
    </form>
  );
}

export default EditList;