import { NextRequest, NextResponse } from 'next/server'

// Types for newsletter signup
interface NewsletterRequest {
  email: string
  name?: string
}

// Simple email validation regex
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name }: NewsletterRequest = body

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { 
          error: 'Email is required',
          details: 'Please provide a valid email address'
        },
        { status: 400 }
      )
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          error: 'Invalid email format',
          details: 'Please provide a valid email address'
        },
        { status: 400 }
      )
    }

    // Simulate rate limiting (basic check)
    const userAgent = request.headers.get('user-agent') || ''
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Log the signup (in production, this would go to your email service)
    console.log('Newsletter signup:', {
      email,
      name: name || 'Not provided',
      timestamp: new Date().toISOString(),
      ip,
      userAgent
    })

    // Simulate processing delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real application, you would:
    // 1. Add the email to your newsletter service (MailChimp, ConvertKit, etc.)
    // 2. Send a confirmation email
    // 3. Store subscriber data in your database
    // 4. Handle duplicate email addresses
    
    // Example integration points:
    // - MailChimp API
    // - SendGrid API
    // - ConvertKit API
    // - Database storage

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        data: {
          email,
          subscribed: true,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter signup error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: 'Unable to process newsletter signup. Please try again later.'
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      details: 'This endpoint only accepts POST requests'
    },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      details: 'This endpoint only accepts POST requests'
    },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      details: 'This endpoint only accepts POST requests'
    },
    { status: 405 }
  )
}