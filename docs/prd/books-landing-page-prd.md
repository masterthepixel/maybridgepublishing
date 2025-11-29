# Product Requirements Document (PRD): Enhanced Landing Page for Maybridge Publishing

## 1. Overview

This PRD outlines the requirements for enhancing the Maybridge Publishing website's landing page to include a comprehensive showcase of 110 books (categorized into Primary, Junior High, and Senior High levels), along with additional sections such as About Us, Contact, and other standard landing page elements. Each book will be displayed as an interactive card using the "Book" component from the x/ui library, with a direct link to Amazon for purchasing. This feature aims to drive sales, build trust, and provide user engagement through an engaging, categorized browse experience for educational books.

**Target Audience**: Parents, educators, students, and potential partners interested in educational materials.

**Business Goal**: Increase book sales, improve brand awareness, and enhance user engagement, boosting conversion rates by 20-30% and reducing bounce rates by 15% (estimated).

**Timeline**: To be implemented in the next sprint (2-3 weeks).

## 2. Objectives

- Display all 110 books in a visually appealing, categorized grid on the landing page.
- Ensure each book card is interactive, with animations and purchase links.
- Add essential landing page sections (About Us, Contact, etc.) for completeness and user trust.
- Maintain fast load times, mobile responsiveness, and SEO optimization.
- Integrate seamlessly with the existing Prismic CMS for content management.

## 3. Features

### 3.1 Book Showcase Section

