import React, { Suspense } from 'react';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { ThemeContext } from './context/ThemeContext';
import { themes } from './styles/theme';
const Customers = React.lazy(() => import ('./components/Customers'));
const Transaction = React.lazy(() => import ('./components/Transaction'));

const App = () => {
    return (
        <BrowserRouter>
            <ThemeContext.Provider value={themes}>
                <Suspense fallback='Loading...'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path='/customer' element={<Customers />} />
                        <Route path='/transaction' element={<Transaction />} />
                    </Routes>
                </Suspense>
            </ThemeContext.Provider>
        </BrowserRouter>
            
        
    )
}

export default App;