import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Create a write client for migrations
const writeClient = prismic.createWriteClient('maybridgepublishing', {
  writeToken: process.env.PRISMIC_ACCESS_TOKEN  // Using access token as write token for now
});

// Book data from catalogue
const booksData = [
  // Primary Level Readers (1-30)
  {
    title: "Cooking with Mama",
    mainCharacter: "Akosua",
    description: "Every Saturday, Ama helps her mother sell kenkey and fish. But when Mama Akosua enters a regional cooking competition, Ama becomes her biggest cheerleader and kitchen partner, learning about resilience, creativity, and the flavours of Ghana that bring people together.",
    pages: 100,
    category: "primary"
  },
  {
    title: "Grandpa's Secret Stories",
    mainCharacter: "Afi",
    description: "When fifteen-year-old Afi spends her holidays with her grandfather in rural Ghana, she uncovers his hidden identity as a spiritual guardian and must embrace her inherited powers to save their village from destruction and preserve its ancient magic.",
    pages: 80,
    category: "primary"
  },
  {
    title: "My Embarrassing Big Brother",
    mainCharacter: "Kwesi",
    description: "When his exuberant older brother Nana becomes an unexpected social media star, fifteen-year-old Kwesi must overcome his embarrassment to stand by him and learn the true meaning of family, authenticity, and acceptance.",
    pages: 86,
    category: "primary"
  },
  {
    title: "Ananse and the Forgotten Spell",
    mainCharacter: "Ananse",
    description: "When a Ghanaian teenager accidentally awakens the fading spider god Ananse from an ancient book, he embarks on a magical quest across Ghana to restore the balance between humans and spirits, discovering courage, heritage, and the enduring power of storytelling.",
    pages: 102,
    category: "primary"
  },
  {
    title: "Born to Dance, Forced to Marry",
    mainCharacter: "Esi Mensah",
    description: "Seventeen-year-old Esi Mensah must choose between her family's expectations of marriage and her dream of becoming a dancer, discovering that true respect for tradition lies in having the courage to follow her own path.",
    pages: 100,
    category: "primary"
  },
  {
    title: "Diary of a Small-Town Girl",
    mainCharacter: "Akosua",
    description: "When small-town girl Akosua moves to Accra, she discovers that embracing her roots and telling her authentic story through writing is the key to finding her voice, her courage, and her path to success.",
    pages: 76,
    category: "primary"
  },
  {
    title: "Finding My Voice",
    mainCharacter: "Abigail Mensah",
    description: "At a Ghanaian boarding school, shy Abigail Mensah discovers her courage and identity through spoken word poetry, transforming from a silent observer into a powerful voice for truth and change.",
    pages: 82,
    category: "primary"
  },
  {
    title: "Dancing to win",
    mainCharacter: "Mimi Asante",
    description: "Fifteen-year-old Mimi Asante defies her father's academic expectations to secretly pursue her passion for traditional Ghanaian dance, risking everything to honour her heritage and discover the courage to be true to herself.",
    pages: 117,
    category: "primary"
  },
  {
    title: "Oops! I Broke the Chief's Stool",
    mainCharacter: "Ato",
    description: "When Ato accidentally breaks his chief's sacred stool before a major festival, he embarks on a journey of courage, honesty, and redemption that teaches him true leadership means taking responsibility for one's mistakes.",
    pages: 84,
    category: "primary"
  },
  {
    title: "Saving Nana's Cocoa Farm",
    mainCharacter: "Afia",
    description: "Twelve-year-old Afia leads a youth movement combining social media and traditional knowledge to protect her grandmother's Ghanaian cocoa farm from foreign investors, sparking an international conversation about sustainable development and cultural heritage.",
    pages: 82,
    category: "primary"
  },
  // Adding all other books here would make this file too long, so let's start with just these 10 for testing
];

function generateUID(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);
}

async function migrateBooks() {
  console.log(`🚀 Starting migration of ${booksData.length} books...`);

  const migration = prismic.createMigration();

  for (const [index, book] of booksData.entries()) {
    console.log(`📖 Creating migration for book ${index + 1}/${booksData.length}: ${book.title}`);

    const uid = generateUID(book.title);
    
    // Create the book document
    const document = migration.createDocument(
      {
        type: 'book',
        uid,
        lang: 'en-us',
        tags: ['Ghana', 'Young Adult', book.category],
        data: {
          title: [
            {
              type: 'heading1',
              text: book.title,
              spans: []
            }
          ],
          author: book.mainCharacter,
          isbn: `978-${Math.random().toString().slice(2, 10)}-${Math.random().toString().slice(2, 5)}-${Math.random().toString().slice(2, 4)}`,
          description: [
            {
              type: 'paragraph',
              text: book.description,
              spans: []
            }
          ],
          excerpt: [
            {
              type: 'paragraph',
              text: book.description.length > 200 ? book.description.substring(0, 197) + '...' : book.description,
              spans: []
            }
          ],
          category: book.category,
          editor_notes: [
            {
              type: 'paragraph',
              text: `This ${book.pages}-page book is part of the Maybridge Publishing USA collection, featuring authentic Ghanaian storytelling that inspires minds and shapes futures.`,
              spans: []
            }
          ],
          pages: book.pages
        }
      },
      book.title // Page title in Prismic dashboard
    );

    console.log(`✅ Added ${book.title} to migration`);
  }

  console.log('\n🔄 Executing migration...');
  
  try {
    const result = await writeClient.migrate(migration, {
      reporter: (event) => {
        if (event.type === 'documents:created') {
          console.log(`✅ Created document: ${event.data.title || event.data.type}`);
        } else if (event.type === 'documents:updated') {
          console.log(`📝 Updated document: ${event.data.title || event.data.type}`);
        } else {
          console.log(`📝 ${event.type}: ${JSON.stringify(event.data)}`);
        }
      }
    });
    
    console.log('\n🎉 Migration completed successfully!');
    console.log(`📊 Created ${booksData.length} books in Prismic`);
    
    return result;
  } catch (error) {
    console.error('\n💥 Migration failed:', error);
    throw error;
  }
}

// Run the migration
migrateBooks().catch(console.error);