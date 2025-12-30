// src/pages/Menu.jsx
import React, { useState } from 'react'; // 引入 useState
import useMenu from '../hooks/useMenu';
import { formatCurrency } from '../utils/helpers';
import { useUser } from '@clerk/clerk-react'; 
import useCart from '../hooks/useCart';
const Menu = () => {
  // 一行程式碼，搞定資料獲取的所有複雜邏輯！
  const { menuItems, isLoading, error } = useMenu();
  const { isSignedIn } = useUser(); // 取得登入狀態
  const { addToCart } = useCart();

  const [isAdding, setIsAdding] = useState(null); // 追蹤哪個商品正在被加入
  const [feedback, setFeedback] = useState(null); // 顯示成功或失敗訊息

  const handleAddToCart = async (item) => {
    if (isAdding) return; // 防止重複點擊

    setIsAdding(item.id);
    setFeedback(null);
    try {
      await addToCart({
      ...item,
      id: Number(item.id), // 🔥 關鍵修正
    });
      setFeedback({ type: 'success', message: `${item.name} 已加入購物車！` });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || '加入失敗，請稍後再試' });
    } finally {
      setIsAdding(null);
      // 設定一個計時器，幾秒後自動隱藏提示訊息
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  // 處理載入中的情況
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  // 處理發生錯誤的情況
  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <span>載入菜單資料時發生錯誤：{error}</span>
      </div>
    );
  }

  // 成功獲取資料，渲染菜單列表
  return (
    <div className="space-y-12">
      {/* 增加一個顯示提示訊息的區塊 */}
      {feedback && (
        <div className={`alert ${feedback.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          <span>{feedback.message}</span>
        </div>
      )}
      <section>
        <h1 className="text-3xl font-bold mb-6">美味菜單</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.description}</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(item.price)}
                </p>
                <div className="card-actions justify-end">
                {/* 根據登入狀態決定按鈕的行為和外觀 */}
                <button
                className="btn btn-primary"
                disabled={!isSignedIn}
                onClick={() => handleAddToCart(item)} //  呼叫 handleAddToCart
              >
                {isAdding === item.id ? (
                  <span className="loading loading-spinner"></span>
                ) : isSignedIn ? ("加入購物車") : ("請先登入")}
              </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;