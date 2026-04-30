import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { VoucherContext } from "../context/VoucherContext";

export default function EditVoucher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { vouchers, updateVoucher } = useContext(VoucherContext);

  const existing = vouchers[id];

  const [voucherType, setVoucherType] = useState(existing.type);
  const [narration, setNarration] = useState(existing.narration);

  const [amount, setAmount] = useState(
    existing.debit || existing.credit
  );

  const handleUpdate = () => {
    const updatedVoucher = {
      ...existing,
      type: voucherType,
      narration,
      debit: voucherType === "Payment" ? amount : 0,
      credit: voucherType === "Received" ? amount : 0
    };

    updateVoucher(id, updatedVoucher);

    alert("Updated Successfully"); // 🔥 toastr simple
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Voucher</h2>

      <select
        value={voucherType}
        onChange={(e) => setVoucherType(e.target.value)}
      >
        <option>Payment</option>
        <option>Received</option>
      </select>

      <input
        value={narration}
        onChange={(e) => setNarration(e.target.value)}
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}