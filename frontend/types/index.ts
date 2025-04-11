export interface Deal {
  client: string;
  value: number;
  status: "Closed Won" | "Closed Lost" | "In Progress";
}

export interface Client {
  name: string;
  industry: string;
  contact: string;
}

export interface SalesRep {
  id: number;
  name: string;
  role: string;
  region: string;
  skills: string[];
  deals: Deal[];
  clients: Client[];
}
