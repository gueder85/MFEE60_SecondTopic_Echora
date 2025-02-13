import express from 'express'
import db from '../config/mysql.js'
import multer from 'multer'

const router = express.Router()
const upload = multer()

// POST /api/myOrders
router.post('/', upload.none(), async function (req, res) {
  // 從 req.body 取得前端送來的資料
  const userData = JSON.parse(req.body.userData)
  // const cartItems = JSON.parse(req.body.cartItems)
  // const { id, name, color, stockStatus, image, price, count } = cartItems
  const {
    city,
    country,
    address,
    recipient,
    phone,
    email,
    shippingMethod,
    paymentMethod,
  } = userData
  // 組合配送地址
  const shippingAddress = `${city}${country}${address}`
  // 計算訂單總金額
  //   const totalAmount = req.body.reduce(
  //     (sum, item) => sum + item.price * item.quantity,
  //     0
  //   )
  // 產生訂單編號（使用時間戳）
  // const orderNumber = `ORD-${Date.now()}`

  try {
    // 插入 orders 表格（修正後的 SQL 語句）
    const sql =
      'INSERT INTO `myorder` (`shippingAddress`,`recipient`,`phone`,`email`,`shippingMethod`,`paymentMethod`) VALUES (?,?,?,?,?,?)'

    const result = await db.execute(sql, [
      // orderNumber,
      shippingAddress,
      recipient,
      phone,
      email,
      shippingMethod,
      paymentMethod,
    ])
    console.log(result)

    return res.json({ status: 'success', message: '新增訂單成功' })
  } catch (error) {
    console.error('order:', error)
  }
})

export default router
