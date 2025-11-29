'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Bounded } from './Bounded'
import { Heading } from './Heading'

interface NewsletterFormData {
  email: string
  name?: string
}

export function Newsletter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>()

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <Bounded>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <Heading as="h2" size="xl" className="text-white mb-6">
              Stay Updated with New Releases
            </Heading>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Be the first to know about our latest educational books, special offers, 
              and educational resources. Join our community of educators and book lovers!
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6 text-white"
              >
                <div className="text-3xl mb-4">📚</div>
                <h3 className="text-lg font-semibold mb-2">New Book Alerts</h3>
                <p className="text-blue-100">Get notified when we publish new titles in your favorite categories.</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6 text-white"
              >
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold mb-2">Exclusive Offers</h3>
                <p className="text-blue-100">Access special discounts and early-bird pricing on new releases.</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6 text-white"
              >
                <div className="text-3xl mb-4">📖</div>
                <h3 className="text-lg font-semibold mb-2">Reading Resources</h3>
                <p className="text-blue-100">Receive educational guides and reading tips for students and educators.</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
              <div className="space-y-4">
                {/* Name field (optional) */}
                <div>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Your name (optional)"
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 placeholder-gray-500"
                  />
                </div>

                {/* Email field */}
                <div>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 placeholder-gray-500 ${
                      errors.email ? 'ring-2 ring-red-400' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-200">{errors.email.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : submitStatus === 'success'
                      ? 'bg-green-500 text-white cursor-default'
                      : 'bg-white text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : submitStatus === 'success' ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Successfully Subscribed!
                    </span>
                  ) : (
                    'Subscribe to Newsletter'
                  )}
                </motion.button>

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <p className="text-green-200 font-medium">Welcome to our community!</p>
                    <p className="text-blue-100 text-sm mt-1">Check your email for a confirmation message.</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <p className="text-red-200 font-medium">Something went wrong.</p>
                    <p className="text-blue-100 text-sm mt-1">Please try again or contact us directly.</p>
                  </motion.div>
                )}

                {/* Privacy note */}
                <p className="text-blue-200 text-sm text-center">
                  We respect your privacy. Unsubscribe at any time. 
                  <br />
                  No spam, just educational updates.
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </Bounded>
    </section>
  )
}