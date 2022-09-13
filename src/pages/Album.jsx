import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    loading: true,
    list: [],
  };
  // mentoria Guthias //

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const single = await getMusics(id);
    this.setState({ loading: false, list: single });
  }

  render() {
    const { loading, list } = this.state;
    const sons = list.filter((music) => music.kind === 'song');
    // mentoria Guthias 01-09 //
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (<Loading />) : (
          <section>
            <div>
              { sons.map((music) => {
                const { trackName, previewUrl, trackId } = music;
                return (
                  <MusicCard
                    key={ trackId.key }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                  />
                );
              })}
            </div>
            <div>
              <img
                alt={ list[0].collectionName }
                src={ list[0].artworkUrl100 }
              />
              <h1 data-testid="artist-name">
                { list[0].artistName }
              </h1>

              <p data-testid="album-name">
                { list[0].collectionName }
              </p>
            </div>
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
export default Album;
