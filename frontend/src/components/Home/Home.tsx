import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import { setGroups, setNewGroup } from '../../redux/actions/groupActions';
import { setNotifications } from '../../redux/actions/notificationActions';
import { RootState } from '../../redux/types/rootTypes';
import DisplayUserInfos from './DisplayUserInfos';
import Search from './Search';
import DisplayFriends from './DisplayFriends';
import DisplayGroups from './DisplayGroups';
import CreateGroup from './CreateGroup';
import DisplayNotificationsButton from './DisplayNotificationsButton';
import NavBarButton from './NavBarButton';
export interface Group {
  _id: string;
  groupName: string;
  admins: User[];
  members: User[];
}

export interface User {
  _id: string;
  nom: string;
  prenom: string;
  friends: User[];
}

let responseUsers: boolean = false; 
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Home: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [displayUsers, setDisplayUsers] = useState<User[]>([]);
  const [displayFriends, setDisplayFriends] = useState<User[]>([]);
  const [displayNotAddedGroups, setDisplayNotAddedGroups] = useState<Group[]>([]);
  const [displayAddedGroups, setDisplayAddedGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [deleteGroupMessage, setDeleteGroupMessage] = useState<string>('');

  const user = useSelector((state: RootState) => state.user);
  const groups = useSelector((state: RootState) => state.groups);
  const notifications = useSelector((state: RootState) => state.notifications);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  //recuperer les infos du User et les messages dès le rechargement de la page
  useEffect(() => {
    fetch(`${apiUrl}/api/auth/user-info`, {
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
        dispatch(setNotifications([]))
        if(data.groups){
          dispatch(setUser(data.userInfo));
          dispatch(setGroups(data.groups));
        }else {
          dispatch(setUser(data.userInfo));
        }
      })
      .catch(error => setError(error.message));
  }, [token]);

  //pour rechercher un friend
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      console.error('Le terme de recherche ne peut pas être vide.');
      return;
    }
    setSearchMessage('');
    fetch(`${apiUrl}/api/auth/search?q=${searchTerm}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response: Response) => {
      if (!response.ok) {
        if (response.status === 404) {
          responseUsers = true;
        } else {
            throw new Error(response.statusText);
          }
      } 
      return response.json();
      
    })
    .then(data => {  
      setSearchTerm('');
      if(responseUsers === true){
        setDisplayFriends([]);
        setDisplayUsers([]);
        setDisplayAddedGroups([]);
        setDisplayNotAddedGroups([]);
        setSearchMessage("Aucun résultat trouvé");
        responseUsers = false;
        return;
      }
      setDisplayFriends([]);
      setDisplayUsers([]);
      setDisplayAddedGroups([]);
      setDisplayNotAddedGroups([]);
      setDeleteGroupMessage('');

      data.searchUsers.forEach((searchUser: User) => {
        const isUserInUserFriends = user.friends.some(prevFriend => prevFriend._id === searchUser._id);
  
        if (isUserInUserFriends) {
              setDisplayFriends((prevSearchResults: User[]) => [...prevSearchResults, searchUser]);
            }
          if (!isUserInUserFriends) {
            setDisplayUsers(prevSearchResults => [...prevSearchResults, searchUser]);
          }
      });

      data.searchGroups.forEach((searchGroup: Group) => {  
        const isUserInAdmins = searchGroup.admins.some(prevAdmins => prevAdmins._id === user._id);
        const isUserInMembers = searchGroup.members.some(prevAdmins => prevAdmins._id === user._id);
  
        if (isUserInAdmins || isUserInMembers) {
              setDisplayAddedGroups((prevSearchGroupResults: Group[]) => [...prevSearchGroupResults, searchGroup]);
            }else {
            setDisplayNotAddedGroups((prevSearchGroupResults: Group[]) => [...prevSearchGroupResults, searchGroup]);
          }
      });
    })
    .catch(error => console.error('Error:', error));
  };
  
  //pour ajouter un friend
  const addFriend = (friendId: string) => {
    fetch(`${apiUrl}/api/friend/add-friend/${friendId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Erreur lors de l\'ajout de l\'ami:', data.error);
        } else if (data.friends && data.friends.length > 0) {
          setDisplayFriends([]);
          setDisplayUsers([]);
          setDisplayAddedGroups([]);
          setDisplayNotAddedGroups([]);
          setDeleteGroupMessage('');
          setSearchMessage('');
          dispatch(setUser(data));
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const discussions = (friendId: string) => {
    localStorage.setItem('friendId', friendId)

    fetch(`${apiUrl}/api/notification/in-discussion/${friendId}`, {
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
      console.log(data.message);
  })
  .catch(error => setError(error.message));

    navigate('/discussion');
  }
  
  //pour supprimer un friend de la liste Mes amis
  const deleteFriend = (friendId: string) => {
    fetch(`${apiUrl}/api/friend/remove-friend/${friendId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Erreur lors de la suppression de l\'ami :', data.error);
      } else {
          setDisplayFriends([]);
          setDisplayUsers([]);
          setDisplayAddedGroups([]);
          setDisplayNotAddedGroups([]);
          setDeleteGroupMessage('');
          setSearchMessage('');
          dispatch(setUser(data.updateUser));
        }
    })
    .catch(error => console.error('Error:', error));
  };

  //pour créer un groupe
  const createGroup = () => {
    fetch(`${apiUrl}/api/group/create-group/${groupName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);    
        } 
        return response.json();
      })
      .then(data => {
        setGroupName('');
        if (data.error) {
          console.error('Erreur lors de la création du groupe:', data.error);
        } else {
          setDisplayFriends([]);
          setDisplayUsers([]);
          setDisplayAddedGroups([]);
          setDisplayNotAddedGroups([]);
          setDeleteGroupMessage('');
          setSearchMessage('');
          dispatch(setNewGroup(data.newGroup));
        }
      })
      .catch(error => {
        console.error('Erreur lors de la création du groupe:', error);
      });
  };

  //pour supprimer un groupe
  const deleteGroup = (groupId: string) => {
    fetch(`${apiUrl}/api/group/delete-group/${groupId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Erreur lors de la suppression du groupe:', data.error);
      } else {
          setDisplayFriends([]);
          setDisplayUsers([]);
          setDisplayAddedGroups([]);
          setDisplayNotAddedGroups([]);
          setSearchMessage('');
          setDeleteGroupMessage(data.message);
          dispatch(setGroups(data.groups));
        }
    })
    .catch(error => {
      console.error('Erreur lors de la suppresion du groupe:', error);
    });
  }

  const joinGroup = (groupId: string) => {
    fetch(`${apiUrl}/api/group/join-group/${groupId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
          setDisplayFriends([]);
          setDisplayUsers([]);
          setDisplayAddedGroups([]);
          setDisplayNotAddedGroups([]);
          setDeleteGroupMessage('');
          setSearchMessage('');
          dispatch(setGroups(data.groups));
    })
    .catch(error => {
      console.error('Erreur lors de l\'adhésion au groupe:', error);
    });
  }

  const withdrawGroup = (groupId: string) => {
    fetch(`${apiUrl}/api/group/withdraw-group/${groupId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setDisplayFriends([]);
      setDisplayUsers([]);
      setDisplayAddedGroups([]);
      setDisplayNotAddedGroups([]);
      setDeleteGroupMessage('');
      setSearchMessage('');
      dispatch(setGroups(data.groups));
  })
  .catch(error => {
    console.error('Erreur lors de l\'adhésion au groupe:', error);
  });
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

  //pour la déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    dispatch(setGroups([]));
    dispatch(setUser({
      _id: '',
      nom: '',
      prenom: '',
      friends: []
    }))
    navigate('/login');
  };

  return (
    <div>
        {error? 
        <p>{error}</p>
        :
        ( 
        <div className='flex flex-col h-screen'>
          <div className="content-center flex flex-row p-8 bg-indigo-950">
            <div className='flex justify-center basis-1/6 text-white'  onClick={() => (setSearchMessage(''), setDisplayAddedGroups([]), setDisplayNotAddedGroups([]), setDisplayFriends([]), setDisplayUsers([]), dispatch(setNotifications([])))}>
              <DisplayUserInfos user={user}></DisplayUserInfos>
            </div>
            <div className='flex justify-center basis-1/2 static'>
              <Search handleSearch = {handleSearch} setSearchTerm = {setSearchTerm} searchTerm = {searchTerm} searchMessage = {searchMessage} addFriend={addFriend} joinGroup={joinGroup} displayFriends={displayFriends} displayUsers={displayUsers} displayAddedGroups={displayAddedGroups} displayNotAddedGroups={displayNotAddedGroups}/>
            </div>
            <div className='basis-1/6 text-white static'>
              <DisplayNotificationsButton showNotifications={showNotifications} notifications={notifications} deleteAllNotifications={deleteAllNotifications}></DisplayNotificationsButton>
            </div>
            <div className='flex justify-center basis-1/6 text-white'  onClick={() => (setSearchMessage(''), setDisplayAddedGroups([]), setDisplayNotAddedGroups([]), setDisplayFriends([]), setDisplayUsers([]), dispatch(setNotifications([])))}>
              <NavBarButton buttonFunction={logout} buttonName='Se déconnecter'></NavBarButton>
            </div>
          </div>
          <div className="flex-1 flex flex-row"  onClick={() => (setSearchMessage(''), setDisplayAddedGroups([]), setDisplayNotAddedGroups([]), setDisplayFriends([]), setDisplayUsers([]), dispatch(setNotifications([])))}>
            <div className='basis-1/4 border-x-2 border-t-2 bg-blue-50'>
              <div className='pt-8'>
                <DisplayFriends user={user} deleteFriend={deleteFriend} discussions={discussions}></DisplayFriends>
              </div>
              <div className='pt-8'>
                <DisplayGroups user={user} groups={groups} deleteGroup={deleteGroup} withdrawGroup={withdrawGroup} deleteGroupMessage={deleteGroupMessage}></DisplayGroups>  
              </div>
              <div className='p-10 space-y-3 flex flex-col'>
                <label className="content-center text-sm font-medium leading-6 text-gray-900">Créer un groupe</label>
                <div className='flex'>
                  <CreateGroup createGroup = {createGroup} groupName = {groupName} setGroupName = {setGroupName}></CreateGroup>
                </div>
              </div>
            </div>
            <div className='flex justify-center basis-1/2'>
              
            </div>
            <div className='flex justify-center basis-1/4'>
            
            </div>
          </div>
        </div> 
        )}
    </div>
  )
}

export default Home;    