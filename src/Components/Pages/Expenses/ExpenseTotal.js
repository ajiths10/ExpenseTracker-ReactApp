import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { premiumActions } from "../../../store/PremiumBtn";
import "./ExpenseTotal.css";
import axios from "axios";

const ExpenseTotal = () => {
  const items = useSelector((state) => state.itemsData.itemList);
  const isPremium = useSelector((state) => state.premium.isPremium);
  const pActive = useSelector((state) => state.premium.preminumValue);
  const dispatch = useDispatch();
  let totalAmount = 0;

  const token = localStorage.getItem("JWTTOKEN");
  const userName = localStorage.getItem('username');
  const userEmail = localStorage.getItem('email');

  items.map((element) => {
    totalAmount += Number(element.amount);
  });

  // if () {
  //   dispatch(premiumActions.PremiumBtnActive());
  // } else {
  //   dispatch(premiumActions.PremiumBtnDeactive());
  // }

  const activatePreminum = () => {
    console.log("activate");
    dispatch(premiumActions.activatePremium()); 
  };

  const csvData = [...items];


  //RazorPay
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:7777/auth/api/payment",'',{ headers: { Authorization: token } });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.RAZORPAY_KEY_SECRET, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: userName,
      description: "Test Transaction",
      //image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:7777/auth/api/payment/sucess",
          data,
          { headers: { Authorization: token } }
        );
        activatePreminum()
        alert(result.data.msg);
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: "",
      },
      notes: {
        address: "",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="maindiv">
      <div>
        <h2>Total Expenses</h2>
      </div>
      <div className="amountdiv">
        <label>{totalAmount}.00 </label>
      </div>
      {true && (
        <div className="preminumDiv">
          <button className="preminumBTN" onClick={displayRazorpay}>
            {false ? "Premium Button." : "Buy Premium Features"}
          </button>
        </div>
      )}

      {pActive && (
        <div className="downloadBTnDiv">
          <CSVLink data={csvData}>
            <button className="downloadBTn"> 🡇 Download file</button>
          </CSVLink>{" "}
        </div>
      )}
    </div>
  );
};

export default ExpenseTotal;
