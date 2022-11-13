import React from 'react';
import Card from '../components/Card';

function Home({
    items,
    cartItems,
    searchValue,
    onChangeSearchInput,
    onAddFavorite,
    onAddToCart,
    isLoading,
  }) {

    const renderItems = () => {

      const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
      
      return (isLoading ? [...Array(3)] : filteredItems)
      .map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
      ));
    }

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-30 justify-between">
            <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Каталог'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/lupa.svg" alt="search"/>
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                </div>
            </div>
        <div className="d-flex flex-wrap">
        {renderItems()}
        </div>
      </div>
    )
}

export default Home;