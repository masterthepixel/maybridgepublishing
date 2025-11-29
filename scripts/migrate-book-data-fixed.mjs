// @ts-check
import * as dotenv from 'dotenv';
import * as prismic from '@prismicio/client';

dotenv.config({ path: '.env.local' });

const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

if (!repositoryName || !accessToken) {
  console.error('Missing required environment variables');
  process.exit(1);
}

console.log('🔧 Starting book data migration with correct format...');

// Book data mapping with proper Prismic formats
const bookDataMappings = {
  'the-treasure-of-lake-nyasa': {
    title: [{ type: 'heading1', text: 'The Treasure of Lake Nyasa' }],
    author: 'Tendai Huchu',
    category: 'junior-high',
    description: [{ type: 'paragraph', text: 'A captivating adventure story set around the magnificent Lake Nyasa, following young explorers as they uncover ancient secrets and learn valuable lessons about friendship, courage, and protecting nature.' }]
  },
  'when-the-sun-sets': {
    title: [{ type: 'heading1', text: 'When the Sun Sets' }],
    author: 'Akosua Busia',
    category: 'senior-high',
    description: [{ type: 'paragraph', text: 'A powerful coming-of-age story that explores themes of identity, family legacy, and finding one\'s place in the world as a young person navigates the transition from adolescence to adulthood.' }]
  },
  'the-girl-who-loved-books': {
    title: [{ type: 'heading1', text: 'The Girl Who Loved Books' }],
    author: 'Ama Ata Aidoo',
    category: 'primary',
    description: [{ type: 'paragraph', text: 'An inspiring tale of a young girl whose passion for reading opens up new worlds and possibilities, showing how books can transform lives and communities.' }]
  },
  'dancing-with-shadows': {
    title: [{ type: 'heading1', text: 'Dancing with Shadows' }],
    author: 'Kofi Awoonor',
    category: 'senior-high',
    description: [{ type: 'paragraph', text: 'A profound exploration of cultural identity and personal growth through the metaphor of traditional dance, weaving together themes of heritage, modernity, and self-discovery.' }]
  },
  'the-wise-tortoise': {
    title: [{ type: 'heading1', text: 'The Wise Tortoise' }],
    author: 'Chinua Achebe',
    category: 'primary',
    description: [{ type: 'paragraph', text: 'A delightful collection of traditional folktales featuring the clever tortoise, teaching young readers important life lessons through humor and wisdom.' }]
  },
  'under-the-baobab-tree': {
    title: [{ type: 'heading1', text: 'Under the Baobab Tree' }],
    author: 'Wole Soyinka',
    category: 'junior-high',
    description: [{ type: 'paragraph', text: 'Stories and legends shared beneath the ancient baobab tree, connecting young readers to African oral traditions and the wisdom of their ancestors.' }]
  },
  'the-river-goddess': {
    title: [{ type: 'heading1', text: 'The River Goddess' }],
    author: 'Flora Nwapa',
    category: 'senior-high',
    description: [{ type: 'paragraph', text: 'A mystical tale that blends African mythology with contemporary themes, following a young woman\'s spiritual journey and connection to ancient traditions.' }]
  },
  'songs-of-the-village': {
    title: [{ type: 'heading1', text: 'Songs of the Village' }],
    author: 'Okot p\'Bitek',
    category: 'primary',
    description: [{ type: 'paragraph', text: 'A beautiful collection of songs and poems that celebrate village life, traditions, and the simple joys found in community and family.' }]
  },
  'the-golden-calabash': {
    title: [{ type: 'heading1', text: 'The Golden Calabash' }],
    author: 'Bessie Head',
    category: 'junior-high',
    description: [{ type: 'paragraph', text: 'An enchanting story about a magical calabash that brings prosperity to a village, teaching readers about generosity, gratitude, and the true meaning of wealth.' }]
  },
  'whispers-in-the-wind': {
    title: [{ type: 'heading1', text: 'Whispers in the Wind' }],
    author: 'Nawal El Saadawi',
    category: 'senior-high',
    description: [{ type: 'paragraph', text: 'A thought-provoking novel that explores themes of freedom, justice, and the power of the human spirit to overcome adversity.' }]
  }
};

const migration = prismic.createMigration();

try {
  console.log('📚 Fetching existing book documents...');
  
  const client = prismic.createClient(repositoryName, {
    accessToken: accessToken,
  });

  const response = await client.getAllByType('book');
  console.log(`📖 Found ${response.length} book documents to update`);

  let updateCount = 0;
  const batchSize = 10;
  
  for (let i = 0; i < response.length; i += batchSize) {
    const batch = response.slice(i, i + batchSize);
    console.log(`\n🔄 Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(response.length/batchSize)} (${batch.length} books)`);
    
    for (const book of batch) {
      const bookData = bookDataMappings[book.uid];
      
      if (bookData) {
        console.log(`   📝 Updating: ${book.uid} with title "${bookData.title[0].text}"`);
        
        await migration.updateDocument({
          id: book.id,
          type: 'book',
          uid: book.uid,
          lang: book.lang,
          data: {
            title: bookData.title,
            author: bookData.author,
            category: bookData.category,
            description: bookData.description
          }
        });
        
        updateCount++;
      } else {
        console.log(`   ⚠️  No data mapping found for: ${book.uid}`);
      }
    }
    
    // Small delay between batches
    if (i + batchSize < response.length) {
      console.log('   ⏳ Brief pause between batches...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`\n🚀 Executing migration for ${updateCount} books...`);
  const result = await client.migrate(migration, {
    writeToken: accessToken,
  });
  
  console.log('\n✅ Migration completed');
  console.log(`🌟 Migration result:`, result);

} catch (error) {
  console.error('❌ Migration failed:', error);
  if (error.message) {
    console.error('Error message:', error.message);
  }
  if (error.response?.data) {
    console.error('Response data:', error.response.data);
  }
  process.exit(1);
}

console.log('\n🎉 Book data migration completed successfully!');