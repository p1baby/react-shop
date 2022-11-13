import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise ((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const {cartItems, setCartItems, totalPrice} = useCart();

  const onClickOrder = async () => {
    try {
  
      const {data} = await axios.post('https://631d8c1ecc652771a4874ea9.mockapi.io/orders', {items: cartItems});
      
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://631d8c1ecc652771a4874ea9.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    
    } catch (error) {
      alert('Ошибка при оформление заказа!')
    }
  };

    return (
      <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
        <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
        Корзина <img onClick={onClose}className="cu-p" src="/img/btn-remove.svg" alt="remove"/>
        </h2>

        {items.length > 0 ? 

            <div className="d-flex flex-column flex">
            <div className="items">
          {items.map((obj) => (
            <div key={obj.id} className="cartItem d-flex align-center mb-20">
            <div 
            style={{ backgroundImage: `url(${obj.imageUrl})`}} 
            className="cartItemImg"></div>
            
            <div className="mr-20 flex">
              <p className="mb-5">{obj.title}</p>
              <b>{obj.price} ₽</b>
            </div>
              <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove"/>
          </div>
          ))}
        </div>

        <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
              </ul>
              <button onClick={onClickOrder}>Оформить заказ</button>
        </div>
            </div>
          :
          <Info 
          title= {isOrderComplete ? "Заказ оформлен" : "Корзина пустая" }
          description={isOrderComplete ? `Ваш заказ # ${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." }
          image={isOrderComplete ? "/img/orderdone.jpg" : "/img/empty-cart.jpg" }/>
        }
          </div>
        </div>
    );
}

export default Drawer;