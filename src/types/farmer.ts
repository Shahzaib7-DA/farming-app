export interface FarmerProfile {
  id: string;
  name: string;
  district: string;
  crop: string;
  phone?: string;
  registeredAt: Date;
}

export interface ActivityLog {
  id: string;
  farmerId: string;
  activity: string;
  date: Date;
  synced: boolean;
}

export interface QueryResponse {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  source: 'offline' | 'online';
}