import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Test with just one book and get detailed error information
const testBook = {
  title: "Cooking with Mama",
  mainCharacter: "Akosua", 
  description: "Every Saturday, Ama helps her mother sell kenkey and fish. But when Mama Akosua enters a regional cooking competition, Ama becomes her biggest cheerleader and kitchen partner, learning about resilience, creativity, and the flavours of Ghana that bring people together.",
  pages: 100,
  category: "primary"
};

async function debugImport() {
  console.log('🔍 Debugging import validation...\n');
  
  try {
    const writeClient = prismic.createWriteClient('maybridgepublishing', {
      writeToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    
    const migration = prismic.createMigration();
    
    // Create a simple document that matches the custom type exactly
    console.log('📝 Creating document with exact field mapping...');
    
    migration.createDocument({
      type: 'book',
      uid: 'test-cooking-with-mama',
      lang: 'en-us',
      tags: ['Ghana', 'Young Adult', 'primary'],
      data: {
        // Match the custom type fields exactly
        title: [{ type: 'heading1', text: testBook.title, spans: [] }],
        author: testBook.mainCharacter, // This is a Text field
        isbn: '978-1234567890', // This is a Text field
        description: [{ type: 'paragraph', text: testBook.description, spans: [] }],
        excerpt: [{ type: 'paragraph', text: testBook.description.substring(0, 100) + '...', spans: [] }],
        category: testBook.category, // This is a Select field
        editor_notes: [{
          type: 'paragraph',
          text: `This ${testBook.pages}-page book is part of the Maybridge Publishing USA collection.`,
          spans: []
        }],
        // Note: pages field is missing from custom type, let's try without it first
      }
    }, testBook.title);
    
    await writeClient.migrate(migration, {
      reporter: (event) => {
        console.log(`📊 ${event.type}:`, JSON.stringify(event.data, null, 2));
      }
    });
    
    console.log('✅ SUCCESS - Document created!');
    
  } catch (error) {
    console.log(`❌ FAILED - ${error.message}`);
    console.log('Full error:', error);
    
    // If it's a validation error, let's examine the custom type structure
    if (error.message.includes('Validation failed')) {
      console.log('\n🔍 Let\'s check what the custom type expects...');
      
      // Read the custom type to see exact field structure
      const fs = await import('fs/promises');
      try {
        const customType = JSON.parse(await fs.readFile('./customtypes/book/index.json', 'utf-8'));
        console.log('📚 Custom type fields:');
        Object.keys(customType.json.Main).forEach(fieldName => {
          const field = customType.json.Main[fieldName];
          console.log(`   ${fieldName}: ${field.type} ${field.config ? `(${JSON.stringify(field.config.options || field.config.label)})` : ''}`);
        });
      } catch (e) {
        console.log('Could not read custom type file:', e.message);
      }
    }
  }
}

// Run the debug test
debugImport().catch(console.error);