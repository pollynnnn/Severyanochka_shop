import React from "react";
import product1 from "../assets/product1.png";

export const defaultBasketItems = [
  {
    id: "p1",
    title: "Комбайн КСЗ-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
    price: 89.0,
    oldPrice: 0,
    unitPrice: 44.5,
    quantity: 2,
    selected: true,
    discountPercent: 0,
    inStock: true,
    image: product1,
  },
  {
    id: "p2",
    title: "Комбайн КСЗ-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
    price: 80.1,
    oldPrice: 89.0,
    unitPrice: 44.5,
    quantity: 2,
    selected: true,
    discountPercent: 10,
    inStock: true,
    image: product1,
  },
  {
    id: "p3",
    title: "Комбайн КСЗ-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
    price: 89.0,
    oldPrice: 0,
    unitPrice: 44.5,
    quantity: 2,
    selected: true,
    discountPercent: 0,
    inStock: true,
    image: product1,
  },
  {
    id: "p4",
    title: "Комбайн КСЗ-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
    price: 44.5,
    oldPrice: 0,
    unitPrice: 44.5,
    quantity: 1,
    selected: false,
    discountPercent: 0,
    inStock: false,
    image: product1,
  },
];

const BasketCard = ({
  items,
  onIncrement,
  onDecrement,
  onToggleSelect,
}) => {
  const list = items || defaultBasketItems;

  return (
    <div className="basket-list">
      {list.map((item) => (
        <div key={item.id} className={`basket-card ${item.inStock ? "" : "disabled"}`}>
          <div className="basket-left">
            <input
              type="checkbox"
              checked={!!item.selected}
              onChange={() => onToggleSelect && onToggleSelect(item.id)}
            />
            <img src={item.image} alt={item.title} className="basket-img" />
            <div className="basket-info">
              <p className="basket-title">{item.title}</p>
              {item.inStock ? (
                <p className="basket-unit">{item.unitPrice.toFixed(2)} ₽ за шт.</p>
              ) : (
                <p className="basket-out">Нет в наличии</p>
              )}
            </div>
          </div>

          <div className="basket-right">
            {item.discountPercent > 0 && (
              <span className="basket-discount">-{item.discountPercent}%</span>
            )}

            <div className="qty">
              <button
                className="qty-btn"
                onClick={() => onDecrement && onDecrement(item.id)}
                disabled={!item.inStock}
              >
                –
              </button>
              <span className="qty-value">{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => onIncrement && onIncrement(item.id)}
                disabled={!item.inStock}
              >
                +
              </button>
            </div>

            <div className="basket-prices">
              <p className="basket-line-price">{item.price.toFixed(2)} ₽</p>
              {item.oldPrice > 0 && (
                <p className="basket-old-price">{item.oldPrice.toFixed(2)} ₽</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default BasketCard