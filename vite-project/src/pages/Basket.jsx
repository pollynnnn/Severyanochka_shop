import React, { useMemo, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import BasketCard, { defaultBasketItems } from "../components/BasketCard";

const Basket = () => {
    const [items, setItems] = useState(defaultBasketItems);

    const increment = (id) => {
        setItems((prev) => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
    };
    const decrement = (id) => {
        setItems((prev) => prev.map(i => i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i));
    };
    const toggleSelect = (id) => {
        setItems((prev) => prev.map(i => i.id === id ? { ...i, selected: !i.selected } : i));
    };

    const { totalCount, totalPrice, discount } = useMemo(() => {
        const selected = items.filter(i => i.selected && i.inStock);
        const count = selected.reduce((s, i) => s + i.quantity, 0);
        const price = selected.reduce((s, i) => s + i.price, 0);
        const old = selected.reduce((s, i) => s + (i.oldPrice || i.price), 0);
        const disc = old > price ? old - price : 0;
        return { totalCount: count, totalPrice: price, discount: disc };
    }, [items]);

    return(
        <>
        <div className="bas-main">
            <p>Главная <IoIosArrowForward /> Корзина </p>
            <h1>Корзина</h1>
            <div className="basket-container">
                <div className="basket-content">
                    <div className="basket-toolbar">
                        <label>
                            <input
                                type="checkbox"
                                checked={items.every(i => i.selected)}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setItems(prev => prev.map(i => ({ ...i, selected: checked })));
                                }}
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