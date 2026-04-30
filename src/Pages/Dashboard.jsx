import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { VoucherContext } from "../context/VoucherContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { vouchers, deleteVoucher } = useContext(VoucherContext);
  const navigate = useNavigate();

  return (
    <div className="container">

      <div className="header">
        <h2>Voucher List</h2>

        <div>
          <button
            className="btn btn-green"
            onClick={() => navigate("/create")}
          >
            + Create Voucher
          </button>

          <button
            className="btn btn-red"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Narration</th>
            <th>Debit</th>
            <th>Credit</th>
            {user?.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {vouchers.map((item, i) => (
            <tr key={i}>
              <td>{item.date}</td>
              <td>{item.type}</td>
              <td>{item.narration}</td>
              <td>{item.debit}</td>
              <td>{item.credit}</td>

              {user?.role === "admin" && (
                <td>
                  <button
                    className="btn btn-blue"
                    onClick={() => navigate(`/edit/${i}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-red"
                    onClick={() => deleteVoucher(i)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}