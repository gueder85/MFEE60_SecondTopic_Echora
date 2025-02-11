'use client'

import '../_styles/login_signup.scss'
import { useState } from 'react'
import { useUserRegister } from '@/services/rest-client/use-user'
import { useAuth } from '@/hooks/use-auth'

// newUser資料範例(物件) 註: name改為在profile資料表中
// {
//     "username":"ginny",
//     "password":"123456",
//     "name":"金妮",
//     "email":"ginny@test.com",
// }

export default function RegisterPage() {
  const { register } = useUserRegister()
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  })

  const { isAuth } = useAuth()

  // 輸入帳號 密碼用
  const handleFieldChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()
    // 檢查是否有登入，如果有登入就不能註冊
    if (isAuth) {
      toast.error('錯誤 - 會員已登入')
      return
    }

    const res = await register(userInput)
    const resData = await res.json()

    // console.log(resData)
    if (resData.status === 'success') {
      toast.success('資訊 - 會員註冊成功')
    } else {
      toast.error(`錯誤 - 註冊失敗: ${resData.message}`)
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="login-main">
          <span className="back"> &lt;返回 </span>
          <img
            src="../images/user/login.jpg"
            alt="Login page hero illustration"
            className="hero-image"
          />
          <form className="form-container">
            <div className="brand-container">
              <div className="logo-wrapper">
                <img
                  src="../images/user/Echora-logo.png"
                  alt="Echora brand logo"
                  className="brand-logo"
                />
              </div>
              <div className="brand-text">
                <div className="brand-name-en">Echora</div>
                <div className="brand-name-zh">• 拾光</div>
              </div>
            </div>
            <div className="login">創建帳戶</div>
            <div className="name-container">
              <div className="input-field-signup">
                <label htmlFor="last-name" className="visually-hidden">
                  姓氏
                </label>
                <input
                  type="text"
                  id="last-name"
                  className="form-input"
                  placeholder="姓氏"
                  required
                />
              </div>
              <div className="input-field-signup">
                <label htmlFor="first-name" className="visually-hidden">
                  名字
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="form-input"
                  placeholder="名字"
                  required
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="email" className="visually-hidden">
                電子郵件
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="電子郵件"
                required
                aria-label="電子郵件"
              />
            </div>
            <div className="input-field password-field">
              <label htmlFor="password" className="visually-hidden">
                密碼
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="密碼"
                required
                aria-label="密碼"
              />
              <button
                type="button"
                className="show-password"
                aria-label="顯示密碼"
              >
                <i className="bi bi-eye show-password-icon" />
              </button>
            </div>
            <a href="#" className="forgot-password">
              忘記密碼?
            </a>
            <button type="submit" className="login-button">
              繼續
            </button>
            <div className="social-login">
              {/* <button
        type="button"
        class="social-button"
        aria-label="使用 Apple 登入"
      >
        <i class="bi bi-apple social-icon"></i>
      </button> */}
              <button
                type="button"
                className="social-button"
                aria-label="使用 Google 登入"
              >
                <i className="bi bi-google social-icon"> 使用 Google 登入 </i>
              </button>
            </div>
            <div className="signup-prompt">
              已經有帳號?
              <span className="signup-link" tabIndex={0} role="button">
                登入
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
