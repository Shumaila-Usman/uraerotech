// Direct MongoDB seeding script (bypasses Prisma transaction requirements)
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017/uraerotech';
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('uraerotech');
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    // await db.collection('Category').deleteMany({});
    // await db.collection('Product').deleteMany({});
    // await db.collection('Service').deleteMany({});
    // await db.collection('User').deleteMany({});
    
    // 1. Create Categories
    console.log('📦 Creating categories...');
    const categories = [
      { _id: new ObjectId(), name: 'Structural Components', slug: 'structural-components', description: 'Aircraft structural parts and components', createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), name: 'Engine Parts', slug: 'engine-parts', description: 'Aircraft engine components and accessories', createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), name: 'Avionics & Electronics', slug: 'avionics-electronics', description: 'Avionics systems and electronic components', createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), name: 'Landing Gear', slug: 'landing-gear', description: 'Landing gear assemblies and components', createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), name: 'Interior Components', slug: 'interior-components', description: 'Aircraft interior parts and furnishings', createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), name: 'Tools & Equipment', slug: 'tools-equipment', description: 'Professional aviation tools and equipment', createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), name: 'Fasteners & Hardware', slug: 'fasteners-hardware', description: 'Aircraft fasteners, bolts, and hardware', createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), name: 'Hydraulic Systems', slug: 'hydraulic-systems', description: 'Hydraulic components and systems', createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), name: 'Electrical Components', slug: 'electrical-components', description: 'Electrical parts and wiring components', createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), name: 'Fuel Systems', slug: 'fuel-systems', description: 'Fuel system components and accessories', createdAt: new Date(), updatedAt: new Date() },
    ];
    
    for (const category of categories) {
      const existing = await db.collection('Category').findOne({ slug: category.slug });
      if (existing) {
        const { _id, ...categoryWithoutId } = category;
        await db.collection('Category').updateOne(
          { slug: category.slug },
          { $set: categoryWithoutId }
        );
      } else {
        await db.collection('Category').insertOne(category);
      }
    }
    console.log(`✅ Created ${categories.length} categories`);
    
    // Get all category IDs
    const structuralCategory = await db.collection('Category').findOne({ slug: 'structural-components' });
    const engineCategory = await db.collection('Category').findOne({ slug: 'engine-parts' });
    const avionicsCategory = await db.collection('Category').findOne({ slug: 'avionics-electronics' });
    const landingGearCategory = await db.collection('Category').findOne({ slug: 'landing-gear' });
    const interiorCategory = await db.collection('Category').findOne({ slug: 'interior-components' });
    const toolsCategory = await db.collection('Category').findOne({ slug: 'tools-equipment' });
    const fastenersCategory = await db.collection('Category').findOne({ slug: 'fasteners-hardware' });
    const hydraulicCategory = await db.collection('Category').findOne({ slug: 'hydraulic-systems' });
    const electricalCategory = await db.collection('Category').findOne({ slug: 'electrical-components' });
    const fuelCategory = await db.collection('Category').findOne({ slug: 'fuel-systems' });
    
    // 2. Create Products - at least 10 per category
    console.log('🛒 Creating products...');
    const products = [];
    
    // Structural Components (10 products)
    const structuralProducts = [
      { name: 'Aircraft Engine Mount', slug: 'aircraft-engine-mount', description: 'High-quality engine mount for commercial aircraft. This certified and tested component provides exceptional structural support for aircraft engines, ensuring optimal performance and safety. Manufactured to meet strict FAA and EASA standards, this engine mount features advanced materials and precision engineering. Suitable for various commercial aircraft models, it offers excellent vibration dampening and long-term reliability. Complete with all necessary mounting hardware and certification documentation.', price: 12500.00, stock: 5, isFeatured: true },
      { name: 'Wing Spar Assembly', slug: 'wing-spar-assembly', description: 'Primary structural wing spar assembly designed for commercial aircraft applications. This critical component forms the backbone of the aircraft wing structure, providing essential load-bearing capabilities. Engineered with high-strength materials and precision manufacturing, this assembly ensures maximum structural integrity and airworthiness. Includes all necessary attachment points, brackets, and hardware. Fully certified and documented for immediate installation. Suitable for major structural repairs and modifications.', price: 35000.00, stock: 3, isFeatured: true },
      { name: 'Fuselage Frame Section', slug: 'fuselage-frame-section', description: 'Certified fuselage frame section specifically designed for structural repairs and modifications. This precision-engineered component maintains the structural integrity of the aircraft fuselage while providing flexibility for various repair scenarios. Manufactured from high-grade aluminum alloys with corrosion-resistant treatments. Includes detailed installation instructions and certification paperwork. Compatible with multiple aircraft models and repair procedures. Ideal for both scheduled maintenance and emergency structural repairs.', price: 18000.00, stock: 4, isFeatured: false },
      { name: 'Bulkhead Assembly', slug: 'bulkhead-assembly', description: 'Aircraft bulkhead assembly meeting and exceeding FAA standards for structural components. This essential component provides critical structural separation and load distribution within the aircraft fuselage. Features advanced design for optimal weight-to-strength ratio while maintaining maximum safety margins. Includes all mounting hardware, seals, and gaskets required for proper installation. Complete with engineering drawings, installation procedures, and certification documentation. Suitable for both new installations and replacement applications.', price: 22000.00, stock: 2, isFeatured: false },
      { name: 'Stringer Replacement Kit', slug: 'stringer-replacement-kit', description: 'Complete stringer replacement kit designed for comprehensive structural repairs. This comprehensive kit includes all necessary components for stringer replacement including the stringer sections, attachment hardware, bonding materials, and detailed installation instructions. All components are pre-inspected and certified for immediate use. The kit is designed to accommodate various repair scenarios and aircraft configurations. Includes quality assurance documentation and compliance certificates. Perfect for maintenance facilities performing structural repairs.', price: 8500.00, stock: 6, isFeatured: false },
      { name: 'Rib Assembly Set', slug: 'rib-assembly-set', description: 'Aircraft rib assembly set specifically designed for wing structural components. This complete set includes multiple rib sections, attachment brackets, and all necessary hardware for proper installation. Each component is precision-machined to exact specifications ensuring perfect fit and alignment. The set is designed to maintain the aerodynamic profile while providing maximum structural support. Includes detailed engineering drawings and step-by-step installation procedures. All components are certified and ready for immediate use in structural repairs.', price: 12000.00, stock: 5, isFeatured: false },
      { name: 'Skin Panel Section', slug: 'skin-panel-section', description: 'Certified aircraft skin panel section engineered for precision repairs and replacements. This high-quality component maintains the exact contour and aerodynamic properties of the original panel while providing superior structural integrity. Manufactured from premium aluminum alloys with advanced surface treatments for corrosion resistance. Includes all necessary edge treatments, attachment points, and sealing provisions. Complete with certification documentation and installation guidelines. Suitable for both minor repairs and major structural replacements.', price: 9500.00, stock: 8, isFeatured: false },
      { name: 'Frame Repair Kit', slug: 'frame-repair-kit', description: 'Complete frame repair kit containing all necessary components for comprehensive structural frame repairs. This comprehensive kit includes frame sections, reinforcement plates, bonding materials, fasteners, and detailed repair procedures. All components are pre-qualified and certified for structural applications. The kit is designed to address various frame damage scenarios from minor cracks to major structural repairs. Includes quality control documentation and compliance certificates. Ideal for maintenance facilities performing structural frame repairs and modifications.', price: 15000.00, stock: 4, isFeatured: true },
      { name: 'Structural Bonding Adhesive', slug: 'structural-bonding-adhesive', description: 'High-strength structural bonding adhesive specifically formulated for aircraft structural repairs and modifications. This advanced adhesive system provides exceptional bond strength, durability, and resistance to environmental factors including temperature extremes, moisture, and chemical exposure. Meets all aviation industry standards for structural bonding applications. Suitable for bonding various aircraft materials including aluminum, composites, and other structural materials. Includes detailed application instructions, mixing procedures, and safety guidelines. Certified for use in critical structural applications.', price: 450.00, stock: 15, isFeatured: false },
      { name: 'Reinforcement Plate Set', slug: 'reinforcement-plate-set', description: 'Aircraft reinforcement plate set designed for structural modifications and repairs. This comprehensive set includes various sizes and configurations of reinforcement plates to accommodate different repair scenarios. All plates are precision-machined from high-strength materials and include pre-drilled attachment holes. The set is designed to provide additional structural support in areas requiring reinforcement due to modifications or repairs. Includes installation templates, hardware, and detailed procedures. All components are certified and documented for structural applications.', price: 6800.00, stock: 7, isFeatured: false },
    ];
    structuralProducts.forEach(p => products.push({ ...p, categoryId: structuralCategory._id, _id: new ObjectId(), images: [`/images/products/${p.slug}.jpg`], createdAt: new Date(), updatedAt: new Date() }));
    
    // Engine Parts (10 products)
    const engineProducts = [
      { name: 'Aircraft Fuel Pump Assembly', slug: 'aircraft-fuel-pump-assembly', description: 'Certified fuel pump assembly for commercial aircraft fuel systems.', price: 8500.00, stock: 4, isFeatured: false },
      { name: 'Turbine Blade Set', slug: 'turbine-blade-set', description: 'Certified turbine blade set for aircraft engines.', price: 45000.00, stock: 2, isFeatured: true },
      { name: 'Compressor Section Assembly', slug: 'compressor-section-assembly', description: 'Engine compressor section assembly with full certification.', price: 65000.00, stock: 1, isFeatured: true },
      { name: 'Engine Mount Bracket', slug: 'engine-mount-bracket', description: 'Heavy-duty engine mount bracket for commercial aircraft.', price: 12000.00, stock: 3, isFeatured: false },
      { name: 'Oil Filter Assembly', slug: 'oil-filter-assembly', description: 'Aircraft engine oil filter assembly meeting OEM specifications.', price: 850.00, stock: 12, isFeatured: false },
      { name: 'Ignition System Module', slug: 'ignition-system-module', description: 'Complete ignition system module for aircraft engines.', price: 15000.00, stock: 5, isFeatured: false },
      { name: 'Exhaust Manifold', slug: 'exhaust-manifold', description: 'Certified exhaust manifold for aircraft engines.', price: 18000.00, stock: 3, isFeatured: false },
      { name: 'Engine Control Unit', slug: 'engine-control-unit', description: 'Advanced engine control unit with full certification.', price: 35000.00, stock: 2, isFeatured: true },
      { name: 'Fuel Injector Set', slug: 'fuel-injector-set', description: 'Precision fuel injector set for aircraft engines.', price: 12000.00, stock: 6, isFeatured: false },
      { name: 'Thrust Reverser Assembly', slug: 'thrust-reverser-assembly', description: 'Complete thrust reverser assembly for commercial aircraft.', price: 85000.00, stock: 1, isFeatured: true },
    ];
    engineProducts.forEach(p => products.push({ ...p, categoryId: engineCategory._id, _id: new ObjectId(), images: [`/images/products/${p.slug}.jpg`], createdAt: new Date(), updatedAt: new Date() }));
    
    // Avionics & Electronics (10 products)
    const avionicsProducts = [
      { name: 'Avionics Control Unit', slug: 'avionics-control-unit', description: 'Advanced avionics control unit with full certification.', price: 15000.00, stock: 3, isFeatured: true },
      { name: 'Flight Management System', slug: 'flight-management-system', description: 'Complete flight management system for commercial aircraft.', price: 125000.00, stock: 1, isFeatured: true },
      { name: 'Navigation Display Unit', slug: 'navigation-display-unit', description: 'High-resolution navigation display unit.', price: 18000.00, stock: 4, isFeatured: false },
      { name: 'Transponder System', slug: 'transponder-system', description: 'Certified transponder system meeting international standards.', price: 12000.00, stock: 5, isFeatured: false },
      { name: 'Weather Radar System', slug: 'weather-radar-system', description: 'Advanced weather radar system for aircraft.', price: 95000.00, stock: 1, isFeatured: true },
      { name: 'Autopilot Computer', slug: 'autopilot-computer', description: 'Certified autopilot computer system.', price: 45000.00, stock: 2, isFeatured: true },
      { name: 'Radio Communication Unit', slug: 'radio-communication-unit', description: 'Aircraft radio communication unit with multiple channels.', price: 15000.00, stock: 6, isFeatured: false },
      { name: 'GPS Navigation Module', slug: 'gps-navigation-module', description: 'Precision GPS navigation module for aircraft.', price: 8500.00, stock: 8, isFeatured: false },
      { name: 'Traffic Collision Avoidance System', slug: 'traffic-collision-avoidance-system', description: 'TCAS system for enhanced flight safety.', price: 65000.00, stock: 2, isFeatured: true },
      { name: 'Electronic Flight Instrument Display', slug: 'electronic-flight-instrument-display', description: 'Advanced EFIS display system for modern cockpits.', price: 35000.00, stock: 3, isFeatured: false },
    ];
    avionicsProducts.forEach(p => products.push({ ...p, categoryId: avionicsCategory._id, _id: new ObjectId(), images: [`/images/products/${p.slug}.jpg`], createdAt: new Date(), updatedAt: new Date() }));
    
    // Landing Gear (10 products)
    const landingGearProducts = [
      { name: 'Aircraft Landing Gear Assembly', slug: 'aircraft-landing-gear-assembly', description: 'Complete landing gear assembly for mid-size commercial aircraft.', price: 45000.00, stock: 2, isFeatured: false },
      { name: 'Main Landing Gear Strut', slug: 'main-landing-gear-strut', description: 'Certified main landing gear strut assembly.', price: 35000.00, stock: 3, isFeatured: true },
      { name: 'Nose Landing Gear Assembly', slug: 'nose-landing-gear-assembly', description: 'Complete nose landing gear assembly with steering mechanism.', price: 28000.00, stock: 4, isFeatured: false },
      { name: 'Landing Gear Actuator', slug: 'landing-gear-actuator', description: 'Hydraulic landing gear actuator assembly.', price: 15000.00, stock: 5, isFeatured: false },
      { name: 'Wheel Assembly Set', slug: 'wheel-assembly-set', description: 'Complete wheel assembly set for landing gear.', price: 12000.00, stock: 6, isFeatured: false },
      { name: 'Brake Assembly Kit', slug: 'brake-assembly-kit', description: 'Aircraft brake assembly kit for landing gear.', price: 18000.00, stock: 4, isFeatured: false },
      { name: 'Landing Gear Door', slug: 'landing-gear-door', description: 'Certified landing gear door assembly.', price: 8500.00, stock: 8, isFeatured: false },
      { name: 'Shock Absorber Assembly', slug: 'shock-absorber-assembly', description: 'Landing gear shock absorber assembly.', price: 22000.00, stock: 3, isFeatured: true },
      { name: 'Landing Gear Lock Mechanism', slug: 'landing-gear-lock-mechanism', description: 'Safety lock mechanism for landing gear.', price: 6500.00, stock: 10, isFeatured: false },
      { name: 'Tire and Rim Set', slug: 'tire-and-rim-set', description: 'Aircraft tire and rim set for landing gear.', price: 4500.00, stock: 12, isFeatured: false },
    ];
    landingGearProducts.forEach(p => products.push({ ...p, categoryId: landingGearCategory._id, _id: new ObjectId(), images: [`/images/products/${p.slug}.jpg`], createdAt: new Date(), updatedAt: new Date() }));
    
    // Interior Components (10 products)
    const interiorProducts = [
      { name: 'Passenger Seat Assembly', slug: 'passenger-seat-assembly', description: 'Certified passenger seat assembly for commercial aircraft.', price: 2500.00, stock: 20, isFeatured: false },
      { name: 'Cabin Overhead Bin', slug: 'cabin-overhead-bin', description: 'Aircraft cabin overhead storage bin assembly.', price: 4500.00, stock: 15, isFeatured: false },
      { name: 'Galley Unit Assembly', slug: 'galley-unit-assembly', description: 'Complete galley unit assembly for aircraft cabin.', price: 18000.00, stock: 4, isFeatured: true },
      { name: 'Lavatory Module', slug: 'lavatory-module', description: 'Aircraft lavatory module with all fixtures.', price: 25000.00, stock: 3, isFeatured: false },
      { name: 'Cabin Lighting System', slug: 'cabin-lighting-system', description: 'LED cabin lighting system for aircraft interiors.', price: 8500.00, stock: 8, isFeatured: false },
      { name: 'Carpet and Flooring Kit', slug: 'carpet-and-flooring-kit', description: 'Aircraft-grade carpet and flooring kit.', price: 6500.00, stock: 10, isFeatured: false },
      { name: 'Window Assembly Set', slug: 'window-assembly-set', description: 'Aircraft window assembly set with frames.', price: 12000.00, stock: 6, isFeatured: false },
      { name: 'Cabin Panel Set', slug: 'cabin-panel-set', description: 'Interior cabin panel set for aircraft.', price: 9500.00, stock: 7, isFeatured: false },
      { name: 'Seat Track System', slug: 'seat-track-system', description: 'Aircraft seat track system for flexible seating.', price: 15000.00, stock: 5, isFeatured: true },
      { name: 'Cabin Air Ventilation Unit', slug: 'cabin-air-ventilation-unit', description: 'Cabin air ventilation and climate control unit.', price: 22000.00, stock: 3, isFeatured: false },
    ];
    interiorProducts.forEach(p => products.push({ ...p, categoryId: interiorCategory._id, _id: new ObjectId(), images: [`/images/products/${p.slug}.jpg`], createdAt: new Date(), updatedAt: new Date() }));
    
    // Tools & Equipment (10 products)
    const toolsProducts = [
      { name: 'Aviation Torque Wrench Set', slug: 'aviation-torque-wrench-set', description: 'Professional-grade torque wrench set for aircraft maintenance.', price: 850.00, stock: 12, isFeatured: true },
      { name: 'Composite Repair Kit', slug: 'composite-repair-kit', description: 'Complete composite repair kit with all necessary materials and tools.', price: 1200.00, stock: 8, isFeatured: true },
      { name: 'Rivet Gun Set', slug: 'rivet-gun-set', description: 'Professional aircraft rivet gun set with multiple attachments.', price: 650.00, stock: 15, isFeatured: false },
      { name: 'Sheet Metal Forming Tools', slug: 'sheet-metal-forming-tools', description: 'Complete set of sheet metal forming tools for aircraft repairs.', price: 1800.00, stock: 6, isFeatured: false },
      { name: 'Borescope Inspection Camera', slug: 'borescope-inspection-camera', description: 'High-resolution borescope camera for engine inspection.', price: 3500.00, stock: 4, isFeatured: true },
      { name: 'Calibrated Pressure Gauge Set', slug: 'calibrated-pressure-gauge-set', description: 'Certified pressure gauge set for aircraft systems.', price: 1200.00, stock: 10, isFeatured: false },
      { name: 'Wire Stripping Tool Set', slug: 'wire-stripping-tool-set', description: 'Precision wire stripping tool set for electrical work.', price: 450.00, stock: 18, isFeatured: false },
      { name: 'Hydraulic Test Bench', slug: 'hydraulic-test-bench', description: 'Professional hydraulic test bench for component testing.', price: 15000.00, stock: 2, isFeatured: true },
      { name: 'Aircraft Jack Set', slug: 'aircraft-jack-set', description: 'Heavy-duty aircraft jack set for maintenance operations.', price: 8500.00, stock: 3, isFeatured: false },
      { name: 'Crimping Tool Kit', slug: 'crimping-tool-kit', description: 'Complete crimping tool kit for electrical connections.', price: 750.00, stock: 12, isFeatured: false },
    ];
    toolsProducts.forEach(p => products.push({ ...p, categoryId: toolsCategory._id, _id: new ObjectId(), images: [`/images/products/${p.slug}.jpg`], createdAt: new Date(), updatedAt: new Date() }));
    
    // Fasteners & Hardware (10 products)
    const fastenersProducts = [
      { name: 'Aircraft Rivet Set', slug: 'aircraft-rivet-set', description: 'Certified aircraft rivet set in various sizes.', price: 350.00, stock: 25, isFeatured: false },
      { name: 'High-Strength Bolt Kit', slug: 'high-strength-bolt-kit', description: 'Aircraft-grade high-strength bolt kit.', price: 850.00, stock: 15, isFeatured: false },
      { name: 'Locking Nut Assortment', slug: 'locking-nut-assortment', description: 'Complete locking nut assortment for aircraft applications.', price: 650.00, stock: 20, isFeatured: false },
      { name: 'Washer Set Collection', slug: 'washer-set-collection', description: 'Aircraft washer set collection in standard sizes.', price: 250.00, stock: 30, isFeatured: false },
      { name: 'Quick Release Pin Set', slug: 'quick-release-pin-set', description: 'Aircraft quick release pin set for maintenance.', price: 450.00, stock: 18, isFeatured: false },
      { name: 'Threaded Insert Kit', slug: 'threaded-insert-kit', description: 'Complete threaded insert kit for composite repairs.', price: 550.00, stock: 12, isFeatured: false },
      { name: 'Safety Wire Kit', slug: 'safety-wire-kit', description: 'Aircraft safety wire kit with tools.', price: 180.00, stock: 22, isFeatured: false },
      { name: 'Cotter Pin Assortment', slug: 'cotter-pin-assortment', description: 'Aircraft cotter pin assortment in various sizes.', price: 120.00, stock: 35, isFeatured: false },
      { name: 'Hinge Pin Set', slug: 'hinge-pin-set', description: 'Certified hinge pin set for control surfaces.', price: 750.00, stock: 10, isFeatured: false },
      { name: 'Clevis Pin Assembly', slug: 'clevis-pin-assembly', description: 'Aircraft clevis pin assembly set.', price: 450.00, stock: 15, isFeatured: false },
    ];
    fastenersProducts.forEach(p => products.push({ ...p, categoryId: fastenersCategory._id, _id: new ObjectId(), images: [`/images/products/${p.slug}.jpg`], createdAt: new Date(), updatedAt: new Date() }));
    
    // Hydraulic Systems (10 products)
    const hydraulicProducts = [
      { name: 'Hydraulic Pump Assembly', slug: 'hydraulic-pump-assembly', description: 'Certified hydraulic pump assembly for aircraft systems.', price: 25000.00, stock: 3, isFeatured: true },
      { name: 'Hydraulic Actuator', slug: 'hydraulic-actuator', description: 'Aircraft hydraulic actuator for control surfaces.', price: 18000.00, stock: 4, isFeatured: false },
      { name: 'Hydraulic Reservoir', slug: 'hydraulic-reservoir', description: 'Aircraft hydraulic fluid reservoir assembly.', price: 8500.00, stock: 6, isFeatured: false },
      { name: 'Hydraulic Filter Element', slug: 'hydraulic-filter-element', description: 'Certified hydraulic filter element for fluid systems.', price: 450.00, stock: 20, isFeatured: false },
      { name: 'Hydraulic Hose Assembly', slug: 'hydraulic-hose-assembly', description: 'High-pressure hydraulic hose assembly set.', price: 1200.00, stock: 12, isFeatured: false },
      { name: 'Hydraulic Valve Block', slug: 'hydraulic-valve-block', description: 'Aircraft hydraulic valve block assembly.', price: 15000.00, stock: 4, isFeatured: true },
      { name: 'Hydraulic Accumulator', slug: 'hydraulic-accumulator', description: 'Certified hydraulic accumulator for pressure systems.', price: 9500.00, stock: 5, isFeatured: false },
      { name: 'Hydraulic Fitting Set', slug: 'hydraulic-fitting-set', description: 'Complete hydraulic fitting set for system repairs.', price: 850.00, stock: 15, isFeatured: false },
      { name: 'Hydraulic Pressure Switch', slug: 'hydraulic-pressure-switch', description: 'Aircraft hydraulic pressure switch assembly.', price: 650.00, stock: 18, isFeatured: false },
      { name: 'Hydraulic Test Port Kit', slug: 'hydraulic-test-port-kit', description: 'Hydraulic test port kit for system diagnostics.', price: 450.00, stock: 20, isFeatured: false },
    ];
    hydraulicProducts.forEach(p => products.push({ ...p, categoryId: hydraulicCategory._id, _id: new ObjectId(), images: [`/images/products/${p.slug}.jpg`], createdAt: new Date(), updatedAt: new Date() }));
    
    // Electrical Components (10 products)
    const electricalProducts = [
      { name: 'Aircraft Wiring Harness', slug: 'aircraft-wiring-harness', description: 'Certified aircraft wiring harness assembly.', price: 8500.00, stock: 5, isFeatured: false },
      { name: 'Circuit Breaker Panel', slug: 'circuit-breaker-panel', description: 'Aircraft circuit breaker panel assembly.', price: 12000.00, stock: 4, isFeatured: true },
      { name: 'Electrical Connector Set', slug: 'electrical-connector-set', description: 'Complete electrical connector set for aircraft wiring.', price: 650.00, stock: 18, isFeatured: false },
      { name: 'Wire Bundle Clamp Set', slug: 'wire-bundle-clamp-set', description: 'Aircraft wire bundle clamp set for cable management.', price: 350.00, stock: 25, isFeatured: false },
      { name: 'Electrical Terminal Block', slug: 'electrical-terminal-block', description: 'Aircraft electrical terminal block assembly.', price: 850.00, stock: 15, isFeatured: false },
      { name: 'Relay Module Assembly', slug: 'relay-module-assembly', description: 'Certified relay module assembly for electrical systems.', price: 1200.00, stock: 12, isFeatured: false },
      { name: 'Electrical Ground Stud', slug: 'electrical-ground-stud', description: 'Aircraft electrical ground stud set.', price: 250.00, stock: 30, isFeatured: false },
      { name: 'Wire Marker Kit', slug: 'wire-marker-kit', description: 'Complete wire marker kit for electrical identification.', price: 180.00, stock: 22, isFeatured: false },
      { name: 'Electrical Shield Assembly', slug: 'electrical-shield-assembly', description: 'EMI shielding assembly for electrical components.', price: 950.00, stock: 10, isFeatured: false },
      { name: 'Power Distribution Unit', slug: 'power-distribution-unit', description: 'Aircraft power distribution unit assembly.', price: 15000.00, stock: 3, isFeatured: true },
    ];
    electricalProducts.forEach(p => products.push({ ...p, categoryId: electricalCategory._id, _id: new ObjectId(), images: [`/images/products/${p.slug}.jpg`], createdAt: new Date(), updatedAt: new Date() }));
    
    // Fuel Systems (10 products)
    const fuelProducts = [
      { name: 'Fuel Tank Assembly', slug: 'fuel-tank-assembly', description: 'Certified aircraft fuel tank assembly.', price: 45000.00, stock: 2, isFeatured: true },
      { name: 'Fuel Transfer Pump', slug: 'fuel-transfer-pump', description: 'Aircraft fuel transfer pump assembly.', price: 12000.00, stock: 4, isFeatured: false },
      { name: 'Fuel Filter Assembly', slug: 'fuel-filter-assembly', description: 'Certified fuel filter assembly for aircraft systems.', price: 850.00, stock: 15, isFeatured: false },
      { name: 'Fuel Quantity Indicator', slug: 'fuel-quantity-indicator', description: 'Aircraft fuel quantity indicator system.', price: 15000.00, stock: 3, isFeatured: true },
      { name: 'Fuel Line Assembly', slug: 'fuel-line-assembly', description: 'High-pressure fuel line assembly set.', price: 3500.00, stock: 8, isFeatured: false },
      { name: 'Fuel Valve Assembly', slug: 'fuel-valve-assembly', description: 'Aircraft fuel valve assembly for flow control.', price: 6500.00, stock: 6, isFeatured: false },
      { name: 'Fuel Vent System', slug: 'fuel-vent-system', description: 'Complete fuel vent system assembly.', price: 4500.00, stock: 7, isFeatured: false },
      { name: 'Fuel Cap Assembly', slug: 'fuel-cap-assembly', description: 'Certified fuel cap assembly with locking mechanism.', price: 850.00, stock: 12, isFeatured: false },
      { name: 'Fuel Sump Drain Valve', slug: 'fuel-sump-drain-valve', description: 'Aircraft fuel sump drain valve assembly.', price: 450.00, stock: 20, isFeatured: false },
      { name: 'Fuel System Test Kit', slug: 'fuel-system-test-kit', description: 'Complete fuel system test and diagnostic kit.', price: 2500.00, stock: 5, isFeatured: false },
    ];
    fuelProducts.forEach(p => products.push({ ...p, categoryId: fuelCategory._id, _id: new ObjectId(), images: [`/images/products/${p.slug}.jpg`], createdAt: new Date(), updatedAt: new Date() }));
    
    for (const product of products) {
      const existing = await db.collection('Product').findOne({ slug: product.slug });
      if (existing) {
        const { _id, ...productWithoutId } = product;
        await db.collection('Product').updateOne(
          { slug: product.slug },
          { $set: productWithoutId }
        );
      } else {
        await db.collection('Product').insertOne(product);
      }
    }
    console.log(`✅ Created ${products.length} products`);
    
    // 3. Create Services
    console.log('🔧 Creating services...');
    const services = [
      {
        _id: new ObjectId(),
        name: 'Aircraft Structural Repair',
        slug: 'aircraft-structural-repair',
        description: 'Expert structural repair services ensuring airworthiness and compliance with aviation standards.',
        content: 'Our aircraft structural repair services are designed to restore your aircraft to full airworthiness. We provide comprehensive structural repair solutions that meet or exceed FAA and international aviation standards. Our certified engineers and technicians have extensive experience in repairing various types of structural damage, from minor dents to major structural components. We ensure all repairs are documented, certified, and compliant with regulatory requirements.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Aircraft Structure Modifications',
        slug: 'aircraft-structure-modifications',
        description: 'Professional modification services for aircraft structures, tailored to your specific requirements.',
        content: 'We offer professional aircraft structure modification services customized to meet your specific operational needs. Our team of certified engineers works closely with you to design and implement structural modifications that enhance performance, accommodate new equipment, or meet updated regulatory requirements. All modifications are executed with precision, fully documented, and certified for airworthiness.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Aircraft Service Bulletin Compliance',
        slug: 'aircraft-service-bulletin-compliance',
        description: 'Comprehensive service bulletin compliance services to keep your aircraft current and compliant.',
        content: 'Stay compliant with all manufacturer service bulletins and regulatory requirements. Our comprehensive service bulletin compliance services ensure your aircraft remains current and meets all mandatory and recommended service bulletin requirements. We maintain detailed tracking of all service bulletins applicable to your aircraft, coordinate necessary modifications or inspections, and provide complete documentation for your records.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Aircraft Parts Supply',
        slug: 'aircraft-parts-supply',
        description: 'Reliable sourcing and supply of certified aircraft parts from trusted manufacturers.',
        content: 'We provide reliable sourcing and supply of certified aircraft parts from trusted manufacturers worldwide. Our extensive network of suppliers ensures we can locate and procure genuine, certified parts for your aircraft needs. All parts are verified for authenticity, certification, and compliance with aviation standards. We handle the entire procurement process, from sourcing to delivery, ensuring you receive quality parts when you need them.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Aviation Tools Sales',
        slug: 'aviation-tools-sales',
        description: 'Premium aviation tools and equipment for professional aircraft maintenance and repair.',
        content: 'We offer a comprehensive selection of premium aviation tools and equipment designed for professional aircraft maintenance and repair operations. Our inventory includes specialized tools from leading manufacturers, all certified and calibrated to meet aviation industry standards. Whether you need hand tools, precision instruments, or specialized equipment, we can provide the right tools for your maintenance needs.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Aviation Tool Rental',
        slug: 'aviation-tool-rental',
        description: 'Flexible tool rental solutions for short-term projects and specialized maintenance needs.',
        content: 'Need specialized aviation tools for a short-term project? Our flexible tool rental program provides access to premium aviation tools and equipment without the upfront investment. Perfect for one-time repairs, special projects, or when you need specialized equipment that you don\'t use regularly. All rental tools are certified, calibrated, and maintained to the highest standards. We offer flexible rental terms to accommodate your project timeline and budget.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    
    for (const service of services) {
      const existing = await db.collection('Service').findOne({ slug: service.slug });
      if (existing) {
        const { _id, ...serviceWithoutId } = service;
        await db.collection('Service').updateOne(
          { slug: service.slug },
          { $set: serviceWithoutId }
        );
      } else {
        await db.collection('Service').insertOne(service);
      }
    }
    console.log(`✅ Created ${services.length} services`);
    
    // 4. Create Users (with hashed passwords)
    console.log('👤 Creating users...');
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const users = [
      {
        _id: new ObjectId(),
        email: 'admin@uraerotech.com',
        name: 'Admin User',
        role: 'ADMIN',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        email: 'b2b@example.com',
        name: 'Business Client',
        role: 'B2B',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        email: 'customer@example.com',
        name: 'Regular Customer',
        role: 'B2C',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    
    for (const user of users) {
      const existing = await db.collection('User').findOne({ email: user.email });
      if (existing) {
        const { _id, ...userWithoutId } = user;
        await db.collection('User').updateOne(
          { email: user.email },
          { $set: userWithoutId }
        );
      } else {
        await db.collection('User').insertOne(user);
      }
    }
    console.log(`✅ Created ${users.length} users`);
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('   Admin: admin@uraerotech.com / admin123');
    console.log('   B2B:   b2b@example.com / admin123');
    console.log('   B2C:   customer@example.com / admin123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('✅ Database connection closed');
  }
}

seedDatabase().catch(console.error);

