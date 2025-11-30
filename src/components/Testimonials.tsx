'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Bounded } from './Bounded'
import { Heading } from './Heading'

interface Testimonial {
  id: number
  name: string
  role: string
  organization: string
  content: string
  rating: number
  image?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "English Teacher",
    organization: "Lincoln High School",
    content: "The quality of Maybridge Publishing's books is exceptional. My students are more engaged than ever, and the cultural relevance of the stories has made a huge difference in their reading comprehension.",
    rating: 5
  },
  {
    id: 2,
    name: "Dr. James Okafor",
    role: "Principal",
    organization: "Riverside Elementary",
    content: "As an educator for over 20 years, I can confidently say that Maybridge Publishing has revolutionized our reading program. The books are age-appropriate, culturally diverse, and educationally sound.",
    rating: 5
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "Librarian",
    organization: "Central Middle School",
    content: "Our library circulation has increased by 40% since we added Maybridge Publishing books to our collection. Students constantly ask for more titles from this publisher!",
    rating: 5
  },
  {
    id: 4,
    name: "David Chen",
    role: "Parent",
    organization: "Father of 3",
    content: "My children love these books! They're finally reading for pleasure, not just because they have to. The stories are engaging and the values are exactly what we want to instill.",
    rating: 5
  }
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const nextTestimonial = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <Bounded>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Heading as="h2" size="xl" className="mb-6">
              What Educators Say About Us
            </Heading>
            <p className="text-xl text-zinc-600 leading-relaxed max-w-3xl mx-auto">
              Don't just take our word for it. Here's what teachers, librarians, and parents 
              have to say about our educational books.
            </p>
          </motion.div>

          {/* Main testimonial display */}
          <motion.div variants={itemVariants} className="relative">
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                >
                  {/* Quote icon */}
                  <div className="text-6xl text-blue-200 mb-6">"</div>
                  
                  {/* Testimonial content */}
                  <blockquote className="text-xl md:text-2xl text-zinc-700 leading-relaxed mb-8 italic">
                    {currentTestimonial.content}
                  </blockquote>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center mb-6">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 ${
                          i < currentTestimonial.rating
                            ? 'text-yellow-400'
                            : 'text-zinc-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  {/* Author info */}
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-zinc-800 mb-1">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-blue-600 font-medium mb-1">
                      {currentTestimonial.role}
                    </p>
                    <p className="text-zinc-500">
                      {currentTestimonial.organization}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8">
                <motion.button
                  onClick={prevTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                {/* Dots indicator */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index)
                        setIsAutoPlaying(false)
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                  aria-label="Next testimonial"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Share Your Experience
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </Bounded>
    </section>
  )
}