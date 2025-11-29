# Epics and User Stories

## Epic 4: Content Management Setup

**Description:** Configure Prismic CMS for content management with TypeScript integration and automated type generation.

**Technical Implementation:**
- **CMS:** Prismic with Slice Machine for development
- **Types:** Auto-generated TypeScript types from Prismic schemas
- **Preview:** Prismic preview mode with Next.js
- **Deployment:** Webhook integration for auto-deployment

**Key Configuration:**
```tsx
// Prismic Configuration (prismicio.ts)
import * as prismic from '@prismicio/client'

const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY
const accessToken = process.env.PRISMIC_ACCESS_TOKEN

export const client = prismic.createClient(repositoryName, {
  accessToken,
  routes: [
    { type: 'book', path: '/books/:uid' },
    { type: 'page', path: '/:uid' }
  ]
})

// Book Type Definition (auto-generated)
export interface BookDocument {
  title: prismic.KeyTextField
  author: prismic.KeyTextField
  isbn: prismic.KeyTextField
  description: prismic.RichTextField
  excerpt: prismic.RichTextField
  cover_image: prismic.ImageField
  gallery: prismic.GroupField<{
    image: prismic.ImageField
    caption: prismic.KeyTextField
  }>
  amazon_url: prismic.LinkField
  category: prismic.SelectField<'primary' | 'junior-high' | 'senior-high'>
  tags: prismic.GroupField<{ tag: prismic.KeyTextField }>
  editor_notes: prismic.RichTextField
  reviews: prismic.GroupField<{
    reviewer_name: prismic.KeyTextField
    rating: prismic.NumberField
    comment: prismic.RichTextField
  }>
}

// Data Fetching Helper
export async function getAllBooks(): Promise<BookDocument[]> {
  const response = await client.getAllByType('book', {
    orderings: ['my.book.title']
  })
  return response
}
```

**Priority:** HIGHEST - Must complete before Epic 1

**Acceptance Criteria:**
- Prismic repository configured with environment variables
- Custom types for books with all required fields
- Slices for Hero, About Us, Contact, and other sections
- 110 books populated with complete data from catalogue
- Preview mode enabled for content editing
- Webhooks configured for automatic deployment
- TypeScript types auto-generated from schemas
- Image optimization with Prismic CDN
- Content relationships for related books
- API connectivity tests validate data access
- Content validation tests ensure data integrity

**User Stories:**

1. **As a content admin**, I want to manage book data in Prismic so I can update without code changes.
   - Acceptance: Book custom type with all fields
   - Fields: title, author, ISBN, description, excerpt, gallery, tags, editor notes, reviews

2. **As a content admin**, I want reusable slices for sections so I can build pages flexibly.
   - Acceptance: Slices for Hero, About Us, Contact, etc.

3. **As a content admin**, I want to populate all 110 books so the site has complete content.
   - Acceptance: All books entered in Prismic
   - Categories assigned correctly

4. **As a developer**, I want preview mode so I can review changes before publishing.
   - Acceptance: Prismic preview integration

5. **As a developer**, I want automatic deployments on content changes so the site stays current.
   - Acceptance: Webhooks configured

## Epic 1: Book Showcase Implementation

**Description:** Implement the main book showcase section displaying 110 books in categorized grids with interactive cards using Next.js App Router, Prismic CMS, and shadcn/ui components.

**Technical Implementation:**
- **Framework:** Next.js 15 with App Router
- **CMS:** Prismic headless CMS for book data
- **Components:** shadcn/ui Card components for book display
- **Styling:** Tailwind CSS for responsive grid
- **Data Fetching:** Server Components with Prismic API

**Key Code Patterns:**
```tsx
// Book Card Component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const BookCard = ({ book }) => (
  <Card className="w-full hover:shadow-lg transition-shadow">
    <CardHeader>
      <Image src={book.coverImage} alt={book.title} className="aspect-[3/4] object-cover" />
    </CardHeader>
    <CardContent>
      <CardTitle>{book.title}</CardTitle>
      <CardDescription>{book.shortDescription}</CardDescription>
      <Button asChild>
        <Link href={book.amazonUrl} target="_blank">Buy on Amazon</Link>
      </Button>
    </CardContent>
  </Card>
)
```

**Dependencies:**
- Epic 4 (Content Management Setup) must be completed first
- Prismic repository configured with book data populated
- Book custom types and API access established

