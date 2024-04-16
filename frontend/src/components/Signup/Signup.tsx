import React, { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ChangePageButton from '../Discussion/ChangePageButton';
import Title from './Title';
import Response from './Response';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export interface Erreur {
  msg: string;
}

const Signup: React.FC = () => {
  const [nom, setNom]: [string, (nom: string) => void] = useState('');
  const [prenom, setPrenom]: [string, (prenom: string) => void] = useState('');
  const [email, setEmail]: [string, (email: string) => void] = useState('');
  const [password, setPassword]: [string, (password: string) => void] = useState('');
  const [response, setResponse]: [null | string, (reponse: null | string) => void] = useState<null | string>(null);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    return () => {
      setNom('');
      setPrenom('');
      setEmail('');
      setPassword('');
      setResponse(null);
    };
  }, []);

  const inscription = (e: React.FormEvent): void => {
    e.preventDefault();

    fetch(`${apiUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        nom,
        prenom,
        email,
        password
      })
    })
      .then((response: Response): Promise<{ token: string; message: string }> => {
        if (!response.ok) {
          return response.json().then((err: Error) => {
            throw err;
          }) as Promise<{ token: string; message: string }>;
        }
        return response.json() as Promise<{ token: string; message: string }>;
      })
      .then((data: { token: string; message: string }) => {
        setResponse(data.message);
        navigate('/login');
      })

      .catch((error) => {
        if(error.errors){
          error.errors.map((erreur: Erreur) => {
            setResponse(erreur.msg)
          })}
        if(error.message){
        setResponse(error.message);}
      })
  };

  const connexion = (): void => {
    navigate('/login');
  };

  return (
    <div>
      <Title title='Inscrivez-vous !'></Title>
      <Response response={response}></Response>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <form className="space-y-2" onSubmit={inscription}> 
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Nom</label>
                <div className="mt-2">
                  <input type="text" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={nom} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setNom(e.target.value)}></input><br></br>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Prénom</label>
                <div className="mt-2">
                  <input type="text" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={prenom} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPrenom(e.target.value)}></input><br></br>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Adresse email</label>
                <div className="mt-2">
                  <input type="email" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}></input><br></br>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
                <div className="mt-2">
                  <input type="password" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}></input><br></br>
                </div>
              </div>
              <div>
                <input type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" value="S'inscrire"></input>
              </div>
            </form>
            <ChangePageButton buttonFunction={connexion} page='Se connecter'></ChangePageButton>
          </div>
      </div>  
    </div>
  )
}; 

export default Signup;
