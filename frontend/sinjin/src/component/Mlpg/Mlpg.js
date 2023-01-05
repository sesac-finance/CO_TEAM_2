import Mlpgwidget from './Mlpg_widget/Mlpg_widget'
import Featured from './Mlpg_feature/Mlpg_feature'
import Chart from './Mlpg_chart/Mlpg_chart'
import Context from './Mlpg_context/Context'
import List from './Mlpg_table/Mlpg_table'
import Endcontext from './Mlpg_end/Mlpg_end'
import './mlpg.scss'

export default function Mlpg(){
    return(
    <div>
    <div className='container'>
        <Context/>
        <div className="widgets">
            <Mlpgwidget type={'startmoney'}/>
            <Mlpgwidget type={'rise'}/>
            <Mlpgwidget type={'totalmoney'}/>
        </div>
            <div className='charts'>
                <Featured/>
                <Chart title="Last 6 Months (Revenue)" aspect={2 / 1}/>
            </div>
            <List />
            <Endcontext/>
        </div>
    </div>
    )
}