- **Component**: Use the "Book" component from [https://ui.3x.gl/docs/book](https://ui.3x.gl/docs/book) for each card.
- **Content per Card**:
  - Book title (displayed prominently).
  - Book description (brief summary).
  - Category indicator (Primary, Junior High, Senior High).
  - Animated book cover/icon (via component, with editable cover image from Prismic).
  - Optional gallery preview (e.g., thumbnail of additional images).
  - "Buy on Amazon" button/link (opens in new tab).
  - Link to individual book page for full details.
- **Interactivity**: Cards should animate on hover/tap (as per component defaults). Sections fade in and slide up on scroll using Framer Motion.
- **Categorization and Layout**:
  - **Primary Level Readers Section**: Features 30 books for elementary school-aged readers (ages 8-12). These stories focus on themes of courage, heritage, friendship, and everyday adventures in Ghanaian settings, helping young readers develop empathy, cultural awareness, and problem-solving skills.
  - **Junior High Fiction Section**: Includes 45 books for middle school readers (ages 12-15). These narratives explore identity, social justice, fantasy elements, and personal growth, addressing topics like family dynamics, education, and community challenges in modern and historical Ghana.
  - **Senior High Fiction Section**: Comprises 35 books for high school audiences (ages 15-18). These advanced stories delve into coming-of-age themes, societal issues, romance, and self-discovery, often incorporating elements of mystery, history, and future-oriented scenarios to inspire critical thinking and resilience.
  - Responsive grid (e.g., 3-4 columns on desktop, 1-2 on mobile).
  - Sorting: Books within each category sorted alphabetically by title (default).

### 3.1.1 Individual Book Detail Pages

- **Purpose**: Provide a dedicated page for each book with comprehensive details, enhancing user engagement and SEO.
- **Structure**:
  - Hero section with book cover, title, and key info (author, category, page count).
  - Full description and synopsis.
  - Gallery of images (editable in Prismic).
  - Editor Notes section (displaying editorial insights or recommendations).
  - Reviews section (listing user/reader reviews with ratings and comments).
  - Purchase section with Amazon link and possibly other retailers.
  - Related books or recommendations.
  - Social sharing buttons.
- **SEO for Book Pages**:
  - Unique meta title (e.g., "Book Title by Author - Maybridge Publishing").
  - Meta description with synopsis excerpt.
  - Structured data (schema.org/Book) including ISBN (if available), author, publisher, genre, and availability.
  - Canonical URLs to prevent duplication.
  - Breadcrumbs for navigation.
  - Image alt text and captions for gallery.
- **URL Structure**: /books/[uid] or /books/[slug] for clean, indexable URLs.
- **Indexing**: Ensure pages are crawlable, with sitemaps including book pages.

### 3.2 About Us Section

- **Purpose**: Introduce Maybridge Publishing, its mission, history, and values.
- **Content**:
  - Company overview (text and images).
  - Team highlights or founder story.
  - Mission statement (e.g., "Empowering education through quality books").
- **Layout**: Full-width section with text, images, and possibly a call-to-action (CTA) button (e.g., "Learn More").
- **Source**: Managed via Prismic slice for easy updates.

### 3.3 Contact Section

- **Purpose**: Provide ways for users to get in touch for inquiries, partnerships, or support.
- **Content**:
  - Contact form (name, email, message) with submission handling.
  - Contact details (email, phone, address if applicable).
  - Social media links (e.g., Twitter, LinkedIn).
  - Map or location embed (if physical location).
- **Layout**: Form on left/right, details on the other side; responsive design.
- **Functionality**: Form submissions sent via email or integrated service (e.g., Netlify Forms or custom API).

### 3.4 Additional Landing Page Elements

- **Hero Section**: Existing or enhanced with a compelling headline, subtext, and CTA (e.g., "Explore Our Books").
- **Testimonials/Reviews**: Section for user quotes or ratings to build credibility.
- **Newsletter Signup**: Email capture form for updates and promotions.
- **Footer**: Standard footer with links, copyright, and additional contact info.
- **Navigation**: Ensure header includes links to sections (e.g., smooth scroll or anchor links).

### 3.5 Data Management

- **Source**: All content stored in Prismic (books as "Book" custom type, other sections via slices).
- **Book Fields**:
  - Title (Text)
  - Description (Rich Text)
  - Category (Select: Primary, Junior High, Senior High)
  - Amazon Link (Link field for purchase URL)
  - Cover Image (Image field for main book cover, editable in Prismic)
  - Gallery (Repeatable group of images for additional visuals, e.g., illustrations or promotional photos, allowing users to add/edit multiple images per book)
  - Editor Notes (Rich Text field for editorial insights, background, or recommendations)
  - Reviews (Repeatable group with fields: Reviewer Name (Text), Rating (Number, 1-5), Comment (Rich Text))
- **Other Sections**: Use existing slices (e.g., Text, Image) or create new ones (e.g., ContactForm).
- **Population**: Book data sourced from [book-catalogue.md](book-catalogue.md); 110 books added manually in Prismic; other content authored as needed.

### 3.6 Performance and UX

- **Loading**: Lazy load sections and cards to handle large content, with skeleton loaders for smooth user experience during data fetching.
- **SEO**:
  - Dynamic meta titles and descriptions for the landing page (e.g., "Discover 110 Educational Books by Maybridge Publishing - Primary, Junior High, Senior High").
  - Open Graph and Twitter Card tags for social sharing, using book covers and descriptions.
  - Structured data (schema.org) for books, including title, author, description, and purchase links to enhance search engine understanding.
  - Alt text for all images (covers, galleries) with descriptive keywords.
  - URL-friendly slugs for book categories (e.g., /books/primary).
  - Keyword optimization in headings, descriptions, and content (e.g., "Ghanaian educational books", "buy books online", "children's literature").
  - Internal linking between sections and external links to Amazon with proper anchor text.
- **Accessibility**: All sections keyboard-navigable, alt text, screen reader support.
- **Analytics**: Track interactions (e.g., book clicks, form submissions) for insights.
- **Theme Support**: Implement light and dark mode toggle, with user preference saved (e.g., via localStorage) and system preference detection.

## 4. Requirements

### 4.1 Functional Requirements

- FR1: Landing page must load books dynamically from Prismic and display in categories.
- FR2: Each book card must include a unique Amazon purchase link.
- FR3: About Us and Contact sections must be present and functional.
- FR4: Page must be fully responsive and load in < 3 seconds.
- FR5: Contact form must submit successfully and provide user feedback.
- FR6: Theme toggle must switch between light and dark modes seamlessly.
- FR7: Page must implement SEO best practices, including meta tags, structured data, and keyword optimization.
- FR8: Each book card must link to a dedicated detail page with full book information.

### 4.2 Non-Functional Requirements

- NFR1: Page load time < 3 seconds.
- NFR2: Support for 1000+ concurrent users.
- NFR3: Compatible with latest browsers (Chrome, Safari, Firefox).
- NFR4: Mobile-first design with touch-friendly interactions.

### 4.3 Technical Requirements

- TR1: Integrate x/ui library (or equivalent) for book cards.
- TR2: Add new slice components for books, contact form, etc.
- TR3: Update Prismic custom types and sync via Slice Machine.
- TR4: Ensure TypeScript types for all new data structures.
- TR5: Implement form handling (e.g., via API route or third-party service).
- TR6: Add theme switching logic using Tailwind's dark mode classes and state management.
- TR7: Integrate SEO optimizations, including dynamic meta tags, schema markup, and image alt attributes.
- TR8: Create dynamic routes for individual book pages (e.g., /books/[uid]) and update Prismic route resolvers accordingly.
- TR9: Implement Framer Motion for fade-in and slide-up animations on sections and elements.
- TR11: Set up Prismic preview mode for draft content viewing.
- TR12: Configure webhooks for automatic deployment on content changes.
- TR13: Implement environment variables for Prismic repository URL and access token.
- TR14: Use Next.js Image component for optimized Prismic image rendering.
- TR15: Configure Prismic rich text components for consistent rendering.
- TR16: Set up custom link resolvers for dynamic routing.
- TR17: Handle content relationships between Book and other types.
- TR18: Implement error handling for missing or unpublished content.
- TR19: Configure Prismic caching and ISR for optimal performance.
- TR20: Ensure Prismic-generated TypeScript types are properly integrated and type-safe.

## 5. User Stories

- **As a visitor**, I want to see an overview of the company so I can learn about Maybridge Publishing's mission.
- **As a potential customer**, I want easy contact options so I can ask questions or request info.
- **As a parent**, I want to browse books by school level and buy directly so I can find and purchase materials quickly.
- **As a teacher**, I want engaging sections and purchase links so I can explore resources and buy for my classroom.
- **As a site admin**, I want all content manageable in Prismic so I can update sections without code changes, including uploading new book cover images and managing galleries for each book.
- **As a reader**, I want to click on a book card to view a detailed page with full description, gallery, and purchase options.
- **As a user**, I want to toggle between light and dark modes so I can read comfortably in my preferred theme.

## 6. Acceptance Criteria

- [ ] All 110 books displayed, categorized, and linked to Amazon.
- [ ] About Us section includes company info and visuals.
- [ ] Contact section has a working form and details.
- [ ] Page renders correctly on desktop and mobile.
- [ ] Prismic integration allows editing all sections.
- [ ] Performance and accessibility benchmarks met.
- [ ] Light and dark mode toggle works and persists user preference.
- [ ] SEO elements (meta tags, structured data, alt text) are properly implemented and validated.
- [ ] Book detail pages load with full information, proper SEO, and are indexable as books.

## 7. Risks and Assumptions

- **Risk**: x/ui library may not be installable—mitigation: use shadcn/ui or custom components.
- **Assumption**: Amazon links and contact details are provided.
- **Risk**: Form spam—mitigation: add CAPTCHA or validation.
- **Risk**: Manual content entry—mitigation: provide templates.

## 8. Dependencies

- Prismic repository access.
- x/ui or alternative library.
- Design team approval for layouts.
- Email service for contact form (e.g., SendGrid).

## 9. Next Steps

- Review and approve this PRD.
- Begin development: Set up Prismic types, create slices, integrate components.
- Testing, QA, and deployment.

(This is an expanded draft; additional details can be added as needed.)


{
  "publisher": "Maybridge Publishing USA",
  "catalogYear": "2026",
  "categories": [
    {
      "name": "Primary Level Readers",
      "books": [
        {
          "title": "Cooking with Mama Akosua",
          "author": "Ama Agyeman",
          "isbn": "978-1-945673-01-8",
          "pages": 100,
          "description": "Every Saturday, Ama helps her mother sell kenkey and fish. But when Mama Akosua enters a regional cooking competition, Ama becomes her biggest cheerleader and kitchen partner, learning about resilience, creativity, and the flavours of Ghana that bring people together.",
          "shortDescription": "A young girl learns about resilience and Ghanaian cuisine through her mother's cooking competition journey.",
          "excerpt": "The market buzzed with Saturday morning energy as Ama carefully arranged the last of the fried fish beside the steaming kenkey. Mama Akosua's hands moved with practiced precision, her voice calling out to customers in a rhythm as familiar as the morning sun. When the competition announcement came over the radio, Ama saw the spark in her mother's eyes - a spark that would light up their kitchen and their lives in ways they never imagined.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-01-8/cover.jpg",
            "https://example.com/images/978-1-945673-01-8/cooking-scene.jpg",
            "https://example.com/images/978-1-945673-01-8/market-day.jpg"
          ],
          "tags": ["cooking", "Ghanaian culture", "family", "resilience", "creativity"]
        },
        {
          "title": "Grandpa's Secret Stories",
          "author": "Kofi Asante",
          "isbn": "978-1-945673-02-5",
          "pages": 80,
          "description": "When fifteen-year-old Afi spends her holidays with her grandfather in rural Ghana, she uncovers his hidden identity as a spiritual guardian and must embrace her inherited powers to save their village from destruction and preserve its ancient magic.",
          "shortDescription": "A teenage girl discovers her grandfather's secret magical legacy and must save her village.",
          "excerpt": "The compound was quiet when Afi first saw the glow. It emanated from her grandfather's hut - a soft, pulsing light that seemed to breathe with the earth itself. She had come to the village expecting boredom, expecting dusty days and empty nights. Instead, she found herself standing at the threshold of a world where ancestral spirits walked among the living, and her grandfather was their keeper.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-02-5/cover.jpg",
            "https://example.com/images/978-1-945673-02-5/grandpa-hut.jpg",
            "https://example.com/images/978-1-945673-02-5/village-night.jpg"
          ],
          "tags": ["magic", "ancestral wisdom", "village life", "spiritual", "adventure"]
        },
        {
          "title": "My Embarrassing Big Brother",
          "author": "Kwesi Mensah",
          "isbn": "978-1-945673-03-2",
          "pages": 86,
          "description": "When his exuberant older brother Nana becomes an unexpected social media star, fifteen-year-old Kwesi must overcome his embarrassment to stand by him and learn the true meaning of family, authenticity, and acceptance.",
          "shortDescription": "A teenager learns to accept his social media star brother and discovers true family values.",
          "excerpt": "The video had three million views when Kwesi first saw it. There was Nana, dancing in the kitchen with a pot on his head, singing off-key about jollof rice. The comments were brutal: 'Hilarious!' 'This guy is a legend!' 'Ghana's next big star!' Kwesi wanted to disappear. But as the likes kept climbing and Nana's genuine joy shone through every pixel, Kwesi began to see his brother - and himself - differently.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-03-2/cover.jpg",
            "https://example.com/images/978-1-945673-03-2/social-media.jpg",
            "https://example.com/images/978-1-945673-03-2/brothers.jpg"
          ],
          "tags": ["social media", "family", "acceptance", "modern Ghana", "identity"]
        },
        {
          "title": "Ananse and the Forgotten Spell",
          "author": "Nana Yaa Osei",
          "isbn": "978-1-945673-04-9",
          "pages": 102,
          "description": "When a Ghanaian teenager accidentally awakens the fading spider god Ananse from an ancient book, he embarks on a magical quest across Ghana to restore the balance between humans and spirits, discovering courage, heritage, and the enduring power of storytelling.",
          "shortDescription": "A modern teenager revives the spider god Ananse and embarks on a magical quest across Ghana.",
          "excerpt": "The book had no title, only a spider embossed on its leather cover. When Kojo opened it, words crawled off the pages like living things. 'Who dares disturb my slumber?' The voice was ancient, threaded with silk and shadows. Kojo dropped the book, but it was too late. Ananse, the trickster god, the weaver of tales, had awakened - and he was hungry for stories.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-04-9/cover.jpg",
            "https://example.com/images/978-1-945673-04-9/ananse-spider.jpg",
            "https://example.com/images/978-1-945673-04-9/ancient-book.jpg"
          ],
          "tags": ["Ananse", "mythology", "magic", "quest", "storytelling"]
        },
        {
          "title": "Born to Dance, Forced to Marry",
          "author": "Cecilia Obeng Adjei",
          "isbn": "978-1-945673-05-6",
          "pages": 100,
          "description": "Seventeen-year-old Esi Mensah must choose between her family's expectations of marriage and her dream of becoming a dancer, discovering that true respect for tradition lies in having the courage to follow her own path.",
          "shortDescription": "A young woman defies tradition to pursue her passion for dance over arranged marriage.",
          "excerpt": "The drummers pounded out the marriage rhythm as Esi's family gathered. But her feet itched for a different beat - the syncopated rhythm of Adowa, the dance that made her spirit soar. 'Esi, it's time,' her mother called. Time to say yes to a man she barely knew. Time to say goodbye to the stage. But as Esi looked at her reflection in the mirror, she saw not a bride, but a dancer.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-05-6/cover.jpg",
            "https://example.com/images/978-1-945673-05-6/dance-performance.jpg",
            "https://example.com/images/978-1-945673-05-6/traditional-wedding.jpg"
          ],
          "tags": ["dance", "tradition vs modernity", "women's empowerment", "Ghanaian culture", "family expectations"]
        },
        {
          "title": "Diary of a Small-Town Girl",
          "author": "Abena Osei",
          "isbn": "978-1-945673-06-3",
          "pages": 76,
          "description": "When small-town girl Akosua moves to Accra, she discovers that embracing her roots and telling her authentic story through writing is the key to finding her voice, her courage, and her path to success.",
          "shortDescription": "A girl from a small town finds her voice through writing after moving to the big city.",
          "excerpt": "Dear Diary, Accra is louder than I thought possible. The streets never sleep, and the people move like rivers - fast, unstoppable, directionless. I came here hoping to become someone new. But maybe the person I need to be is the girl I left behind. The girl who knew the names of every neighbor, who could predict the rain by the smell of the earth. Maybe my small-town heart is my strength, not my weakness.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-06-3/cover.jpg",
            "https://example.com/images/978-1-945673-06-3/writing-desk.jpg",
            "https://example.com/images/978-1-945673-06-3/accra-city.jpg"
          ],
          "tags": ["writing", "coming-of-age", "Accra", "small town", "identity"]
        },
        {
          "title": "Finding My Voice",
          "author": "Abigail Mensah",
          "isbn": "978-1-945673-07-0",
          "pages": 82,
          "description": "At a Ghanaian boarding school, shy Abigail Mensah discovers her courage and identity through spoken word poetry, transforming from a silent observer into a powerful voice for truth and change.",
          "shortDescription": "A shy student discovers courage and identity through spoken word poetry at boarding school.",
          "excerpt": "The microphone felt like a snake in her hands - cold, dangerous, ready to strike. Abigail had spent fifteen years perfecting the art of invisibility. But the words inside her were lava, burning to escape. When she stepped into the spotlight at the school poetry slam, she didn't just speak. She erupted. And in that moment, the girl who had always whispered learned to roar.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-07-0/cover.jpg",
            "https://example.com/images/978-1-945673-07-0/poetry-slam.jpg",
            "https://example.com/images/978-1-945673-07-0/boarding-school.jpg"
          ],
          "tags": ["poetry", "spoken word", "boarding school", "self-expression", "courage"]
        },
        {
          "title": "Dancing to Win",
          "author": "Benjamin Owusu Frimpong",
          "isbn": "978-1-945673-08-7",
          "pages": 117,
          "description": "Fifteen-year-old Mimi Asante defies her father's academic expectations to secretly pursue her passion for traditional Ghanaian dance, risking everything to honour her heritage and discover the courage to be true to herself.",
          "shortDescription": "A teenager secretly pursues traditional dance against her father's academic wishes.",
          "excerpt": "Her feet moved before her mind could object. The Adowa rhythm pulsed through the community center like a heartbeat, and Mimi's body answered its call. She had snuck out again, leaving behind textbooks and her father's dreams of medical school. In the dance, she found her truth - a language older than ambition, more powerful than expectation.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-08-7/cover.jpg",
            "https://example.com/images/978-1-945673-08-7/traditional-dance.jpg",
            "https://example.com/images/978-1-945673-08-7/dance-practice.jpg"
          ],
          "tags": ["dance", "tradition", "family conflict", "heritage", "courage"]
        },
        {
          "title": "Oops! I Broke the Chief's Stool",
          "author": "Kofi Asante",
          "isbn": "978-1-945673-09-4",
          "pages": 84,
          "description": "When Ato accidentally breaks his chief's sacred stool before a major festival, he embarks on a journey of courage, honesty, and redemption that teaches him true leadership means taking responsibility for one's mistakes.",
          "shortDescription": "A boy who breaks a sacred stool learns about responsibility and leadership.",
          "excerpt": "The crack echoed through the palace like thunder. Ato watched in horror as the chief's sacred stool split down the middle, its centuries-old wood giving way beneath his clumsy hands. The festival was tomorrow. The elders would arrive at dawn. And Ato, a boy who had never been in real trouble, had just destroyed the symbol of his people's unity.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-09-4/cover.jpg",
            "https://example.com/images/978-1-945673-09-4/sacred-stool.jpg",
            "https://example.com/images/978-1-945673-09-4/village-festival.jpg"
          ],
          "tags": ["responsibility", "leadership", "mistakes", "redemption", "tradition"]
        },
        {
          "title": "Saving Nana's Cocoa Farm",
          "author": "Ama Agyeman",
          "isbn": "978-1-945673-10-0",
          "pages": 82,
          "description": "Twelve-year-old Afia leads a youth movement combining social media and traditional knowledge to protect her grandmother's Ghanaian cocoa farm from foreign investors, sparking an international conversation about sustainable development and cultural heritage.",
          "shortDescription": "A girl uses social media to save her grandmother's cocoa farm from foreign investors.",
          "excerpt": "The bulldozers were scheduled for Monday. Afia watched her grandmother tend to the cocoa trees with gentle hands that had nurtured them for fifty years. These weren't just plants; they were stories, roots, history. When the foreign investors' letter arrived, Afia did what any modern Ghanaian child would do - she opened her phone and started a revolution, one post at a time.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-10-0/cover.jpg",
            "https://example.com/images/978-1-945673-10-0/cocoa-farm.jpg",
            "https://example.com/images/978-1-945673-10-0/social-media.jpg"
          ],
          "tags": ["cocoa farming", "social media activism", "environment", "heritage", "sustainability"]
        },
        {
          "title": "The Day I Became a Chicken Seller",
          "author": "Ama Mensah",
          "isbn": "978-1-945673-11-7",
          "pages": 58,
          "description": "After publicly insulting market sellers, fifteen-year-old Ama is punished by being forced to sell chickens at a Ghanaian market, where chaotic misadventures transform her disdain into respect for the hustle and dignity of everyday workers.",
          "shortDescription": "A privileged girl learns respect through working at a chicken market.",
          "excerpt": "The smell hit her first - a pungent cocktail of feathers, feed, and something unmistakably alive. Ama had mocked these women her whole life, these 'uneducated' market sellers. Now, as punishment for her pride, she was one of them. The first chicken escaped within minutes. The second pecked her hand. By the third day, Ama was beginning to understand the poetry in their chaos.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-11-7/cover.jpg",
            "https://example.com/images/978-1-945673-11-7/chicken-market.jpg",
            "https://example.com/images/978-1-945673-11-7/market-life.jpg"
          ],
          "tags": ["market life", "redemption", "respect", "work ethic", "humility"]
        },
        {
          "title": "The Fastest Girl in Ghana",
          "author": "Abena Osei",
          "isbn": "978-1-945673-12-4",
          "pages": 107,
          "description": "Abena from Northern Ghana earns a scholarship to an elite sports academy after her barefoot running catches a scout's attention, then must navigate professional training and competition while preserving the joy and cultural identity that fueled her natural talent.",
          "shortDescription": "A barefoot runner from northern Ghana earns a scholarship and must balance success with identity.",
          "excerpt": "The scout couldn't believe his eyes. The girl was running barefoot on gravel, her feet barely touching the ground, her stride as natural as breathing. Abena didn't run for medals or glory. She ran because the wind spoke to her in her native tongue, because the earth beneath her feet was home. Now, with a scholarship to the city academy, she had to learn to run for others without losing the joy that made her fly.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-12-4/cover.jpg",
            "https://example.com/images/978-1-945673-12-4/running.jpg",
            "https://example.com/images/978-1-945673-12-4/sports-academy.jpg"
          ],
          "tags": ["sports", "athletics", "Northern Ghana", "scholarship", "identity"]
        },
        {
          "title": "The Festival That Changed Everything",
          "author": "Benjamin Owusu Frimpong",
          "isbn": "978-1-945673-13-1",
          "pages": 97,
          "description": "Yaw, a tech enthusiast reluctantly becomes festival prince for Ghana's Yam Festival, but discovering his great-great-grandfather's hidden drums and journal about resisting colonial oppression transforms his dismissal of tradition into a quest to honor heritage while remaining true to himself.",
          "shortDescription": "A tech-savvy boy embraces tradition after discovering his ancestor's revolutionary past.",
          "excerpt": "Yaw had always preferred code to culture, algorithms to ancestors. But when his father thrust the ceremonial robes upon him, making him festival prince, Yaw discovered something in his great-great-grandfather's journal that changed everything: resistance encoded in rhythm, freedom written in drumbeats. The past wasn't dead - it was just waiting for someone to read its language.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-13-1/cover.jpg",
            "https://example.com/images/978-1-945673-13-1/yam-festival.jpg",
            "https://example.com/images/978-1-945673-13-1/traditional-drums.jpg"
          ],
          "tags": ["festival", "heritage", "colonial history", "tradition", "technology"]
        },
        {
          "title": "The Floating City Experiment",
          "author": "Kofi Asante",
          "isbn": "978-1-945673-14-8",
          "pages": 82,
          "description": "Twelve-year-old Adom joins a team of young engineers building innovative floating homes to protect his flood-threatened Ghanaian village, but must solve sabotage and unite a divided community to prove their climate-resilient technology works when the next flood arrives.",
          "shortDescription": "Young engineers build floating homes to save their village from flooding.",
          "excerpt": "The prototype swayed gently on the water, a strange hybrid of bamboo and solar panels. Adom's village had flooded three times in five years, each time washing away more memories. While adults debated climate change, the children built solutions. The floating homes were their answer, but when someone cut the mooring lines, Adom realized that saving their village would require more than engineering - it would require trust.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-14-8/cover.jpg",
            "https://example.com/images/978-1-945673-14-8/floating-homes.jpg",
            "https://example.com/images/978-1-945673-14-8/flood-village.jpg"
          ],
          "tags": ["climate change", "engineering", "floating homes", "community", "innovation"]
        },
        {
          "title": "The Girl Who Talked to Ghosts",
          "author": "Nana Ama Osei",
          "isbn": "978-1-945673-15-5",
          "pages": 47,
          "description": "A fourteen-year-old Ghanaian girl discovers she can hear the dead and must uncover long-buried village secrets to bring peace to restless spirits while protecting herself from danger.",
          "shortDescription": "A girl who can hear ghosts must solve village mysteries to bring peace to restless spirits.",
          "excerpt": "The first whisper came at her grandmother's funeral - a voice only she could hear, asking for help. By the third night, the voices were a chorus of the departed, each with unfinished business. Fourteen-year-old Ama had inherited her grandmother's gift, or curse depending on who you asked. Now she must walk the line between worlds, solving century-old murders before the living become the dead.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-15-5/cover.jpg",
            "https://example.com/images/978-1-945673-15-5/ghostly-encounter.jpg",
            "https://example.com/images/978-1-945673-15-5/village-secrets.jpg"
          ],
          "tags": ["ghosts", "supernatural", "mystery", "village secrets", "spiritual"]
        },
        {
          "title": "Solar Power and the Genius Twins",
          "author": "Kwame Asante",
          "isbn": "978-1-945673-16-2",
          "pages": 87,
          "description": "When teenage twins in Ghana invent a solar-powered handwashing station that's stolen by a corrupt tech company, they must fight to prove their genius and reclaim their dream of transforming hygiene across Africa.",
          "shortDescription": "Teenage twins fight to reclaim their stolen invention that could transform African hygiene.",
          "excerpt": "The prototype was beautiful in its simplicity: a solar panel, a water tank, and a sensor that released soap and water without touch. Kofi and Ama had designed it for their village school, where clean water was scarce. But when the sleek corporate exec offered them 'exposure' instead of payment, then stole their designs, the twins learned that genius without protection is just a gift for others to steal.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-16-2/cover.jpg",
            "https://example.com/images/978-1-945673-16-2/solar-invention.jpg",
            "https://example.com/images/978-1-945673-16-2/twins-workshop.jpg"
          ],
          "tags": ["solar power", "innovation", "twins", "corruption", "technology"]
        },
        {
          "title": "Street Football Legends",
          "author": "Nii Adjei",
          "isbn": "978-1-945673-17-9",
          "pages": 73,
          "description": "In the heart of Nima, Accra, a determined fourteen-year-old and his friends form a street football team to prove that passion and teamwork can triumph over poverty, privilege, and impossible odds.",
          "shortDescription": "A street football team in Accra fights to overcome poverty and prove their worth.",
          "excerpt": "The field was dirt, the goalposts were old pipes, and the ball was held together with twine and prayers. But when they played, they were giants. In Nima's dusty streets, fourteen-year-old Kofi and his friends had formed a team that would challenge the academies, the rich kids with proper boots and synthetic fields. They had heart. They had skill. And they had a point to prove: greatness isn't born from privilege, it's forged in passion.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-17-9/cover.jpg",
            "https://example.com/images/978-1-945673-17-9/street-football.jpg",
            "https://example.com/images/978-1-945673-17-9/accra-streets.jpg"
          ],
          "tags": ["football", "street soccer", "Nima", "teamwork", "poverty vs privilege"]
        },
        {
          "title": "The Adventures of Kofi the Prankster",
          "author": "Kweku Mensah",
          "isbn": "978-1-945673-18-6",
          "pages": 47,
          "description": "After a prank gone wrong lands him in trouble, a notorious Kumasi school prankster learns that true respect comes not from mischief but from kindness, responsibility, and genuine change.",
          "shortDescription": "A school prankster learns that true respect comes from kindness, not mischief.",
          "excerpt": "Kofi's pranks were legendary in Kumasi. The fake snake in the teacher's desk. The bucket of water over the principal's door. But when his latest joke sent the school librarian to the hospital, something shifted. Laughter turned to silence. Respect turned to resentment. Kofi had to learn that the line between funny and cruel was drawn in someone else's pain - and he had crossed it.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-18-6/cover.jpg",
            "https://example.com/images/978-1-945673-18-6/school-prank.jpg",
            "https://example.com/images/978-1-945673-18-6/redemption.jpg"
          ],
          "tags": ["pranks", "school life", "Kumasi", "character growth", "responsibility"]
        },
        {
          "title": "The Boy Who Refused to Follow",
          "author": "Kwabena Asante",
          "isbn": "978-1-945673-19-3",
          "pages": 82,
          "description": "Torn between inheriting his father's auto shop and pursuing his passion for art, a seventeen-year-old Ghanaian boy must prove that following his dreams can honour tradition rather than betray it.",
          "shortDescription": "A teenager chooses between his father's auto shop and his passion for art.",
          "excerpt": "The garage smelled of motor oil and legacy. Every wrench, every bolt, every beat-up car told the story of generations. But Kofi's hands wanted to hold brushes, not tools. His father saw art as a betrayal of their name. Kofi saw it as the only way to truly honor it - by painting a future that included both grease and canvas, both tradition and vision.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-19-3/cover.jpg",
            "https://example.com/images/978-1-945673-19-3/auto-shop.jpg",
            "https://example.com/images/978-1-945673-19-3/artist-studio.jpg"
          ],
          "tags": ["art", "family business", "tradition vs dreams", "father-son relationship", "identity"]
        },
        {
          "title": "The Coach's Big Bet",
          "author": "David Mensah",
          "isbn": "978-1-945673-20-9",
          "pages": 71,
          "description": "A determined Ghanaian coach stakes his job on transforming an underdog junior high team into champions, proving that belief, teamwork, and second chances can defy all odds.",
          "shortDescription": "A coach risks everything to turn an underdog team into champions.",
          "excerpt": "Coach Owusu looked at his team - the misfits, the troublemakers, the ones other schools had given up on. 'We'll win the championship,' he announced. The principal laughed. The parents gasped. The players barely looked up from their phones. But Coach Owusu had seen something they hadn't: potential wrapped in pain, greatness disguised as rebellion. His job, his reputation, his entire career now rode on a group of kids who didn't believe in themselves.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-20-9/cover.jpg",
            "https://example.com/images/978-1-945673-20-9/football-coach.jpg",
            "https://example.com/images/978-1-945673-20-9/underdog-team.jpg"
          ],
          "tags": ["sports", "coaching", "underdogs", "teamwork", "second chances"]
        },
        {
          "title": "The Time-Travelling Classroom",
          "author": "Esi Osei",
          "isbn": "978-1-945673-21-6",
          "pages": 87,
          "description": "When lightning strikes during a school trip to the Manhyia Palace Museum, Ghanaian students are transported to the 17th-century Ashanti Kingdom, where they must use modern knowledge and ancestral wisdom to save an ancient empire—and their own future.",
          "shortDescription": "Students time-travel to 17th-century Ashanti Kingdom and must save the empire.",
          "excerpt": "The lightning didn't just strike the museum - it shattered time itself. One moment, they were seventh graders on a field trip, touching glass cases and yawning. The next, they were standing in the actual Manhyia Palace, surrounded by real Ashanti warriors who saw their strange clothes and unfamiliar ways and reached for their spears. History had become their present, and their history books suddenly seemed dangerously incomplete.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-21-6/cover.jpg",
            "https://example.com/images/978-1-945673-21-6/time-travel.jpg",
            "https://example.com/images/978-1-945673-21-6/ashanti-palace.jpg"
          ],
          "tags": ["time travel", "Ashanti Kingdom", "history", "adventure", "Manhyia Palace"]
        },
        {
          "title": "The Treasure of Lake Nyasa",
          "author": "Kwame Asante",
          "isbn": "978-1-945673-22-3",
          "pages": 93,
          "description": "Three Ghanaian cousins follow an ancient map from their grandmother's trunk on a dangerous quest through forests, rivers, and caves, racing against a rival hunter to discover that the real treasure lies in friendship and shared experiences rather than gold.",
          "shortDescription": "Three cousins follow an ancient map and discover treasure is about friendship, not gold.",
          "excerpt": "The map smelled of old age and adventure. It fell from their grandmother's trunk, yellowed and torn at the edges, but the ink was still clear: a path through Ghana's wild interior, marked with symbols no one recognized. 'X marks the spot,' little Ama whispered. But as they journeyed through forests that seemed to breathe, rivers that sang, and caves that whispered secrets, they learned that X was just the beginning - the real treasure was the journey itself.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-22-3/cover.jpg",
            "https://example.com/images/978-1-945673-22-3/ancient-map.jpg",
            "https://example.com/images/978-1-945673-22-3/cousins-adventure.jpg"
          ],
          "tags": ["adventure", "treasure hunt", "cousins", "Lake Nyasa", "friendship"]
        },
        {
          "title": "The Twins Who Swapped Lives",
          "author": "Adjoa Mensah",
          "isbn": "978-1-945673-23-0",
          "pages": 94,
          "description": "Identical twin brothers in Ghana secretly switch places between their contrasting lives in Accra and a rural village, but their deceptive adventure spirals into chaos, forcing them to face consequences and learn the value of honesty and appreciating their own paths.",
          "shortDescription": "Identical twins switch lives between city and village with chaotic consequences.",
          "excerpt": "It started as a joke. Kofi would go to the village and learn what 'real work' meant. Kwame would come to Accra and experience 'city life.' They were identical down to their birthmarks. No one would know. But within hours, Kofi realized that mud huts and manual labor weren't a vacation, and Kwame discovered that city loneliness was its own kind of poverty. The grass isn't just greener on the other side - it's a completely different terrain.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-23-0/cover.jpg",
            "https://example.com/images/978-1-945673-23-0/identical-twins.jpg",
            "https://example.com/images/978-1-945673-23-0/rural-village.jpg"
          ],
          "tags": ["twins", "identity swap", "city vs village", "consequences", "honesty"]
        },
        {
          "title": "The Witch Doctor's Apprentice",
          "author": "Kofi Asante",
          "isbn": "978-1-945673-24-7",
          "pages": 84,
          "description": "A thirteen-year-old Ghanaian boy becomes a witch doctor's apprentice to save his dying father and must resist dark power while battling supernatural forces and corruption, learning that true healing comes from community unity rather than individual strength.",
          "shortDescription": "A boy apprentices with a witch doctor to save his father and learns about true healing.",
          "excerpt": "The old man smelled of herbs and secrets. 'You want to save your father,' he said, not asking. 'But what will you give in return?' Kofi had expected this - the price of power, the sacrifice. What he didn't expect was the lesson: that magic wasn't about spells, but about understanding the web that connects all living things. True healing wasn't summoned from dark forces, but woven from community, love, and the willingness to serve others before yourself.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-24-7/cover.jpg",
            "https://example.com/images/978-1-945673-24-7/witch-doctor.jpg",
            "https://example.com/images/978-1-945673-24-7/herbs-and-potions.jpg"
          ],
          "tags": ["witch doctor", "supernatural", "healing", "community", "coming-of-age"]
        },
        {
          "title": "The Young Astronomer's Dream",
          "author": "Samuel Mensah",
          "isbn": "978-1-945673-25-4",
          "pages": 54,
          "description": "A Ghanaian boy builds a telescope from scrap materials and discovers a mysterious celestial object, forcing him to choose between fame and scientific integrity as the world takes notice of his achievement.",
          "shortDescription": "A boy builds a telescope from scrap and discovers a mysterious celestial object.",
          "excerpt": "The telescope was scrap metal and hope held together with wire and tape. Night after night, Kofi pointed it at the sky from his rooftop in Kumasi, cataloging stars while his neighbors slept. Then he saw it - the object that shouldn't exist, the anomaly that made professional astronomers rewrite their theories. Fame came calling with its checks and cameras. But Kofi had to decide: would he be famous, or would he be right?",
          "galleryImages": [
            "https://example.com/images/978-1-945673-25-4/cover.jpg",
            "https://example.com/images/978-1-945673-25-4/telescope.jpg",
            "https://example.com/images/978-1-945673-25-4/stargazing.jpg"
          ],
          "tags": ["astronomy", "science", "innovation", "integrity", "space"]
        },
        {
          "title": "The Hilarious Misadventures of Afia & Kojo",
          "author": "Ama Agyeman",
          "isbn": "978-1-945673-26-1",
          "pages": 96,
          "description": "In this hilarious Ghanaian adventure, inventive cousins Afia and Kojo turn everyday mishaps into unforgettable lessons about creativity, family, and the joy of finding brilliance in chaos.",
          "shortDescription": "Cousins turn everyday mishaps into hilarious adventures and life lessons.",
          "excerpt": "The goat was purple. That wasn't the plan. The plan was to dye the old tablecloth for grandma's birthday. But when Afia and Kojo's science experiment went predictably wrong, the goat got involved, then the chickens, and somehow the chief's wife ended up wearing a tie-dye scarf that matched the now-purple goat. In their family, chaos wasn't a bug - it was a feature. And brilliance often arrived covered in paint, feathers, and unintended consequences.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-26-1/cover.jpg",
            "https://example.com/images/978-1-945673-26-1/cousins-capers.jpg",
            "https://example.com/images/978-1-945673-26-1/village-chaos.jpg"
          ],
          "tags": ["humor", "cousins", "adventure", "creativity", "family"]
        },
        {
          "title": "The Race Against the Odds",
          "author": "Kwesi Osei",
          "isbn": "978-1-945673-27-8",
          "pages": 76,
          "description": "A Ghanaian teenager with a physical disability defies expectations and societal limitations by training for regional athletics championships with the help of his cobbler uncle's custom shoes, proving that determination can overcome any obstacle.",
          "shortDescription": "A disabled teenager trains for athletics championships with custom shoes from his uncle.",
          "excerpt": "The other runners had perfect legs, perfect shoes, perfect chances. Kofi had a left leg that didn't quite work and a cobbler uncle who believed in miracles. The shoes he built were ugly - mismatched, reinforced, ridiculous. But they were made with love and precise engineering. When Kofi lined up at the starting blocks, he wasn't just racing against other athletes. He was racing against every person who had ever said 'can't.'",
          "galleryImages": [
            "https://example.com/images/978-1-945673-27-8/cover.jpg",
            "https://example.com/images/978-1-945673-27-8/athletics.jpg",
            "https://example.com/images/978-1-945673-27-8/custom-shoes.jpg"
          ],
          "tags": ["disability", "athletics", "determination", "overcoming obstacles", "inspiration"]
        },
        {
          "title": "The Boy Who Lived with the Hyenas",
          "author": "Benjamin Owusu Frimpong",
          "isbn": "978-1-945673-28-5",
          "pages": 110,
          "description": "A twelve-year-old boy lost in Northern Ghana's savannah is protected by hyenas and chooses to stay with an elderly tracker to learn ancient survival skills, but must eventually decide between his bond with the wild creatures and reuniting with his grieving family.",
          "shortDescription": "A lost boy bonds with hyenas and learns survival skills from a tracker in Northern Ghana.",
          "excerpt": "The hyenas circled him slowly, their laughter both terrifying and strangely welcoming. Lost for three days in the savannah, twelve-year-old Tetteh had given up hope. But the pack didn't attack. Instead, they led him to water, to shelter, to an old man who spoke their language. The tracker taught him to read the wind, to find food, to become part of the wild symphony. But as months passed, Tetteh had to choose: the family that mourned him, or the family that had saved him.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-28-5/cover.jpg",
            "https://example.com/images/978-1-945673-28-5/hyenas.jpg",
            "https://example.com/images/978-1-945673-28-5/savannah.jpg"
          ],
          "tags": ["hyenas", "survival", "Northern Ghana", "wildlife", "family bonds"]
        },
        {
          "title": "The Spirits of Lake Bosumtwi",
          "author": "Adjoa Mensah",
          "isbn": "978-1-945673-29-2",
          "pages": 83,
          "description": "When a Ghanaian girl's brother falls under the spell of the mysterious Lake Bosumtwi, she must confront ancient Ashanti spirits and sacrifice her ordinary life to become the lake's new guardian and save him.",
          "shortDescription": "A girl must become guardian of a mystical lake to save her brother from its spell.",
          "excerpt": "Lake Bosumtwi had always been there, a perfect circle of water in an ancient meteor crater. But when Ama's brother dove in and didn't come up the same, she knew the legends were true. The lake demanded a guardian, and her brother had been chosen. To save him, Ama would have to sacrifice her dreams of university, her normal teenage life, and perhaps her soul to the spirits that had claimed the water before humans ever walked the earth.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-29-2/cover.jpg",
            "https://example.com/images/978-1-945673-29-2/lake-bosumtwi.jpg",
            "https://example.com/images/978-1-945673-29-2/ancient-spirits.jpg"
          ],
          "tags": ["Lake Bosumtwi", "Ashanti spirits", "sacrifice", "guardian", "mystical"]
        },
        {
          "title": "The Talking Elephant",
          "author": "Kwadwo Asante",
          "isbn": "978-1-945673-30-8",
          "pages": 103,
          "description": "A shy sixteen-year-old Ghanaian boy discovers he can communicate with a trapped baby elephant and must overcome his social anxiety to stop poachers threatening wildlife in Mole National Park.",
          "shortDescription": "A shy boy who can talk to elephants must stop poachers in Mole National Park.",
          "excerpt": "The call wasn't sound - it was feeling, pure and desperate. Kofi had always been the quiet boy, the one who blended into walls. But when he heard the baby elephant's distress, something in him broke open. He could feel its fear, its trapped leg, its mother’s rage. The poachers were coming, and Kofi was the only one who could warn the herd. His voice had finally found its purpose, even if it spoke in a language only one species could understand.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-30-8/cover.jpg",
            "https://example.com/images/978-1-945673-30-8/baby-elephant.jpg",
            "https://example.com/images/978-1-945673-30-8/mole-park.jpg"
          ],
          "tags": ["elephants", "wildlife conservation", "Mole National Park", "poaching", "communication"]
        }
      ]
    },
    {
      "name": "Junior High Fiction",
      "books": [
        {
          "title": "Hiding in the Shadows of Kumasi",
          "author": "Kenneth Yeboah",
          "isbn": "978-1-945673-31-5",
          "pages": 208,
          "description": "A journalist in Kumasi uncovers the identity of a mysterious street artist whose politically charged murals inspire youth activism, forcing them both to choose between safety and fighting for free speech against an oppressive government.",
          "shortDescription": "A journalist and street artist challenge an oppressive government through political art.",
          "excerpt": "The mural appeared overnight - a president with a zipper for a mouth, surrounded by gagged citizens. By noon, it was viral. By evening, government trucks were scrubbing it clean. Kofi, the journalist who had been tracking these anonymous works, was close to exposing the artist. But with each new piece, the danger grew. In a country where free speech was a crime, beauty had become rebellion.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-31-5/cover.jpg",
            "https://example.com/images/978-1-945673-31-5/kumasi-street-art.jpg",
            "https://example.com/images/978-1-945673-31-5/journalism.jpg"
          ],
          "tags": ["street art", "activism", "Kumasi", "free speech", "political resistance"]
        },
        {
          "title": "The Wise Woman's Prophecy",
          "author": "Nana Yaa Osei",
          "isbn": "978-1-945673-32-2",
          "pages": 225,
          "description": "A young Ghanaian woman fulfills her prophesied destiny by creating a revolutionary education system that bridges traditional cultural wisdom and modern innovation, transforming her village and ultimately influencing educational policy across Africa.",
          "shortDescription": "A woman creates an education system blending tradition and innovation, changing African policy.",
          "excerpt": "The old woman had prophesied that Ama would 'teach the ancestors to read.' Everyone laughed. But when Ama returned from university, she understood. Her education system didn't replace traditional knowledge - it gave it voice. The fishermen's lunar calendar became a lesson in astronomy. The grandmother's stories became literature. The village became a classroom, and Africa began to listen.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-32-2/cover.jpg",
            "https://example.com/images/978-1-945673-32-2/education-innovation.jpg",
            "https://example.com/images/978-1-945673-32-2/traditional-wisdom.jpg"
          ],
          "tags": ["prophecy", "education reform", "traditional wisdom", "innovation", "African policy"]
        },
        {
          "title": "The Truth About the Witch Doctor",
          "author": "Araba Mensah",
          "isbn": "978-1-945673-33-9",
          "pages": 139,
          "description": "In a Ghanaian village torn between superstition and science, young Araba defies tradition to heal the sick, sparking a courageous struggle between fear and truth in a powerful tale of curiosity, culture, and the transformative power of knowledge.",
          "shortDescription": "A healer challenges superstition with science in a rural Ghanaian village.",
          "excerpt": "The baby burned with fever, and the village witch doctor demanded goats for sacrifice. But Araba had been to school. She knew about malaria, about medicine, about evidence. Her first patient was her own nephew, and when she saved him with pills instead of prayers, she became both savior and threat. The battle lines were drawn: tradition versus truth, fear versus fact. And Araba was armed with nothing but knowledge and courage.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-33-9/cover.jpg",
            "https://example.com/images/978-1-945673-33-9/traditional-healer.jpg",
            "https://example.com/images/978-1-945673-33-9/medical-clinic.jpg"
          ],
          "tags": ["witch doctor", "science vs superstition", "medicine", "tradition", "courage"]
        },
        {
          "title": "Secrets of the Old Fisherman",
          "author": "Kofi Osei",
          "isbn": "978-1-945673-34-6",
          "pages": 190,
          "description": "A Ghanaian boy must convince his skeptical coastal village to heed a 'mad' fisherman's storm warning based on traditional knowledge, ultimately proving that ancient wisdom remains vital in the modern world.",
          "shortDescription": "A boy champions a fisherman's traditional storm warning against modern skepticism.",
          "excerpt": "They called him Mad Kofi, the fisherman who talked to the wind. But when he predicted the storm that satellites missed, only young Tetteh listened. The old man had seen signs - the way the birds flew, the color of the dawn, the taste of the air. Modern science scoffed. But as the waves began to rise and the sky turned green, Tetteh had to choose: trust the madman or watch his village drown.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-34-6/cover.jpg",
            "https://example.com/images/978-1-945673-34-6/fisherman.jpg",
            "https://example.com/images/978-1-945673-34-6/coastal-village.jpg"
          ],
          "tags": ["fishing", "traditional knowledge", "weather prediction", "coastal Ghana", "wisdom"]
        },
        {
          "title": "The King Without a Crown",
          "author": "Prince Osei",
          "isbn": "978-1-945673-35-3",
          "pages": 232,
          "description": "A Ghanaian prince embarks on a nationwide quest to recover three pieces of his stolen sacred crown, learning through his journey that true leadership is earned through wisdom, courage, and service to others rather than inherited power.",
          "shortDescription": "A prince learns true leadership while searching for pieces of his stolen crown.",
          "excerpt": "The crown wasn't just gold and jewels - it was the symbol of his people's trust. When it was stolen and shattered into three pieces scattered across Ghana, Prince Kofi was given a choice: send soldiers or go himself. He chose to go, disguised as a commoner. In the markets of Accra, the villages of the North, and the shores of the Volta, he learned that a true king is crowned not by birth, but by the love of his people.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-35-3/cover.jpg",
            "https://example.com/images/978-1-945673-35-3/sacred-crown.jpg",
            "https://example.com/images/978-1-945673-35-3/prince-journey.jpg"
          ],
          "tags": ["royalty", "quest", "leadership", "wisdom", "service"]
        },
        {
          "title": "A Love Story at the Kente Festival",
          "author": "Abena Osei",
          "isbn": "978-1-945673-36-0",
          "pages": 223,
          "description": "Two seventeen-year-olds from rival Ghanaian villages are forced to co-host the annual Kente Festival and fall in love despite their schools' fierce rivalry, testing whether their relationship can survive deep-rooted community divisions and family expectations.",
          "shortDescription": "Teens from rival villages fall in love while co-hosting the Kente Festival.",
          "excerpt": "The rivalry was older than their grandparents, forged in competition over who wove the finest kente. When Kofi from Bonwire and Ama from Adawomase were forced to co-host the festival, their first meeting was all sharp words and sharper glares. But as they worked together, choosing threads and patterns that honored both traditions, something unexpected happened: love wove itself between them, stronger than any fabric, more binding than any ancient feud.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-36-0/cover.jpg",
            "https://example.com/images/978-1-945673-36-0/kente-festival.jpg",
            "https://example.com/images/978-1-945673-36-0/village-rivalry.jpg"
          ],
          "tags": ["romance", "Kente Festival", "village rivalry", "tradition", "forbidden love"]
        },
        {
          "title": "The Forbidden Island",
          "author": "Kwadwo Hackman",
          "isbn": "978-1-945673-37-7",
          "pages": 207,
          "description": "Three Ghanaian teenagers shipwrecked on a forbidden island discover a hidden community guarding sacred knowledge and healing springs, forcing them to choose between returning home or becoming guardians protecting ancient treasures from corporate exploitation.",
          "shortDescription": "Shipwrecked teens discover a hidden island community with sacred knowledge.",
          "excerpt": "The island wasn't on any map. When their boat capsized in the storm, they expected rescue, not revelation. But beneath the waterfall was a village untouched by time, where elders lived for centuries and springs healed any wound. The corporation wanted to bottle that miracle. The teenagers wanted to protect it. But the island wanted something more: new guardians to carry its secrets into a world that had forgotten magic existed.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-37-7/cover.jpg",
            "https://example.com/images/978-1-945673-37-7/forbidden-island.jpg",
            "https://example.com/images/978-1-945673-37-7/healing-springs.jpg"
          ],
          "tags": ["island adventure", "sacred knowledge", "corporate exploitation", "guardians", "secrets"]
        },
        {
          "title": "The Boy with the Golden Eyes",
          "author": "Ace Ventura Okom",
          "isbn": "978-1-945673-38-4",
          "pages": 222,
          "description": "A sixteen-year-old Ghanaian boy with golden eyes and healing powers emerges from a lifetime of hiding to lead a global movement, learning to balance his extraordinary gift with his humanity while protecting himself and others from exploitation and corruption.",
          "shortDescription": "A boy with golden healing eyes emerges from hiding to lead a global movement.",
          "excerpt": "His eyes had been his curse since birth - the color of honey and sunlight, they marked him as different. In the village, they called him 'cursed.' In the city, they called him 'freak.' But when Kofi learned that his gaze could heal, that his tears could cure, he became something else entirely: valuable. Governments wanted to study him. Corporations wanted to sell him. But all Kofi wanted was to be a boy who could look in the mirror without fear.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-38-4/cover.jpg",
            "https://example.com/images/978-1-945673-38-4/golden-eyes.jpg",
            "https://example.com/images/978-1-945673-38-4/healing-power.jpg"
          ],
          "tags": ["supernatural", "healing powers", "golden eyes", "exploitation", "global movement"]
        },
        {
          "title": "Beneath the Surface of the Volta Lake",
          "author": "Amina Osei",
          "isbn": "978-1-945673-39-1",
          "pages": 188,
          "description": "When fifteen-year-old Amina discovers she can communicate with the drowned spirits beneath Ghana's Volta Lake, she must uncover the forgotten history of the Akosombo Dam and bring peace to the lost souls before she herself is trapped between the worlds of the living and the dead.",
          "shortDescription": "A girl communicates with drowned spirits beneath Volta Lake and must uncover dam's dark history.",
          "excerpt": "The voices came from beneath the water, from the villages drowned when the Akosombo Dam was built. They whispered of homes flooded, graves desecrated, lives erased for 'progress.' Amina was the first to hear them, the only one who could give them voice. But as she dove deeper into their stories, the boundary between living and dead began to blur. She was becoming one of them, and the only way back was to tell the truth about what lay beneath the calm waters of Volta Lake.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-39-1/cover.jpg",
            "https://example.com/images/978-1-945673-39-1/volta-lake.jpg",
            "https://example.com/images/978-1-945673-39-1/akosombo-dam.jpg"
          ],
          "tags": ["Volta Lake", "Akosombo Dam", "spirits", "history", "supernatural"]
        },
        {
          "title": "Daughter of the Chief",
          "author": "Afia Asante",
          "isbn": "978-1-945673-40-7",
          "pages": 164,
          "description": "Seventeen-year-old Afia Asante, torn between becoming her community's future queen mother and pursuing her passion for space science, must find a way to honour her heritage while following her dreams in a story that celebrates courage, identity, and the harmony between tradition and innovation.",
          "shortDescription": "A future queen mother pursues space science while honoring her traditional role.",
          "excerpt": "The chieftaincy robes and the astronaut's helmet sat side by side in her room, representing two impossible choices. As the chief's daughter, Afia was expected to become queen mother, keeper of traditions, voice of the ancestors. But her heart belonged to the stars, to equations that described distant galaxies, to dreams of Ghana's first space program. She was being asked to choose between earth and sky, when what she needed was to show her people they were both the same journey.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-40-7/cover.jpg",
            "https://example.com/images/978-1-945673-40-7/queen-mother.jpg",
            "https://example.com/images/978-1-945673-40-7/space-science.jpg"
          ],
          "tags": ["royalty", "space science", "tradition vs modernity", "queen mother", "identity"]
        },
        {
          "title": "Chasing the Last Secret of the Forest",
          "author": "Adjoa Mensah",
          "isbn": "978-1-945673-41-4",
          "pages": 336,
          "description": "Seventeen-year-old Adjoa leads a courageous fight to save her village's sacred forest from destruction, uncovering the mythical Nyame Dua and igniting a national movement that blends ancestral wisdom with modern environmental activism.",
          "shortDescription": "A teen saves a sacred forest and ignites a national environmental movement.",
          "excerpt": "The forest had been her playground, her church, her library of ancient stories. When the loggers came with their contracts and their machines, Adjoa stood in their path. She wasn't just protecting trees - she was defending the Nyame Dua, the Tree of God, where her ancestors' spirits lived. What started as one girl's protest became a movement that taught Ghana that the environment wasn't a resource to be used up, but a legacy to be preserved.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-41-4/cover.jpg",
            "https://example.com/images/978-1-945673-41-4/sacred-forest.jpg",
            "https://example.com/images/978-1-945673-41-4/environmental-activism.jpg"
          ],
          "tags": ["environmentalism", "sacred forest", "activism", "Nyame Dua", "ancestral wisdom"]
        },
        {
          "title": "The Revenge of the Forgotten King",
          "author": "Kwaku Ade",
          "isbn": "978-1-945673-42-1",
          "pages": 198,
          "description": "Sixteen-year-old Kwaku accidentally unleashes an ancient curse in Kumasi and, with his friends, embarks on a quest across Ghana to solve seven riddles, learning that true power lies not in magic or might but in wisdom, courage, and selfless leadership.",
          "shortDescription": "A teen unleashes an ancient curse and must solve riddles across Ghana to save his city.",
          "excerpt": "The old shrine wasn't supposed to be touched. But when Kwaku's graffiti tag accidentally activated the curse of the Forgotten King, Kumasi began to change. Trees grew backwards, water flowed up, and the past bled into the present. To break the curse, Kwaku and his friends had to solve seven riddles that led them across Ghana - from the slave castles of Cape Coast to the palaces of Ashanti. The final answer wasn't magic. It was forgiveness.",
          "galleryImages": [
            "https://example.com/images/978-1-945673-42-1/cover.jpg",
            "https://example.com/images/978-1-945673-42-1/ancient-curse.jpg",
            "https://example.com/images/978-1-945673-42-1/seven-riddles.jpg"
          ],
          "tags": ["ancient curse", "quest", "riddles", "Kumasi", "leadership"]
        },
        {
          "title": "Escape from the Desert",
          "author": "Darryl Mensah",
          "isbn": "978-1-945673-43-8",
          "pages": 230,
          "description": "Darryl Mensah's school trip turns into a harrowing fight for survival after a rebel attack in northern Ghana, forcing him to lead his classmates to freedom and transforming him from a frightened boy into a courageous leader whose experience later inspires his life's mission of peace and resilience.",
          "shortDescription": "A school trip becomes a survival mission after a rebel attack in northern Ghana.",
          "excerpt": "The school bus had barely crossed into Northern Ghana when the rebels struck. In minutes, Darryl went from field trip participant to reluctant leader of twelve terrified teenagers. With no phone signal, no map, and no hope of rescue, he had to navigate them through hostile territory using only his wits and the survival skills he'd learned from his grandmother's stories. The desert didn't just test them - it revealed who
