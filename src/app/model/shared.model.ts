export type ID = string | number;

export interface Campaign {
  id: ID;
  name: string;
  dateStart: Date;
  dateEnd: Date;
  mapId: ID;
  interventions: Intervention[];
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
