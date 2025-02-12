import { useState } from "react";

export const User = ({ users, setUsers }) => {
    const [name, setName] = useState(""); 
    const [contact, setContact] = useState(""); 
    const [role, setRole] = useState(""); 

    const addUser = (e) => {
        e.preventDefault();
        
        // Save user details in localStorage and state
        setUsers(prevUsers => {
            window.localStorage.setItem("USERS" , JSON.stringify([...prevUsers, { name, contact, role }]));
            return [...prevUsers, { name, contact, role }];
        });

        alert("User Successfully Added");
        setName(""); 
        setContact("");
        setRole("");
    };

    return (
        <div className="form-container">
            <h1>User Registration</h1>
            <form className="user" onSubmit={addUser}>
                <input 
                    type="text" 
                    placeholder="Name*" 
                    required 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                /> 
                <br />

                <input 
                    type="text" 
                    inputMode="numeric"  
                    placeholder="Phone Number*" 
                    required 
                    pattern="[0-9]{10}" 
                    maxLength="10"  
                    value={contact}  
                    onChange={e => setContact(e.target.value.replace(/\D/g, ''))} 
                />
                <br />

                <select 
                    name="role" 
                    id="role" 
                    value={role} 
                    onChange={e => setRole(e.target.value)}
                    required
                >
                    <option value="" disabled> -- Select Role --</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>
                <br /><br />

                <input type="submit" value="Register" />
            </form>
        </div>
    );
};
