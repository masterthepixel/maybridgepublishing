'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Bounded } from './Bounded'
import Link from 'next/link'

export function EnhancedFooter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer ref={ref} className="bg-gray-900 text-white">
      <Bounded>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="py-16"
        >
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company info */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-4">Maybridge Publishing</h3>
              <p className="text-zinc-300 mb-6 leading-relaxed">
                Empowering education through quality books that inspire young minds 
                and celebrate diverse cultures and perspectives.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, color: "#3B82F6" }}
                  className="text-zinc-400 hover:text-blue-400 transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, color: "#1DA1F2" }}
                  className="text-zinc-400 hover:text-blue-400 transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, color: "#0A66C2" }}
                  className="text-zinc-400 hover:text-blue-400 transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, color: "#E4405F" }}
                  className="text-zinc-400 hover:text-blue-400 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zM12.017 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zM15.585 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: 'About Us', href: '#about' },
                  { label: 'Our Books', href: '/books' },
                  { label: 'Contact', href: '#contact' },
                  { label: 'Newsletter', href: '#newsletter' },
                  { label: 'Blog', href: '/blog' }
                ].map((link) => (
                  <li key={link.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="inline-block"
                    >
                      <Link
                        href={link.href}
                        className="text-zinc-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4">Book Categories</h4>
              <ul className="space-y-2">
                {[
                  'Educational',
                  'Children\'s Fiction',
                  'Young Adult',
                  'Cultural Studies',
                  'Biography',
                  'History'
                ].map((category) => (
                  <li key={category}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="inline-block"
                    >
                      <Link
                        href={`/books?category=${category.toLowerCase().replace(' ', '-')}`}
                        className="text-zinc-300 hover:text-white transition-colors"
                      >
                        {category}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-0.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-zinc-300">info@maybridgepublishing.com</p>
                    <p className="text-zinc-300">orders@maybridgepublishing.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-0.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-zinc-300">(555) 123-4567</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-0.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-zinc-300">
                    123 Education Street<br />
                    Learning City, LC 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-zinc-300 text-sm mb-4 md:mb-0">
                © {currentYear} Maybridge Publishing. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-zinc-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-zinc-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/accessibility" className="text-zinc-300 hover:text-white transition-colors">
                  Accessibility
                </Link>
                <Link href="/sitemap" className="text-zinc-300 hover:text-white transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Bounded>
    </footer>
  )
}