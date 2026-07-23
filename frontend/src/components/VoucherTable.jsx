function VoucherTable({ vouchers }) {
    if (vouchers.length === 0)
        return <p className="empty-state">Belum ada voucher.</p>;

    return (
        <div className="table-wrapper">
            <table className="voucher-table">
                <thead>
                    <tr>
                        <th>Crew</th>
                        <th>Crew ID</th>
                        <th>Flight</th>
                        <th>Date</th>
                        <th>Aircraft</th>
                        <th>Seats</th>
                    </tr>
                </thead>

                <tbody>
                    {vouchers.map((voucher) => (
                        <tr key={voucher.id}>
                            <td>{voucher.crewName}</td>
                            <td>{voucher.crewId}</td>
                            <td>{voucher.flightNumber}</td>
                            <td>{voucher.date}</td>
                            <td>{voucher.aircraft}</td>
                            <td className="seats-cell">
                                {voucher.seats.join(", ")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VoucherTable;
