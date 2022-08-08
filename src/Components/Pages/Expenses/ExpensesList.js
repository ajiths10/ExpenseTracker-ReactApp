import { useContext } from "react";
import axios from "axios";
import Context from "../../../Context/Context";
import "./ExpensesList.css";
import { useSnackbar } from "notistack";

const ExpensesList = (props) => {
  const CTX = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  const setAlert = (response) => {
    enqueueSnackbar(response.message, {
      variant: response.type === 1 ? "success" : "error",
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
      //   preventDuplicate: true,
    });
  };

  console.log("hiiiii", props);
  const deleteBtnHandler = async (event) => {
    const userId = localStorage.getItem("userID");
    const token = localStorage.getItem("JWTTOKEN");
    let data = { expenseId: props.id };
    try {
      const res = await axios.post(
        `http://localhost:7777/auth/api/deleteexpense`,
        data,
        { headers: { Authorization: token } }
      );
      console.log(res);
      setAlert(res.data);
      CTX.forReload();
    } catch (err) {
      console.log(`Some error ${err}`);
    }
  };

  const editBtnHandler = (event) => {
    event.preventDefault();

    CTX.editable(props);
  };

  return (
    <div className="maindivitems">
      <div className="maindivitemsh3">
        <h3>{props.description}</h3>
      </div>
      <div className="maindivitemsdis">
        <label> {props.category}</label>
      </div>
      <div className="moneyItemsdiv">
        <div className="moneyItemslabels">
          <label> {props.money} </label>
        </div>
        <div className="DeletebtnDiv">
          <button onClick={deleteBtnHandler} className="Deletebtn">
            X
          </button>
        </div>
        <div className="EditbtnDiv">
          <button onClick={editBtnHandler} className="Editbtn">
            ✎
          </button>
        </div>
      </div>
      <hr className="hrelementss"></hr>
    </div>
  );
};

export default ExpensesList;
