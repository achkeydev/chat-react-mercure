import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import {store, persistor} from './redux/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Discussion from './components/Discussion/Discussion';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <PersistGate persistor={persistor}>
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Signup />} />
                <Route path="/discussion" element={<Discussion/>} />
            </Routes>
        </BrowserRouter>
        </Provider>
    </PersistGate>
)
