import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';
import { Link } from 'react-router-dom';

function Favorites() {
  const { favorites, onAddFavorite } = React.useContext(AppContext);

  return (
    <div className="content p-40">

      {favorites.length > 0 ? 
      <div>
        <div className="d-flex align-center justify-between mb-40">
            <h1>Избранное</h1>
          </div>
        <div className="d-flex flex-wrap">
            {favorites.map((item, index) => (
              <Card key={index} favorited={true} onFavorite={onAddFavorite} {...item} />
            ))}
        </div>
      </div>
      :
      <div className="pageEmpty d-flex align-center justify-center flex-column flex">
        <img width="70px" height="70px" src="/img/favempty.jpg" alt="emoji" />
        <h2> Избранного нет :(</h2>
        <p className="opacity-6 mt-1">Вы ничего не добавляли в избранное</p>
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

export default Favorites;
