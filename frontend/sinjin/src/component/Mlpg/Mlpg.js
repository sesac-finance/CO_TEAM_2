import Mlpgwidget from './Mlpg_widget/Mlpg_widget'
import Featured from './Mlpg_feature/Mlpg_feature'
import Chart from './Mlpg_chart/Mlpg_chart'
import Context from './Mlpg_context/Context'
import List from './Mlpg_table/Mlpg_table'
import Endcontext from './Mlpg_end/Mlpg_end'
import './mlpg.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Mlpg(){
    const [mlstartmoney, setMlstartmoney] = useState()
    const [mlrise, setMlrise] = useState()
    const [mlrisemoney, setMlrisemoney] = useState()
    const [mltotalmoney , setMltotalmoney] = useState()
    const [mllist , setMllist] =useState()
    const [mlgraph , setMlgraph] = useState()
    const [mlcont, setMlcont] = useState()


    useEffect(() => {
        if (!mlstartmoney) axios.get('http://localhost:4000/api/modelact/1')
        .then((res) => {
            setMlstartmoney(res.data.tot_mod_pri)
            setMlrise(res.data.tot_mod_rtr)
            setMlrisemoney(res.data.tot_mod_prf)
            setMltotalmoney(res.data.tot_mod_inv)
            // 투자비중은 샘플데이터 들어가면 하자
        })
    })
    useEffect(()=>{
        if (!mlgraph) axios.get('http://localhost:4000/api/modelprf/1')
        .then((res)=>{
            setMlgraph(res.data)
            console.log('그래프', res.data)
        })
         //모델수익률
    })
    useEffect(() => {
        if (!mllist) { axios.get('http://localhost:4000/api/modeltrs/1')
        .then((res) => {
            setMllist(res.data)
            console.log(res.data)
        })}
    })
    useEffect(()=>{
        if (!mlcont) { axios.get('http://localhost:4000/api/modelinfo/1')
        .then((res) => {
            setMlcont(res.data)
            console.log('부부',res.data)
        })}
    })
    return(
    <div>
    <div className='container'>
        <Context data={mlcont}/>
        <div className="widgets">
            <Mlpgwidget amount={mlstartmoney} diff={mlrise} type={'startmoney'}/>
            <Mlpgwidget amount={mlrisemoney} diff={mlrise} type={'rise'}/>
            <Mlpgwidget amount={mltotalmoney} diff={mlrise} type={'totalmoney'}/>
        </div>
            <div className='charts'>
                <Featured/>
                <Chart data={mlgraph} modPrf={mlrise} title="Last 6 Months (Revenue)" aspect={2 / 1}/>
            </div>
            <List rows={mllist} />
            <Endcontext/>
        </div>
    </div>
    )
}