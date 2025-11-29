import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function publishAllBooks() {
  console.log('🚀 Starting automated publishing of all books...\n');
  
  try {
    // Create write client for publishing
    const writeClient = prismic.createWriteClient('maybridgepublishing', {
      writeToken: process.env.PRISMIC_ACCESS_TOKEN
    });

    // First, let's get all the books that are planned
    const readClient = prismic.createClient('maybridgepublishing', {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    });

    console.log('📖 Fetching all planned books...');
    
    // Get all documents from the migration release
    let allBooks = [];
    let hasNextPage = true;
    let page = 1;
    
    while (hasNextPage) {
      console.log(`  📄 Fetching page ${page}...`);
      
      try {
        const response = await readClient.get({
          pageSize: 100,
          page: page,
          predicates: [
            prismic.predicate.at('document.type', 'book')
          ]
        });
        
        allBooks = allBooks.concat(response.results);
        hasNextPage = response.next_page !== null;
        page++;
        
        console.log(`    Found ${response.results.length} books on page ${page - 1}`);
        
      } catch (error) {
        // Try getting from draft/planned content
        console.log('  📋 Checking migration release...');
        break;
      }
    }

    console.log(`\n📊 Total books found: ${allBooks.length}`);

    if (allBooks.length === 0) {
      console.log('🔍 No books found in regular content. Checking migration release...');
      
      // The books might be in a migration release - we need to publish the release
      console.log('📝 Attempting to publish migration release...');
      
      try {
        // Use the migration API to publish the release
        const migrationResponse = await fetch('https://migration.prismic.io/documents/publish', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.PRISMIC_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'repository': 'maybridgepublishing'
          },
          body: JSON.stringify({
            releaseId: 'migration-api-release' // This might be the default release name
          })
        });

        if (migrationResponse.ok) {
          console.log('✅ Migration release published successfully!');
        } else {
          const error = await migrationResponse.text();
          console.log('❌ Failed to publish migration release:', error);
          
          // Try a different approach - publish all documents
          console.log('\n🔄 Trying alternative publishing method...');
          
          const publishResponse = await fetch('https://migration.prismic.io/publish-all', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.PRISMIC_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
              'repository': 'maybridgepublishing'
            }
          });

          if (publishResponse.ok) {
            console.log('✅ All documents published successfully!');
          } else {
            const publishError = await publishResponse.text();
            console.log('❌ Failed to publish all documents:', publishError);
          }
        }
      } catch (error) {
        console.error('💥 Error publishing migration:', error.message);
      }
      
      return;
    }

    // If we found books, publish them individually
    console.log('\n🔄 Publishing books individually...');
    
    let publishedCount = 0;
    let errorCount = 0;
    
    for (const [index, book] of allBooks.entries()) {
      try {
        console.log(`📚 Publishing ${index + 1}/${allBooks.length}: ${book.data.title?.[0]?.text || book.uid}`);
        
        // Use the writeClient to publish the document
        await writeClient.publishDocument(book.id);
        
        publishedCount++;
        console.log(`  ✅ Published successfully`);
        
        // Small delay to avoid rate limiting
        if (index < allBooks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
      } catch (error) {
        errorCount++;
        console.log(`  ❌ Failed to publish: ${error.message}`);
      }
    }
    
    console.log(`\n🎯 PUBLISHING COMPLETE!`);
    console.log(`📊 Summary:`);
    console.log(`   ✅ Successfully published: ${publishedCount} books`);
    console.log(`   ❌ Failed to publish: ${errorCount} books`);
    console.log(`   📚 Total processed: ${allBooks.length} books`);
    
    if (publishedCount > 0) {
      console.log(`\n🌟 Your books are now live on the website!`);
      console.log(`🔗 Visit: http://localhost:3003`);
    }
    
  } catch (error) {
    console.error('\n💥 Publishing failed:', error.message);
    
    if (error.message.includes('publish')) {
      console.log('\n💡 TIP: The books might need to be published from the Prismic interface.');
      console.log('   1. Go to your Prismic repository');
      console.log('   2. Look for a "Migration release" or similar');
      console.log('   3. Click "Publish this release now"');
    }
    
    throw error;
  }
}

// Run the publishing
publishAllBooks().catch(error => {
  console.error('\n🚫 Critical error:', error);
  process.exit(1);
});