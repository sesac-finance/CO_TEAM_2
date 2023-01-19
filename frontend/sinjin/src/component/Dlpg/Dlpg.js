import Dlpgwidget from './Dlpg_widget/Dlpg_widget'
import Featured from './Dlpg_feature/Dlpg_feature'
import Chart from './Dlpg_chart/Dlpg_chart'
import Context from './Dlpg_context/Context'
import List from './Dlpg_table/Dlpg_table'
import Endcontext from './Dlpg_end/Dlpg_end'
import './dlpg.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Dlpg(){
  const [dlstartmoney, setDlstartmoney] = useState()
    const [dlrise, setDlrise] = useState()
    const [dliemcheck, setDliemcheck] = useState()
    const [dliem, setDliem] = useState([{code:404044 , percent:1}])
    const [dlrisemoney, setDlrisemoney] = useState()
    const [dltotalmoney , setDltotalmoney] = useState()
    const [dllist , setDllist] =useState()
    const [dlgraph , setDlgraph] = useState()
    const [dlcont, setDlcont] = useState()


    useEffect(() => {
        if (!dlstartmoney) axios.get('http://3.35.49.211/api/modelact/2')
        .then((res) => {
            setDlstartmoney(res.data.tot_mod_pri)
            setDlrise(res.data.tot_mod_rtr)
            setDlrisemoney(res.data.tot_mod_prf)
            setDltotalmoney(res.data.tot_mod_inv)
            // 투자비중은 샘플데이터 들어가면 하자
        })
    },[])
    useEffect(() => {
        if (!dliemcheck){axios.get('http://3.35.49.211/api/moditem/2')
        .then((res) => {
            setDliem(res.data)
            setDliemcheck(res.data)
            console.log('ime : ',res.data)
        })}
    },[])
    useEffect(()=>{
        if (!dlgraph) axios.get('http://3.35.49.211/api/modelprf/2')
        .then((res)=>{
            setDlgraph(res.data)
            console.log('그래프', res.data)
        })
         //모델수익률
    },[])
    useEffect(() => {
        if (!dllist) { axios.get('http://3.35.49.211/api/modeltrs/2')
        .then((res) => {
            setDllist(res.data)
            console.log(res.data)
        })}
    },[])
    useEffect(()=>{
        if (!dlcont) { axios.get('http://3.35.49.211/api/modelinfo/2')
        .then((res) => {
            setDlcont(res.data)
            console.log('부부',res.data)
        })}
    },[])
    return(
    <div>
    <div className='container'>
      <Context data={dlcont}/>
        <div className="widgets">
            <Dlpgwidget amount={dlstartmoney} diff={dlrise} type={'startmoney'}/>
            <Dlpgwidget amount={dlrisemoney} diff={dlrise} type={'rise'}/>
            <Dlpgwidget amount={dltotalmoney} diff={dlrise} type={'totalmoney'}/>
        </div>
            <div className='charts'>
                <Featured data={dliem}/>
                <Chart data={dlgraph} modPrf={dlrise}  title="Last 6 Months (Revenue)" aspect={2 / 1}/>
            </div>
          <List rows={dllist}></List>
          <Endcontext/>
        </div>
    </div>
    )
}