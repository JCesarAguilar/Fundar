export interface IProject {
  id: string;
  title: string;
  resume: string;
  description: string;
  country: string;
  goalAmount: number;
  imageUrls: string[];
  currentAmount?: number;
  categoryId?: number;
  status?: "active" | "inactive";
}
