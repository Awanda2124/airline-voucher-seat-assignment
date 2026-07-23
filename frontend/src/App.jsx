import { useEffect, useState } from "react";

import { getVouchers } from "./api/voucherApi";

import VoucherForm from "./components/VoucherForm";
import VoucherTable from "./components/VoucherTable";

import "./App.css";

function App() {
  const [vouchers, setVouchers] = useState([]);

  const loadVoucher = async () => {
    try {
      const data = await getVouchers();

      setVouchers(data.data ?? data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadVoucher();
  }, []);

  return (
    <div className="app">
      <div className="app-container">
        <header className="page-header">
          <h1 className="page-title">Airline Voucher Seat Assignment</h1>

          <p className="page-subtitle">
            Generate and manage crew seat vouchers for scheduled flights.
          </p>
        </header>

        <section className="card">
          <div className="card-header">
            <h2 className="card-title">Crew Information</h2>
          </div>

          <div className="card-body">
            <VoucherForm onSuccess={loadVoucher} />
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <h2 className="card-title">Voucher List</h2>
          </div>

          <div className="card-body">
            <VoucherTable vouchers={vouchers} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
