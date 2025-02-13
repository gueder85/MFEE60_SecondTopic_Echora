"use client"

import './style.scss';
import '../_styles/nav.scss'
import "../_styles/globals.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';





export default async function CouponPage(props) {
  const [coupon, setCoupon] = useState([])
  // {

  //   id: 1,
  //   name: "夏日特惠",
  //   code: "matsu",
  //   typeId: 1,
  //   discount: 50,
  //   discountTypeId: 1,
  //   startTime: "2024-07-27T12:34:56.789Z",
  //   endTime: "2024-07-27T12:34:56.789Z",
  //   isDelete: false

  // }

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const url = 'http://localhost:3005/api/coupon'
        const res = await fetch(url);
        if(!res.ok) throw new Error('狀態錯誤') 
          const data = await res.json();
        console.log(data.data);
        setCoupon(data.data);
      }catch(err){
        console.log('發生錯誤',err);
      }
    }
    fetchData();
  },[])


  // 轉換時間格式
  const time = (time) => {
    const isoDateString = time;
    const date = new Date(isoDateString);

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const readableDate = date.toLocaleDateString('zh-TW', options); // 繁體中文

    // console.log(readableDate); 輸出：2024/7/27 （或 2024年7月27日，取決於地區設定）
    return readableDate;
  }

  // 領取提示
  const notifyAndGet = (itemName) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: '要領取優惠券嗎?',
      text: '優惠券將加入會員-我的優惠券',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確定',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '領取成功',
          text: `優惠券已領取`,
          icon: 'success',
        });

        // 進行領取

      }
    });
  };


  return (
    <>
      <div className="container-fluid">
        <main className="k-main">
          <div className="content ">
            <div className="title flex-column">
              <div>SPECIAL OFFER</div>
              <span>聖誕季優惠活動 LES系列9折優惠</span>
            </div>
            <div className="title flex-column">
              <h1 className="btn btn-outline-light">立即加入會員</h1>
              <h6>活動期間:2024/12/01 - 2025/01/31</h6>
            </div>
          </div>
        </main>

        <article className='k-article'>
          <div className="k-title">
            <h1 className='h1' aria-current="page" href="#">COUPONS / <span className='span'>會員優惠券專區</span></h1>
          </div>
          <div className="row row-cols-lg-4 row-cols-md-4 row-cols-sm-1 row-cols-xm-1 row-cols-xxm-1  ">

            <div className="col image-col">
              <div className=''></div>
              <button className='btn btn-dark' >領取</button>
            </div>
            <div className="col image-col">

              <div className=''></div>
              <button className='btn btn-dark'>領取</button>
            </div>
            <div className="col image-col">

              <div className=''></div>
              <button className='btn btn-dark'>領取</button>
            </div>

            <div className="col image-col">
              <div className=''>{coupon.name},
                優惠代碼:{coupon.code},
                折抵${coupon.discount} | 使用期間:{time(coupon.startTime)}~{time(coupon.endTime)}.
              </div>
              <button className='btn btn-dark' onClick={() => {
                alert('已領取')
              }}>領取</button>
            </div>
            {/* test */}
            <div>
              <h1>優惠券列表</h1>
              <ul>
                {coupon.map(item => (
                  <li key={item.id} id={item.id}>
                    <strong>{item.name}</strong><br></br> ${item.discount}<br></br>
                    <button className='btn btn-primary' onClick={()=>{
                      notifyAndGet(item.name)
                    }}>領取</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="k-btn">
            <button className="btn btn-outline-dark">全部領取</button>
          </div>
        </article>
        <hr />

      </div>

    </>
  )
}