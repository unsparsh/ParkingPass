import { useState } from "react";
import { Pass } from "../components/Pass";
import { User } from "../components/User";
import { Vehicle } from "../components/Vehicle";
import "../components/styles.css";

function App() {
    const [users, setUsers] = useState(window.localStorage.getItem("USERS") ? JSON.parse(window.localStorage.getItem("USERS")): []); //  Initialize as an array[] to store the users
    //useState for storing Vehicles Data
    const [vehicles , setVehicles] = useState(window.localStorage.getItem("VEHICLES") ? JSON.parse(window.localStorage.getItem("VEHICLES")): []); //passing an empty array to store vehicle data

    return (
        <>
            <User users={users} setUsers={setUsers} />
            <Vehicle users={users} vehicles={vehicles} setVehicles={setVehicles} />
            <Pass />
        </>
    );
}

export default App;
