import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('🔧 Testing direct document update...');

const repositoryName = 'maybridgepublishing';
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

try {
  // Create write client
  const writeClient = prismic.createWriteClient(repositoryName, {
    writeToken: accessToken
  });

  console.log('📚 Fetching a book to test...');
  const books = await writeClient.getAllByType('book', { pageSize: 1 });
  const book = books[0];

  console.log(`📖 Found book: ${book.uid}`);
  console.log(`   Current title:`, book.data.title);

  // Try to see what methods are available on writeClient
  console.log('\n🔍 Available methods on writeClient:');
  console.log('writeClient methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(writeClient))
    .filter(name => !name.startsWith('_') && typeof writeClient[name] === 'function'));

  // Try to use Prismic Management API
  const managementAPI = `https://${repositoryName}.prismic.io/api/v2/documents/update`;
  console.log('\n🌐 Attempting direct API call...');

  const updateData = {
    documents: [{
      id: book.id,
      data: {
        title: [{ type: 'heading1', text: 'Direct API Test Title' }],
        author: 'Direct API Author',
        category: 'primary'
      }
    }]
  };

  console.log('📝 Data to send:', JSON.stringify(updateData, null, 2));

  const response = await fetch(managementAPI, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData)
  });

  console.log(`📡 Response status: ${response.status}`);
  const responseData = await response.text();
  console.log(`📄 Response:`, responseData);

} catch (error) {
  console.error('❌ Test failed:', error);
  if (error.message) {
    console.error('Error message:', error.message);
  }
}