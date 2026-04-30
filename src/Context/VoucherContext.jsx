import { createContext, useState } from "react";

export const VoucherContext = createContext();

export const VoucherProvider = ({ children }) => {
  const [vouchers, setVouchers] = useState([]);

  // CREATE
  const addVoucher = (voucher) => {
    setVouchers([...vouchers, voucher]);
  };

  // DELETE
  const deleteVoucher = (index) => {
    const updated = vouchers.filter((_, i) => i !== index);
    setVouchers(updated);
  };

  // UPDATE
  const updateVoucher = (index, updatedVoucher) => {
    const updated = [...vouchers];
    updated[index] = updatedVoucher;
    setVouchers(updated);
  };

  return (
    <VoucherContext.Provider
      value={{ vouchers, addVoucher, deleteVoucher, updateVoucher }}
    >
      {children}
    </VoucherContext.Provider>
  );
};