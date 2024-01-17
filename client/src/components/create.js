import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
 const [form, setForm] = useState({
    name: "",
    address: "",
    size: "",
    });
 const navigate = useNavigate();
 // These methods will update the state properties.
 function updateForm(value) {
    return setForm((prev) => {
    return { ...prev, ...value };
   });
 }
  // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
   const newField = { ...form };
    await fetch("http://localhost:5001/fields/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newField),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
    setForm({ name: "", address: "", size: "" });
   navigate("/");
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Field</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="address">Address</label>
         <input
           type="text"
           className="form-control"
           id="address"
           value={form.address}
           onChange={(e) => updateForm({ address: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="size">Size</label>
         <input
           type="text"
           className="form-control"
           id="size"
           value={form.size}
           onChange={(e) => updateForm({ size: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create field"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}