import React, { useMemo } from "react";
import { IoIosArrowForward } from "react-icons/io";
import BasketCard from "../components/BasketCard";
import { useCart } from "../components/CartContext.jsx";

const Basket = () => {
    const { items, increment, decrement, toggleSelect, selectAll, totalCount, totalPrice, discount } = useCart();
    return(
        <>
        <div className="bas-main">
            <p>Главная <IoIosArrowForward /> Корзина </p>
            <h1>Корзина</h1>
            <div className="container basket-container">
                <div className="basket-content">
                    <div className="basket-toolbar">
                        <label>
                            <input
                                type="checkbox"
                                checked={items.length > 0 && items.every(i => i.selected)}
                                onChange={(e) => selectAll(e.target.checked)}
                            />
                            Выбрать всё
                        </label>
                        <button className="basket-remove">Удалить выбранные</button>
                    </div>

                    <BasketCard
                        items={items}
                        onIncrement={increment}
                        onDecrement={decrement}
                        onToggleSelect={toggleSelect}
                    />
                </div>

                <aside className="basket-summary">
                    <div className="summary-row">
                        <span>{totalCount} товара</span>
                        <span>{(totalPrice + discount).toFixed(2)} ₽</span>
                    </div>
                    <div className="summary-row">
                        <span>Скидка</span>
                        <span className={discount > 0 ? "summary-discount" : ""}>-{discount.toFixed(2)} ₽</span>
                    </div>
                    <div className="summary-divider" />
                    <div className="summary-total">
                        <span>Итог</span>
                        <span>{totalPrice.toFixed(2)} ₽</span>
                    </div>
                    <button className="summary-submit">Оформить заказ</button>
                </aside>
            </div>
        </div>
        </>
    )
}
export default Basket