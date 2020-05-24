import React from 'react';
import './feature-info.scss';

export default class FeatureInfo extends React.Component {
  render() {
    let photoUrl;

    if (this.props.photourl) {
      const photoInfo = JSON.parse(this.props.photourl);
      photoUrl = `https://opendata.vancouver.ca/explore/dataset/public-art/files/${photoInfo.id}/download/`
    }

    return (
      <div className="feature-info">
        <h2>{this.props.type}</h2>
        <div className="content">{this.props.descriptionofwork}</div>
        {photoUrl && <img src={photoUrl}></img>}
        <a href={this.props.url} target="_blank" className="button">More Info</a>
      </div>
    )
  }
}