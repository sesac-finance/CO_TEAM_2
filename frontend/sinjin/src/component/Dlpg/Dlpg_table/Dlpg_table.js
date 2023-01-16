import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({rows}) => {

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell className="tableCell">ID</TableCell>
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
                  <TableCell className="tableCell">{row.id}</TableCell>
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