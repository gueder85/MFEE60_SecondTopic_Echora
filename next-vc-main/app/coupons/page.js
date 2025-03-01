'use client'

import './style.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { useMyCoupon } from '@/hooks/use-coupon'
import { useAuth } from '@/hooks/use-auth'
// import { array } from 'prop-types'

export default function CouponPage() {
  const [coupon, setCoupon] = useState([])
  const [userCoupons, setUserCoupons] = useState([])
  const { notifyAndGet, notifyAndGetAll, time } = useMyCoupon()
  const { isAuth } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:3005/api/coupon'
        const res = await fetch(url)
        if (!res.ok) throw new Error('狀態錯誤')
        const data = await res.json()
        console.log(data.data)
        setCoupon(data.data)
      } catch (err) {
        console.log('發生錯誤', err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (isAuth) {
      fetchUserCoupon()
    }
  }, [isAuth])

  const fetchUserCoupon = async () => {
    const userId = localStorage.getItem('userId')
    console.log(userId)
    try {
      const url = `http://localhost:3005/api/coupon/${userId}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('狀態錯誤')
      const data = await res.json()
      console.log(data)
      setUserCoupons(data.data)
    } catch (err) {
      console.log('發生錯誤', err)
    }
    // fetchUserCoupon()
  }

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

        <article className="k-article">
          <div className="k-title">
            <h1 className="h1" aria-current="page" href="#">
              COUPONS / <span className="span">會員優惠券專區</span>
            </h1>
          </div>
          <div className="row row-cols-lg-4 row-cols-md-4 row-cols-sm-1 row-cols-xm-1 row-cols-xxm-1  ">
            {coupon.map((item) => (
              <li
                key={item.id}
                id={item.id}
                className=" col-lg-3 col-md-6 col-sm-12 col-xxl-3 image-col"
              >
                <div className="col">
                  <div className="text">
                    <div className="d-flex ">
                      <div className='h3'><b>{item.name}</b></div>
                      <div className='ms-3'>
                        {userCoupons
                          .map((v) => v.couponId)
                          .includes(item.id) ? (
                          <button
                            className="btn btn-secondary "
                            onClick={async () => {
                              await notifyAndGet(item.id, item.typeId)
                              await fetchUserCoupon()
                            }}
                          >
                            {userCoupons
                              .map((v) => v.couponId)
                              .includes(item.id)
                              ? '已領取'
                              : '領取'}
                          </button>
                        ) : (
                          <button
                            className="btn btn-dark "
                            onClick={async () => {
                              await notifyAndGet(item.id, item.typeId)
                              await fetchUserCoupon()
                            }}
                          >
                            {userCoupons
                              .map((v) => v.couponId)
                              .includes(item.id)
                              ? '已領取'
                              : '領取'}
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      使用時間:
                      <br />
                      {time(item.startTime)}~{time(item.endTime)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
          <div className="k-btn">
            <button
              className="btn btn-outline-dark"
              onClick={async () => {
                await notifyAndGetAll()
                await fetchUserCoupon()
              }}
            >
              全部領取
            </button>
          </div>
        </article>
      </div>
    </>
  )
}
