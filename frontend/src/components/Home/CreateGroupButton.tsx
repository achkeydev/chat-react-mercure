import React from "react";

interface CreateGroupButtonProps {
    createGroup: () => void;
}

const CreateGroupButton: React.FC<CreateGroupButtonProps> = ({createGroup}) => {
    return(
        <button className="pl-4 pr-4 h-7 rounded-md bg-indigo-400 hover:bg-indigo-300 text-white text-sm" onClick={createGroup}>Créer</button>
    )
}

export default CreateGroupButton;