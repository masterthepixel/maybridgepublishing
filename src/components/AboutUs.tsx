'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Bounded } from './Bounded'
import { Heading } from './Heading'

export function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="about" ref={ref} className="py-20 bg-white">
      <Bounded>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Heading as="h2" size="xl" className="mb-6">
              About Maybridge Publishing
            </Heading>
            <p className="text-xl text-zinc-600 leading-relaxed">
              Dedicated to empowering education through quality literature and innovative publishing solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg text-zinc-700">
                <p>
                  Founded with a mission to bridge the gap in quality educational content, 
                  Maybridge Publishing USA has been at the forefront of creating engaging, 
                  culturally relevant literature for students across all educational levels.
                </p>
                <p>
                  Our carefully curated collection of over 110 books spans Primary Level Readers, 
                  Junior High Fiction, and Senior High Fiction, each designed to inspire, 
                  educate, and entertain young minds.
                </p>
                <p>
                  We believe that every student deserves access to stories that reflect their 
                  experiences while opening windows to new worlds and perspectives. Our commitment 
                  to excellence drives us to continuously expand our catalog with fresh, 
                  innovative content.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-50 p-6 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Our Vision</h3>
                <p className="text-blue-800">
                  To be the leading publisher of educational literature that empowers students, 
                  supports educators, and strengthens communities through the power of storytelling.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-4xl text-white"
                  >
                    📚
                  </motion.div>
                  <h3 className="text-2xl font-bold text-zinc-800">Quality Literature</h3>
                  <p className="text-zinc-600">Crafted with care for educational excellence</p>
                </div>
              </div>

              {/* Floating statistics */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="text-2xl font-bold text-blue-600">110+</div>
                <div className="text-sm text-zinc-600">Books Published</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="text-2xl font-bold text-green-600">5+</div>
                <div className="text-sm text-zinc-600">Years Experience</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Values section */}
          <motion.div variants={itemVariants}>
            <Heading as="h3" size="lg" className="text-center mb-12">
              Our Core Values
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎯",
                  title: "Excellence",
                  description: "We maintain the highest standards in content quality, editorial processes, and educational value."
                },
                {
                  icon: "🌍",
                  title: "Diversity",
                  description: "Our books celebrate diverse voices, cultures, and perspectives to enrich the learning experience."
                },
                {
                  icon: "🚀",
                  title: "Innovation",
                  description: "We embrace new ideas, technologies, and approaches to make learning more engaging and effective."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  className="text-center p-6 bg-zinc-50 rounded-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h4 className="text-xl font-semibold mb-3 text-zinc-800">{value.title}</h4>
                  <p className="text-zinc-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team or additional info */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12"
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Explore Our Collection?</h3>
            <p className="text-xl mb-8 opacity-90">
              Discover books that inspire, educate, and entertain students at every level.
            </p>
            <motion.a
              href="#books"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-zinc-100 transition-colors shadow-lg"
            >
              Browse Our Books
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