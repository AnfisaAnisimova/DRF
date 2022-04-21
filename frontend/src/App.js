import React from 'react';
import axios from 'axios';
import './App.css';
import DeveloperList from './components/Developer.js';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/Projects';
import TodoList from './components/ToDo';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import './bootstrap/css/bootstrap.css';
import Cookies from 'universal-cookie';
import LoginForm from "./components/Auth";
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";

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

   deleteProject(url) {
       const headers = this.get_headers()
       axios.delete(`${url}`, {headers})
           .then(response => {
               this.setState({projects: this.state.filter((item) => item.url !== url)})
           }).catch(error => console.log(error))
   }

   deleteToDo(url) {
       const headers = this.get_headers()
       axios.delete(`${url}`, {headers})
           .then(response => {
                this.setState({todos: this.state.todos})
            }).catch(error => console.log(error))
   }

   createProject(name, repo, developers) {
        const headers = this.get_headers()
        const data = {name: name, repo: repo, developers: developers}
       console.log(data)
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers: headers})
            .then(response => {
                let new_project = response.data
                new_project.developers = this.state.developers.filter((item) => item.url === new_project.developers)[0]
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
   }

   createToDo(text, project, creator) {
        const headers = this.get_headers()
        const data = {text: text, project: project, creator: creator}
       console.log(data)
        axios.post(`http://127.0.0.1:8000/api/tasks/`, data, {headers: headers})
            .then(response => {
                let new_todo = response.data
                new_todo.project = this.state.project.filter((item) => item.id === new_todo.project)[0]
                new_todo.creator = this.state.creator.filter((item) => item.url === new_todo.creator)[0]
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
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
                           <Route path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(url) => this.deleteProject(url)}/>}/>
                           <Route path='/projects/create' element={<ProjectForm all_developers={this.state.developers} createProject={(name, repo, developers) => this.createProject(name, repo, developers)}/>}/>
                           <Route path='/tasks' element={<TodoList todos={this.state.todos} deleteToDo={(url) => this.deleteToDo(url)}/>}/>
                           <Route path='/tasks/create' element={<ToDoForm projects={this.state.projects} developers={this.state.developers} createToDo={(text, project, creator) => this.createToDo (text, project, creator)} />}  />
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