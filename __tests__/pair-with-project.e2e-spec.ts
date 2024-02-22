import { ProRoutes } from '@/infrastructure/api/routes/pro.routes';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ProRoutes],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe('/pros/pairWithProject (POST)', () => {
    it('should return the selected project on success', () => {
      return request(app.getHttpServer())
        .post('/pros/pairWithProject')
        .send({
          age: 35,
          education_level: 'high_school',
          past_experiences: {
            sales: false,
            support: true,
          },
          internet_test: {
            download_speed: 50.4,
            upload_speed: 40.2,
          },
          writing_score: 0.6,
          referral_code: 'token1234',
        })
        .expect(200)
        .expect({
          score: 7,
          selected_project: 'determine_schrodinger_cat_is_alive',
          eligible_projects: [
            'determine_schrodinger_cat_is_alive',
            'support_users_from_xyz',
            'collect_information_for_xpto',
          ],
          ineligible_projects: ['calculate_dark_matter_nasa'],
        });
    });

    it('/pros/pairWithProject (POST)', () => {
      return request(app.getHttpServer())
        .post('/pros/pairWithProject')
        .send({})
        .expect(400)
        .expect({
          message: [
            'age must be an integer number',
            'age must be a positive number',
            'age must be a number conforming to the specified constraints',
            'education_level must be one of the following values: no_education, high_school, bachelors_degree_or_high',
            'past_experiences must be a non-empty object',
            'internet_test must be a non-empty object',
            'writing_score must not be greater than 1',
            'writing_score must not be less than 0',
            'writing_score must be a number conforming to the specified constraints',
          ],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });
});
