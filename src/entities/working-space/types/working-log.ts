export interface WorkingLog {
  id: string;
  tag: string;
  content: string;
  date: string; 
  variant: 'primary' | 'secondary';
}