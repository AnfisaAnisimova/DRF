import React from 'react'


const ProjectItem = ({project}) => {
   return (
       <tr>
           <td>
               {project.name}
           </td>
           <td>
               {project.repo}
           </td>
       </tr>
   )
}

const ProjectList = ({projects}) => {
   return (
       <table>
           <thead>
           <tr>
               <th>Project name</th>
               <th>Repository</th>
           </tr>
           </thead>
           <tbody>
           {projects.map((project) => <ProjectItem project={project} />)}
           </tbody>
       </table>
   )
}


export default ProjectList