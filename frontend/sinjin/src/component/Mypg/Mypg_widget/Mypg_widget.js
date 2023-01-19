import "./mypg_widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PercentIcon from "@mui/icons-material/Percent";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Mypgwidget({ type, amount , diff}) {
  let data;
  switch (type) {
    case "startmoney":
      data = {
        title: "순자산",
        ismoney: true,
        link: "See all users",
        icon: <AccessibilityNewIcon className="icon" />,
      };
      break;
    case "rise":
      data = {
        title: "수익금",
        ismoney: false,
        link: "View net earnings",
        icon: <PercentIcon className="icon" />,
      };
      break;
    case "totalmoney":
      data = {
        title: "총 투자자산",
        ismoney: true,
        link: "See details",
        icon: <AccountBalanceIcon className="icon" />,
      };
      break;
    default:
      break;
  }

  return (
    <div className="totalwidget">
      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">
            {data.ismoney && "₩"}
            {amount}
          </span>
        </div>
        <div className="right">
        {diff > 0 
          ?(
          <div className='percentage positive'>
            <KeyboardArrowUpIcon />
            {diff} %
          </div>
          ):(
            <div className='percentage negative'>
            <KeyboardArrowDownIcon />
            {diff} %
          </div>
          )
        }
        </div>
      </div>
    </div>
  );
}
