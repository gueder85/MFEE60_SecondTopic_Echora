'use client'

import '../_styles/member.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../_styles/style0.scss'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MemberLayout({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const params = useParams()
  const orderId = Number(params?.orderId)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const isActive = (path) => {
    return pathname === path ? 'active' : ''
  }

  const getPageTitle = () => {
    switch (pathname) {
      case '/my-user/profile':
        return '關於我'
      case '/my-user/order':
        return '我的訂單'
      case '/my-user/favorites':
        return '我的收藏'
      case '/my-user/coupons':
        return '我的優惠券'
      case '/my-user/profile-password':
        return '關於我'
      default:
        return '會員中心'
    }
  }

  return (
    <div>
      <main className="main">
        <div className="container">
          {/* <h2 className="page-title">{getPageTitle()}</h2> */}
          {/* <hr /> */}

          <div className="hamburger-member" id="hamburger-member">
            <div
              className="dropdown-content no-border"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              <h5 className="tab-link d-flex justify-content-between">
                <Link href={pathname}>
                  <span>{getPageTitle()}</span>
                  <i className="fa-solid fa-caret-down"></i>
                </Link>
              </h5>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content dropdown">
                <h5 className="tab-link" data-tab="orders">
                  <Link href="/my-user/profile"> 關於我</Link>
                </h5>
                <h5 className="tab-link" data-tab="orders">
                  <Link href="/my-user/order"> 我的訂單</Link>
                </h5>
                <h5 className="tab-link" data-tab="favorites">
                  <Link href="/my-user/favorites"> 我的收藏</Link>
                </h5>
                <Link
                  href="/my-user/coupons"
                  className="tab-link"
                  data-tab="coupons"
                >
                  我的優惠券
                </Link>
              </div>
            )}
          </div>

          <div className="content">
            <aside className="sidebar">
              <div className="sidebar-section">
                <h2 className={`sidebar-title ${isActive('/my-user/profile')}`}>
                  <Link href="/my-user/profile">個人資料</Link>
                </h2>
                <h2
                  className={`sidebar-title ${isActive(
                    '/my-user/profile-password'
                  )}`}
                >
                  <Link href="/my-user/profile-password">修改密碼</Link>
                </h2>
              </div>
              <div className="sidebar-section">
                <h2
                  className={`sidebar-title ${
                    isActive(`/my-user/order`) ||
                    isActive(`/my-user/order/${orderId}`)
                  }`}
                >
                  <Link href="/my-user/order"> 我的訂單</Link>
                </h2>
              </div>
              <div className="sidebar-section">
                <h2
                  className={`sidebar-title ${isActive('/my-user/favorites')}`}
                >
                  <Link href="/my-user/favorites"> 我的收藏</Link>
                </h2>
              </div>
              <div className="sidebar-section">
                <h2 className={`sidebar-title ${isActive('/my-user/coupons')}`}>
                  <Link href="/my-user/coupons"> 我的優惠券</Link>
                </h2>
              </div>
            </aside>
            <div className="profile-content">{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
