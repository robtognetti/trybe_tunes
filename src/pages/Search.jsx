import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    loading: false,
    pesquisar: '',
    banda: '',
    albums: [],
  };

  mudanca = ({ target: { value } }) => {
    this.setState({ pesquisar: value });
  };
  // mentoria Guthias 01-09 //

  fetchArtist = () => {
    const { pesquisar } = this.state;
    this.setState({ loading: true }, async () => {
      const aux = await searchAlbumsAPI(pesquisar);
      this.setState({
        pesquisar: '',
        loading: false,
        albums: aux,
        banda: pesquisar,
      });
    });
  };
  // mentoria Guthias 01-09 //

  render() {
    const { albums, banda, pesquisar, loading } = this.state;
    const min = 2;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              type="text"
              id="pesquisar"
              placeholder="Banda"
              data-testid="search-artist-input"
              value={ pesquisar }
              onChange={ this.mudanca }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ min > pesquisar.length }
              onClick={ this.fetchArtist }
            >
              Pesquisar
            </button>
          </form>
          <section>
            {albums < 1 && !albums.length
              ? 'Nenhum álbum foi encontrado'
              : (
                <span>
                  {`Resultado de álbuns de: ${banda}`}
                  {albums.map((aux) => (
                    <AlbumCard key={ aux.collectionId } { ...aux } />
                  ))}
                </span>
              )}
            { loading && <Loading /> }
          </section>
        </div>
      </div>
    );
  }
}

export default Search;