**Acceptance Criteria:**
- Books displayed in Primary, Junior High, Senior High categories
- Responsive grid layout (3-4 columns desktop, 1-2 mobile)
- Cards show title, description, category, cover image, Amazon link
- Hover animations using Motion components
- Alphabetical sorting within categories
- Server-side rendering for SEO
- Lazy loading with Next.js Image optimization
- Integration tests verify book data fetching from Prismic

**User Stories:**

1. **As a visitor**, I want to see books organized by school level so I can find appropriate materials quickly.
   - Acceptance: Categories displayed as tabs/sections
   - Category counts: Primary (30), Junior High (45), Senior High (35)

2. **As a visitor**, I want to browse books in a responsive grid so I can view them on any device.
   - Acceptance: Grid adapts to screen size
   - Mobile: 1-2 columns, Desktop: 3-4 columns

3. **As a visitor**, I want interactive book cards with hover effects so I can preview books engagingly.
   - Acceptance: Cards animate on hover/tap
   - Shows cover, title, brief description, category

4. **As a visitor**, I want to purchase books directly from cards so I can buy without leaving the site.
   - Acceptance: Amazon links open in new tab
   - "Buy on Amazon" button visible

5. **As a visitor**, I want to view book details from cards so I can learn more about specific books.
   - Acceptance: Click card → navigate to detail page

## Epic 2: Individual Book Detail Pages

**Description:** Create dedicated pages for each book with comprehensive information and SEO optimization using Next.js dynamic routes and structured data.

**Technical Implementation:**
- **Dynamic Routes:** /books/[uid] with generateStaticParams
- **Static Generation:** Pre-render all book pages at build time
- **SEO:** next-seo for meta tags and structured data
- **Schema Markup:** Schema.org/Book structured data

**Key Code Patterns:**
```tsx
// Dynamic Route Generation
export async function generateStaticParams() {
  const books = await fetch('prismic-api/books').then(res => res.json())
  return books.map(book => ({ uid: book.uid }))
}

// Book Detail Page
export default async function BookPage({ params }) {
  const { uid } = await params
  const book = await getBookByUid(uid)
  
  return (
    <>
      <NextSeo
        title={`${book.title} - Maybridge Publishing`}
        description={book.excerpt}
        openGraph={{
          type: 'website',
          title: book.title,
          description: book.excerpt,
          images: [{ url: book.coverImage }]
        }}
      />
      <BookJsonLd
        name={book.title}
        author={book.author}
        isbn={book.isbn}
        description={book.description}
        image={book.coverImage}
      />
      <BookDetailView book={book} />
    </>
  )
}
```

**Acceptance Criteria:**
- Dynamic routes: /books/[uid] with static generation
- Hero section with cover, title, author, category
- Full description and excerpt
- Gallery of images with Next.js Image optimization
- Editor notes and reviews sections
- Purchase section with Amazon link
- Related books suggestions
- Social sharing buttons
- Breadcrumbs and comprehensive SEO meta tags
- Schema.org/Book structured data
- Canonical URLs and Open Graph tags

**User Stories:**

1. **As a visitor**, I want detailed book information so I can make informed purchase decisions.
   - Acceptance: Full description, excerpt, page count, ISBN

2. **As a visitor**, I want to view book images in a gallery so I can see illustrations and covers.
   - Acceptance: Image gallery with thumbnails
   - Alt text for accessibility

3. **As a visitor**, I want to read editor insights so I can understand book value.
   - Acceptance: Editor notes section

4. **As a visitor**, I want to see reader reviews so I can gauge book quality.
   - Acceptance: Reviews with ratings and comments

5. **As a visitor**, I want easy purchase options so I can buy immediately.
   - Acceptance: Prominent Amazon link
   - Possibly other retailers

6. **As a visitor**, I want to share books on social media so I can recommend to others.
   - Acceptance: Share buttons for Twitter, Facebook, etc.

7. **As a search engine**, I want optimized pages so users can find books easily.
   - Acceptance: Unique meta titles/descriptions
   - Schema.org/Book structured data
   - Canonical URLs

## Epic 3: Landing Page Sections

**Description:** Implement additional landing page sections for company information and user engagement with scroll animations and form handling.

**Technical Implementation:**
- **Animations:** Motion components for scroll-triggered animations
- **Forms:** React Hook Form with validation
- **Slices:** Prismic slices for flexible content management
- **Styling:** Tailwind CSS with responsive design

**Key Code Patterns:**
```tsx
// Scroll Animation Section
import { motion } from 'motion'

const AboutSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="py-16"
  >
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-8">About Maybridge Publishing</h2>
      <p className="text-lg leading-relaxed">...</p>
    </div>
  </motion.section>
)

// Contact Form with Validation
const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = async (data) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register('name', { required: true })} placeholder="Name" />
      <Input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
      <Textarea {...register('message', { required: true })} placeholder="Message" />
      <Button type="submit">Send Message</Button>
    </form>
  )
}
```

