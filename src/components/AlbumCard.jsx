import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const {

      artistName,

      collectionId,

      collectionName,

      collectionPrice,

      artworkUrl100,

      releaseDate,

      trackCount,

    } = this.props;

    return (

      <div>

        <img src={ artworkUrl100 } alt={ artistName } />

        <p>{ artistName }</p>

        <p>{ collectionPrice }</p>

        <p>{ releaseDate }</p>

        <p>{ trackCount }</p>

        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          { collectionName }
        </Link>

      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  trackCount: PropTypes.instanceOf(Date).isRequired,
};

export default AlbumCard;
