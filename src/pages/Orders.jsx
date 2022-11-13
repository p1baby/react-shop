import axios from 'axios';
import React from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading]  = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://631d8c1ecc652771a4874ea9.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      {orders.length > 0 ? 
  <div>
    <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
    </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item,index) => (
          <Card 
            key={index}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
  </div>
  :
  <div className="pageEmpty d-flex align-center justify-center flex-column flex">
    <img width="70px" height="70px" src="/img/orderEmpty.jpg" alt="emoji" />
    <h2>У вас нет заказов</h2>
    <p className="opacity-6 mt-1">Оформите хотя бы один заказ.</p>
    <Link to="/">
    <button className="greenButton">
      <img src="img/arrow.svg" alt="Arrow" />
      Вернуться в каталог
    </button>
    </Link>
  </div>
  }
    </div>
  );
}

export default Orders;
