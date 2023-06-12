// Fields: id, name, description, category, active/inactive, dateCreate

export interface Record {
  id?: string;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
  created: string;
}