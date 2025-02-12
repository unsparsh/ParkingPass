import { useState } from "react";
import "../styles.css";

export const Vehicle = ({ vehicles, setVehicles, users }) => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [user, setUser] = useState("");
  const [selectedPass, setSelectedPass] = useState(null);

  const addVehicle = (e) => {
    e.preventDefault();
    const newVehicle = { vehicleNumber, vehicleType, user };

    setVehicles((prevVehicles) => {
      const updatedVehicles = [...prevVehicles, newVehicle];
      window.localStorage.setItem("VEHICLES", JSON.stringify(updatedVehicles));
      return updatedVehicles;
    });

    alert("Vehicle Successfully Registered");
    setVehicleNumber("");
    setVehicleType("");
    setUser("");
  };

  const prices = {
    bike: { daily: 10, monthly: 100, annually: 1000 },
    car: { daily: 50, monthly: 500, annually: 5000 },
  };

  const selectPass = (passType) => {
    if (!vehicleNumber || !vehicleType || !user) {
      alert("Please fill all fields before selecting a pass!");
      return;
    }

    const expiryDate = getExpiryDate(passType);

    setSelectedPass({
      vehicleNumber,
      owner: user,
      passType,
      price: prices[vehicleType][passType],
      expiryDate,
    });
  };

  const getExpiryDate = (passType) => {
    const today = new Date();
    if (passType === "daily") today.setDate(today.getDate() + 1);
    if (passType === "monthly") today.setMonth(today.getMonth() + 1);
    if (passType === "annually") today.setFullYear(today.getFullYear() + 1);
    return today.toDateString();
  };

  // Function to handle pass printing
const printPass = () => {
    const printContent = document.getElementById("pass-print-section");
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.outerHTML;
    window.print();
    document.body.innerHTML = originalContent;
};


  return (
    <>
      <hr />

      <div className="form-container">
        <h1>Vehicle Registration</h1>
        <form onSubmit={addVehicle}>
            {/* Your form fields */}
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

                {/* <input type="submit" value="Register Vehicle" /> */}
            </form>
        </form>
      </div>

      {vehicleType && (
        <div className="pass-container">
          <button
            type="button"
            className="pass-button"
            onClick={() => selectPass("daily")}
          >
            Daily Pass - ₹{prices[vehicleType].daily}
          </button>
          <button
            type="button"
            className="pass-button"
            onClick={() => selectPass("monthly")}
          >
            Monthly Pass - ₹{prices[vehicleType].monthly}
          </button>
          <button
            type="button"
            className="pass-button"
            onClick={() => selectPass("annually")}
          >
            Annual Pass - ₹{prices[vehicleType].annually}
          </button>
        </div>
      )}

      {selectedPass && (
        <div id="pass-print-section" className="pass-card">
          <h2>Vehicle Pass</h2>
          <p>
            <strong>Vehicle No:</strong> {selectedPass.vehicleNumber}
          </p>
          <p>
            <strong>Owner:</strong> {selectedPass.owner}
          </p>
          <p>
            <strong>Pass Type:</strong>{" "}
            {selectedPass.passType.charAt(0).toUpperCase() +
              selectedPass.passType.slice(1)}
          </p>
          <p>
            <strong>Price:</strong> ₹{selectedPass.price}
          </p>
          <p>
            <strong>Valid Until:</strong> {selectedPass.expiryDate}
          </p>
          <button onClick={printPass} className="print-button">
            Print Pass
          </button>
        </div>
      )}
    </>
  );
};
