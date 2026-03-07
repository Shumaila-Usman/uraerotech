import { fileDb } from '../lib/file-db'
import * as bcrypt from 'bcryptjs'

type UserRole = 'ADMIN' | 'B2B' | 'B2C'

async function seed() {
  console.log('🌱 Seeding file-based database...')

  // 1. Create Categories
  console.log('📦 Creating categories...')
  const categoryData = [
    { name: 'Structural Components', slug: 'structural-components', description: 'Aircraft structural parts and components' },
    { name: 'Engine Parts', slug: 'engine-parts', description: 'Aircraft engine components and accessories' },
    { name: 'Avionics & Electronics', slug: 'avionics-electronics', description: 'Avionics systems and electronic components' },
    { name: 'Landing Gear', slug: 'landing-gear', description: 'Landing gear assemblies and components' },
    { name: 'Interior Components', slug: 'interior-components', description: 'Aircraft interior parts and furnishings' },
    { name: 'Tools & Equipment', slug: 'tools-equipment', description: 'Professional aviation tools and equipment' },
    { name: 'Fasteners & Hardware', slug: 'fasteners-hardware', description: 'Aircraft fasteners, bolts, and hardware' },
    { name: 'Hydraulic Systems', slug: 'hydraulic-systems', description: 'Hydraulic components and systems' },
    { name: 'Electrical Components', slug: 'electrical-components', description: 'Electrical parts and wiring components' },
    { name: 'Fuel Systems', slug: 'fuel-systems', description: 'Fuel system components and accessories' },
  ]

  const categories: Record<string, any> = {}
  for (const catData of categoryData) {
    const existing = fileDb.findUnique<any>('Category', { slug: catData.slug })
    if (!existing) {
      const category = fileDb.create('Category', catData)
      categories[catData.slug] = category
      console.log(`✅ Created category: ${catData.name}`)
    } else {
      categories[catData.slug] = existing
      console.log(`ℹ️  Category already exists: ${catData.name}`)
    }
  }

  // 2. Create Sample Products
  console.log('🛒 Creating products...')
  const products = [
    {
      name: 'Aircraft Engine Mount',
      slug: 'aircraft-engine-mount',
      description: 'High-quality engine mount for commercial aircraft. Certified and tested.',
      categoryId: categories['structural-components']?.id,
      price: 12500.00,
      stock: 5,
      images: ['/images/products/engine-mount.jpg'],
      isFeatured: true,
    },
    {
      name: 'Aviation Torque Wrench Set',
      slug: 'aviation-torque-wrench-set',
      description: 'Professional-grade torque wrench set for aircraft maintenance.',
      categoryId: categories['tools-equipment']?.id,
      price: 850.00,
      stock: 12,
      images: ['/images/products/torque-wrench.jpg'],
      isFeatured: true,
    },
    {
      name: 'Aircraft Landing Gear Assembly',
      slug: 'aircraft-landing-gear-assembly',
      description: 'Complete landing gear assembly for mid-size commercial aircraft.',
      categoryId: categories['landing-gear']?.id,
      price: 45000.00,
      stock: 2,
      images: ['/images/products/landing-gear.jpg'],
      isFeatured: false,
    },
    {
      name: 'Composite Repair Kit',
      slug: 'composite-repair-kit',
      description: 'Complete composite repair kit with all necessary materials and tools.',
      categoryId: categories['tools-equipment']?.id,
      price: 1200.00,
      stock: 8,
      images: ['/images/products/composite-kit.jpg'],
      isFeatured: true,
    },
    {
      name: 'Hydraulic Pump Assembly',
      slug: 'hydraulic-pump-assembly',
      description: 'High-pressure hydraulic pump for aircraft systems.',
      categoryId: categories['hydraulic-systems']?.id,
      price: 8500.00,
      stock: 4,
      images: ['/images/products/hydraulic-pump.jpg'],
      isFeatured: false,
    },
    {
      name: 'Fuel Filter Assembly',
      slug: 'fuel-filter-assembly',
      description: 'Certified fuel filter assembly for aircraft fuel systems.',
      categoryId: categories['fuel-systems']?.id,
      price: 450.00,
      stock: 15,
      images: ['/images/products/fuel-filter.jpg'],
      isFeatured: false,
    },
  ]

  for (const productData of products) {
    const existing = fileDb.findUnique<any>('Product', { slug: productData.slug })
    if (!existing) {
      fileDb.create('Product', productData)
      console.log(`✅ Created product: ${productData.name}`)
    } else {
      console.log(`ℹ️  Product already exists: ${productData.name}`)
    }
  }

  // 3. Create Admin User
  console.log('👤 Creating admin user...')
  const adminEmail = 'admin@uraerotech.com'
  const existingAdmin = fileDb.findUnique<any>('User', { email: adminEmail })
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    fileDb.create('User', {
      email: adminEmail,
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN' as UserRole,
    })
    console.log('✅ Created admin user: admin@uraerotech.com / admin123')
  } else {
    console.log('ℹ️  Admin user already exists')
  }

  // 4. Create Sample B2B User
  console.log('👤 Creating B2B user...')
  const b2bEmail = 'b2b@example.com'
  const existingB2B = fileDb.findUnique<any>('User', { email: b2bEmail })
  if (!existingB2B) {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    fileDb.create('User', {
      email: b2bEmail,
      name: 'B2B User',
      password: hashedPassword,
      role: 'B2B' as UserRole,
    })
    console.log('✅ Created B2B user: b2b@example.com / admin123')
  } else {
    console.log('ℹ️  B2B user already exists')
  }

  console.log('✅ Seeding completed!')
  console.log('\n📝 Default credentials:')
  console.log('   Admin: admin@uraerotech.com / admin123')
  console.log('   B2B:   b2b@example.com / admin123')
}

seed().catch(console.error)

