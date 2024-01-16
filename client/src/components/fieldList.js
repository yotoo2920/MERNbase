import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Field = (props) => (
 <tr>
   <td>{props.field.name}</td>
   <td>{props.field.address}</td>
   <td>{props.field.size}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.field._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deletefield(props.field._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
export default function FieldList() {
 const [fields, setFields] = useState([]);
  // This method fetches the fields from the database.
 useEffect(() => {
   async function getFields() {
     const response = await fetch(`http://localhost:5000/field/`);
      if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const fields = await response.json();
     setFields(fields);
   }
    getFields();
    return;
 }, [fields.length]);
  // This method will delete a field
 async function deleteField(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
    const newFields = fields.filter((el) => el._id !== id);
   setFields(newFields);
 }
  // This method will map out the fields on the table
 function fieldList() {
   return fields.map((field) => {
     return (
       <Field
         field={field}
         deleteField={() => deleteField(field._id)}
         key={field._id}
       />
     );
   });
 }
  // This following section will display the table with the fields.
 return (
   <div>
     <h3>Field List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Address</th>
           <th>Size</th>
         </tr>
       </thead>
       <tbody>{fieldList()}</tbody>
     </table>
   </div>
 );
}