import React from 'react'
import {Link} from "react-router-dom";

const TodoItem = ({todo, deleteToDo}) => {
    let status;
    if (todo.active) {
        status = 'Active'
    } else {
        status = 'Closed'
    }

   return (
       <tr>
           <td>
               {todo.text}
           </td>
           <td>
               {todo.created_at}
           </td>
           <td>
               {todo.updated_at}
           </td>
           <td>
               {status}
           </td>
           <td>
               {todo.project.name}
           </td>
           <td>
               {todo.creator.first_name} {todo.creator.last_name}
           </td>
           <td>><button onClick={() => deleteToDo(todo.url)} type='button'>Delete</button></td>
       </tr>
   )
}

const TodoList = ({todos, deleteToDo}) => {
   return (
       <div>
           <table>
               <thead>
               <tr>
                   <th>Text</th>
                   <th>Created at</th>
                   <th>Updated_at</th>
                   <th>Active</th>
                   <th>Project</th>
                   <th>Creator</th>
               </tr>
               </thead>
               <tbody>
               {todos.map((todo) => <TodoItem todo={todo} deleteToDo={deleteToDo}/>)}
               </tbody>
           </table>
           <Link to='/tasks/create' className='btn btn-primary'>Create</Link>
       </div>
   )
}


export default TodoList