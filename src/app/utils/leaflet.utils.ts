import { tileLayer } from 'leaflet';
import { BaseLayer, Config } from '../model/shared.model';

export const convertConfigToLeaflet = (config: Config) => {
  const { layers } = config;
  const tile = convertBaselayersForLeaflet(layers);
  return { ...config, layers: tile as any };
};

export const convertBaselayersForLeaflet = (baselayer: BaseLayer) => {
  if (baselayer.token) {
    return tileLayer(
      `${baselayer.urlTemplate}${baselayer.token}`,
      baselayer.options ? baselayer.options : null
    );
  } else {
    return tileLayer(
      baselayer.urlTemplate,
      baselayer.options ? baselayer.options : null
    );
  }
};

export const convertBaselayersForLeafletControl = (
  baselayers: BaseLayer[]
): any => {
  const res = [];
  baselayers.map((baselayer) => {
    const bl = convertBaselayersForLeaflet(baselayer);
    res.push({ [baselayer.name]: bl });
  });
  return res;
};

export const setDefaultStyleOfFeature = (type): any => {
  switch (type) {
    case 'Point':
    case 'MultiPoint':
      return {
        color: '#ff7800',
        weight: 4,
        radius: 8,
        fillCollor: '#ff7600',
        opacity: 0.8,
      };
      break;
    case 'LineString':
    case 'MultiLineString':
      return {
        color: '#ff7800',
        weight: 5,
        opacity: 0.65,
        lineCap: 'round',
        lineJoin: 'round',
      };
    case 'Polygon':
    case 'MultiPolygon':
      return {
        color: '#ff7800',
        fillCollor: '#555',
        weight: 5,
        opacity: 0.65,
        lineCap: 'round',
        lineJoin: 'round',
      };
      break;
  }
};
