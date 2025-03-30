import { useState } from "react";
import "../styles.css";

export const Vehicle = ({ vehicles, setVehicles, users }) => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [user, setUser] = useState("");

  const addVehicle = (e) => {
    e.preventDefault();

    if (!vehicleNumber || !vehicleType || !user) {
      alert("Please fill all fields before registering!");
      return;
    }

    const newVehicle = { vehicleNumber, vehicleType, user };

    setVehicles((prevVehicles) => {
      const updatedVehicles = [...prevVehicles, newVehicle];
      window.localStorage.setItem("VEHICLES", JSON.stringify(updatedVehicles));
      return updatedVehicles;
    });

    alert("Vehicle Successfully Registered ✅");
    setVehicleNumber("");
    setVehicleType("");
    setUser("");
  };

  return (
    <>
      <hr />

      <div className="form-container">
        <h1>Vehicle Registration 🚗</h1>
        <form onSubmit={addVehicle}>
          <input
            type="text"
            placeholder="Vehicle Number*"
            pattern="^[A-Z]{2}[- ]?[0-9]{2}[- ]?[A-Z]{2,3}[- ]?[0-9]{4}$"
            title="Enter a valid Indian vehicle number (e.g., MH12AB1234, KA-01-AA-5678, HR 26 BH 6789)"
            required
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
          />
          <br />

          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="" disabled>-- Select Vehicle Type --</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </select>
          <br />

          <select
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          >
            <option value="" disabled>-- Select User --</option>
            {users.length > 0 ? (
              users.map((user, index) => (
                <option key={index} value={user.name}>
                  {user.name} ({user.role})
                </option>
              ))
            ) : (
              <option value="" disabled>No Users Available</option>
            )}
          </select>
          <br /><br />

          <button type="submit" className="register-button">Register Vehicle</button>
        </form>
      </div>

      <hr />
    </>
  );
};
