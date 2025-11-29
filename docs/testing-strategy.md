# Testing Strategy - Maybridge Publishing Landing Page

**Project:** Maybridge Publishing Landing Page Enhancement  
**Date:** November 29, 2025  
**Type:** Quality Assurance Strategy  

---

## Overview

This testing strategy provides a comprehensive approach to quality assurance for the Maybridge Publishing landing page project, ensuring reliable delivery of the enhanced book showcase functionality.

## Testing Levels

### 1. Unit Testing
**Coverage:** Individual components and utility functions  
**Tools:** Jest, React Testing Library  
**Target:** 80%+ code coverage for critical business logic  

**Focus Areas:**
- Book card component rendering
- Data fetching utilities (Prismic API)
- Search and filtering logic
- Theme switching functionality
- Form validation logic

**Example Tests:**
```typescript
// BookCard component tests
describe('BookCard', () => {
  it('renders book information correctly', () => {
    const mockBook = { title: 'Test Book', author: 'Test Author' }
    render(<BookCard book={mockBook} />)
    expect(screen.getByText('Test Book')).toBeInTheDocument()
  })
  
  it('displays purchase link with correct URL', () => {
    const mockBook = { amazonUrl: 'https://amazon.com/test' }
    render(<BookCard book={mockBook} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://amazon.com/test')
  })
})
```

### 2. Integration Testing
**Coverage:** API integrations and component interactions  
**Tools:** Jest, MSW (Mock Service Worker)  
**Target:** All critical user flows validated  

**Focus Areas:**
- Prismic CMS data fetching
- Dynamic routing with Next.js
- Form submission workflows
- Image loading and optimization
- Search functionality across book categories

**Key Integration Tests:**
- Book data loading from Prismic
- Category filtering and sorting
- Contact form submission
- Theme persistence across sessions
- Newsletter signup integration

### 3. End-to-End Testing
**Coverage:** Complete user journeys  
**Tools:** Playwright  
**Target:** All critical user paths automated  

**Test Scenarios:**
```typescript
// Critical user journey tests
test('User can browse books and view details', async ({ page }) => {
  await page.goto('/');
  
  // Browse books by category
  await page.click('[data-testid="primary-category"]');
  await expect(page.locator('.book-card')).toHaveCount(30);
  
  // Click on a book to view details
  await page.click('.book-card:first-child');
  await expect(page).toHaveURL(/\/books\/.*$/);
  
  // Verify book details page
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('[data-testid="amazon-link"]')).toBeVisible();
});

test('Contact form submission works correctly', async ({ page }) => {
  await page.goto('/');
  await page.fill('[name="name"]', 'Test User');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="message"]', 'Test message');
  await page.click('[type="submit"]');
  await expect(page.locator('.success-message')).toBeVisible();
});
```

## Performance Testing

### Core Web Vitals Validation
**Tools:** Lighthouse CI, Web Vitals library  
**Targets:**
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s  
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

**Automated Performance Testing:**
```yaml
# .github/workflows/performance.yml
name: Performance Testing
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          configPath: './.lighthouserc.js'
          uploadArtifacts: true
```

### Load Testing
**Tools:** Artillery.io for API endpoints  
**Scenarios:**
- Concurrent book browsing (100+ users)
- Contact form submissions under load
- Image loading performance with CDN

## Accessibility Testing

### Automated Accessibility Testing
**Tools:** axe-core, Lighthouse accessibility audit  
**Standard:** WCAG 2.1 AA compliance  

**Focus Areas:**
- Keyboard navigation for all interactive elements
- Screen reader compatibility
- Color contrast ratios (especially with theme switching)
- Focus management in modals and forms
- Semantic HTML structure

**Automated Accessibility Tests:**
```typescript
// Accessibility test example
import { axe, toHaveNoViolations } from 'jest-axe';

test('Book showcase page has no accessibility violations', async () => {
  const { container } = render(<BookShowcase books={mockBooks} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Cross-Browser Testing

### Browser Support Matrix
**Required Browsers:**
- Chrome (latest 2 versions)
- Safari (latest 2 versions)  
- Firefox (latest 2 versions)
- Edge (latest 2 versions)

**Mobile Testing:**
- iOS Safari (iPhone, iPad)
- Chrome Mobile (Android)
- Responsive design validation

**Automated Cross-Browser Testing:**
```typescript
// Playwright cross-browser configuration
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } },
  ],
});
```

## SEO Testing

### Technical SEO Validation
**Tools:** Lighthouse SEO audit, Meta tag validators  

**Validation Points:**
- Meta title and description tags
- Open Graph and Twitter Card tags
- Structured data (Schema.org/Book)
- Canonical URLs
- XML sitemap generation
- Robots.txt configuration

**SEO Test Examples:**
```typescript
test('Book detail pages have proper SEO meta tags', async ({ page }) => {
  await page.goto('/books/test-book');
  
  // Verify meta tags
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.*Test Book.*/);
  await expect(page.locator('meta[name="description"]')).toBeAttached();
  await expect(page.locator('link[rel="canonical"]')).toBeAttached();
});
```

## Test Data Management

### Test Data Strategy
**Approach:** Controlled test data with realistic book information  
**Sources:**
- Subset of production book catalogue (10-15 books)
- Mock data generation for edge cases
- Prismic preview environment for CMS testing

### Test Environment Setup
```typescript
// Test data factories
export const createMockBook = (overrides = {}) => ({
  id: 'test-book-1',
  title: 'Test Book Title',
  author: 'Test Author',
  isbn: '978-1-945673-01-8',
  category: 'primary',
  description: 'Test book description...',
  coverImage: '/test-cover.jpg',
  amazonUrl: 'https://amazon.com/test-book',
  ...overrides
});
```

## Continuous Integration

### CI/CD Pipeline Integration
**Platform:** GitHub Actions  
**Test Execution:** All test levels run on every PR  

```yaml
name: Quality Assurance
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests  
        run: npm run test:integration
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Run accessibility tests
        run: npm run test:a11y
      
      - name: Performance audit
        run: npm run test:performance
```

## Quality Gates

### Definition of Done Criteria
For each user story to be considered complete:

✅ **Unit Tests:** All new components have unit tests with 80%+ coverage  
✅ **Integration Tests:** API integrations validated with realistic data  
✅ **E2E Tests:** Critical user paths automated and passing  
✅ **Performance:** Core Web Vitals targets met  
✅ **Accessibility:** WCAG 2.1 AA compliance verified  
✅ **Cross-Browser:** Tested on all supported browsers  
✅ **SEO:** Meta tags and structured data validated  

### Release Criteria
Before production deployment:

- All automated tests passing (100% success rate)
- Performance benchmarks met (<3s load time)
- Accessibility audit clean (no critical violations)
- SEO validation complete (all meta tags present)
- Manual testing completed on staging environment
- Stakeholder approval on key user journeys

---

This testing strategy ensures comprehensive quality assurance while maintaining development velocity through automation and clear quality gates.