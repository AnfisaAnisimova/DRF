import React from 'react';
import axios from 'axios';
import './App.css';
import DeveloperList from './components/Developer.js';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/Projects';
import TodoList from './components/ToDo';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import './bootstrap/css/bootstrap.css';



class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           'developers': [],
           'projects': [],
           'todos': []
       }
   }

   componentDidMount() {
       axios.get('http://127.0.0.1:8000/api/developers')
       .then(response => {
           const developers = response.data.results
               this.setState(
               {
                   'developers': developers
               }
           )
       }).catch(error => console.log(error))
       axios.get('http://127.0.0.1:8000/api/projects')
       .then(response => {
           const projects = response.data.results
               this.setState(
               {
                   'projects': projects
               }
           )
       }).catch(error => console.log(error))
       axios.get('http://127.0.0.1:8000/api/tasks')
       .then(response => {
           const todos = response.data.results
               this.setState(
               {
                   'todos': todos
               }
           )
       }).catch(error => console.log(error))
   }

   render () {
       return (
           <BrowserRouter>
               <div>
                   <div className="container-fluid">
                       <nav class="navbar navbar-expand-lg navbar-light bg-light">
                           <Menu />
                       </nav>
                   </div>


                   <div>
                       <Routes>
                           <Route path='/developers' element={<DeveloperList developers={this.state.developers}/>}/>} />
                           <Route path='/projects' element={<ProjectList projects={this.state.projects}/>}/>} />
                           <Route path='/tasks' element={<TodoList todos={this.state.todos}/>}/>} />
                           <Route path='/home' element={<Home/>}/>}/>} />
                       </Routes>
                   </div>

                   <Footer />
               </div>
           </BrowserRouter>

       )
   }
}


export default App;