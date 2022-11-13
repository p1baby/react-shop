import { Link } from 'react-router-dom';

function Header(props) {

    return(
        <header className="d-flex justify-between align-center p-40">
        <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.svg" alt="logo" />
          <div>
            <h3 className="text-uppercase">p1err sneakers-shop</h3>
            <p className="text-under">powered by p1err on React 17</p>
          </div>
        </div>
        </Link>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-20 cu-p">
          <img width={18} height={18} src="/img/profile.svg" alt="profile"/>
          </li>
          <li className="mr-20 cu-p">
            <Link to="/favorites">
              <img width={18} height={18} src="/img/hearticon.svg" alt="hearticon"/>
            </Link>
          </li>
          <li className="mr-20 cu-p">
            <Link to="/orders">
              <img width={18} height={18} src="/img/cart.svg" alt="carticon"/>
            </Link>
          </li>
        </ul>
      </header>
    );
}

export default Header;