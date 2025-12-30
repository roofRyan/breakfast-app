// src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import useCart from '../../hooks/useCart';

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="bg-blue-200 flex items-center justify-between p-4">
      {/* 左側品牌 */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-blue-800">
          🍳 早餐時光
        </Link>
      </div>

      {/* 中間導覽列 */}
      <nav className="navbar-center">
        <ul className="flex gap-4 text-blue-800">
          <li>
            <Link to="/">首頁</Link>
          </li>
          <li>
            <Link to="/menu">美味菜單</Link>
          </li>
          <li>
            <Link to="/about">關於我們</Link>
          </li>
        </ul>
      </nav>

      {/* 右側購物車 + 使用者選單 */}
      <div className="navbar-end flex items-center gap-4">
        <Link to="/cart" className="btn btn-ghost btn-circle text-blue-800">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {cartCount > 0 && (
              <span className="badge badge-sm indicator-item badge-blue-500">
                {cartCount}
              </span>
            )}
          </div>
        </Link>

        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
