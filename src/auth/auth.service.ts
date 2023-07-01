import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable()
export class AuthService {
  private default: any;

  private firebaseConfig = {
    apiKey: process.env.FIREBASE_CLIENT_API_KEY,
    authDomain: process.env.FIREBASE_CLIENT_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_CLIENT_PROJECT_ID,
    storageBucket: process.env.FIREBASE_CLIENT_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_CLIENT_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_CLIENT_MESSAGING_SENDER_ID,
  };
  constructor() {
    this.default = initializeApp(this.firebaseConfig);
  }
  // constructor(private jwtService: JwtService) {
  //   this.default = initializeApp(this.firebaseConfig);
  // }
  // constructor() {
  //   this.default = initializeApp(this.firebaseConfig);
  // }

  // The signIn method of AuthService has job of retrieve a user and verifying the password.
  async signIn(user: { email: string; password: string }) {
    const { email, password } = user;

    // Firebase
    // Sign in with email and pass.
    const auth = getAuth(this.default);
    try {
      const signIn = await signInWithEmailAndPassword(auth, email, password);
      if (signIn.user) {
        return signIn;
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new BadRequestException();
    }

    // We're usign "@nestjs/jwt" library, which supplies a "signAsync()" function to generate our JWT from a
    // subset of the "user" object properties.

    // const payload = { sub: 1, username: email };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }
}
