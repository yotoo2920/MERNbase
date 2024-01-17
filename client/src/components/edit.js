import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
	const [form, setForm] = useState({
		name: "",
		address: "",
		size: "",
		fields: [],
	});
	const params = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchData() {
			const id = params.id.toString();
			const response = await fetch(`http://localhost:5001/fields/${params.id.toString()}`);
			if (!response.ok) {
				const message = `An error has occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}
			const field = await response.json();
			if (!field) {
				window.alert(`Field with id ${id} not found`);
				navigate("/");
				return;
			}
			setForm(field);
		}
		fetchData();
		return;
	}, [params.id, navigate]);
	// These methods will update the state properties.
	function updateForm(value) {
	return setForm((prev) => {
		return { ...prev, ...value };
	});
	}
	async function onSubmit(e) {
	e.preventDefault();
	const editedField = {
		name: form.name,
		address: form.address,
		size: form.size,
	};
		// This will send a post request to update the data in the database.
	await fetch(`http://localhost:3000/update/${params.id}`, {
		method: "POST",
		body: JSON.stringify(editedField),
		headers: {
		'Content-Type': 'application/json'
		},
	});
	navigate("/");
 }
  // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
	 <h3>Update Field</h3>
	 <form onSubmit={onSubmit}>
	   <div className="form-group">
		 <label htmlFor="name">Name: </label>
		 <input
		   type="text"
		   className="form-control"
		   id="name"
		   value={form.name}
		   onChange={(e) => updateForm({ name: e.target.value })}
		 />
	   </div>
	   <div className="form-group">
		 <label htmlFor="address">Address: </label>
		 <input
		   type="text"
		   className="form-control"
		   id="address"
		   value={form.address}
		   onChange={(e) => updateForm({ address: e.target.value })}
		 />
	   </div>
	   <div className="form-group">
		 <label htmlFor="size">Size: </label>
		 <input
		   type="text"
		   className="form-control"
		   id="size"
		   value={form.size}
		   onChange={(e) => updateForm({ size: e.target.value })}
		 />
	   </div>
	   <br />
 
	   <div className="form-group">
		 <input
		   type="submit"
		   value="Update Record"
		   className="btn btn-primary"
		 />
	   </div>
	 </form>
   </div>
 );
}