**Acceptance Criteria:**
- About Us section with company overview and fade-in animations
- Contact form with validation and submission handling
- Hero section with compelling headline and CTA
- Testimonials/reviews section with carousel
- Newsletter signup with email validation
- Footer with links and info
- Scroll-triggered animations for all sections
- Mobile-responsive design
- Error handling for form submissions

**User Stories:**

1. **As a visitor**, I want to learn about Maybridge Publishing so I can understand their mission.
   - Acceptance: About Us section with text and images

2. **As a potential customer**, I want to contact the company so I can ask questions.
   - Acceptance: Working contact form
   - Fields: name, email, message
   - Submission handling via API

3. **As a visitor**, I want an engaging hero section so I'm drawn to explore the site.
   - Acceptance: Compelling headline, subtext, CTA

4. **As a visitor**, I want to see testimonials so I can trust the company.
   - Acceptance: Quotes from users/educators

5. **As a visitor**, I want to subscribe to updates so I stay informed.
   - Acceptance: Email capture form

6. **As a visitor**, I want footer information so I can find additional links.
   - Acceptance: Links, copyright, contact info

## Epic 5: Performance and UX Enhancements

**Description:** Implement comprehensive performance optimizations, SEO, theme support, and accessibility features using modern web standards.

**Technical Implementation:**
- **Performance:** Next.js Image optimization, static generation, lazy loading
- **SEO:** Comprehensive meta tags, structured data, sitemaps
- **Theming:** Tailwind dark mode with localStorage persistence
- **Accessibility:** WCAG 2.1 AA compliance
- **Analytics:** Core Web Vitals tracking

**Key Implementation:**
```tsx
// Theme Provider with Persistence
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) setTheme(savedTheme)
  }, [])
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }
  
  return (
    <div className={theme}>
      {children}
    </div>
  )
}

// Optimized Image Component
const OptimizedBookCover = ({ book }) => (
  <Image
    src={book.coverImage}
    alt={`Cover of ${book.title} by ${book.author}`}
    width={300}
    height={400}
    className="object-cover rounded-lg"
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
    priority={book.featured}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
)

// SEO Configuration
const seoConfig = {
  title: 'Maybridge Publishing - Educational Books for All Levels',
  description: 'Discover 110 educational books across Primary, Junior High, and Senior High levels. Quality Ghanaian literature for students and educators.',
  canonical: 'https://maybridgepublishing.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Maybridge Publishing',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Maybridge Publishing Books'
    }]
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@maybridgepub'
  },
  additionalJsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Maybridge Publishing USA',
    url: 'https://maybridgepublishing.com',
    logo: '/logo.png'
  }
}
```

**Tailwind Dark Mode Configuration:**
```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))'
      }
    }
  }
}
```

**Acceptance Criteria:**
- Load time < 3 seconds with Core Web Vitals optimization
- Mobile-first responsive design with touch interactions
- Comprehensive SEO: meta tags, structured data, sitemaps
- Light/dark theme toggle with system preference detection
- WCAG 2.1 AA accessibility compliance
- Lazy loading for images and scroll-triggered sections
- Performance monitoring with Web Vitals
- Image optimization with Next.js Image component
- Keyboard navigation and screen reader support
- Progressive enhancement for all features
- Performance testing validates Core Web Vitals targets
- Accessibility testing confirms WCAG 2.1 AA compliance
- Cross-browser compatibility testing (Chrome, Safari, Firefox)
- Mobile responsiveness testing across device breakpoints

**User Stories:**

1. **As a visitor**, I want fast loading pages so I can browse efficiently.
   - Acceptance: <3s load time
   - Lazy loading for images/cards

2. **As a visitor**, I want mobile-optimized experience so I can use on any device.
   - Acceptance: Responsive design
   - Touch-friendly interactions

3. **As a search engine**, I want optimized content so books rank well.
   - Acceptance: Meta tags, schema markup
   - Alt text for images

4. **As a visitor**, I want theme choice so I can read comfortably.
   - Acceptance: Light/dark toggle
   - Preference saved in localStorage

5. **As a visitor with disabilities**, I want accessible content so I can use the site.
   - Acceptance: Keyboard navigation, screen reader support

6. **As a visitor**, I want smooth animations so the experience is engaging.
   - Acceptance: Framer Motion animations
   - Fade-in on scroll, hover effects