import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ChangePageButton from '../Discussion/ChangePageButton';
import Title from '../Signup/Title';
import Response from '../Signup/Response';
import { Erreur } from '../Signup/Signup';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Login: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [email, setEmail]: [string, (email: string) => void] = useState('');
  const [password, setPassword]: [string, (password: string) => void] = useState('');
  const [response, setResponse]: [null | string, (reponse: null | string) => void] = useState<null | string>(null);

  const inscription: () => void = (): void => {
    navigate('/');
  };

  const connexion: (e: React.FormEvent) => void = (e: React.FormEvent): void => {
    e.preventDefault();

    fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
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
        localStorage.setItem('token', data.token);
        setResponse(data.message);
        navigate('/home');
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

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title title='Connectez-vous !'></Title>
      </div>

      <Response response={response}></Response>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <form className="space-y-8" onSubmit={connexion}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Adresse email</label>
                <div className="mt-2">
                  <input type="email" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}></input>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
                </div>
                <div className="mt-2">
                  <input type="password" className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}></input>
                </div>
              </div>
              
              <div>
                <input type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" value="Se connecter"></input>
              </div>   
            </form>
            <div className='flex justify-center'>
              <ChangePageButton buttonFunction={inscription} page="S'inscrire"></ChangePageButton>
            </div>
          </div>
        </div>
    </div> 
  )
};

export default Login;
