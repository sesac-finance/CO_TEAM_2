import Dlpgwidget from './Dlpg_widget/Dlpg_widget'
import Featured from './Dlpg_feature/Dlpg_feature'
import Chart from './Dlpg_chart/Dlpg_chart'
import Context from './Dlpg_context/Context'
import List from './Dlpg_table/Dlpg_table'
import Endcontext from './Dlpg_end/Dlpg_end'
import './dlpg.scss'

export default function Dlpg(){
    return(
    <div>
    <div className='container'>
      <Context/>
        <div className="widgets">
            <Dlpgwidget type={'startmoney'}/>
            <Dlpgwidget type={'rise'}/>
            <Dlpgwidget type={'totalmoney'}/>
        </div>
            <div className='charts'>
                <Featured/>
                <Chart title="Last 6 Months (Revenue)" aspect={2 / 1}/>
            </div>
          <List></List>
          <Endcontext/>
        </div>
    </div>
    )
}