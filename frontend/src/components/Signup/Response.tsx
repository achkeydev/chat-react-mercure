import React from "react";

interface ResponseProps {
    response: string | null;
}

const Response: React.FC<ResponseProps> = ({response}) => {
    return(
        <h3 className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900">{response}</h3>
    )
}

export default Response;