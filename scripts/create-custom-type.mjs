import * as dotenv from 'dotenv';
import { promises as fs } from 'fs';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function createBookCustomType() {
  console.log('📚 Creating book custom type in Prismic...\n');

  try {
    // Read the existing custom type definition
    const customTypePath = './customtypes/book/index.json';
    const customTypeData = JSON.parse(await fs.readFile(customTypePath, 'utf-8'));
    
    console.log('✅ Loaded local custom type definition');
    
    // Prepare the API request payload
    const payload = {
      id: customTypeData.id,
      label: customTypeData.label,
      repeatable: customTypeData.repeatable,
      json: customTypeData.json,
      status: customTypeData.status
    };
    
    console.log(`📝 Creating custom type: ${payload.label} (${payload.id})`);
    
    // Create the custom type via API
    const response = await fetch('https://customtypes.prismic.io/customtypes/insert', {
      method: 'POST',
      headers: {
        'repository': 'maybridgepublishing',
        'Authorization': `Bearer ${process.env.PRISMIC_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      console.log('🎉 Custom type created successfully!');
      console.log('✅ The "book" custom type is now available in Prismic');
      return true;
    } else if (response.status === 409) {
      console.log('ℹ️  Custom type already exists - that\'s fine!');
      return true;
    } else {
      const errorText = await response.text();
      console.error(`❌ Failed to create custom type: ${response.status}`);
      console.error('Response:', errorText);
      return false;
    }
    
  } catch (error) {
    console.error('💥 Error creating custom type:', error.message);
    return false;
  }
}

// Run the custom type creation
createBookCustomType().then(success => {
  if (success) {
    console.log('\n🚀 Ready to import books! Run the automated import script next.');
  } else {
    console.log('\n❌ Custom type creation failed. Check the error above.');
  }
});