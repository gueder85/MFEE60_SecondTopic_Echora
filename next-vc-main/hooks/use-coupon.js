
// POST /api/users/:userId/coupons
import { createContext, useContext, useState, useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const CouponContext = createContext(null)

// 設定displayName可以在瀏覽器的react devtools上看到名稱，有助於除錯
CouponContext.displayName = 'CouponContext'

export function MyCouponProvider({ children }) {

  // 錯誤物件
  const [error, setError] = useState(null);

  const claimCoupon = async (userId, couponId) => {

    try {
      // http://localhost:3005/api/coupon/resource
      const res = await fetch(`http://localhost:3005/api/coupon/100/100`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, couponId: couponId })
      })

      const data = await res.json();

      console.log(data);
      return data;
    } catch (err) {
      setError(err.message)
      console.log(err.message);
      return { status: 'fail' }

    }
  }

  // 領取提示
  const notifyAndGet = async (itemId) => {
    const MySwal = withReactContent(Swal)
    try {
      const result = await MySwal.fire({
        title: '要領取優惠券嗎?',
        text: '優惠券將加入會員-我的優惠券',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消',
        confirmButtonText: '確定',
      })
      if (result.isConfirmed) {
        // 進行領取
        const res = await claimCoupon(100, itemId)
        console.log(res);
        // callback()

        if (res.status == 'fail') {
          MySwal.fire({
            title: '無法領取',
            text: `已經擁有優惠券`,
            icon: 'notice',
          })
        } else {
          MySwal.fire({
            title: '領取成功',
            text: `優惠券已領取`,
            icon: 'success',
          })
        }
      }
    } catch (err) {
      console.error("領取優惠券時發生錯誤:", err);
      setError(err.message);
      MySwal.fire({
        title: '領取失敗',
        text: `領取優惠券時發生錯誤: ${err.message}`,
        icon: 'error',
      })
    }

  }



  return (
    <CouponContext.Provider value={{ claimCoupon, notifyAndGet }}>
      {children}
    </CouponContext.Provider>
  )
}

export const useMyCoupon = () => useContext(CouponContext)