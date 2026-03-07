export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
}

export const productCategories: ProductCategory[] = [
  {
    id: '1',
    name: 'Structural Components',
    slug: 'structural-components',
    description: 'Aircraft structural parts and components',
    icon: '🔩',
  },
  {
    id: '2',
    name: 'Engine Parts',
    slug: 'engine-parts',
    description: 'Aircraft engine components and accessories',
    icon: '⚙️',
  },
  {
    id: '3',
    name: 'Avionics & Electronics',
    slug: 'avionics-electronics',
    description: 'Avionics systems and electronic components',
    icon: '📡',
  },
  {
    id: '4',
    name: 'Landing Gear',
    slug: 'landing-gear',
    description: 'Landing gear assemblies and components',
    icon: '🛬',
  },
  {
    id: '5',
    name: 'Interior Components',
    slug: 'interior-components',
    description: 'Aircraft interior parts and furnishings',
    icon: '🪑',
  },
  {
    id: '6',
    name: 'Tools & Equipment',
    slug: 'tools-equipment',
    description: 'Professional aviation tools and equipment',
    icon: '🔧',
  },
  {
    id: '7',
    name: 'Fasteners & Hardware',
    slug: 'fasteners-hardware',
    description: 'Aircraft fasteners, bolts, and hardware',
    icon: '📎',
  },
  {
    id: '8',
    name: 'Hydraulic Systems',
    slug: 'hydraulic-systems',
    description: 'Hydraulic components and systems',
    icon: '💧',
  },
  {
    id: '9',
    name: 'Electrical Components',
    slug: 'electrical-components',
    description: 'Electrical parts and wiring components',
    icon: '⚡',
  },
  {
    id: '10',
    name: 'Fuel Systems',
    slug: 'fuel-systems',
    description: 'Fuel system components and accessories',
    icon: '⛽',
  },
]

export function getAllCategories(): ProductCategory[] {
  return productCategories
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug)
}


