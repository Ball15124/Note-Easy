import React from 'react'


const CreateNote = ({inputTextTitle, inputText, setInputTextTitle, setInputText, saveHandler}) => {
    const char= 50;
    const charLimit = char - inputText.length;
  return (
    <div className='note'>
        <textarea
        cols={1}
        rows={1}
        placeholder='Title'
        value={inputTextTitle}
        onChange={(e) => setInputTextTitle(e.target.value)}
        >
        </textarea>
        <textarea
        cols={20}
        rows={5}
        placeholder='Write Something...'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        >
        </textarea>
        <div className='note_footer'>
            <span className='label'>{charLimit} Left</span>
            <button className='note_save' onClick={saveHandler}>Save</button>
        </div>
    </div>
  )
}

export default CreateNote