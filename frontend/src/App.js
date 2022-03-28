import React from 'react';
import axios from 'axios';
import './App.css';
import DeveloperList from './components/Developer.js';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/Projects';
import TodoList from './components/ToDo';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import './bootstrap/css/bootstrap.css';
import Cookies from 'universal-cookie';
import LoginForm from "./components/Auth";

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           'developers': [],
           'projects': [],
           'todos': [],
           'token': ''
       }
   }

   set_token(token) {
       const cookies = new Cookies()
       cookies.set('token', token)
       this.setState({'token': token}, ()=>this.load_data())
   }

   is_authenticated() {
       return this.state.token !== ''
   }

   logout() {
       this.set_token('')
   }

   get_token_from_storage() {
       const cookies = new Cookies()
       const token = cookies.get('token')
       this.setState({'token': token}, ()=>this.load_data())
   }

   get_token(username, password) {
       axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
           .then(response => {
               this.set_token(response.data['token'])
           }).catch(error => alert('Неверный логин или пароль'))
   }

   get_headers() {
       let headers = {
           'Content-Type': 'application/json'
       }
       if (this.is_authenticated())
       {
           headers['Authorization'] = 'Token ' + this.state.token
       }
       return headers
   }

   load_data() {

       const headers = this.get_headers()
       // axios.get('http://127.0.0.1:8000/api/authors/', {headers})
       //     .then(response => {
       //         this.setState({authors: response.data})
       //     }).catch(error => console.log(error))
       // axios.get('http://127.0.0.1:8000/api/books/', {headers})
       //     .then(response => {
       //         this.setState({books: response.data})
       //     }).catch(error => {
       //         console.log(error)
       //     this.setState({books: []})
       //     })
       axios.get('http://127.0.0.1:8000/api/developers', {headers})
       .then(response => {
           const developers = response.data.results
               this.setState({'developers': developers})
       }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8000/api/projects', {headers})
       .then(response => {
           const projects = response.data.results
               this.setState({'projects': projects})
       }).catch(error => console.log(error))

       axios.get('http://127.0.0.1:8000/api/tasks', {headers})
       .then(response => {
           const todos = response.data.results
               this.setState({'todos': todos}
           )
       }).catch(error => console.log(error))
   }

   componentDidMount() {
       this.get_token_from_storage()
   }

   render () {
       return (
           <BrowserRouter>
               <div>
                   <div className="container-fluid">
                       <nav class="navbar navbar-expand-lg navbar-light bg-light">
                           <Menu />
                       </nav>
                       <div>
                           {this.is_authenticated() ? <button onClick={()=> this.logout()}>Logout</button> : <Link to='/login'><button>Login</button></Link>}
                       </div>
                   </div>


                   <div>
                       <Routes>
                           <Route path='/developers' element={<DeveloperList developers={this.state.developers}/>}/>} />
                           <Route path='/projects' element={<ProjectList projects={this.state.projects}/>}/>} />
                           <Route path='/tasks' element={<TodoList todos={this.state.todos}/>}/>} />
                           <Route path='/home' element={<Home/>}/>}/>} />
                           <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)}/>}/>
                           <Route component={NotFound404} />
                       </Routes>
                   </div>

                   <Footer />
               </div>
           </BrowserRouter>

       )
   }
}


export default App;