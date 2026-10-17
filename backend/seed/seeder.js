require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const dns      = require('dns');
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (_) {}
const mongoose = require('mongoose');

const User     = require('../models/User');
const Election = require('../models/Election');
const Vote     = require('../models/Vote');
const Incident = require('../models/Incident');
const AuditLog = require('../models/AuditLog');

const USERS = [
  {
    voterId: 'VTR-001-2026',
    name:    'John Voter',
    email:   'voter@example.com',
    password: '',
    role:    'voter',
    aadhaarNumber: '1234-5678-9012',
    eciCardNumber: 'ECI-VTR-001',
    avatar:  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    voterId:    'VTR-002-2026',
    name:       'Raj Sharma',
    email:      'admin@securevote.gov.in',
    password:   'Admin@1234',
    role:       'admin',
    department: 'System Administration',
    avatar:     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    voterId:    'VTR-003-2026',
    name:       'Priya Verma',
    email:      'officer@securevote.gov.in',
    password:   'Officer@1234',
    role:       'election_officer',
    district:   'Lucknow',
    department: 'Election Operations',
    avatar:     'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    voterId:    'VTR-004-2026',
    name:       'Amit Tiwari',
    email:      'cec@securevote.gov.in',
    password:   'CEC@1234',
    role:       'cec',
    district:   'New Delhi',
    department: 'Election Commission of India Apex',
    avatar:     'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
];

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

const ELECTIONS = [
  {
    title:       '2026 Presidential Election',
    description: 'National presidential election to elect the next president for a 4-year term.',
    startDate:   new Date(now - 10 * day),
    endDate:     new Date(now + 30 * day),
    status:      'active',
    totalVoters: 15000,
    turnout:     8500,
    candidates: [
      { name: 'Sarah Johnson',    party: 'Progressive Party',    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', description: 'Former Governor with 15 years of public service', manifesto: 'Focus on education, healthcare, and economic growth' },
      { name: 'Michael Chen',     party: 'Conservative Alliance', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', description: 'Business leader and philanthropist', manifesto: 'Strengthening national security and economic stability' },
      { name: 'Amanda Rodriguez', party: 'Green Coalition',       photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', description: 'Environmental scientist and activist', manifesto: 'Climate action, renewable energy, and sustainability' },
    ],
  },
  {
    title:       'City Council Election - District 5',
    description: 'Local council election for District 5 representative.',
    startDate:   new Date(now - 5 * day),
    endDate:     new Date(now + 15 * day),
    status:      'active',
    totalVoters: 5000,
    turnout:     1200,
    candidates: [
      { name: 'David Wilson',  party: 'Independent',    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', description: 'Community organizer and local business owner', manifesto: 'Infrastructure development and community services' },
      { name: 'Lisa Martinez', party: 'Citizens Party', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', description: 'Education administrator with 20 years experience', manifesto: 'Better schools and public transportation' },
    ],
  },
  {
    title:       'Student Government President',
    description: 'University student government presidential election.',
    startDate:   new Date(now + 10 * day),
    endDate:     new Date(now + 25 * day),
    status:      'upcoming',
    totalVoters: 12000,
    turnout:     0,
    candidates: [
      { name: 'Alex Thompson', party: 'Student Voice',   photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', description: 'Current VP with vision for student welfare', manifesto: 'Mental health support and campus facilities' },
      { name: 'Emily Zhang',   party: 'Unity Coalition', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', description: 'Student activist and club leader', manifesto: 'Diversity initiatives and student activities' },
    ],
  },
  {
    title:       'State Assembly Special By-Election',
    description: 'By-election concluded for legislative assembly representation.',
    startDate:   new Date(now - 30 * day),
    endDate:     new Date(now - 2 * day),
    status:      'ended',
    totalVoters: 25000,
    turnout:     18400,
    candidates: [
      { name: 'Dr. Ramesh Patel',  party: 'National Democratic Alliance', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', description: 'Public health administrator', manifesto: 'Healthcare infrastructure expansion' },
      { name: 'Sunita Sharma',     party: 'United Peoples Front',         photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', description: 'Social worker and educator', manifesto: 'Rural development and education' },
    ],
  },
];

const INCIDENTS = [
  { boothId: 'B004', boothName: 'Booth 4 — Chinhat',  type: 'Disturbance',  severity: 'High',   status: 'Open',     district: 'Lucknow' },
  { boothId: 'B002', boothName: 'Booth 2 — Alambagh', type: 'EVM Glitch',   severity: 'Medium', status: 'Resolved', district: 'Lucknow' },
  { boothId: 'B006', boothName: 'Booth 6 — Amausi',   type: 'Power Outage', severity: 'High',   status: 'Resolved', district: 'Lucknow' },
];

const seed = async () => {
  try {
    // ✅ Always use securevote database — never fallback to bare URI
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/securevote';
    console.log(`🔗 Connecting to MongoDB: ${uri.replace(/:([^@]+)@/, ':****@')}`);
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    console.log(`📦 Database: ${mongoose.connection.name}`);

    console.log('🧹 Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Election.deleteMany({}),
      Vote.deleteMany({}),
      Incident.deleteMany({}),
      AuditLog.deleteMany({}),
    ]);
    console.log('✅ Collections cleared');

    // ── Seed Users ─────────────────────────────────────────────────
    // pre-save hook in User.js handles password hashing automatically
    console.log('👥 Seeding users...');
    const createdUsers = [];
    for (const userData of USERS) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`   ✔ ${user.role.toUpperCase()}: ${user.email}`);
    }

    // ── Seed Elections ─────────────────────────────────────────────
    console.log('🗳️  Seeding elections...');
    const adminUser = createdUsers.find(u => u.role === 'admin');
    const createdElections = [];
    for (const electionData of ELECTIONS) {
      const election = new Election({ ...electionData, createdBy: adminUser._id });
      await election.save();
      election.candidates.forEach((c, i) => {
        const votes = i === 0 ? Math.floor(electionData.turnout * 0.45)
                    : i === 1 ? Math.floor(electionData.turnout * 0.35)
                    :           Math.floor(electionData.turnout * 0.20);
        election.results.set(c._id.toString(), votes);
      });
      await election.save();
      createdElections.push(election);
      console.log(`   ✔ ${election.title} (${election.status})`);
    }

    // ── Seed Incidents ─────────────────────────────────────────────
    console.log('⚠️  Seeding incidents...');
    const officerUser = createdUsers.find(u => u.role === 'election_officer') || createdUsers[0];
    for (const incData of INCIDENTS) {
      await Incident.create({ ...incData, reportedBy: officerUser._id });
      console.log(`   ✔ ${incData.boothName}: ${incData.type} (${incData.status})`);
    }

    // ── Seed Audit Logs ────────────────────────────────────────────
    console.log('📋 Seeding audit logs...');
    await AuditLog.insertMany([
      { action: 'SYSTEM_START',       userName: 'System',          details: 'SecureVote backend started',           type: 'info',    createdAt: new Date(Date.now() - 2 * 3600000) },
      { action: 'ELECTION_ACTIVATED', userName: 'System',          details: '2026 Presidential Election activated', type: 'success', createdAt: new Date(Date.now() - 2 * 3600000) },
      { action: 'INCIDENT_REPORTED',  userName: officerUser.name,   userRole: 'election_officer', details: 'Incident at Booth 4 — Chinhat', type: 'warning', createdAt: new Date(Date.now() - 22 * 60000) },
      { action: 'BLOCKCHAIN_SYNC',    userName: 'System',          details: 'Blockchain sync completed',            type: 'success', createdAt: new Date(Date.now() - 2 * 60000) },
    ]);
    console.log('   ✔ Audit logs seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log('─────────────────────────────────────────────');
    console.log('📧 Login Credentials:');
    console.log('   VOTER                    OTP flow (Aadhaar / ECI) → OTP: 123456');
    console.log('   ELECTION OFFICER         officer@securevote.gov.in / Officer@1234');
    console.log('   ADMIN                    admin@securevote.gov.in   / Admin@1234');
    console.log('   CHIEF ELECTION COMM.     cec@securevote.gov.in     / CEC@1234');
    console.log('─────────────────────────────────────────────\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seed();