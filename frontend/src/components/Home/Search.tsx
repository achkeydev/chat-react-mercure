import React from 'react';
import NavBarButton from './NavBarButton';
import DisplaySearchResults from './DisplaySearchResults';
import { User, Group } from './Home';

interface SearchProps {
  setSearchTerm: (searchTerm: string) => void;
  handleSearch: () => void;
  addFriend: (userId: string) => void;
  joinGroup: (notAddedGroupId: string) => void;
  displayFriends: User[];
  displayUsers: User[];
  displayAddedGroups: Group[];
  displayNotAddedGroups: Group[];
  searchTerm: string;
  searchMessage: string;
} 

const Search: React.FC<SearchProps> = ({displayFriends, displayUsers, addFriend, displayAddedGroups, displayNotAddedGroups, joinGroup, handleSearch, setSearchTerm, searchTerm, searchMessage}) => {

  return (
    <div className='relative'>
      <input type="text" className='mr-2 w-80 h-8 pl-2 rounded-md' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <NavBarButton buttonFunction={handleSearch} buttonName='Rechercher'></NavBarButton>
      <div className='absolute w-full'>
        <DisplaySearchResults displayFriends={displayFriends} displayUsers={displayUsers} addFriend={addFriend} displayAddedGroups={displayAddedGroups} displayNotAddedGroups={displayNotAddedGroups} joinGroup={joinGroup} searchMessage={searchMessage}></DisplaySearchResults>
      </div>
    </div>
  );
};

export default Search;  