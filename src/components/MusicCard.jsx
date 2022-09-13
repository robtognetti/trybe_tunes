import React from 'react';
import Proptypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favorites: [],
  };

  async componentDidMount() {
    this.setState({ favorites: await getFavoriteSongs() });
  }

  favoriteSong = () => {
    this.setState({ loading: true }, async () => {
      await addSong({ ...this.props });
      const { favorites } = this.state;
      this.setState({
        favorites: [...favorites, this.props],
        loading: false,
      });
    });
  };

  render() {
    const { loading, favorites } = this.state;
    const { previewUrl, trackId, trackName } = this.props;
    const fav = favorites.some((music) => music.trackId === trackId);
    return (
      <div>
        <label htmlFor="check">
          Favorita
          <input
            checked={ fav }
            onChange={ this.favoriteSong }
            id="check"
            type="checkBox"
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
        {loading && (
          <Loading />
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: Proptypes.string.isRequired,
  previewUrl: Proptypes.string.isRequired,
  trackId: Proptypes.number.isRequired,
};

export default MusicCard;
