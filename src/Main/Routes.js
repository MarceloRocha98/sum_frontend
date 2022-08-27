import React from 'react'
import { Routes , Route } from 'react-router'
import Home from '../pages/Home/Home'

export default props =>
    <Routes >
        <Route exact path='/' element={<Home/>} />
    </Routes >