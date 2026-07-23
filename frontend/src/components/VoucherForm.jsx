import { useState } from "react";
import { checkVoucher, generateVoucher } from "../api/voucherApi";

function VoucherForm({ onSuccess }) {
    const [form, setForm] = useState({
        crewName: "",
        crewId: "",
        flightNumber: "",
        date: "",
        aircraft: "ATR",
    });

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [generatedSeats, setGeneratedSeats] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        const errorKey =
            name === "crewName" ? "name" : name === "crewId" ? "id" : name;

        setErrors((prev) => ({
            ...prev,
            [errorKey]: undefined,
        }));

        setGeneralError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("");
        setGeneratedSeats([]);

        const payload = {
            name: form.crewName,
            id: form.crewId,
            flightNumber: form.flightNumber,
            date: form.date,
            aircraft: form.aircraft,
        };

        let validationErrors = {};

        try {
            const check = await checkVoucher({
                flightNumber: form.flightNumber,
                date: form.date,
            });

            if (check.exists) {
                setGeneralError(
                    "Voucher sudah pernah dibuat untuk flight dan tanggal tersebut."
                );
                return;
            }
        } catch (err) {
            if (err.response?.data?.errors) {
                validationErrors = {
                    ...validationErrors,
                    ...err.response.data.errors,
                };
            } else {
                setGeneralError(
                    err.response?.data?.message || "Terjadi kesalahan."
                );
                return;
            }
        }

        try {
            const result = await generateVoucher(payload);

            setGeneratedSeats(result.seats);
            onSuccess();
            setForm({
                crewName: "",
                crewId: "",
                flightNumber: "",
                date: "",
                aircraft: "ATR",
            });
        } catch (err) {
            if (err.response?.data?.errors) {
                validationErrors = {
                    ...validationErrors,
                    ...err.response.data.errors,
                };
            } else {
                setGeneralError(
                    err.response?.data?.message || "Terjadi kesalahan."
                );
                return;
            }
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        }
    };

    return (
        <>
            <form className="voucher-form" onSubmit={handleSubmit}>
                {generalError && (
                    <div className="form-error-banner" role="alert">
                        {generalError}
                    </div>
                )}

                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label" htmlFor="crewName">
                            Crew Name
                        </label>
                        <input
                            id="crewName"
                            className="form-input"
                            name="crewName"
                            value={form.crewName}
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <small className="error-text">{errors.name[0]}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="crewId">
                            Crew ID
                        </label>
                        <input
                            id="crewId"
                            className="form-input"
                            name="crewId"
                            value={form.crewId}
                            onChange={handleChange}
                        />
                        {errors.id && (
                            <small className="error-text">{errors.id[0]}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="flightNumber">
                            Flight Number
                        </label>
                        <input
                            id="flightNumber"
                            className="form-input"
                            name="flightNumber"
                            value={form.flightNumber}
                            onChange={handleChange}
                        />
                        {errors.flightNumber && (
                            <small className="error-text">
                                {errors.flightNumber[0]}
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="date">
                            Flight Date
                        </label>
                        <input
                            id="date"
                            className="form-input"
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                        />
                        {errors.date && (
                            <small className="error-text">{errors.date[0]}</small>
                        )}
                    </div>

                    <div className="form-group form-group-full">
                        <label className="form-label" htmlFor="aircraft">
                            Aircraft Type
                        </label>
                        <select
                            id="aircraft"
                            className="form-select"
                            name="aircraft"
                            value={form.aircraft}
                            onChange={handleChange}
                        >
                            <option>ATR</option>
                            <option>Airbus 320</option>
                            <option>Boeing 737 Max</option>
                        </select>
                        {errors.aircraft && (
                            <small className="error-text">
                                {errors.aircraft[0]}
                            </small>
                        )}
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-primary" type="submit">
                        Generate Voucher
                    </button>
                </div>
            </form>

            {generatedSeats.length > 0 && (
                <div className="generated-seat-box">
                    <p className="success-label">Voucher generated successfully.</p>
                    <p className="seat-title">Generated Seats</p>
                    <p className="seat-list">{generatedSeats.join(" \u2022 ")}</p>
                </div>
            )}
        </>
    );
}

export default VoucherForm;
