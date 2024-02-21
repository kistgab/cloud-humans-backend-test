import { EducationLevel } from '@/domain/pro/enums/education-levels.enum';

export interface PairProWithProjectInput {
  age: number;
  educationLevel: EducationLevel;
  pastExperiences: {
    sales: boolean;
    support: boolean;
  };
  internetTest: {
    downloadSpeed: number;
    uploadSpeed: number;
  };
  writingScore: number;
  referralCode?: string;
}

export interface PairProWithProjectOutput {
  score: number;
  selectedProject: string | null;
  eligibleProjects: string[];
  ineligibleProjects: string[];
}
