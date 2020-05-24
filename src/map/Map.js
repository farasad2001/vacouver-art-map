import { FilterFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import equal from 'fast-deep-equal';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import ReactMapGL, { Layer, NavigationControl, Source } from 'react-map-gl';
import { clusterCountLayer, clusterLayer, unclusteredPointLayer } from "./layers";

const MAPBOX_TOKEN = "pk.eyJ1IjoiZmFyYXNhZCIsImEiOiJjazZxeDhqNXQwMDJ3M2RzNTNiaWRsbHNlIn0.0VnBLqm7c6Uj4G6lVS1yFg";
const MAPBOX_STYLE = "mapbox://styles/farasad/ck6qykvf940fe1iqbt9dkq4pt/draft";
const GEOJSON_DATA_URL = "https://opendata.vancouver.ca/api/records/1.0/download/?dataset=public-art&format=geojson&fields=type,geom,descriptionofwork,photourl,url,status";

export default class Map extends React.Component {
  originalData = null;

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      viewport: {
        latitude: 49.257343,
        longitude: -123.124102,
        zoom: 12,
        bearing: 0,
        pitch: 0,

      },
    };

    // methods needs to be bound in order to use this inside

    this.handleViewportChange = this.handleViewportChange.bind(this);
  }


  handleViewportChange(viewport) {
    this.setState({ viewport });
  }

  handleClick = (e) => {
    const feature = e.features.filter(f => f.layer.id === unclusteredPointLayer.id)[0];
    //this.setState({ popupInfo: feature });
    if (this.props.onFeatureInfo) {
      this.props.onFeatureInfo(feature && feature.properties);
    }
  }

  handleFilterClick = (e) => {
    if (this.props.onFilterClick) {
      this.props.onFilterClick();
    }
  }

  onLoad(e) {
    fetch(GEOJSON_DATA_URL)
      .then(response => response.json())
      .then(features => {
        this.originalData = features;
        this.setState({ data: features });
      });
  }

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.filter, this.props.filter)) {
      this.filterData();
    }
  }

  filterData() {
    const filter = this.props.filter;

    if (filter === undefined || filter === null) {
      this.setState({ data: this.originalData });
    } else {
      const filteredFeatures = this.originalData.features.filter(feature => {
        const byType = filter.types === undefined || filter.types === null || filter.types.length === 0 ||
          filter.types.includes(feature.properties.type);

        const byStatus = filter.status === undefined || filter.status === null || filter.status.length === 0 ||
          filter.status.includes(feature.properties.status);

        return byType && byStatus;
      });

      this.setState({ data: { type: 'FeatureCollection', features: filteredFeatures } });
    }
  }

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          width="100vw"
          height="100vh"
          mapStyle={MAPBOX_STYLE}
          onViewportChange={this.handleViewportChange}
          onClick={this.handleClick}
          interactiveLayerIds={[unclusteredPointLayer.id]}
          onLoad={(e) => this.onLoad(e)}
        >
          <Source id="arts" type="geojson" data={this.state.data} cluster={true} clusterRadius={50} clusterMaxZoom={16}>
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
          <div style={{ position: 'absolute', right: 8, top: 8 }}>
            <NavigationControl />
          </div>
        </ReactMapGL>
        <Tooltip title="Filter" >
          <Button className="filter-btn" icon={<FilterFilled />} onClick={this.handleFilterClick} />
        </Tooltip>
      </div>
    );
  }
}