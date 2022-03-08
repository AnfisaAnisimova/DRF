import React from 'react'

const TodoItem = ({todo}) => {
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
               {todo.project}
           </td>
           <td>
               {todo.creator}
           </td>
       </tr>
   )
}

const TodoList = ({todos}) => {
   return (
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
           {todos.map((todo) => <TodoItem todo={todo} />)}
           </tbody>
       </table>
   )
}


export default TodoList