import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as firebaseAdmin from 'firebase-admin';

async function bootstrap() {
  const firebaseAdminConfig = {
    type: process.env.TYPE,
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_ADMIN_CLIENT_ID,
    authUri: process.env.FIREBASE_ADMIN_AUTH_URI,
    tokenUri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    authProviderX509CertUrl:
      process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    clientC509CertUrl: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
  };
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseAdminConfig),
  });

  const app = await NestFactory.create(AppModule);

  // Definisco come le API vengono presentate al mondo esterno
  const options = new DocumentBuilder()
    .setTitle('Firebase')
    .setDescription('The Firebase API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // Definisce il path dove posizionato lo Swagger UI
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
export default firebaseAdmin;
bootstrap();
