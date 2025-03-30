import { useState, useEffect } from "react";

export const Pass = () => {
    const [passType, setPassType] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handlePayment = (type) => {
        setPassType(type);

        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded. Please refresh and try again.");
            return;
        }

        const passPrices = {
            "Daily": 5000,    // ₹50 in paise
            "Monthly": 50000, // ₹500 in paise
            "Yearly": 500000  // ₹5000 in paise
        };

        const options = {
            key: "rzp_test_a5Mdk9NZ5w5mUE", // Replace with your Razorpay test key
            amount: passPrices[type],
            currency: "INR",
            name: "Pass Purchase",
            description: `${type} Pass`,
            handler: function (response) {
                alert("Demo Payment Successful! Payment ID: " + response.razorpay_payment_id);
                setPaymentSuccess(true);
                printPass(type);
            },
            prefill: {
                name: "Test User",
                email: "test@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const printPass = (type) => {
        const passHTML = `
            <html>
            <head>
                <title>${type} Pass</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                    .pass-container { border: 2px solid black; padding: 20px; display: inline-block; }
                    h1 { color: #3399cc; }
                    p { font-size: 18px; }
                </style>
            </head>
            <body>
                <div class="pass-container">
                    <h1>${type} Pass</h1>
                    <p><strong>Validity:</strong> ${type === "Daily" ? "1 Day" : type === "Monthly" ? "30 Days" : "365 Days"}</p>
                    <p><strong>Price:</strong> ₹${type === "Daily" ? "50" : type === "Monthly" ? "500" : "5000"}</p>
                    <p><strong>Status:</strong> Active</p>
                </div>
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `;

        const newWindow = window.open("", "_blank");
        newWindow.document.write(passHTML);
        newWindow.document.close();
    };

    

    return (
        <div className="pass-container">
            <h1>Available Pass to Buy</h1>
            
            <div className="button-group">
                <button className="pass-button daily" onClick={() => handlePayment("Daily")}>Daily - ₹50</button>
                <button className="pass-button monthly" onClick={() => handlePayment("Monthly")}>Monthly - ₹500</button>
                <button className="pass-button yearly" onClick={() => handlePayment("Yearly")}>Yearly - ₹5000</button>
            </div>

        </div>
    );
};
