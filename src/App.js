import { Drawer } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import './App.scss';
import FeatureInfo from './map/FeatureInfo';
import Filter from './map/Filter';
import Map from './map/Map';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDrawer: false,
      feature: null,
      drawerPosition: "left",
      moed: null,
      filter: null
    }
  }

  showFeatureInfo = (feature) => {
    if (feature) {
      this.setState({ showDrawer: true, feature, mode: 'featureInfo' });
    } else {
      this.setState({ showDrawer: false, feature });
    }
  }

  showFilters = () => {
    this.setState({ showDrawer: true, mode: 'filter' });
  }

  closeDrawer = () => {
    this.setState({ showDrawer: false });
  }

  filterMapData = (filter) => {
    this.setState({ filter: filter });
  }

  render() {
    let drawerContent;
    switch (this.state.mode) {
      case 'featureInfo':
        drawerContent = <FeatureInfo {...this.state.feature} />
        break;
      case 'filter':
        drawerContent = <Filter onFilter={this.filterMapData} />
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <Map onFeatureInfo={this.showFeatureInfo} onFilterClick={this.showFilters} filter={this.state.filter} />
        <Drawer
          placement={this.state.drawerPosition}
          mask={false}
          closable={true}
          visible={this.state.showDrawer}
          onClose={this.closeDrawer}
          width="480px"
        >
          {drawerContent}
        </Drawer>
      </div>
    );
  }
}

export default App;
