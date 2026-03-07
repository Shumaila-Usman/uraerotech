import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { AboutUsSection } from '@/components/AboutUsSection'
import { ServicesSection } from '@/components/ServicesSection'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { PartsToolsSection } from '@/components/PartsToolsSection'
import { CTASection } from '@/components/CTASection'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { fileDb } from '@/lib/file-db'

export default async function HomePage() {
  // Fetch first 4 categories from file storage
  let categories: any[] = []
  try {
    const allCategories = fileDb.findMany<any>('Category')
    categories = allCategories
      .sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
      .slice(0, 4)
  } catch (error) {
    console.error('Error fetching categories:', error)
    categories = []
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ScrollAnimation animation="fadeIn" delay={0}>
          <AboutUsSection />
        </ScrollAnimation>
        <ScrollAnimation animation="slideRight" delay={100}>
          <ServicesSection />
        </ScrollAnimation>
        <ScrollAnimation animation="slideLeft" delay={100}>
          <WhyChooseUs />
        </ScrollAnimation>
        <ScrollAnimation animation="fadeIn" delay={100}>
          <PartsToolsSection categories={categories} />
        </ScrollAnimation>
        <ScrollAnimation animation="scale" delay={100}>
          <CTASection />
        </ScrollAnimation>
      </main>
      <Footer />
    </div>
  )
}

