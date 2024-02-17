import React, { useEffect, useState } from 'react'
const Note = ({ id, title, text, creater, date, editHandler, deleteHandler, tagArray, history }) => {
  const [showHistory, setShowHistory] = useState(false);

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
        <div className='footer-btn'>
          <button className='note_save' onClick={() => deleteHandler(id)}>Delete</button> &nbsp;
          <button className='note_save' onClick={() => editHandler(id, title, text, tagArray)}>Edit</button>
          <button className='note_save' onClick={() => setShowHistory(!showHistory)}>{!showHistory ? "Show History" : "Hide History"}</button>
        </div>

      </div>
      {showHistory && history && (    
        <div className="history">
          {history.map((version, index) => (
            <div key={index} className="history-item">
              <h6 style={{textAlign: 'right'}}>Version : {index + 1}</h6>
              <div className='note-header'>{version.title}</div>
              <div className='note-body'>{version.text}</div>
              <div className='tag-container'>
                {version.tagArray.map((tag, index) => (
                  <span key={index} className='tag-display'>#{tag}</span>
                ))}
              </div>
              <div className='note_footer'>
                <div className='btn-container'>
                  <p>{`by ${version.creater}\n${version.date}`}</p>
                </div>


              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Note