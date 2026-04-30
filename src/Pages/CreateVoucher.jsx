import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VoucherContext } from "../context/VoucherContext";

export default function CreateVoucher() {
  const navigate = useNavigate();
  const { addVoucher } = useContext(VoucherContext);

  const [voucherType, setVoucherType] = useState("Payment");
  const [narration, setNarration] = useState("On Account");

  const [rows, setRows] = useState([
    { account: "", amount: "", tdsApplicable: "No" }
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { account: "", amount: "", tdsApplicable: "No" }
    ]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const total = rows.reduce(
    (sum, row) => sum + Number(row.amount || 0),
    0
  );

  const handleSave = () => {
    const newVoucher = {
      date: new Date().toISOString().slice(0, 10),
      type: voucherType,
      narration,
      debit: voucherType === "Payment" ? total : 0,
      credit: voucherType === "Received" ? total : 0
    };

    addVoucher(newVoucher);
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h2>Create Voucher</h2>

      {/* Voucher Type */}
      <div style={{ marginBottom: "10px" }}>
        <label>Voucher Type: </label>
        <select
          value={voucherType}
          onChange={(e) => setVoucherType(e.target.value)}
        >
          <option>Payment</option>
          <option>Received</option>
        </select>
      </div>

      {/* Narration */}
      <div style={{ marginBottom: "10px" }}>
        <label>Narration: </label>
        <input
          value={narration}
          onFocus={() => setNarration("")}
          onChange={(e) => setNarration(e.target.value)}
        />
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Amount</th>
            <th>TDS</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>
                <input
                  value={row.account}
                  onChange={(e) =>
                    handleChange(i, "account", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={row.amount}
                  onChange={(e) =>
                    handleChange(i, "amount", e.target.value)
                  }
                />
              </td>

              <td>
                <select
                  value={row.tdsApplicable}
                  onChange={(e) =>
                    handleChange(i, "tdsApplicable", e.target.value)
                  }
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </td>

              <td>
                <button
                  className="btn btn-green"
                  onClick={addRow}
                >
                  +
                </button>

                <button
                  className="btn btn-red"
                  onClick={() => removeRow(i)}
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <h3 style={{ marginTop: "15px" }}>
        Total: {total}
      </h3>

      {/* Save Button */}
      <button
        className="btn btn-blue"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}