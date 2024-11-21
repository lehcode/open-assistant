import { registerAs } from '@nestjs/config';

export default registerAs('supabase', () => ({
  url: process.env.SUPABASE_URL || '',
  key: process.env.SUPABASE_KEY || '',
  anonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
  serviceRoleKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
  jwt: {
    secret: process.env.SUPABASE_JWT_SECRET || undefined,
    expiresIn: '7d',
  },
  s3: {
    url: process.env.SUPABASE_S3_URL || 'http://127.0.0.1:54321/storage/v1/s3',
    region: process.env.SUPABASE_S3_REGION || 'local',
    accessKey: process.env.SUPABASE_S3_ACCESS_KEY || '625729a08b95bf1b7ff351a663f3a23c',
    secretKey: process.env.SUPABASE_S3_SECRET_KEY || '850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907',
  },
  inbucket: {
    url: process.env.SUPABASE_INBUCKET_URL || 'http://127.0.0.1:54324',
  },
  graphql: {
    url: process.env.SUPABASE_GRAPHQL_URL || 'http://127.0.0.1:54321/graphql/v1',
  },
  api: {
    url: process.env.SUPABASE_API_URL || 'http://127.0.0.1:54321',
  }
}));
