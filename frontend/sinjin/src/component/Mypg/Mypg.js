import Mypgwidget from "./Mypg_widget/Mypg_widget";
import Chart from "./Mypg_chart/Mypg_chart";
import Endcontext from "./Mypg_end/Mypg_end";
import "./mypg.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Mypg() {
  const [userid, setUserid] = useState();
  const [userstart, setUserstart] = useState();
  const [userrise, setUserrise] = useState();
  const [userrisemoney, setUserrisemoney] = useState();
  const [usertotal, setUsertotal] = useState();
  const [userdata, setUserdata] = useState();
  useEffect(() => {
    if (!userid) {
      axios({
        method: "get",
        url: "http://localhost:4000/accounts/user/",
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      }).then((res) => {
        setUserid(res.data.id);
      });
    } else {
    }
  });
  useEffect(() => {
    if (!usertotal && userid !== undefined) {
      axios({
        method: "get",
        url: "http://localhost:4000/api/useract/",
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      }).then((res) => {
        setUserstart(res.data.tot_cus_pri);
        setUserrisemoney(res.data.tot_cus_prf);
        setUserrise(res.data.tot_cus_rtr);
        setUsertotal(res.data.tot_cus_inv);
      });
    } else {
    }
  });
  useEffect(() => {
    if (!userdata && userid !== undefined) {
      axios({
        method: "get",
        url: "http://localhost:4000/api/userprf/",
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      }).then((res) => {
        setUserdata(res.data);
      });
    } else {
    }
  });
  return (
    <div>
      <div className="container">
        <div className="widgets">
          <Mypgwidget amount={userstart} diff={userrise} type={"startmoney"} />
          <Mypgwidget amount={userrisemoney} diff={userrise} type={"rise"} />
          <Mypgwidget amount={usertotal} diff={userrise} type={"totalmoney"} />
        </div>
        <div className="charts">
          <Chart
            data={userdata}
            title="Last 6 Months (Revenue)"
            aspect={2 / 1}
          />
        </div>
        <Endcontext />
      </div>
    </div>
  );
}
