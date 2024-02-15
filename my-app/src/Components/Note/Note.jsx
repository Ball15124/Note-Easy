import React from 'react'

const Note = ({ id, title, text, creater, date, editHandler, deleteHandler, tagArray }) => {
  return (
    <div className='note'>
      <div className='note-header'>{title}</div>
      <div className='note-body'>{text}</div>
      <div className='tag-container'>
        {tagArray.map((tag, index) => (
          <span key={index} className='tag-display'>#{tag}</span>
        ))}
      </div>
      <div className='note_footer'>
        <div className='btn-container'>
          <p>{`by ${creater}\n${date}`}</p>
        </div>
        <button className='note_save' onClick={() => deleteHandler(id)}>Delete</button> &nbsp;
          <button className='note_save' onClick={() => editHandler(id, title, text, tagArray)}>Edit</button>
      </div>
    </div>
  )
}

export default Note