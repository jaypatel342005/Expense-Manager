import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter';
import { hash } from 'bcryptjs';

const adapter = new PrismaTiDBCloud({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// ---------- Helpers ----------
function randomDate(startMonthsAgo: number, endMonthsAgo: number = 0): Date {
  const now = Date.now();
  const start = now - startMonthsAgo * 30 * 24 * 60 * 60 * 1000;
  const end = now - endMonthsAgo * 30 * 24 * 60 * 60 * 1000;
  return new Date(start + Math.random() * (end - start));
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(min: number, max: number): number {
  return Math.round((min + Math.random() * (max - min)) * 100) / 100;
}

// ---------- Seed Data ----------
async function main() {
  console.log('🌱 Seeding database...\n');

  // ──────────────────────────────────────
  // 1. USERS (3 users: 1 admin + 2 regular)
  // ──────────────────────────────────────
  const hashedPassword = await hash('Password@123', 10);

  const usersData = [
    { UserName: 'admin',       EmailAddress: 'admin@expense.com',    Role: 'ADMIN' as const, MobileNo: '9876543210' },
    { UserName: 'jay_patel',   EmailAddress: 'jay@expense.com',      Role: 'USER' as const,  MobileNo: '9898765432' },
    { UserName: 'priya_shah',  EmailAddress: 'priya@expense.com',    Role: 'USER' as const,  MobileNo: '9876123456' },
  ];

  const createdUsers: any[] = [];
  for (const u of usersData) {
    const existing = await prisma.users.findUnique({ where: { EmailAddress: u.EmailAddress } });
    if (existing) {
      createdUsers.push(existing);
      console.log(`  ✓ User "${u.UserName}" already exists (ID: ${existing.UserID})`);
    } else {
      const user = await prisma.users.create({
        data: { ...u, Password: hashedPassword, Created: new Date(), Modified: new Date() },
      });
      createdUsers.push(user);
      console.log(`  ✅ Created user "${u.UserName}" (ID: ${user.UserID})`);
    }
  }
  const [adminUser, jayUser, priyaUser] = createdUsers;
  console.log(`\n  Users: ${createdUsers.length} total\n`);

  // ──────────────────────────────────────
  // 2. PEOPLES (linked to users + extras)
  // ──────────────────────────────────────
  const peoplesData = [
    { PeopleName: 'Jay Patel',      PeopleCode: 'USR-JAY',   Email: 'jay@expense.com',        MobileNo: '9898765432', UserID: jayUser.UserID,   Description: 'Linked user account' },
    { PeopleName: 'Priya Shah',     PeopleCode: 'USR-PRIYA', Email: 'priya@expense.com',      MobileNo: '9876123456', UserID: priyaUser.UserID, Description: 'Linked user account' },
    { PeopleName: 'Rahul Sharma',   PeopleCode: 'CLT-001',   Email: 'rahul.sharma@mail.com',  MobileNo: '9823456789', UserID: adminUser.UserID, Description: 'Freelance web designer' },
    { PeopleName: 'Anita Desai',    PeopleCode: 'CLT-002',   Email: 'anita.desai@mail.com',   MobileNo: '9812345678', UserID: adminUser.UserID, Description: 'Marketing consultant' },
    { PeopleName: 'Vikram Mehta',   PeopleCode: 'VND-001',   Email: 'vikram.mehta@mail.com',  MobileNo: '9834567890', UserID: adminUser.UserID, Description: 'Office supplies vendor' },
    { PeopleName: 'Sneha Reddy',    PeopleCode: 'VND-002',   Email: 'sneha.reddy@mail.com',   MobileNo: '9845678901', UserID: jayUser.UserID,   Description: 'Software license vendor' },
    { PeopleName: 'Amit Joshi',     PeopleCode: 'EMP-001',   Email: 'amit.joshi@mail.com',    MobileNo: '9856789012', UserID: adminUser.UserID, Description: 'Backend developer' },
    { PeopleName: 'Kavita Nair',    PeopleCode: 'EMP-002',   Email: 'kavita.nair@mail.com',   MobileNo: '9867890123', UserID: priyaUser.UserID, Description: 'UI/UX designer' },
    { PeopleName: 'Deepak Gupta',   PeopleCode: 'CLT-003',   Email: 'deepak.gupta@mail.com',  MobileNo: '9878901234', UserID: jayUser.UserID,   Description: 'E-commerce client' },
    { PeopleName: 'Meena Iyer',     PeopleCode: 'CLT-004',   Email: 'meena.iyer@mail.com',    MobileNo: '9889012345', UserID: priyaUser.UserID, Description: 'Interior design client' },
  ];

  const createdPeoples: any[] = [];
  for (const p of peoplesData) {
    const existing = await prisma.peoples.findFirst({ where: { Email: p.Email } });
    if (existing) {
      createdPeoples.push(existing);
    } else {
      const person = await prisma.peoples.create({
        data: { ...p, Password: 'SEED_ACCOUNT', IsActive: true, Created: new Date(), Modified: new Date() },
      });
      createdPeoples.push(person);
    }
  }
  console.log(`  ✅ Peoples: ${createdPeoples.length} records\n`);

  // ──────────────────────────────────────
  // 3. CATEGORIES (expense + income types)
  // ──────────────────────────────────────
  const categoriesData = [
    // Expense categories
    { CategoryName: 'Food & Dining',       IsExpense: true,  IsIncome: false, Description: 'Meals, restaurants, groceries, snacks',          UserID: adminUser.UserID, Sequence: 1 },
    { CategoryName: 'Transportation',      IsExpense: true,  IsIncome: false, Description: 'Fuel, cab rides, public transit, parking',       UserID: adminUser.UserID, Sequence: 2 },
    { CategoryName: 'Shopping',            IsExpense: true,  IsIncome: false, Description: 'Clothing, electronics, household items',          UserID: adminUser.UserID, Sequence: 3 },
    { CategoryName: 'Bills & Utilities',   IsExpense: true,  IsIncome: false, Description: 'Electricity, internet, phone, water bills',      UserID: adminUser.UserID, Sequence: 4 },
    { CategoryName: 'Entertainment',       IsExpense: true,  IsIncome: false, Description: 'Movies, games, subscriptions, events',            UserID: adminUser.UserID, Sequence: 5 },
    { CategoryName: 'Health & Fitness',    IsExpense: true,  IsIncome: false, Description: 'Medicine, gym, doctor visits, supplements',       UserID: adminUser.UserID, Sequence: 6 },
    { CategoryName: 'Education',           IsExpense: true,  IsIncome: false, Description: 'Courses, books, tuition, certifications',         UserID: adminUser.UserID, Sequence: 7 },
    { CategoryName: 'Rent & Housing',      IsExpense: true,  IsIncome: false, Description: 'Rent, maintenance, repairs, furniture',           UserID: adminUser.UserID, Sequence: 8 },
    { CategoryName: 'Travel',             IsExpense: true,  IsIncome: false, Description: 'Flights, hotels, visa, travel insurance',          UserID: adminUser.UserID, Sequence: 9 },
    { CategoryName: 'Office Supplies',     IsExpense: true,  IsIncome: false, Description: 'Stationery, printer ink, desk accessories',       UserID: adminUser.UserID, Sequence: 10 },
    // Income categories
    { CategoryName: 'Salary',             IsExpense: false, IsIncome: true,  Description: 'Monthly salary, bonuses, overtime',                UserID: adminUser.UserID, Sequence: 1 },
    { CategoryName: 'Freelancing',         IsExpense: false, IsIncome: true,  Description: 'Freelance projects, consulting, gigs',             UserID: adminUser.UserID, Sequence: 2 },
    { CategoryName: 'Investments',         IsExpense: false, IsIncome: true,  Description: 'Dividends, mutual funds, stock gains',             UserID: adminUser.UserID, Sequence: 3 },
    { CategoryName: 'Business Revenue',    IsExpense: false, IsIncome: true,  Description: 'Product sales, service revenue, commissions',      UserID: adminUser.UserID, Sequence: 4 },
    { CategoryName: 'Rental Income',       IsExpense: false, IsIncome: true,  Description: 'Property rent, sublease income',                   UserID: adminUser.UserID, Sequence: 5 },
    // Mixed
    { CategoryName: 'Miscellaneous',       IsExpense: true,  IsIncome: true,  Description: 'Uncategorized transactions, refunds, adjustments', UserID: adminUser.UserID, Sequence: 99 },
  ];

  const createdCategories: any[] = [];
  for (const c of categoriesData) {
    const existing = await prisma.categories.findFirst({ where: { CategoryName: c.CategoryName, UserID: c.UserID } });
    if (existing) {
      createdCategories.push(existing);
    } else {
      const cat = await prisma.categories.create({
        data: { ...c, IsActive: true, Created: new Date(), Modified: new Date() },
      });
      createdCategories.push(cat);
    }
  }
  console.log(`  ✅ Categories: ${createdCategories.length} records\n`);

  // Map categories by name for easy lookup
  const catMap = new Map(createdCategories.map(c => [c.CategoryName, c]));

  // ──────────────────────────────────────
  // 4. SUB-CATEGORIES
  // ──────────────────────────────────────
  const subCategoriesData = [
    // Food & Dining
    { CategoryName: 'Food & Dining', SubCategoryName: 'Groceries',       Description: 'Weekly grocery shopping',       IsExpense: true, IsIncome: false },
    { CategoryName: 'Food & Dining', SubCategoryName: 'Restaurants',     Description: 'Dining out, takeout',           IsExpense: true, IsIncome: false },
    { CategoryName: 'Food & Dining', SubCategoryName: 'Snacks & Drinks', Description: 'Tea, coffee, street food',      IsExpense: true, IsIncome: false },
    // Transportation
    { CategoryName: 'Transportation', SubCategoryName: 'Fuel',           Description: 'Petrol, diesel, CNG',           IsExpense: true, IsIncome: false },
    { CategoryName: 'Transportation', SubCategoryName: 'Cab Rides',      Description: 'Uber, Ola, auto rickshaw',      IsExpense: true, IsIncome: false },
    { CategoryName: 'Transportation', SubCategoryName: 'Public Transit', Description: 'Metro, bus, train tickets',     IsExpense: true, IsIncome: false },
    // Shopping
    { CategoryName: 'Shopping', SubCategoryName: 'Clothing',             Description: 'Clothes, shoes, accessories',   IsExpense: true, IsIncome: false },
    { CategoryName: 'Shopping', SubCategoryName: 'Electronics',          Description: 'Gadgets, accessories, cables',  IsExpense: true, IsIncome: false },
    { CategoryName: 'Shopping', SubCategoryName: 'Home & Kitchen',       Description: 'Utensils, decor, appliances',   IsExpense: true, IsIncome: false },
    // Bills & Utilities
    { CategoryName: 'Bills & Utilities', SubCategoryName: 'Electricity',   Description: 'Monthly electricity bill',    IsExpense: true, IsIncome: false },
    { CategoryName: 'Bills & Utilities', SubCategoryName: 'Internet',      Description: 'Broadband, WiFi plans',       IsExpense: true, IsIncome: false },
    { CategoryName: 'Bills & Utilities', SubCategoryName: 'Phone Bill',    Description: 'Mobile recharge, postpaid',   IsExpense: true, IsIncome: false },
    // Entertainment
    { CategoryName: 'Entertainment', SubCategoryName: 'Streaming',       Description: 'Netflix, Spotify, Disney+',     IsExpense: true, IsIncome: false },
    { CategoryName: 'Entertainment', SubCategoryName: 'Movies & Events', Description: 'Cinema, concerts, exhibitions', IsExpense: true, IsIncome: false },
    { CategoryName: 'Entertainment', SubCategoryName: 'Gaming',          Description: 'Games, in-app purchases',       IsExpense: true, IsIncome: false },
    // Health & Fitness
    { CategoryName: 'Health & Fitness', SubCategoryName: 'Medicine',     Description: 'Prescription, OTC medicines',   IsExpense: true, IsIncome: false },
    { CategoryName: 'Health & Fitness', SubCategoryName: 'Gym',          Description: 'Gym membership, equipment',     IsExpense: true, IsIncome: false },
    // Education
    { CategoryName: 'Education', SubCategoryName: 'Online Courses',     Description: 'Udemy, Coursera, tutorials',     IsExpense: true, IsIncome: false },
    { CategoryName: 'Education', SubCategoryName: 'Books',              Description: 'Textbooks, novels, e-books',     IsExpense: true, IsIncome: false },
    // Salary sub-categories
    { CategoryName: 'Salary', SubCategoryName: 'Base Salary',           Description: 'Monthly base pay',               IsExpense: false, IsIncome: true },
    { CategoryName: 'Salary', SubCategoryName: 'Bonus',                 Description: 'Performance bonus, festival bonus', IsExpense: false, IsIncome: true },
    // Freelancing
    { CategoryName: 'Freelancing', SubCategoryName: 'Web Development',  Description: 'Website, web app projects',      IsExpense: false, IsIncome: true },
    { CategoryName: 'Freelancing', SubCategoryName: 'Consulting',       Description: 'Technical consulting, advisory',  IsExpense: false, IsIncome: true },
    // Investments
    { CategoryName: 'Investments', SubCategoryName: 'Dividends',        Description: 'Stock and MF dividends',          IsExpense: false, IsIncome: true },
    { CategoryName: 'Investments', SubCategoryName: 'Interest',         Description: 'FD, savings account interest',    IsExpense: false, IsIncome: true },
  ];

  const createdSubCategories: any[] = [];
  for (const sc of subCategoriesData) {
    const parentCat = catMap.get(sc.CategoryName);
    if (!parentCat) continue;
    const existing = await prisma.sub_categories.findFirst({
      where: { SubCategoryName: sc.SubCategoryName, CategoryID: parentCat.CategoryID },
    });
    if (existing) {
      createdSubCategories.push(existing);
    } else {
      const sub = await prisma.sub_categories.create({
        data: {
          CategoryID: parentCat.CategoryID,
          SubCategoryName: sc.SubCategoryName,
          Description: sc.Description,
          IsExpense: sc.IsExpense,
          IsIncome: sc.IsIncome,
          IsActive: true,
          UserID: adminUser.UserID,
          Created: new Date(),
          Modified: new Date(),
        },
      });
      createdSubCategories.push(sub);
    }
  }
  console.log(`  ✅ Sub-Categories: ${createdSubCategories.length} records\n`);

  // Map sub-categories by parent name
  const subCatByParent = new Map<string, any[]>();
  for (const sc of createdSubCategories) {
    const parent = createdCategories.find(c => c.CategoryID === sc.CategoryID);
    if (parent) {
      const list = subCatByParent.get(parent.CategoryName) || [];
      list.push(sc);
      subCatByParent.set(parent.CategoryName, list);
    }
  }

  // ──────────────────────────────────────
  // 5. PROJECTS
  // ──────────────────────────────────────
  const projectsData = [
    { ProjectName: 'E-Commerce Platform',   ProjectDetail: 'Full-stack e-commerce website with payment integration',  Description: 'Client project for Deepak Gupta',     UserID: jayUser.UserID,   IsActive: true },
    { ProjectName: 'Portfolio Redesign',     ProjectDetail: 'Modern portfolio website with animations',               Description: 'Personal branding project',            UserID: jayUser.UserID,   IsActive: true },
    { ProjectName: 'Inventory Management',   ProjectDetail: 'Stock and warehouse management system',                  Description: 'Enterprise client project',            UserID: adminUser.UserID, IsActive: true },
    { ProjectName: 'Mobile App - FitTrack',  ProjectDetail: 'React Native fitness tracking application',              Description: 'Startup project with health features', UserID: priyaUser.UserID, IsActive: true },
    { ProjectName: 'Marketing Campaign Q1',  ProjectDetail: 'Digital marketing campaign for Q1 2026',                 Description: 'Managed by Anita Desai',               UserID: adminUser.UserID, IsActive: true },
    { ProjectName: 'Interior Design Studio', ProjectDetail: 'Website for interior design studio',                     Description: 'Client project for Meena Iyer',        UserID: priyaUser.UserID, IsActive: true },
    { ProjectName: 'AI Chatbot',             ProjectDetail: 'Customer support chatbot with NLP',                      Description: 'R&D project using OpenAI API',         UserID: jayUser.UserID,   IsActive: true },
    { ProjectName: 'Restaurant POS',         ProjectDetail: 'Point-of-sale system for restaurants',                   Description: 'Completed POS project',                UserID: adminUser.UserID, IsActive: false },
    { ProjectName: 'Blog Platform',          ProjectDetail: 'Content management and blogging platform',               Description: 'Side project with ad revenue',         UserID: priyaUser.UserID, IsActive: true },
    { ProjectName: 'CRM Dashboard',          ProjectDetail: 'Customer relationship management dashboard',             Description: 'SaaS product development',             UserID: adminUser.UserID, IsActive: true },
  ];

  const createdProjects: any[] = [];
  for (const p of projectsData) {
    const existing = await prisma.projects.findFirst({ where: { ProjectName: p.ProjectName, UserID: p.UserID } });
    if (existing) {
      createdProjects.push(existing);
    } else {
      const startDate = randomDate(8, 2);
      const proj = await prisma.projects.create({
        data: {
          ...p,
          ProjectStartDate: startDate,
          ProjectEndDate: p.IsActive ? null : new Date(startDate.getTime() + 90 * 24 * 60 * 60 * 1000),
          Created: new Date(),
          Modified: new Date(),
        },
      });
      createdProjects.push(proj);
    }
  }
  console.log(`  ✅ Projects: ${createdProjects.length} records\n`);

  // ──────────────────────────────────────
  // 6. EXPENSES (60+ realistic entries)
  // ──────────────────────────────────────
  const expenseCategories = createdCategories.filter(c => c.IsExpense);
  const allUserIds = createdUsers.map(u => u.UserID);

  const expenseTemplates = [
    // Food & Dining
    { cat: 'Food & Dining', details: ['Weekly groceries from BigBasket', 'Dinner at Barbeque Nation', 'Swiggy order - lunch', 'Chai and samosa', 'Dominos pizza night', 'Monthly grocery run', 'Cafe coffee day meeting', 'Zomato dinner delivery', 'Street food at market', 'Ice cream treat'],
      minAmt: 80, maxAmt: 3500 },
    // Transportation
    { cat: 'Transportation', details: ['Uber to office', 'Petrol refill - full tank', 'Ola auto to station', 'Metro monthly pass', 'Parking charges at mall', 'Rapido bike taxi', 'Train ticket to Mumbai', 'Auto rickshaw fare'],
      minAmt: 50, maxAmt: 5000 },
    // Shopping
    { cat: 'Shopping', details: ['Amazon - headphones', 'Myntra - formal shirts', 'Flipkart - kitchen mixer', 'IKEA - desk lamp', 'Decathlon - sports gear', 'New running shoes', 'Phone case and screen guard'],
      minAmt: 300, maxAmt: 15000 },
    // Bills & Utilities
    { cat: 'Bills & Utilities', details: ['Electricity bill - March', 'JioFiber broadband', 'Airtel postpaid recharge', 'DTH recharge - Tata Play', 'Water supply bill', 'Gas cylinder refill', 'Municipal tax payment'],
      minAmt: 200, maxAmt: 4000 },
    // Entertainment
    { cat: 'Entertainment', details: ['Netflix monthly subscription', 'Movie tickets - PVR', 'Spotify Premium annual', 'Gaming purchase - Steam', 'Concert tickets', 'Disney+ Hotstar annual', 'YouTube Premium'],
      minAmt: 150, maxAmt: 3000 },
    // Health & Fitness
    { cat: 'Health & Fitness', details: ['Gym membership renewal', 'Apollo pharmacy - medicines', 'Doctor consultation fee', 'Protein supplements', 'Health checkup package', 'Yoga class monthly fee'],
      minAmt: 200, maxAmt: 8000 },
    // Education
    { cat: 'Education', details: ['Udemy course - React Advanced', 'Amazon Kindle books', 'Coursera specialization', 'Technical certification fee', 'Study materials from bookstore', 'LeetCode premium subscription'],
      minAmt: 300, maxAmt: 12000 },
    // Rent & Housing
    { cat: 'Rent & Housing', details: ['Monthly rent', 'Society maintenance', 'Plumber - pipe repair', 'Electrician visit', 'New curtains for living room', 'AC servicing'],
      minAmt: 500, maxAmt: 25000 },
    // Travel
    { cat: 'Travel', details: ['Flight tickets - Goa trip', 'Hotel booking - Ooty', 'Travel insurance', 'Manali bus tickets', 'AirBnB weekend stay'],
      minAmt: 1000, maxAmt: 30000 },
    // Office Supplies
    { cat: 'Office Supplies', details: ['Printer ink cartridge', 'Notepads and pens', 'Desk organizer', 'Whiteboard markers', 'USB external hard drive', 'Laptop stand'],
      minAmt: 100, maxAmt: 5000 },
  ];

  let expenseCount = 0;
  for (const tmpl of expenseTemplates) {
    const cat = catMap.get(tmpl.cat);
    if (!cat) continue;
    const subs = subCatByParent.get(tmpl.cat) || [];

    // Generate 5-8 expenses per category, spread across last 10 months
    const count = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const userId = pick(allUserIds);
      const userPeoples = createdPeoples.filter(p => p.UserID === userId);
      const detail = pick(tmpl.details);

      await prisma.expenses.create({
        data: {
          ExpenseDate: randomDate(10, 0),
          CategoryID: cat.CategoryID,
          SubCategoryID: subs.length > 0 ? pick(subs).SubCategoryID : null,
          PeopleID: userPeoples.length > 0 ? pick(userPeoples).PeopleID : null,
          ProjectID: Math.random() > 0.6 ? pick(createdProjects).ProjectID : null,
          Amount: randomAmount(tmpl.minAmt, tmpl.maxAmt),
          ExpenseDetail: detail,
          Description: `${tmpl.cat} - ${detail}`,
          UserID: userId,
          Created: new Date(),
          Modified: new Date(),
        },
      });
      expenseCount++;
    }
  }
  console.log(`  ✅ Expenses: ${expenseCount} records\n`);

  // ──────────────────────────────────────
  // 7. INCOMES (40+ realistic entries)
  // ──────────────────────────────────────
  const incomeTemplates = [
    { cat: 'Salary', details: ['Monthly salary - January', 'Monthly salary - February', 'Monthly salary - March', 'Monthly salary - April', 'Monthly salary - May', 'Monthly salary - June', 'Monthly salary - July', 'Monthly salary - August', 'Monthly salary - September', 'Monthly salary - October', 'Performance bonus - Q4', 'Festival bonus - Diwali'],
      minAmt: 35000, maxAmt: 85000 },
    { cat: 'Freelancing', details: ['E-commerce website project', 'Landing page design', 'API development contract', 'WordPress customization', 'Logo design project', 'Mobile app prototype', 'SEO consulting - 3 months', 'Database optimization gig'],
      minAmt: 5000, maxAmt: 75000 },
    { cat: 'Investments', details: ['SBI FD interest', 'Mutual fund dividend', 'Stock dividend - Reliance', 'PPF annual interest', 'Savings account interest', 'NPS returns credited'],
      minAmt: 500, maxAmt: 25000 },
    { cat: 'Business Revenue', details: ['SaaS subscription revenue', 'Product sale - CRM licenses', 'Consulting retainer fee', 'Training workshop income', 'Ad revenue from blog', 'Affiliate commission payment'],
      minAmt: 3000, maxAmt: 50000 },
    { cat: 'Rental Income', details: ['Property rent - January', 'Property rent - February', 'Property rent - March', 'Sublease income', 'Co-working desk rental'],
      minAmt: 8000, maxAmt: 35000 },
    { cat: 'Miscellaneous', details: ['Cashback reward - credit card', 'Refund from cancelled order', 'Gift money received', 'Insurance claim settlement'],
      minAmt: 200, maxAmt: 10000 },
  ];

  let incomeCount = 0;
  for (const tmpl of incomeTemplates) {
    const cat = catMap.get(tmpl.cat);
    if (!cat) continue;
    const subs = subCatByParent.get(tmpl.cat) || [];

    // Generate 4-10 incomes per category
    const count = 4 + Math.floor(Math.random() * 7);
    for (let i = 0; i < count; i++) {
      const userId = pick(allUserIds);
      const userPeoples = createdPeoples.filter(p => p.UserID === userId);
      const detail = pick(tmpl.details);

      await prisma.incomes.create({
        data: {
          IncomeDate: randomDate(10, 0),
          CategoryID: cat.CategoryID,
          SubCategoryID: subs.length > 0 ? pick(subs).SubCategoryID : null,
          PeopleID: userPeoples.length > 0 ? pick(userPeoples).PeopleID : null,
          ProjectID: Math.random() > 0.5 ? pick(createdProjects).ProjectID : null,
          Amount: randomAmount(tmpl.minAmt, tmpl.maxAmt),
          IncomeDetail: detail,
          Description: `${tmpl.cat} - ${detail}`,
          UserID: userId,
          Created: new Date(),
          Modified: new Date(),
        },
      });
      incomeCount++;
    }
  }
  console.log(`  ✅ Incomes: ${incomeCount} records\n`);

  // ──────────────────────────────────────
  // Done!
  // ──────────────────────────────────────
  console.log('─'.repeat(40));
  console.log('🎉 Seeding complete!');
  console.log(`   Users:          ${createdUsers.length}`);
  console.log(`   Peoples:        ${createdPeoples.length}`);
  console.log(`   Categories:     ${createdCategories.length}`);
  console.log(`   Sub-Categories: ${createdSubCategories.length}`);
  console.log(`   Projects:       ${createdProjects.length}`);
  console.log(`   Expenses:       ${expenseCount}`);
  console.log(`   Incomes:        ${incomeCount}`);
  console.log(`\n   Login: admin@expense.com / Password@123`);
  console.log(`   Login: jay@expense.com / Password@123`);
  console.log(`   Login: priya@expense.com / Password@123`);
}

main()
  .catch((e) => {
    console.error('❌ Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
