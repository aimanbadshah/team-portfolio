import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const RAAHIM  = '9e82c286-a83b-4da6-8abd-371590264e41';
const AIMAN   = 'b5b1dde3-c0dd-4e92-b5d6-3413fe291ad6';
const AHSAN   = 'c02546cd-a160-4fef-8921-2346df7a75d0';
const ALI     = 'dd933f7b-aa1a-4366-b1d1-8f18bdf0c15e';
const ALL     = [RAAHIM, AIMAN, AHSAN, ALI];

const SKILLS: { name: string; memberIds: string[] }[] = [
  { name: 'OpenAI',             memberIds: ALL },
  { name: 'Gemini',             memberIds: ALL },
  { name: 'Claude',             memberIds: ALL },
  { name: 'Deepgram',           memberIds: [RAAHIM] },
  { name: 'AssemblyAI',         memberIds: [RAAHIM] },
  { name: 'Perplexity',         memberIds: [RAAHIM, AIMAN] },
  { name: 'Predis',             memberIds: [AIMAN] },
  { name: 'HeyGen',             memberIds: [AIMAN] },
  { name: 'Sora',               memberIds: [AIMAN] },
  { name: 'Gemini Nano Banana', memberIds: [RAAHIM] },
  { name: 'Vapi',               memberIds: [RAAHIM, AIMAN] },
  { name: 'N8N',                memberIds: ALL },
  { name: 'Make',               memberIds: ALL },
  { name: 'Zapier',             memberIds: ALL },
  { name: 'Google OAuth',       memberIds: [RAAHIM, AIMAN] },
  { name: 'Meta OAuth',         memberIds: [RAAHIM, AIMAN] },
  { name: 'Slack',              memberIds: [RAAHIM] },
  { name: 'GHL',                memberIds: ALL },
  { name: 'Twilio',             memberIds: [RAAHIM, AIMAN] },
  { name: 'Resend',             memberIds: [RAAHIM] },
  { name: 'SendGrid',           memberIds: [RAAHIM] },
  { name: 'Mailgun',            memberIds: [RAAHIM] },
  { name: 'Stripe',             memberIds: [RAAHIM] },
  { name: 'Airtable',           memberIds: [RAAHIM, AIMAN] },
  { name: 'Notion',             memberIds: [RAAHIM] },
  { name: 'Webhooks',           memberIds: ALL },
  { name: 'UploadPost',         memberIds: [AIMAN] },
  { name: 'Calendly',           memberIds: [RAAHIM] },
  { name: 'Instantly',          memberIds: [RAAHIM] },
  { name: 'Supabase',           memberIds: [RAAHIM, AIMAN] },
  { name: 'Selenium',           memberIds: [RAAHIM] },
  { name: 'Playwright',         memberIds: [RAAHIM, AIMAN] },
  { name: 'Puppeteer',          memberIds: [RAAHIM] },
  { name: 'Pandoc',             memberIds: [RAAHIM] },
  { name: 'Lovable',            memberIds: [RAAHIM, AIMAN] },
  { name: 'JotForms',           memberIds: [AIMAN] },
];

async function main() {
  for (const { name, memberIds } of SKILLS) {
    const skill = await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    for (const memberId of memberIds) {
      await prisma.memberSkill.upsert({
        where: { memberId_skillId: { memberId, skillId: skill.id } },
        update: {},
        create: { memberId, skillId: skill.id },
      });
    }

    console.log(`Seeded: ${name}`);
  }

  console.log('\nDone.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
