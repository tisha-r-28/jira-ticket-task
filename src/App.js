import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import PrivateRoute from "./private-route/PrivateRoute";
import Tasks from "./components/Tasks";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<Signup />}/>
                    <Route element={<PrivateRoute />}>
                        <Route path="/tasks" element={<Tasks />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;