import { ProRoutes } from '@/infrastructure/api/routes/pro.routes';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ProRoutes],
    }).compile();

    app = moduleFixture.createNestApplication();
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
  });
});
