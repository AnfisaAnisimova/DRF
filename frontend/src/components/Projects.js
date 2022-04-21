import React from 'react'
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
   return (
       <tr>
           <td>{project.name}</td>
           <td>{project.repo}</td>
           <td>><button onClick={() => deleteProject(project.url)} type='button'>Delete</button></td>
       </tr>
   )
}

const ProjectList = ({projects, deleteProject}) => {
   return (
       <div>
           <table>
               <thead>
               <tr>
                   <th>Project name</th>
                   <th>Repository</th>
                   <th></th>
               </tr>
               </thead>
               <tbody>
               {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
               </tbody>
           </table>
           <Link to='/projects/create'>Create</Link>
       </div>
   )
}


export default ProjectList