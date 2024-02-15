import React from 'react'


const CreateNote = ({ inputTextTitle, inputText, setInputTextTitle, setInputText, saveHandler, tags, setTags, tagArray, setTagArray, handleAddTag, handleRemoveTag }) => {
  // const char= 50;
  // const charLimit = char - inputText.length;
  // const [tags, setTags] = useState('');
  // const [tagArray, setTagArray] = useState([]);

  // const handleAddTag = () => {
  //   if (tags.trim() !== '') {
  //     setTagArray([...tagArray, tags.trim()]);
  //     setTags('');
  //   }
  // };

  // const handleRemoveTag = (index) => {
  //   const newTags = [...tagArray];
  //   newTags.splice(index, 1);
  //   setTagArray(newTags);
  // };



  return (
    <div className='note'>
      <textarea className='note-title'
        cols={0}
        rows={1}
        placeholder='Title'
        value={inputTextTitle}
        onChange={(e) => setInputTextTitle(e.target.value)}
      >
      </textarea>
      <textarea className='note-content'
        cols={20}
        rows={5}
        placeholder='Write Something...'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      >
      </textarea>
      <div className='note-tags'>
        {tagArray.map((tag, index) => (
          <span key={index} className='tag'>
            {tag}
            <button className='btn-remove' onClick={() => handleRemoveTag(index)}>x</button>
          </span>
        ))}
      </div>
      <div className='note_footer'>
        <div className='btn-container'>
           <input
          type="text"
          className='note-tags-input'
          placeholder='Add tags'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button className='note_save' onClick={handleAddTag}>Add Tag</button>
        </div>
          <button className='note_save' onClick={saveHandler}>Save</button>
      </div>
    </div>
  )
}

export default CreateNote