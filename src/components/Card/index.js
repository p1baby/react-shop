import React from 'react'
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';
import styles from './Card.module.scss';

function Card( 
  { id, 
    onFavorite, 
    onPlus, 
    title, 
    imageUrl, 
    price, 
    favorited = false, 
    added = false, 
    loading = false, 
  }) {

  const {isItemAdded} = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = {id, parentId: id, title, imageUrl, price}

  const onClickPlus = () => {
    onPlus(obj);
  }

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  }

    return(
        <div className={styles.card}>
        {
          loading ? <ContentLoader
          speed={5}
          width={147}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="150" />
          <rect x="0" y="167" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="120" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader> : 
          <>
          {onFavorite && 
            <div className={styles.favorite} onClick={onFavorite}>
              <img onClick={onClickFavorite} src={isFavorite ? "/img/sostlike2.svg" : "/img/sostlike1.svg"} alt="favorite"/>
            </div>
          }
            <img width="100%" height={135} src={imageUrl} alt="sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} ₽</b>
              </div>
                {onPlus && 
                  <img 
                    className={styles.plus} 
                    onClick={onClickPlus} 
                    src={isItemAdded(id) ? "/img/done.svg" : "/img/plus.svg"} 
                    alt="plus">
                  </img>
                }
          </div>
          </>
        }
        
        </div>
    );
}

export default Card;