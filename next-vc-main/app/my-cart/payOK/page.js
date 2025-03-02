'use client'

import { useEffect } from 'react'
import { useMyCart } from '@/hooks/use-cart'
import { useSearchParams, useRouter } from 'next/navigation'
import { PuffLoader } from 'react-spinners'

export default function PayOKPage() {
  const { clearCart } = useMyCart()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('RtnMsg') == 'Succeeded') {
      const submitOrder = async () => {
        // 從 localStorage 讀取購物車資料
        const cartItems = localStorage.getItem('cartItem')
        const userData = localStorage.getItem('userData')

        const formData = new FormData()
        formData.append('userData', userData)
        formData.append('cartItems', cartItems)

        // 發送 POST 請求到後端 API 儲存資料
        try {
          const response = await fetch('http://localhost:3005/api/myOrders', {
            method: 'POST',
            body: formData,
          })

          if (response.ok) {
            clearCart()
            setTimeout(() => {
              router.replace('/my-cart/finish')
            }, 3000)
          } else {
            alert('訂單提交失敗！')
          }
        } catch (error) {
          console.error('錯誤:', error)
          alert('訂單提交過程中出現錯誤')
        }
      }
      submitOrder()
    }
  }, [])

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center pt-5 mt-5">
        <div className="mb-4">
          <PuffLoader color="#00b853" size={70} />
        </div>
        <div>
          <h4>確認付款中，請稍後...</h4>
        </div>
      </div>
    </>
  )
}
