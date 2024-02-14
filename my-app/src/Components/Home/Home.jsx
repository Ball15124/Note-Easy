import NavBar from '../NavBar/NavBar'
import './Home.css'
import React, { useEffect, useState } from 'react'
import CreateNote from '../Note/CreateNote'
import { v4 as uuid } from 'uuid'
import Note from '../Note/Note'
import { auth } from '../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const [inputText, setInputText] = useState("")
    const [inputTextTitle, setInputTextTitle] = useState("")
    const [notes, setNotes] = useState([])
    const [editToggle, setEditToggle] = useState(null)
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(()=> {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        }
    }, []);
    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out successful')
            navigate('/Login')
        }).catch(error=> console.log(error))
    }

    const editHandler = (id, title, text) => {
        setEditToggle(id)
        setInputTextTitle(title)
        setInputText(text)
    }
    const saveHandler = () => {
        if (editToggle) {
            setNotes(notes.map((note) => (
                note.id === editToggle ?
                    { ...note, title: inputTextTitle, text: inputText }
                    : note
            )))
        } else {
            setNotes((prevNotes) => [
                ...prevNotes, {
                    id: uuid(),
                    title: inputTextTitle,
                    text: inputText
                }
            ])
        }
        setInputTextTitle("")
        setInputText("")
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
            <NavBar />

            <div className='notes'>{
                notes.map((note) => (
                    editToggle === note.id ?
                        <CreateNote
                            inputTextTitle={inputTextTitle}
                            inputText={inputText}
                            setInputTextTitle={setInputTextTitle}
                            setInputText={setInputText}
                            saveHandler={saveHandler}
                        />
                        :
                        <Note
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            text={note.text}
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
                        /> : <></>
                }

            </div>
            <div>
                {authUser ? <><p>{`Signed In as ${authUser.email}`}</p><button onClick={userSignOut}>Sign Out</button></> : <p>Signed Out</p>}
            </div>
        </div>

    )
}

export default Home