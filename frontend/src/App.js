import React from 'react';
import axios from 'axios';
import './App.css';
import DeveloperList from './components/Developer.js'
import Menu from "./components/Menu";
import Footer from "./components/Footer";


class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           'developers': []
       }
   }

   componentDidMount() {
   axios.get('http://127.0.0.1:8000/api/developers')
       .then(response => {
           const developers = response.data
               this.setState(
               {
                   'developers': developers
               }
           )
       }).catch(error => console.log(error))
   }

   render () {
       return (
           <div>
                <nav>
                    <Menu />
                </nav>
               <div>
                   <DeveloperList developers={this.state.developers} />
               </div>

               <Footer />

            </div>

       )
   }
}


export default App;