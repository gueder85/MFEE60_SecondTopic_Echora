'use client'
import './header.scss'

export default function Header() {
  return (
    <>
      <nav className="g-header px-modified">
        <div className="container-fluid">
          <div className="g-nav-top row">
            <div className="g-logo col-lg-4 col-6 order-1 ps-0">
              <img className="g-pc-logo" src="/images/header/logo.svg"/>
              <img className="g-mb-logo" src="/images/header/logo-mb.svg" />
            </div>
            <form
              action
              className="col-lg-4 col-12 order-lg-2 order-3 d-flex align-items-center  p-0 mt-lg-0 mt-3"
            >
              <input
                type="search"
                className="form-control focus-ring g-search-field"
                placeholder="搜尋商品關鍵字"
              />
            </form>
            <div className="g-right-menu d-flex gap-4 col-lg-4 col-6 order-2 d-flex justify-content-end align-items-center p-0">
              <a href>
                <img src="/images/header/heart.svg" />
              </a>
              <a href>
                <img src="/images/header/account.svg" />
              </a>
              <a href>
                <img src="/images/header/cart.svg" />
              </a>
              <a href className="hamburger">
                <img src="/images/header/hamburger.svg" />
              </a>
            </div>
          </div>
          <div className="g-nav-bottom">
            <ul className="d-flex justify-content-center gap-5 list-unstyled">
              <li>
                <a href>
                  <div className="d-flex">
                    <h6 className="h7">ELECTRIC GUITARS</h6>
                    <p className="px-1">/</p>
                    <p style={{ fontWeight: 500 }}>電吉他商品</p>
                  </div>
                </a>
              </li>
              <li>
                <a href>
                  <div className="d-flex">
                    <h6 className="h7">MUSIC FESTIVALS</h6>
                    <p className="px-1">/</p>
                    <p style={{ fontWeight: 500 }}>音樂活動</p>
                  </div>
                </a>
              </li>
              <li>
                <a href>
                  <div className="d-flex">
                    <h6 className="h7">RENTAL SERVICE</h6>
                    <p className="px-1">/</p>
                    <p style={{ fontWeight: 500 }}>商品租借</p>
                  </div>
                </a>
              </li>
              <li>
                <a href>
                  <div className="d-flex">
                    <h6 className="h7">SPECIAL EVENTS</h6>
                    <p className="px-1">/</p>
                    <p style={{ fontWeight: 500 }}>特別優惠</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
