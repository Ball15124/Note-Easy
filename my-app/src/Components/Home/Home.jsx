import NavBar from '../NavBar/NavBar'
import './Home.css'
import React, { useEffect, useState } from 'react'
import CreateNote from '../Note/CreateNote'
import { v4 as uuid } from 'uuid'
import Note from '../Note/Note'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase'

export const Home = () => {
    const [inputText, setInputText] = useState("")
    const [inputTextTitle, setInputTextTitle] = useState("")
    const [notes, setNotes] = useState([])
    const [editToggle, setEditToggle] = useState(null)
    // const [date, setDate] = useState("");
    const [tags, setTags] = useState('');
    const [tagArray, setTagArray] = useState([]);
    const [authUser, setAuthUser] = useState(null);
    const [sortBy, setSortBy] = useState('date');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredNotes = notes.filter((note) => {
        const searchText = `${note.title.toLowerCase()} ${note.text.toLowerCase()}`;
        return searchText.includes(searchQuery.toLowerCase());
    });

    const sortNotes = () => {
        if (sortBy === 'date') {
            setNotes([...notes].sort((a, b) => new Date(b.date) - new Date(a.date)));
        } else if (sortBy === 'title') {
            setNotes([...notes].sort((a, b) => a.title.localeCompare(b.title)));
        }
    };
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        }
    }, []);

    const navigate = useNavigate();

    const handleAddTag = () => {
        if (tags.trim() !== '') {
            setTagArray([...tagArray, tags.trim()]);
            setTags('');
        }
    };

    const handleRemoveTag = (index) => {
        const newTags = [...tagArray];
        newTags.splice(index, 1);
        setTagArray(newTags);
        console.log(tagArray)
    };




    const editHandler = (id, title, text, tagArray) => {
        setEditToggle(id)
        setInputTextTitle(title)
        setInputText(text)
        setTagArray(tagArray)
    }
    const saveHandler = () => {
        if (editToggle) {
            const today = new Date();
            const dates = today.toDateString();
            // setDate(`${dates}/${month}/${year}`) 
            const currentDate = `${dates}`
            setNotes(notes.map((note) => (
                note.id === editToggle ?
                    {
                        ...note,
                        title: inputTextTitle,
                        text: inputText,
                        date: currentDate,
                        tagArray: tagArray,
                        creater: authUser.email
                    }
                    : note
            )))
        } else {
            const today = new Date();
            const dates = today.toDateString();
            // setDate(`${dates}/${month}/${year}`)
            const currentDate = `${dates}`
            setNotes((prevNotes) => [
                ...prevNotes, {
                    id: uuid(),
                    title: inputTextTitle,
                    text: inputText,
                    date: currentDate,
                    tagArray: tagArray,
                    creater: authUser.email
                }
            ])
        }
        setInputTextTitle("")
        setInputText("")
        setTagArray([])
        setEditToggle(null)

    }
    const deleteHandler = (id) => {
        const newNotes = notes.filter(n => n.id !== id)
        setNotes(newNotes)
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if (data) {
            setNotes(data);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("Notes", JSON.stringify(notes));
    }, [notes]);
    return (
        <div className='HomePage'>
            <NavBar searchQuery={searchQuery} onSearch={handleSearch} />
            <div className='sort-section'>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="date">Sort by Date</option>
                    <option value="title">Sort by Title</option>
                </select>
                <button onClick={sortNotes}>Sort</button>
            </div>
            <div className='notes'>{
                filteredNotes.map((note) => (
                    editToggle === note.id ?
                        <CreateNote
                            key="createNote"
                            inputTextTitle={inputTextTitle}
                            inputText={inputText}
                            setInputTextTitle={setInputTextTitle}
                            setInputText={setInputText}
                            saveHandler={saveHandler}
                            tags={tags}
                            setTags={setTags}
                            tagArray={tagArray}
                            setTagArray={setTagArray}
                            handleAddTag={handleAddTag}
                            handleRemoveTag={handleRemoveTag}

                        />
                        :
                        <Note
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            text={note.text}
                            creater={note.creater}
                            date={note.date}
                            tagArray={note.tagArray}
                            editHandler={editHandler}
                            deleteHandler={deleteHandler}
                        >
                        </Note>
                ))
            }
                {
                    editToggle === null ?
                        <CreateNote
                            inputTextTitle={inputTextTitle}
                            inputText={inputText}
                            setInputTextTitle={setInputTextTitle}
                            setInputText={setInputText}
                            saveHandler={saveHandler}
                            tags={tags}
                            setTags={setTags}
                            tagArray={tagArray}
                            setTagArray={setTagArray}
                            handleAddTag={handleAddTag}
                            handleRemoveTag={handleRemoveTag}

                        /> : <></>
                }

            </div>

        </div>

    )
}

export default Home