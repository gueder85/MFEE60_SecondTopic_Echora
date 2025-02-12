'use client'

import './_styles/login_signup.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import useFirebase from './_hooks/use-firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useAuthGoogleLogin,
  useAuthGet,
  useAuthLogout,
  useAuthLogin,
} from '@/services/rest-client/use-user'

export default function UserPage() {
  // 輸入表單用的狀態
  const [userInput, setUserInput] = useState({ email: '', password: '' })

  // Firebase Google 登入
  const { loginGoogle, logoutFirebase } = useFirebase()
  const { googleLogin } = useAuthGoogleLogin()

  // 登入後設定全域的會員資料用
  const { mutate } = useAuthGet()
  const { login } = useAuthLogin()
  const { logout } = useAuthLogout()

  // 取得登入狀態
  const { isAuth } = useAuth()

  // 輸入帳號與密碼框用
  const handleFieldChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

  // **處理一般登入**
  const handleLogin = async () => {
    if (isAuth) {
      toast.error('錯誤 - 會員已登入')
      return
    }

    const res = await login(userInput)
    const resData = await res.json()

    if (resData?.status === 'success') {
      mutate()
      toast.success('已成功登入')
    } else {
      toast.error(`登入失敗`)
    }
  }

  // **處理 Google 登入**
  const handleGoogleLogin = () => {
    if (isAuth) {
      toast.error('錯誤 - 會員已登入')
      return
    }
    loginGoogle(async (providerData) => {
      console.log(providerData)

      const res = await googleLogin(providerData)
      const resData = await res.json()

      if (resData.status === 'success') {
        mutate()
        toast.success('已成功登入')
      } else {
        toast.error('Google 登入失敗')
      }
    })
  }

  // **處理登出（支援 Google + 一般帳號）**
  const handleLogout = async () => {
    logoutFirebase() // Google 登出 Firebase

    const res = await logout()
    const resData = await res.json()

    if (resData.status === 'success') {
      mutate()
      toast.success('已成功登出')
    } else {
      toast.error('登出失敗')
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="login-main">
          <Link href="/">
            <span className="back"> &lt;返回 </span>
          </Link>
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
            <div className="login">登入</div>
            <div className="input-field">
              <label htmlFor="email" className="visually-hidden">
                電子郵件
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={userInput.email}
                onChange={handleFieldChange}
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
                name="password"
                id="password"
                value={userInput.password}
                onChange={handleFieldChange}
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
            <button
              type="button"
              className="login-button"
              onClick={handleLogin}
            >
              登入
            </button>
            <div className="social-login">
              <button
                type="button"
                className="social-button"
                onClick={handleGoogleLogin}
                aria-label="使用 Google 登入"
              >
                <i className="fa-brands fa-google me-2"></i> 使用 Google 登入
              </button>
            </div>
            <div className="signup-prompt">
              沒有帳號?
              <span className="signup-link" tabIndex={0} role="button">
                <Link href="/my-user/register">註冊</Link>
              </span>
            </div>
          </form>
          {isAuth && (
            <button className="logout-button" onClick={handleLogout}>
              登出
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
