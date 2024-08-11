import React, { useEffect, useRef, useState } from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS,LinearScale,PointElement,LineElement,Filler,Tooltip,Legend,CategoryScale} from 'chart.js'
import { monthlyBooking, yearlyBooking } from '../../api/adminApi'

ChartJS.register(LinearScale,PointElement,LineElement,Filler,Tooltip,Legend,CategoryScale)


interface chartData{
    labels:string[];
    datasets:{
        label:string;
        data:number[];
        fill:boolean;
        borderColor:string;
        tension:number
    }[]
}
const Chart = () =>{
    const chartRef = useRef();
    const chartRef2 = useRef()
    const [Data,setData] = useState<chartData>({labels:[],datasets:[]})
    const [yearlydata,setyearlyData] = useState<chartData>({labels:[],datasets:[]})
    const label1 = ['January','February','March','April','May','June','July','August','September','october','November','December']
    const monthnum = [1,2,3,4,5,6,7,8,9,10,11,12]
    const [monthValue,setMonthValue] = useState<number[]>([])
    useEffect(()=>{
        const chartInstance:any = chartRef.current;
        async function  monthlybooking(){
            const response = await monthlyBooking()
            const monthlybookings = response?.data.monthlyData
            const labels:any = monthlybookings.map((b:any )=> `${label1[b.month]}`)
         let monthDataArray: number[] = Array(12).fill(0)
            const bookingCounts = monthlybookings.forEach((b:any,index:number)=>{
                if (monthnum.includes(b.month)) {
                    monthDataArray[b.month - 1] = b.total; 
                }
            })            
        setData({
            labels:label1,
            datasets:[{
                label:'Bookings per month',
                data:monthDataArray,
                fill:false,
                borderColor:'rgb(22, 163, 74)',
                tension:0.1,
            }]
        })
        }
        monthlybooking()
        return () => {
            if (chartInstance) {
                chartInstance?.destroy();
            }
        };
    },[])

    useEffect(()=>{
        const chartInstance2:any = chartRef2.current
        console.log("fetch yearlyyy")
        async function fetchyearly(){
            const response = await yearlyBooking()
            console.log("res is",response)
            console.log(response?.data.yearlydata)
            const yearlyData = response?.data.yearlydata
            const curryear = new Date().getFullYear()
            let yearArr:any = []
            let yearlyDataArray = new Array(10)
            for(let  i = 9;i>=0;i--){
                yearArr.push(curryear - i)
            }
            console.log("yA",yearArr)
            yearlyData.forEach((yearly:any,index:number)=>{
                if(index == yearArr.length-1){
                    return 
                }else{
                    if(yearArr.includes(yearly.year)){
                        yearlyDataArray[yearArr.indexOf(yearly.year)] = yearly.total
                    }
                }
            })
            console.log("label",yearArr)
            console.log("data",yearlyDataArray)
            setyearlyData({
                labels:yearArr,
                datasets:[{
                    label:'Bookings per Year',
                    data:yearlyDataArray,
                    fill:false,
                    borderColor:'rgb(22, 163, 74)',
                    tension:0.1,
                }]
            })
        }
        fetchyearly()
        return () => {
            if (chartInstance2) {
                chartInstance2?.destroy();
            }
        };
    },[])
    const config = {
        type:'line',
        data:Data
    }
    const config2 = {
        type:'line',
        data:yearlydata
    }

    return (
       <div className='flex flex-col '>
          <div className='w-[70%] h-[60%] ms-24'>
            {
             <Line ref={chartRef} {...config} /> 
            }
        </div>
         <div className='p-10 w-[70%] h-[60%] ms-24'>
         {
          <Line ref={chartRef2} {...config2} /> 
         }
     </div>
     </div>
      
    )
}

export default Chart

