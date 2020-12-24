import { LatLng, LatLngBounds, MapOptions, TileLayerOptions } from 'leaflet';

export type ID = string | number;

export interface Campaign {
  id: ID;
  name: string;
  dateStart?: Date;
  dateEnd?: Date;
  mapId?: string;
  interventions?: Intervention[];
}

export interface Intervention {
  id: ID;
  name: string;
  type: 'survay' | 'works' | 'maintenance' | 'comptage' | 'other';
  dateStart: Date;
  dateEnd: Date;
}

export enum ColorState {
  VERY_GOOD = '#00FF00',
  GOOD = '#FFFF00',
  MEDIUM = '#FFA500',
  BAD = '#FF0000',
  VERY_BAD = '#000000',
}

export enum Mode {
  Read = 'read',
  Edit = 'edit',
  // CRUD
  // read -> read only
  // edit -> read, create, delete, update
}

export enum FeatureProperties {
  SECTION = 'section',
  IMAGE = 'image',
  IMAGE360 = 'image360',
  // TODO : Complete this section
}

export interface MapSmall {
  id: ID;
  config: Config;
  overlayIds: string[];
  baseLayerIds: string[];
}

export interface Map {
  id: ID;
  config: Config;
  overlays: Overlay[];
  baseLayers: BaseLayer[];
}

export interface Config {
  zoom: number;
  center: LatLng; // use latLng() from leaflet to convert [number, number]
  fitBounds: LatLngBounds;
  maxBounds: LatLngBounds;
  options: MapOptions;
  layers: BaseLayer; // "s" of layers because of leaflet
  minZoom?: number;
  maxZoom?: number;
  scrollWheelZoom?: boolean;
  smoothWheelZoom?: boolean;
  smoothSensitivity?: number;
  tileSize?: number;
  zoomOffset?: number;
}

export interface Overlay extends GeoJSON.FeatureCollection {
  id: ID;
  name: string;
  visible?: boolean;
  mapId?: ID;
  // STYLE ????
}

export interface BaseLayer {
  urlTemplate: string;
  id?: ID;
  name?: string;
  token?: string;
  options?: TileLayerOptions;
}
