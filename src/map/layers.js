
export const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': ['step', ['get', 'point_count'], '#04bacf', 10, '#05e3d8', 50, '#038f9e'],
      'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 50, 40]
    }
  };
  
  export const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    }
  };
  
  export const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'earthquakes',
    
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#04bacf',
      'circle-radius': 8,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    }
  };