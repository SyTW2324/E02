import 'mocha';
import { expect } from 'chai';
import { findUserByEmail, getUsers } from '../source/controllers/user.controller';

describe('User Controller Tests', () => {
  // Prueba para la función findUserByEmail
  it('should find a user by email', async () => {
    const req = { params: { email: 'adrian@labrecordapp.es' } };
    const res = {
      json: (data: any) => {
        expect(data).to.exist;
      },
      status: (code: number) => {
        expect(code).to.equal(201);
        return {
          json: (data: any) => {
          },
        };
      },
    };
    await findUserByEmail(req as any, res as any);
  });

  // Prueba para la función getUsers
  it('should get all users', async () => {
    const req = {};
    const res = {
      json: (data: any) => {
        expect(data).to.exist;
      },
      status: (code: number) => {
        expect(code).to.equal(500); 
        return {
          json: (data: any) => {
          },
        };
      },
    };
    await getUsers(req as any, res as any);
  });
});