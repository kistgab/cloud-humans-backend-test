import { ProjectEntity } from '@/domain/entities/projects/project.entity';
import { EducationLevel } from '@/domain/enums/education-levels.enum';
import { PairProWithProjectInput } from '@/usecases/pro/pair-with-project/pair-with-project.pro.dto';

export function createFakePairWithProjectInput(
  customProps?: Partial<PairProWithProjectInput>,
): PairProWithProjectInput {
  return {
    age: customProps?.age || 25,
    educationLevel:
      customProps?.educationLevel || EducationLevel.BachelorsDegreeOrHigher,
    pastExperiences: customProps?.pastExperiences || {
      sales: true,
      support: true,
    },
    internetTest: customProps?.internetTest || {
      downloadSpeed: 100,
      uploadSpeed: 100,
    },
    writingScore: customProps?.writingScore || 1,
    referralCode: customProps?.referralCode || 'token1234',
  };
}

export function createFakeProjects(): ProjectEntity[] {
  return [
    new ProjectEntity(
      'calculate_dark_matter_nasa',
      10,
      'Calculate the Dark Matter of the universe for Nasa',
    ),
    new ProjectEntity(
      'determine_schrodinger_cat_is_alive',
      5,
      "Determine if the Schrodinger's cat is alive",
    ),
    new ProjectEntity(
      'support_users_from_xyz',
      3,
      'Attend to users support for a YXZ Company',
    ),
    new ProjectEntity(
      'collect_information_for_xpto',
      2,
      'Collect specific people information from their social media for XPTO Company',
    ),
  ];
}
