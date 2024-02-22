import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Pros API')
    .setDescription(
      "A simple API build to the Cloud human's Backend Take Home Assignment",
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
