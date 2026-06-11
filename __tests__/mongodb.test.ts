import { describe, expect, it } from 'vitest';
import { resolveMongoConfig } from '@/lib/mongodb';

describe('resolveMongoConfig', () => {
  it('prefers the primary MongoDB URI when it is available', () => {
    const env = {
      MONGODB_URI: 'mongodb://primary.example.com:27017',
      MONGODB_URI_ALT: 'mongodb://secondary.example.com:27017',
      MONGODB_DB: 'primary-db',
    } as NodeJS.ProcessEnv;

    expect(resolveMongoConfig(env)).toEqual({
      uri: 'mongodb://primary.example.com:27017',
      dbName: 'primary-db',
    });
  });

  it('falls back to an alternate MongoDB URI when the primary one is missing', () => {
    const env = {
      MONGODB_URI_ALT: 'mongodb://secondary.example.com:27017',
      MONGODB_DB: 'secondary-db',
    } as NodeJS.ProcessEnv;

    expect(resolveMongoConfig(env)).toEqual({
      uri: 'mongodb://secondary.example.com:27017',
      dbName: 'secondary-db',
    });
  });

  it('uses the default database name when none is provided', () => {
    const env = {
      MONGODB_URI: 'mongodb://primary.example.com:27017',
    } as NodeJS.ProcessEnv;

    expect(resolveMongoConfig(env)).toEqual({
      uri: 'mongodb://primary.example.com:27017',
      dbName: 'cdrc',
    });
  });
});
