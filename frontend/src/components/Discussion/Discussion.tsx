import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/types/rootTypes";
import { User } from "../Home/Home";
import DisplayUserInfos from "../Home/DisplayUserInfos";
import ChangePageButton from "./ChangePageButton";
import DisplayFriendInfos from "./DisplayFriendInfos";
import DisplayMessages from "./DisplayMessages";
import SendMessage from "./SendMessage";
import DeleteAllButton from "../Home/DeleteAllButton";
import DisplayNotificationsButton from "../Home/DisplayNotificationsButton";
import { setNotifications } from "../../redux/actions/notificationActions";

export interface Notification {
    _id: string,
    message: string,
    receiver: User
}
export interface MessageData {
    _id: string,
    message: string,
    sender: User,
    receiver: User 
}

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Discussion: React.FC = () => {
const [Messages, setMessages] = useState<MessageData[]>([]);
const [error, setError] = useState<string>('');
const [message, setMessage] = useState<string>('');
const [deleteMessage, setDeleteMessage] = useState<string>('');
const navigate = useNavigate();
const user = useSelector((state: RootState) => state.user);
const notifications = useSelector((state: RootState) => state.notifications);
// const groups = useSelector((state: RootState) => state.groups);

const dispatch = useDispatch();
const token = localStorage.getItem('token');
const friendId = localStorage.getItem('friendId');

    useEffect(() => {
        fetch(`${apiUrl}/api/message/get-all-messages/${friendId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response: Response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json() 
          })
          .then(data => {
            if(data.messages.length > 0){
                setMessages(data.messages);
            }
          })
          .catch((error: Error) => {
            console.error('Error:', error);
            setError(error.message);
          });
    }, [token]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`${apiUrl}/api/message/send-message/${friendId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({message})
        })
        .then((response: Response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json() 
        })
        .then(data => {
            setMessage('');
            setDeleteMessage('');
            // console.log(data);
            setMessages((prevMessages: MessageData[]) => [...prevMessages, data.message])
        })
        .catch((error: Error) => {
            console.error('Error:', error);
        });   
    
        fetch(`${apiUrl}/api/notification/create-notification/${friendId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response: Response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json() 
        })
        .then(data => {
            setMessage('');
            console.log(data.message);
        })
        .catch((error: Error) => {
            console.error('Error:', error);
        });
    }
    
    function deleteDiscussion () {
        fetch(`${apiUrl}/api/message/delete-discussion/${friendId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response: Response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json() 
        })
        .then(data => {
            setMessage('');
            setMessages([]);
            setDeleteMessage(data.message);
        })
        .catch((error: Error) => {
            console.error('Error:', error);
        });   
    }
    
    const home = () => {
        fetch(`${apiUrl}/api/notification/outside-discussion/${friendId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response: Response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json() 
        })
        .then(data => {
            console.log(data.message);
        })
        .catch((error: Error) => {
            console.error('Error:', error);
        });   
        
        navigate('/home');
    }

    const showNotifications = () => {
        fetch(`${apiUrl}/api/notification/get-all-notifications`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          .then((response: Response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json() 
          })
          .then(data => {
              dispatch(setNotifications(data.reversedNotifications))
          })
          .catch(error => setError(error.message));
      }
    
      const deleteAllNotifications = () => {
        fetch(`${apiUrl}/api/notification/delete-all-notifications`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json() 
        })
        .then(data => {
            dispatch(setNotifications([]));
            console.log(data.message);
        })
        .catch(error => setError(error.message));
      }

    return (
        <div>
            {error ?
                <p>{error}</p>
            :
            (
            <div className='flex flex-col h-screen'>
                <div className="flex h-1/6 justify-around flex-row pt-14 bg-indigo-950">
                    <div className="w-24" onClick={() => (dispatch(setNotifications([])))}>
                        <ChangePageButton buttonFunction={home} page="Accueil"></ChangePageButton>
                    </div>
                    <div className='text-white' onClick={() => (dispatch(setNotifications([])))}>
                        <DisplayUserInfos user={user}></DisplayUserInfos>
                    </div>
                    <div className='text-white static'>
                    <DisplayNotificationsButton showNotifications={showNotifications} notifications={notifications} deleteAllNotifications={deleteAllNotifications}></DisplayNotificationsButton>
                    </div>
                </div>
                <div className="h-5/6 flex flex-row" onClick={() => (dispatch(setNotifications([])))}>
                    <div className="basis-1/4 border-x-2 bg-blue-50">
                        <div className="flex justify-center py-8 border-b-2 hover:bg-gray-50">
                            <DisplayFriendInfos user={user} friendId={friendId}></DisplayFriendInfos>
                        </div>
                    </div>
                    <div className="basis-3/4 flex flex-col overflow-hidden">
                        <div className="flex border-b-2 p-8">
                            <div className="mr-auto">
                                <DisplayFriendInfos user={user} friendId={friendId}></DisplayFriendInfos>
                            </div>
                            <DeleteAllButton buttonFunction={deleteDiscussion} buttonName="Supprimer la discussion"></DeleteAllButton>
                        </div>
                        <DisplayMessages user={user} friendId={friendId} deleteMessage={deleteMessage} Messages={Messages}></DisplayMessages>
                        <div className="mt-auto">
                            <SendMessage sendMessage={sendMessage} message={message} setMessage={setMessage}></SendMessage>
                        </div>
                    </div>
                </div>
            </div>
            )
            }
        </div>
    )
}

export default Discussion;