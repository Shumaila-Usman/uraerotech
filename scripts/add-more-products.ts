import { fileDb } from '../lib/file-db'

async function addMoreProducts() {
  console.log('🛒 Adding more products to each category...')

  // Get all categories
  const allCategories = fileDb.findMany<any>('Category')
  const categoriesBySlug: Record<string, any> = {}
  allCategories.forEach((cat: any) => {
    categoriesBySlug[cat.slug] = cat
  })

  // Product templates for each category
  const productTemplates: Record<string, Array<Omit<any, 'categoryId'>>> = {
    'structural-components': [
      { name: 'Wing Spar Assembly', slug: 'wing-spar-assembly', description: 'High-strength wing spar assembly for commercial aircraft. Manufactured to exact specifications.', price: 18500, stock: 3, images: ['/images/products/wing-spar.jpg'], isFeatured: true },
      { name: 'Fuselage Frame Section', slug: 'fuselage-frame-section', description: 'Precision-machined fuselage frame section. Certified for multiple aircraft models.', price: 12500, stock: 4, images: ['/images/products/fuselage-frame.jpg'], isFeatured: false },
      { name: 'Bulkhead Assembly', slug: 'bulkhead-assembly', description: 'Aircraft bulkhead assembly with integrated mounting points. Lightweight and durable.', price: 9800, stock: 6, images: ['/images/products/bulkhead.jpg'], isFeatured: false },
      { name: 'Stringer Assembly Kit', slug: 'stringer-assembly-kit', description: 'Complete stringer assembly kit for aircraft structural reinforcement.', price: 6500, stock: 8, images: ['/images/products/stringer.jpg'], isFeatured: false },
      { name: 'Rib Assembly Set', slug: 'rib-assembly-set', description: 'Aircraft rib assembly set. Includes all necessary components for installation.', price: 4200, stock: 10, images: ['/images/products/rib-assembly.jpg'], isFeatured: false },
      { name: 'Skin Panel Section', slug: 'skin-panel-section', description: 'Aircraft skin panel section. Corrosion-resistant and lightweight construction.', price: 3500, stock: 12, images: ['/images/products/skin-panel.jpg'], isFeatured: false },
      { name: 'Frame Reinforcement Kit', slug: 'frame-reinforcement-kit', description: 'Frame reinforcement kit for structural modifications and repairs.', price: 2800, stock: 15, images: ['/images/products/frame-reinforcement.jpg'], isFeatured: false },
      { name: 'Structural Bracket Set', slug: 'structural-bracket-set', description: 'Heavy-duty structural bracket set for various mounting applications.', price: 1500, stock: 20, images: ['/images/products/bracket-set.jpg'], isFeatured: false },
      { name: 'Beam Assembly', slug: 'beam-assembly', description: 'Aircraft beam assembly for load-bearing applications. High-strength aluminum construction.', price: 7200, stock: 7, images: ['/images/products/beam-assembly.jpg'], isFeatured: false },
      { name: 'Structural Repair Patch', slug: 'structural-repair-patch', description: 'Composite structural repair patch kit. Includes adhesive and application tools.', price: 850, stock: 25, images: ['/images/products/repair-patch.jpg'], isFeatured: false },
    ],
    'engine-parts': [
      { name: 'Turbine Blade Set', slug: 'turbine-blade-set', description: 'Precision-engineered turbine blade set. Certified for commercial aircraft engines.', price: 25000, stock: 2, images: ['/images/products/turbine-blade.jpg'], isFeatured: true },
      { name: 'Compressor Assembly', slug: 'compressor-assembly', description: 'High-performance compressor assembly for jet engines. OEM quality.', price: 18500, stock: 3, images: ['/images/products/compressor.jpg'], isFeatured: true },
      { name: 'Combustion Chamber', slug: 'combustion-chamber', description: 'Aircraft engine combustion chamber. Heat-resistant materials and precision engineering.', price: 22000, stock: 2, images: ['/images/products/combustion-chamber.jpg'], isFeatured: false },
      { name: 'Fuel Injector Nozzle', slug: 'fuel-injector-nozzle', description: 'Precision fuel injector nozzle for efficient fuel delivery.', price: 1200, stock: 15, images: ['/images/products/injector-nozzle.jpg'], isFeatured: false },
      { name: 'Oil Filter Assembly', slug: 'oil-filter-assembly', description: 'Aircraft engine oil filter assembly. High-capacity filtration system.', price: 650, stock: 20, images: ['/images/products/oil-filter.jpg'], isFeatured: false },
      { name: 'Igniter Plug Set', slug: 'igniter-plug-set', description: 'Aircraft engine igniter plug set. Reliable ignition for engine startup.', price: 850, stock: 18, images: ['/images/products/igniter-plug.jpg'], isFeatured: false },
      { name: 'Exhaust Nozzle', slug: 'exhaust-nozzle', description: 'Engine exhaust nozzle assembly. Optimized for thrust and efficiency.', price: 4500, stock: 8, images: ['/images/products/exhaust-nozzle.jpg'], isFeatured: false },
      { name: 'Bearing Assembly', slug: 'bearing-assembly', description: 'High-precision bearing assembly for engine rotating components.', price: 3200, stock: 12, images: ['/images/products/bearing-assembly.jpg'], isFeatured: false },
      { name: 'Gearbox Assembly', slug: 'gearbox-assembly', description: 'Aircraft engine gearbox assembly. Smooth power transmission.', price: 15000, stock: 4, images: ['/images/products/gearbox.jpg'], isFeatured: false },
      { name: 'Engine Mount Bracket', slug: 'engine-mount-bracket', description: 'Heavy-duty engine mount bracket. Vibration dampening design.', price: 2800, stock: 10, images: ['/images/products/mount-bracket.jpg'], isFeatured: false },
    ],
    'avionics-electronics': [
      { name: 'Flight Management System', slug: 'flight-management-system', description: 'Advanced flight management system with integrated navigation capabilities.', price: 45000, stock: 1, images: ['/images/products/fms.jpg'], isFeatured: true },
      { name: 'Autopilot Control Unit', slug: 'autopilot-control-unit', description: 'Precision autopilot control unit for automated flight operations.', price: 32000, stock: 2, images: ['/images/products/autopilot.jpg'], isFeatured: true },
      { name: 'GPS Navigation System', slug: 'gps-navigation-system', description: 'High-accuracy GPS navigation system with multiple satellite support.', price: 18500, stock: 3, images: ['/images/products/gps-system.jpg'], isFeatured: false },
      { name: 'Radio Transceiver', slug: 'radio-transceiver', description: 'Aircraft radio transceiver for communication and navigation.', price: 8500, stock: 5, images: ['/images/products/transceiver.jpg'], isFeatured: false },
      { name: 'Weather Radar Display', slug: 'weather-radar-display', description: 'Advanced weather radar display system for flight safety.', price: 28000, stock: 2, images: ['/images/products/weather-radar.jpg'], isFeatured: false },
      { name: 'Transponder Unit', slug: 'transponder-unit', description: 'Aircraft transponder unit for air traffic control communication.', price: 4200, stock: 8, images: ['/images/products/transponder.jpg'], isFeatured: false },
      { name: 'Instrument Display Panel', slug: 'instrument-display-panel', description: 'Digital instrument display panel with multiple screen support.', price: 12500, stock: 4, images: ['/images/products/display-panel.jpg'], isFeatured: false },
      { name: 'Circuit Breaker Panel', slug: 'circuit-breaker-panel', description: 'Aircraft circuit breaker panel for electrical system protection.', price: 2800, stock: 12, images: ['/images/products/circuit-breaker.jpg'], isFeatured: false },
      { name: 'Data Recorder Unit', slug: 'data-recorder-unit', description: 'Flight data recorder unit for flight information logging.', price: 15000, stock: 3, images: ['/images/products/data-recorder.jpg'], isFeatured: false },
      { name: 'Antenna Assembly', slug: 'antenna-assembly', description: 'High-performance antenna assembly for communication systems.', price: 1800, stock: 15, images: ['/images/products/antenna.jpg'], isFeatured: false },
    ],
    'landing-gear': [
      { name: 'Main Landing Gear Strut', slug: 'main-landing-gear-strut', description: 'Heavy-duty main landing gear strut assembly. Shock-absorbing design.', price: 55000, stock: 1, images: ['/images/products/main-strut.jpg'], isFeatured: true },
      { name: 'Nose Landing Gear Assembly', slug: 'nose-landing-gear-assembly', description: 'Complete nose landing gear assembly with steering mechanism.', price: 35000, stock: 2, images: ['/images/products/nose-gear.jpg'], isFeatured: true },
      { name: 'Landing Gear Actuator', slug: 'landing-gear-actuator', description: 'Hydraulic landing gear actuator for reliable gear extension and retraction.', price: 12500, stock: 4, images: ['/images/products/gear-actuator.jpg'], isFeatured: false },
      { name: 'Wheel Assembly Set', slug: 'wheel-assembly-set', description: 'Aircraft wheel assembly set with brake system integration.', price: 8500, stock: 6, images: ['/images/products/wheel-assembly.jpg'], isFeatured: false },
      { name: 'Brake Disc Set', slug: 'brake-disc-set', description: 'High-performance brake disc set for aircraft landing gear.', price: 4200, stock: 10, images: ['/images/products/brake-disc.jpg'], isFeatured: false },
      { name: 'Shock Absorber Unit', slug: 'shock-absorber-unit', description: 'Aircraft landing gear shock absorber unit. Smooth landing performance.', price: 6800, stock: 8, images: ['/images/products/shock-absorber.jpg'], isFeatured: false },
      { name: 'Gear Door Actuator', slug: 'gear-door-actuator', description: 'Landing gear door actuator for smooth door operation.', price: 3200, stock: 12, images: ['/images/products/door-actuator.jpg'], isFeatured: false },
      { name: 'Tire Set', slug: 'tire-set', description: 'Aircraft tire set. High-quality rubber with reinforced construction.', price: 2800, stock: 15, images: ['/images/products/tire-set.jpg'], isFeatured: false },
      { name: 'Landing Gear Lock Pin', slug: 'landing-gear-lock-pin', description: 'Safety lock pin for landing gear maintenance and ground operations.', price: 450, stock: 25, images: ['/images/products/lock-pin.jpg'], isFeatured: false },
      { name: 'Gear Position Sensor', slug: 'gear-position-sensor', description: 'Landing gear position sensor for accurate gear status monitoring.', price: 1200, stock: 18, images: ['/images/products/position-sensor.jpg'], isFeatured: false },
    ],
    'interior-components': [
      { name: 'Passenger Seat Assembly', slug: 'passenger-seat-assembly', description: 'Comfortable passenger seat assembly with adjustable features.', price: 2800, stock: 20, images: ['/images/products/passenger-seat.jpg'], isFeatured: true },
      { name: 'Overhead Bin Assembly', slug: 'overhead-bin-assembly', description: 'Aircraft overhead bin assembly. Durable and lightweight design.', price: 4200, stock: 15, images: ['/images/products/overhead-bin.jpg'], isFeatured: false },
      { name: 'Cabin Lighting System', slug: 'cabin-lighting-system', description: 'LED cabin lighting system with adjustable brightness controls.', price: 3500, stock: 12, images: ['/images/products/cabin-lighting.jpg'], isFeatured: false },
      { name: 'Galley Unit', slug: 'galley-unit', description: 'Aircraft galley unit for food service and storage.', price: 12500, stock: 5, images: ['/images/products/galley.jpg'], isFeatured: false },
      { name: 'Lavatory Assembly', slug: 'lavatory-assembly', description: 'Complete lavatory assembly with all necessary fixtures.', price: 18500, stock: 3, images: ['/images/products/lavatory.jpg'], isFeatured: false },
      { name: 'Carpet Set', slug: 'carpet-set', description: 'Aircraft cabin carpet set. Durable and easy to maintain.', price: 2800, stock: 10, images: ['/images/products/carpet.jpg'], isFeatured: false },
      { name: 'Window Shade Assembly', slug: 'window-shade-assembly', description: 'Aircraft window shade assembly with smooth operation.', price: 850, stock: 30, images: ['/images/products/window-shade.jpg'], isFeatured: false },
      { name: 'Cabin Panel Set', slug: 'cabin-panel-set', description: 'Interior cabin panel set. Lightweight and fire-resistant materials.', price: 4500, stock: 8, images: ['/images/products/cabin-panel.jpg'], isFeatured: false },
      { name: 'Seat Belt Assembly', slug: 'seat-belt-assembly', description: 'Aircraft seat belt assembly. Safety-certified and comfortable.', price: 450, stock: 50, images: ['/images/products/seat-belt.jpg'], isFeatured: false },
      { name: 'Cabin Air Vent', slug: 'cabin-air-vent', description: 'Adjustable cabin air vent for passenger comfort.', price: 320, stock: 40, images: ['/images/products/air-vent.jpg'], isFeatured: false },
    ],
    'tools-equipment': [
      { name: 'Rivet Gun Set', slug: 'rivet-gun-set', description: 'Professional rivet gun set for aircraft maintenance and repairs.', price: 850, stock: 15, images: ['/images/products/rivet-gun.jpg'], isFeatured: true },
      { name: 'Sheet Metal Bender', slug: 'sheet-metal-bender', description: 'Precision sheet metal bender for aircraft component fabrication.', price: 4200, stock: 6, images: ['/images/products/metal-bender.jpg'], isFeatured: false },
      { name: 'Composite Repair Kit', slug: 'composite-repair-kit-advanced', description: 'Advanced composite repair kit with specialized tools and materials.', price: 2800, stock: 8, images: ['/images/products/composite-kit-adv.jpg'], isFeatured: false },
      { name: 'Hydraulic Test Bench', slug: 'hydraulic-test-bench', description: 'Professional hydraulic test bench for system testing and calibration.', price: 18500, stock: 2, images: ['/images/products/test-bench.jpg'], isFeatured: false },
      { name: 'Wire Crimping Tool Set', slug: 'wire-crimping-tool-set', description: 'Precision wire crimping tool set for electrical connections.', price: 650, stock: 20, images: ['/images/products/crimping-tool.jpg'], isFeatured: false },
      { name: 'Borescope Inspection Kit', slug: 'borescope-inspection-kit', description: 'Advanced borescope inspection kit for internal component examination.', price: 8500, stock: 4, images: ['/images/products/borescope.jpg'], isFeatured: false },
      { name: 'Calibration Equipment Set', slug: 'calibration-equipment-set', description: 'Precision calibration equipment set for instrument verification.', price: 12500, stock: 3, images: ['/images/products/calibration.jpg'], isFeatured: false },
      { name: 'Safety Harness Set', slug: 'safety-harness-set', description: 'Professional safety harness set for maintenance personnel.', price: 1200, stock: 12, images: ['/images/products/safety-harness.jpg'], isFeatured: false },
      { name: 'Measuring Tool Kit', slug: 'measuring-tool-kit', description: 'Comprehensive measuring tool kit for precision measurements.', price: 1800, stock: 10, images: ['/images/products/measuring-kit.jpg'], isFeatured: false },
      { name: 'Cleaning Solution Set', slug: 'cleaning-solution-set', description: 'Aircraft-grade cleaning solution set for maintenance operations.', price: 450, stock: 25, images: ['/images/products/cleaning-set.jpg'], isFeatured: false },
    ],
    'fasteners-hardware': [
      { name: 'Aircraft Bolt Set', slug: 'aircraft-bolt-set', description: 'High-strength aircraft bolt set. Various sizes and materials available.', price: 850, stock: 30, images: ['/images/products/bolt-set.jpg'], isFeatured: true },
      { name: 'Rivet Assortment Kit', slug: 'rivet-assortment-kit', description: 'Comprehensive rivet assortment kit for various applications.', price: 650, stock: 25, images: ['/images/products/rivet-kit.jpg'], isFeatured: false },
      { name: 'Screw Set Collection', slug: 'screw-set-collection', description: 'Aircraft-grade screw set collection. Multiple thread types and sizes.', price: 450, stock: 35, images: ['/images/products/screw-set.jpg'], isFeatured: false },
      { name: 'Washer Assortment', slug: 'washer-assortment', description: 'Precision washer assortment for various fastener applications.', price: 280, stock: 50, images: ['/images/products/washer-set.jpg'], isFeatured: false },
      { name: 'Nut Collection Set', slug: 'nut-collection-set', description: 'Aircraft-grade nut collection set. Locking and standard types.', price: 550, stock: 40, images: ['/images/products/nut-set.jpg'], isFeatured: false },
      { name: 'Pin Set Assortment', slug: 'pin-set-assortment', description: 'Aircraft pin set assortment. Cotter pins and clevis pins included.', price: 320, stock: 45, images: ['/images/products/pin-set.jpg'], isFeatured: false },
      { name: 'Clamp Set', slug: 'clamp-set', description: 'Aircraft clamp set for hose and cable management.', price: 680, stock: 20, images: ['/images/products/clamp-set.jpg'], isFeatured: false },
      { name: 'Bracket Hardware Kit', slug: 'bracket-hardware-kit', description: 'Complete bracket hardware kit with all mounting components.', price: 850, stock: 18, images: ['/images/products/bracket-hardware.jpg'], isFeatured: false },
      { name: 'Retaining Ring Set', slug: 'retaining-ring-set', description: 'Aircraft retaining ring set for component retention applications.', price: 420, stock: 30, images: ['/images/products/retaining-ring.jpg'], isFeatured: false },
      { name: 'Threaded Insert Set', slug: 'threaded-insert-set', description: 'Threaded insert set for repair and modification applications.', price: 750, stock: 22, images: ['/images/products/threaded-insert.jpg'], isFeatured: false },
    ],
    'hydraulic-systems': [
      { name: 'Hydraulic Pump Unit', slug: 'hydraulic-pump-unit', description: 'High-pressure hydraulic pump unit for aircraft systems.', price: 12500, stock: 4, images: ['/images/products/hydraulic-pump.jpg'], isFeatured: true },
      { name: 'Hydraulic Cylinder', slug: 'hydraulic-cylinder', description: 'Precision hydraulic cylinder for landing gear and control surfaces.', price: 8500, stock: 6, images: ['/images/products/hydraulic-cylinder.jpg'], isFeatured: false },
      { name: 'Hydraulic Filter Assembly', slug: 'hydraulic-filter-assembly', description: 'High-capacity hydraulic filter assembly for system cleanliness.', price: 1200, stock: 15, images: ['/images/products/hydraulic-filter.jpg'], isFeatured: false },
      { name: 'Hydraulic Reservoir', slug: 'hydraulic-reservoir', description: 'Aircraft hydraulic reservoir with integrated monitoring system.', price: 4200, stock: 8, images: ['/images/products/hydraulic-reservoir.jpg'], isFeatured: false },
      { name: 'Hydraulic Valve Assembly', slug: 'hydraulic-valve-assembly', description: 'Precision hydraulic valve assembly for flow control.', price: 6800, stock: 5, images: ['/images/products/hydraulic-valve.jpg'], isFeatured: false },
      { name: 'Hydraulic Hose Set', slug: 'hydraulic-hose-set', description: 'High-pressure hydraulic hose set. Various lengths and fittings.', price: 2800, stock: 12, images: ['/images/products/hydraulic-hose.jpg'], isFeatured: false },
      { name: 'Hydraulic Fitting Kit', slug: 'hydraulic-fitting-kit', description: 'Comprehensive hydraulic fitting kit for system connections.', price: 850, stock: 20, images: ['/images/products/hydraulic-fitting.jpg'], isFeatured: false },
      { name: 'Hydraulic Accumulator', slug: 'hydraulic-accumulator', description: 'Aircraft hydraulic accumulator for pressure stabilization.', price: 5500, stock: 7, images: ['/images/products/hydraulic-accumulator.jpg'], isFeatured: false },
      { name: 'Hydraulic Seal Kit', slug: 'hydraulic-seal-kit', description: 'Complete hydraulic seal kit for system maintenance and repair.', price: 650, stock: 25, images: ['/images/products/hydraulic-seal.jpg'], isFeatured: false },
      { name: 'Hydraulic Pressure Gauge', slug: 'hydraulic-pressure-gauge', description: 'Precision hydraulic pressure gauge for system monitoring.', price: 450, stock: 30, images: ['/images/products/pressure-gauge.jpg'], isFeatured: false },
    ],
    'electrical-components': [
      { name: 'Wire Harness Assembly', slug: 'wire-harness-assembly', description: 'Complete wire harness assembly for aircraft electrical systems.', price: 8500, stock: 5, images: ['/images/products/wire-harness.jpg'], isFeatured: true },
      { name: 'Circuit Breaker Panel', slug: 'circuit-breaker-panel-electrical', description: 'Aircraft circuit breaker panel for electrical protection.', price: 4200, stock: 8, images: ['/images/products/circuit-panel.jpg'], isFeatured: false },
      { name: 'Electrical Connector Set', slug: 'electrical-connector-set', description: 'Aircraft-grade electrical connector set. Various types and sizes.', price: 1200, stock: 15, images: ['/images/products/connector-set.jpg'], isFeatured: false },
      { name: 'Battery Assembly', slug: 'battery-assembly', description: 'Aircraft battery assembly with integrated charging system.', price: 6800, stock: 6, images: ['/images/products/battery.jpg'], isFeatured: false },
      { name: 'Generator Unit', slug: 'generator-unit', description: 'Aircraft generator unit for electrical power generation.', price: 18500, stock: 3, images: ['/images/products/generator.jpg'], isFeatured: false },
      { name: 'Starter Motor', slug: 'starter-motor', description: 'Aircraft starter motor for engine startup operations.', price: 12500, stock: 4, images: ['/images/products/starter-motor.jpg'], isFeatured: false },
      { name: 'Relay Assembly Set', slug: 'relay-assembly-set', description: 'Aircraft relay assembly set for electrical switching applications.', price: 850, stock: 20, images: ['/images/products/relay-set.jpg'], isFeatured: false },
      { name: 'Fuse Block Assembly', slug: 'fuse-block-assembly', description: 'Aircraft fuse block assembly for circuit protection.', price: 650, stock: 25, images: ['/images/products/fuse-block.jpg'], isFeatured: false },
      { name: 'Electrical Switch Panel', slug: 'electrical-switch-panel', description: 'Aircraft electrical switch panel with multiple control switches.', price: 2800, stock: 12, images: ['/images/products/switch-panel.jpg'], isFeatured: false },
      { name: 'Cable Assembly Set', slug: 'cable-assembly-set', description: 'Aircraft cable assembly set for various electrical connections.', price: 1800, stock: 15, images: ['/images/products/cable-set.jpg'], isFeatured: false },
    ],
    'fuel-systems': [
      { name: 'Fuel Pump Assembly', slug: 'fuel-pump-assembly', description: 'High-capacity fuel pump assembly for aircraft fuel systems.', price: 8500, stock: 5, images: ['/images/products/fuel-pump.jpg'], isFeatured: true },
      { name: 'Fuel Tank Assembly', slug: 'fuel-tank-assembly', description: 'Aircraft fuel tank assembly with integrated monitoring system.', price: 25000, stock: 2, images: ['/images/products/fuel-tank.jpg'], isFeatured: false },
      { name: 'Fuel Line Set', slug: 'fuel-line-set', description: 'Aircraft fuel line set. High-quality materials for safe fuel transfer.', price: 4200, stock: 8, images: ['/images/products/fuel-line.jpg'], isFeatured: false },
      { name: 'Fuel Valve Assembly', slug: 'fuel-valve-assembly', description: 'Precision fuel valve assembly for flow control and safety.', price: 6800, stock: 6, images: ['/images/products/fuel-valve.jpg'], isFeatured: false },
      { name: 'Fuel Quantity Sensor', slug: 'fuel-quantity-sensor', description: 'Aircraft fuel quantity sensor for accurate fuel level monitoring.', price: 2800, stock: 12, images: ['/images/products/fuel-sensor.jpg'], isFeatured: false },
      { name: 'Fuel Filter Element', slug: 'fuel-filter-element', description: 'Aircraft fuel filter element for clean fuel delivery.', price: 450, stock: 30, images: ['/images/products/fuel-filter-element.jpg'], isFeatured: false },
      { name: 'Fuel Cap Assembly', slug: 'fuel-cap-assembly', description: 'Aircraft fuel cap assembly with secure locking mechanism.', price: 650, stock: 25, images: ['/images/products/fuel-cap.jpg'], isFeatured: false },
      { name: 'Fuel Transfer Pump', slug: 'fuel-transfer-pump', description: 'Aircraft fuel transfer pump for fuel management operations.', price: 5500, stock: 7, images: ['/images/products/transfer-pump.jpg'], isFeatured: false },
      { name: 'Fuel Vent System', slug: 'fuel-vent-system', description: 'Aircraft fuel vent system for safe fuel tank pressure management.', price: 3200, stock: 10, images: ['/images/products/fuel-vent.jpg'], isFeatured: false },
      { name: 'Fuel Drain Valve', slug: 'fuel-drain-valve', description: 'Aircraft fuel drain valve for maintenance and sampling operations.', price: 850, stock: 20, images: ['/images/products/drain-valve.jpg'], isFeatured: false },
    ],
  }

  let totalCreated = 0
  let totalSkipped = 0

  // Add products for each category
  for (const [categorySlug, products] of Object.entries(productTemplates)) {
    const category = categoriesBySlug[categorySlug]
    if (!category) {
      console.log(`⚠️  Category not found: ${categorySlug}`)
      continue
    }

    console.log(`\n📦 Adding products for: ${category.name}`)
    for (const productData of products) {
      const existing = fileDb.findUnique<any>('Product', { slug: productData.slug })
      if (!existing) {
        fileDb.create('Product', {
          ...productData,
          categoryId: category.id,
        })
        console.log(`  ✅ Created: ${productData.name}`)
        totalCreated++
      } else {
        console.log(`  ℹ️  Already exists: ${productData.name}`)
        totalSkipped++
      }
    }
  }

  console.log(`\n✅ Completed!`)
  console.log(`   Created: ${totalCreated} products`)
  console.log(`   Skipped: ${totalSkipped} products (already exist)`)
}

addMoreProducts().catch(console.error)


