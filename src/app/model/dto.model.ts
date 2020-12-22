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

