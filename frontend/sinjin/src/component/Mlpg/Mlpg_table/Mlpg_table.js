import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({ rows }) => {
  // const rows = [
  //   {
  //     id: 1143155,
  //     product: "Acer Nitro 5",
  //     customer: "John Smith",
  //     date: "1 March",
  //     amount: 785,
  //     method: "Cash on Delivery",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2235235,
  //     product: "Playstation 5",
  //     customer: "Michael Doe",
  //     date: "1 March",
  //     amount: 900,
  //     method: "Online Payment",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2342353,
  //     product: "Redragon S101",
  //     customer: "John Smith",
  //     date: "1 March",
  //     amount: 35,
  //     method: "Cash on Delivery",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2357741,
  //     product: "Razer Blade 15",
  //     customer: "Jane Smith",
  //     date: "1 March",
  //     amount: 920,
  //     method: "Online",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2342355,
  //     product: "ASUS ROG Strix",
  //     customer: "Harold Carol",
  //     date: "1 March",
  //     amount: 2000,
  //     method: "Online",
  //     status: "Pending",
  //   },
  // ];
  // cns_qty: 12;
  // id: 1;
  // iem_cd: 1345;
  // mod: 1;
  // ord_dt: "2022-12-03T00:00:00";
  // orr_pr: 14500;
  // sby_dit_cd: 1;
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">기업코드</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && Object.keys(rows).length >= 2
            ? rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">{row.iem_cd}</div>
                  </TableCell>
                  <TableCell className="tableCell">{row.ord_dt}</TableCell>
                  <TableCell className="tableCell">{row.cns_qty}</TableCell>
                  <TableCell className="tableCell">{row.orr_pr}</TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${row.sby_dit_cd===1 ?'Approved':'Pending'}`}>{row.sby_dit_cd===1 ?'매수':'매도'}</span>
                  </TableCell>
                </TableRow>
              ))
            : ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
