import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { config } from 'dotenv'

// Load environment variables
config()

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories from dropdown - using upsert to avoid transaction issues
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
    try {
      let category = await prisma.category.findUnique({
        where: { slug: catData.slug },
      })
      if (!category) {
        try {
          category = await prisma.category.create({
            data: catData,
          })
          console.log(`✅ Created category: ${catData.name}`)
        } catch (e: any) {
          // If creation fails, try to find it again (might have been created by another process)
          category = await prisma.category.findUnique({
            where: { slug: catData.slug },
          })
          if (category) {
            console.log(`ℹ️  Category already exists: ${catData.name}`)
          } else {
            console.error(`❌ Failed to create category: ${catData.name}`, e.message)
          }
        }
      } else {
        console.log(`ℹ️  Category already exists: ${catData.name}`)
      }
      if (category) {
        categories[catData.slug] = category
      }
    } catch (e: any) {
      console.error(`Error processing category ${catData.name}:`, e.message)
    }
  }
  
  console.log(`Total categories created/found: ${Object.keys(categories).length}`)

  // Keep old categories for backward compatibility - ensure we have valid categories
  let partsCategory = categories['structural-components'] || categories['engine-parts'] || Object.values(categories)[0]
  let toolsCategory = categories['tools-equipment'] || categories['structural-components'] || Object.values(categories)[0]
  
  if (!partsCategory || !toolsCategory) {
    throw new Error('Failed to create categories. Please check MongoDB connection.')
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  let admin = await prisma.user.findUnique({
    where: { email: 'admin@uraerotech.com' },
  })
  if (!admin) {
    try {
      admin = await prisma.user.create({
        data: {
          email: 'admin@uraerotech.com',
          name: 'Admin User',
          role: 'ADMIN',
          password: hashedPassword,
        },
      })
    } catch (e: any) {
      admin = await prisma.user.findUnique({
        where: { email: 'admin@uraerotech.com' },
      })
    }
  }

  // Create sample B2B user
  let b2bUser = await prisma.user.findUnique({
    where: { email: 'b2b@example.com' },
  })
  if (!b2bUser) {
    try {
      b2bUser = await prisma.user.create({
        data: {
          email: 'b2b@example.com',
          name: 'Business Client',
          role: 'B2B',
          password: hashedPassword,
        },
      })
    } catch (e: any) {
      b2bUser = await prisma.user.findUnique({
        where: { email: 'b2b@example.com' },
      })
    }
  }

  // Create services
  const services = [
    {
      name: 'Aircraft Structural Repair',
      slug: 'aircraft-structural-repair',
      description: 'Expert structural repair services ensuring airworthiness and compliance with aviation standards.',
      content: 'Our aircraft structural repair services are designed to restore your aircraft to full airworthiness. We provide comprehensive structural repair solutions that meet or exceed FAA and international aviation standards. Our certified engineers and technicians have extensive experience in repairing various types of structural damage, from minor dents to major structural components. We ensure all repairs are documented, certified, and compliant with regulatory requirements.',
      isActive: true,
    },
    {
      name: 'Aircraft Structure Modifications',
      slug: 'aircraft-structure-modifications',
      description: 'Professional modification services for aircraft structures, tailored to your specific requirements.',
      content: 'We offer professional aircraft structure modification services customized to meet your specific operational needs. Our team of certified engineers works closely with you to design and implement structural modifications that enhance performance, accommodate new equipment, or meet updated regulatory requirements. All modifications are executed with precision, fully documented, and certified for airworthiness.',
      isActive: true,
    },
    {
      name: 'Aircraft Service Bulletin Compliance',
      slug: 'aircraft-service-bulletin-compliance',
      description: 'Comprehensive service bulletin compliance services to keep your aircraft current and compliant.',
      content: 'Stay compliant with all manufacturer service bulletins and regulatory requirements. Our comprehensive service bulletin compliance services ensure your aircraft remains current and meets all mandatory and recommended service bulletin requirements. We maintain detailed tracking of all service bulletins applicable to your aircraft, coordinate necessary modifications or inspections, and provide complete documentation for your records.',
      isActive: true,
    },
    {
      name: 'Aircraft Parts Supply',
      slug: 'aircraft-parts-supply',
      description: 'Reliable sourcing and supply of certified aircraft parts from trusted manufacturers.',
      content: 'We provide reliable sourcing and supply of certified aircraft parts from trusted manufacturers worldwide. Our extensive network of suppliers ensures we can locate and procure genuine, certified parts for your aircraft needs. All parts are verified for authenticity, certification, and compliance with aviation standards. We handle the entire procurement process, from sourcing to delivery, ensuring you receive quality parts when you need them.',
      isActive: true,
    },
    {
      name: 'Aviation Tools Sales',
      slug: 'aviation-tools-sales',
      description: 'Premium aviation tools and equipment for professional aircraft maintenance and repair.',
      content: 'We offer a comprehensive selection of premium aviation tools and equipment designed for professional aircraft maintenance and repair operations. Our inventory includes specialized tools from leading manufacturers, all certified and calibrated to meet aviation industry standards. Whether you need hand tools, precision instruments, or specialized equipment, we can provide the right tools for your maintenance needs.',
      isActive: true,
    },
    {
      name: 'Aviation Tool Rental',
      slug: 'aviation-tool-rental',
      description: 'Flexible tool rental solutions for short-term projects and specialized maintenance needs.',
      content: 'Need specialized aviation tools for a short-term project? Our flexible tool rental program provides access to premium aviation tools and equipment without the upfront investment. Perfect for one-time repairs, special projects, or when you need specialized equipment that you don\'t use regularly. All rental tools are certified, calibrated, and maintained to the highest standards. We offer flexible rental terms to accommodate your project timeline and budget.',
      isActive: true,
    },
  ]

  for (const service of services) {
    const existingService = await prisma.service.findUnique({
      where: { slug: service.slug },
    })
    if (existingService) {
      await prisma.service.update({
        where: { slug: service.slug },
        data: {
          name: service.name,
          description: service.description,
          content: service.content,
          isActive: service.isActive,
        },
      })
    } else {
      try {
        await prisma.service.create({
          data: service,
        })
      } catch (e: any) {
        // Service might already exist, continue
        console.log(`Service ${service.slug} might already exist`)
      }
    }
  }

  // Create sample products
  const products = [
    {
      name: 'Aircraft Engine Mount',
      slug: 'aircraft-engine-mount',
      description: 'High-quality engine mount for commercial aircraft. Certified and tested.',
      categoryId: partsCategory.id,
      price: 12500.00,
      stock: 5,
      images: ['/images/products/engine-mount.jpg'],
      isFeatured: true,
    },
    {
      name: 'Aviation Torque Wrench Set',
      slug: 'aviation-torque-wrench-set',
      description: 'Professional-grade torque wrench set for aircraft maintenance.',
      categoryId: toolsCategory.id,
      price: 850.00,
      stock: 12,
      images: ['/images/products/torque-wrench.jpg'],
      isFeatured: true,
    },
    {
      name: 'Aircraft Landing Gear Assembly',
      slug: 'aircraft-landing-gear-assembly',
      description: 'Complete landing gear assembly for mid-size commercial aircraft.',
      categoryId: partsCategory.id,
      price: 45000.00,
      stock: 2,
      images: ['/images/products/landing-gear.jpg'],
      isFeatured: false,
    },
    {
      name: 'Composite Repair Kit',
      slug: 'composite-repair-kit',
      description: 'Complete composite repair kit with all necessary materials and tools.',
      categoryId: toolsCategory.id,
      price: 1200.00,
      stock: 8,
      images: ['/images/products/composite-kit.jpg'],
      isFeatured: true,
    },
  ]

  for (const product of products) {
    const existingProduct = await prisma.product.findUnique({
      where: { slug: product.slug },
    })
    if (!existingProduct) {
      try {
        await prisma.product.create({
          data: product,
        })
      } catch (e: any) {
        console.log(`Product ${product.slug} might already exist or category not found`)
      }
    }
  }

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

