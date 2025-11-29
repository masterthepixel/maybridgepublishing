import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('🔧 Manual book content fix...');

// Let's manually fix a few key books to test the approach
const testBooks = [
  {
    uid: "cooking-with-mama",
    title: "Cooking with Mama",
    author: "Akosua",
    category: "primary",
    description: "Every Saturday, Ama helps her mother sell kenkey and fish. But when Mama Akosua enters a regional cooking competition, Ama becomes her biggest cheerleader and kitchen partner, learning about resilience, creativity, and the flavours of Ghana that bring people together."
  },
  {
    uid: "the-treasure-of-lake-nyasa",
    title: "The Treasure of Lake Nyasa",
    author: "Tendai Huchu",
    category: "junior-high", 
    description: "A captivating adventure story set around the magnificent Lake Nyasa, following young explorers as they uncover ancient secrets and learn valuable lessons about friendship, courage, and protecting nature."
  },
  {
    uid: "when-the-sun-sets",
    title: "When the Sun Sets",
    author: "Akosua Busia",
    category: "senior-high",
    description: "A powerful coming-of-age story that explores themes of identity, family legacy, and finding one's place in the world as a young person navigates the transition from adolescence to adulthood."
  }
];

try {
  const writeClient = prismic.createWriteClient('maybridgepublishing', {
    writeToken: process.env.PRISMIC_ACCESS_TOKEN
  });

  console.log('📚 Fetching books to update...');
  
  for (const bookData of testBooks) {
    console.log(`\n📖 Processing: ${bookData.title}`);
    
    // Find the book by UID
    const books = await writeClient.getAllByType('book', {
      filters: [prismic.filter.at('my.book.uid', bookData.uid)]
    });
    
    if (books.length === 0) {
      console.log(`   ❌ Book not found: ${bookData.uid}`);
      continue;
    }
    
    const book = books[0];
    console.log(`   📋 Current state:`);
    console.log(`      Title: ${JSON.stringify(book.data.title)}`);
    console.log(`      Author: ${book.data.author}`);
    console.log(`      Category: ${book.data.category}`);
    
    // Try using the putDocument method if it exists
    try {
      // Check if the document can be updated directly
      console.log(`   🔄 Attempting direct document update...`);
      
      // Format the data correctly for Prismic
      const updateData = {
        title: [{ 
          type: 'heading1', 
          text: bookData.title,
          spans: []
        }],
        author: bookData.author,
        category: bookData.category,
        description: [{ 
          type: 'paragraph', 
          text: bookData.description,
          spans: []
        }],
        excerpt: [{ 
          type: 'paragraph', 
          text: bookData.description.length > 150 ? 
            bookData.description.substring(0, 147) + '...' : 
            bookData.description,
          spans: []
        }]
      };
      
      // Try using Management API directly
      const managementEndpoint = `https://maybridgepublishing.prismic.io/api/v2/documents/update`;
      
      const response = await fetch(managementEndpoint, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.PRISMIC_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          'Repository': 'maybridgepublishing'
        },
        body: JSON.stringify({
          documents: [{
            id: book.id,
            data: updateData
          }]
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`   ✅ Successfully updated via Management API`);
        console.log(`   📄 Response:`, result);
      } else {
        const errorText = await response.text();
        console.log(`   ❌ Management API failed (${response.status}): ${errorText}`);
      }
      
    } catch (updateError) {
      console.log(`   ❌ Update failed:`, updateError.message);
    }
    
    // Brief pause between updates
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🔍 Verifying updates...');
  
  // Check if any updates worked
  for (const bookData of testBooks) {
    const books = await writeClient.getAllByType('book', {
      filters: [prismic.filter.at('my.book.uid', bookData.uid)]
    });
    
    if (books.length > 0) {
      const book = books[0];
      console.log(`\n📖 ${bookData.uid}:`);
      console.log(`   Title: ${JSON.stringify(book.data.title)}`);
      console.log(`   Author: ${book.data.author}`);
      console.log(`   Category: ${book.data.category}`);
    }
  }

} catch (error) {
  console.error('❌ Manual fix failed:', error);
}