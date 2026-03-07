import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { ServiceContactForm } from '@/components/ServiceContactForm'
import { getIndustryBySlug } from '@/data/industries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug)

  if (!industry) {
    return {
      title: 'Industry Not Found - UR Aerotech',
    }
  }

  return {
    title: `${industry.name} - UR Aerotech`,
    description: industry.description,
  }
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug)

  if (!industry) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden mt-20">
        {industry.image && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat industry-hero-bg"
            style={{
              backgroundImage: `url('${industry.image}')`,
              filter: 'brightness(0.7)',
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-indigo-950/85 to-sky-900/80" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link
              href="/industries"
              className="text-blue-400 hover:text-blue-300 transition-colors mb-4 inline-block text-sm"
            >
              ← Back to Industries
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl md:text-7xl">{industry.icon}</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white">{industry.name}</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl">{industry.description}</p>
          </div>
        </div>
      </section>

      <main className="pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto -mt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Industry Content */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollAnimation animation="slideRight" delay={0}>
                <article className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-12 shadow-xl">
                
                <div className="prose prose-invert max-w-none">
                  <div className="text-white/70 leading-relaxed">
                    {industry.content.split('\n\n').map((paragraph, pIndex) => {
                      if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                        return (
                          <div key={pIndex} className="mt-10 mb-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-1 h-10 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                              <h3 className="text-2xl md:text-3xl font-bold text-white">
                                {paragraph.replace(/\*\*/g, '').trim()}
                              </h3>
                            </div>
                          </div>
                        )
                      }
                      if (paragraph.trim().startsWith('- ')) {
                        const items = paragraph.split('\n').filter(line => line.trim().startsWith('- '))
                        return (
                          <div key={pIndex} className="bg-white/5 rounded-lg p-6 mb-6 mt-4 border border-white/10">
                            <ul className="space-y-3">
                              {items.map((item, iIndex) => (
                                <li key={iIndex} className="flex items-start gap-3 text-white/80">
                                  <span className="text-blue-400 mt-1.5 flex-shrink-0">▸</span>
                                  <span>{item.substring(2).trim()}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      }
                      if (paragraph.trim() === '') {
                        return null
                      }
                      return (
                        <p key={pIndex} className="mb-4">
                          {paragraph.trim()}
                        </p>
                      )
                    })}
                  </div>
                </div>
                </article>
              </ScrollAnimation>
            </div>

            {/* Contact Form */}
            <ScrollAnimation animation="slideLeft" delay={100}>
              <div className="lg:col-span-1">
                <ServiceContactForm serviceName={industry.name} />
              </div>
            </ScrollAnimation>
          </div>

          {/* Full Width Sections */}
          <div className="mt-8 space-y-8">
            {/* Features Section */}
            {industry.features && industry.features.length > 0 && (
              <ScrollAnimation animation="fadeIn" delay={100}>
                <div className="bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-sky-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-white">Key Features</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {industry.features.map((feature, index) => (
                    <ScrollAnimation
                      key={index}
                      animation={index % 4 === 0 ? 'slideLeft' : index % 4 === 1 ? 'slideRight' : index % 4 === 2 ? 'slideUp' : 'scale'}
                      delay={index * 50}
                    >
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 group">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <span className="text-white/90 font-medium">{feature}</span>
                        </div>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>
                </div>
              </ScrollAnimation>
            )}

            {/* Image Gallery */}
            {industry.images && industry.images.length > 0 && (
              <ScrollAnimation animation="scale" delay={200}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-white">Industry Gallery</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {industry.images.slice(0, 3).map((img, index) => (
                    <ScrollAnimation
                      key={index}
                      animation={index % 3 === 0 ? 'slideLeft' : index % 3 === 1 ? 'slideRight' : 'fadeIn'}
                      delay={index * 100}
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden group border border-white/10 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                        <Image
                          src={img}
                          alt={`${industry.name} - Image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>
                </div>
              </ScrollAnimation>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

