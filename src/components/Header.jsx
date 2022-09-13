import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    loading: false,
    usuario: '',
  };

  componentDidMount() {
    this.getUser();
  }
  // mentoria Guthias 01-09 //

  getUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      loading: false,
      usuario: user.name,
    });
  };
  // mentoria Guthias 01-09 //

  render() {
    const { loading, usuario } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading />
          : (
            <div className="header">
              <nav>
                <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
                <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              </nav>
              <h3 data-testid="header-user-name" className="name">{ usuario }</h3>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
