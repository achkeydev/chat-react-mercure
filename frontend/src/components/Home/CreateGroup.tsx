import React from "react";
import CreateGroupButton from "./CreateGroupButton";

interface CreateGroupProps {
    createGroup: () => void;
    groupName: string;
    setGroupName: (groupName: string) => void;
}

const CreateGroup : React.FC<CreateGroupProps> = ({createGroup, groupName, setGroupName}) => {
    
    return (
        <>
            <input type="text" placeholder="nom du groupe..." className='mr-2 h-7 w-60 pl-2 rounded-md border-0 ring-1 ring-inset ring-gray-300 text-sm' value={groupName} onChange={e => setGroupName(e.target.value)}></input>
            <CreateGroupButton createGroup={createGroup}></CreateGroupButton>
        </>
    )
}

export default CreateGroup;