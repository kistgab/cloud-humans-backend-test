import { EducationLevel } from '@/domain/enums/education-levels.enum';
import { Project } from '@/domain/enums/projects.enum';

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
  referralCode: string;
}

export interface PairProWithProjectOutput {
  score: number;
  selectedProject: Project | null;
  eligibleProjects: Project[];
  ineligibleProjects: Project[];
}
