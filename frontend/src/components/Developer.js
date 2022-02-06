import React from 'react'


const DeveloperItem = ({developer}) => {
   return (
       <tr>
           <td>
               {developer.first_name}
           </td>
           <td>
               {developer.last_name}
           </td>
           <td>
               {developer.username}
           </td>
           <td>
               {developer.email}
           </td>
       </tr>
   )
}

const DeveloperList = ({developers}) => {
   return (
       <table>
           <th>
               First name
           </th>
           <th>
               Last Name
           </th>
           <th>
               Username
           </th>
           <th>
               Email
           </th>
           {developers.map((developer) => <DeveloperItem developer={developer} />)}
       </table>
   )
}


export default DeveloperList