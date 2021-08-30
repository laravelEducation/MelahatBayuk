import React,{useState,useEffect} from 'react';
import {inject,observer} from 'mobx-react';
import Layout from "../../Components/Layout/front.layout";
import {Bar,Line} from 'react-chartjs-2';
const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: 'Toplam Ürünler',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    }
};
const data2 = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
};

const options2 = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

    const Index = (props) =>{
    const [loading,setLoading]=useState(true);
        const [total,setTotal]=useState({
            customer:0,
            product:0,
            category:0,

        });

        useEffect(()=>{
    axios.post(`/api/home`,{},{
        headers:{
            Authorization:'Bearer ' + props.AuthStore.appState.user.access_token
        }
    }).then((res)=>{
        setTotal(res.data.total);
        setLoading(false);
    })
   }, [])

  return  (
      <Layout>
         <div className="container mt-5">
             <div className="row">
                 <div className=" col-md-3">
                    <div className="card-item">
                      <span>Toplam Hesaplar</span>
                        <div>
                            <span>{total.customer}</span>
                        </div>
                    </div>
                 </div>
                 <div className=" col-md-3">
                    <div className="card-item">
                         <span>Toplam Ürün</span>
                        <div>
                            <span>{total.product}</span>
                        </div>
                    </div>
                 </div>
                 <div className=" col-md-3">
                   <div className="card-item">
                       <span>Toplam Kategori</span>
                       <div>
                           <span>{total.category}</span>
                       </div>
                   </div>
                 </div>
             </div>
         <div className="row mt-5">
             <div className="col-md-6">
                 <Bar data={data} options={options} />

             </div>
             <div className="col-md-6">
                 <Line data={data2} options={options2} />

             </div>
         </div>


         </div>

      </Layout>
  )
};
export default inject("AuthStore")(observer(Index));
