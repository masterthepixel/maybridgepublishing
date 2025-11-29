import { createClient } from '@prismicio/client';
import { promises as fs } from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Prismic client with management API access
const client = createClient('maybridgepublishing', {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
});

// Book data structure matching your catalogue
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
  {
    title: "The Day I Became a Chicken Seller",
    mainCharacter: "Ama",
    description: "After publicly insulting market sellers, fifteen-year-old Ama is punished by being forced to sell chickens at a Ghanaian market, where chaotic misadventures transform her disdain into respect for the hustle and dignity of everyday workers.",
    pages: 58,
    category: "primary"
  },
  {
    title: "The Fastest Girl in Ghana",
    mainCharacter: "Abena",
    description: "Abena from Northern Ghana earns a scholarship to an elite sports academy after her barefoot running catches a scout's attention, then must navigate professional training and competition while preserving the joy and cultural identity that fueled her natural talent.",
    pages: 107,
    category: "primary"
  },
  {
    title: "The Festival That Changed Everything",
    mainCharacter: "Yaw",
    description: "Yaw, a tech enthusiast reluctantly becomes festival prince for Ghana's Yam Festival, but discovering his great-great-grandfather's hidden drums and journal about resisting colonial oppression transforms his dismissal of tradition into a quest to honor heritage while remaining true to himself.",
    pages: 97,
    category: "primary"
  },
  {
    title: "The Floating City Experiment",
    mainCharacter: "Adom",
    description: "Twelve-year-old Adom joins a team of young engineers building innovative floating homes to protect his flood-threatened Ghanaian village, but must solve sabotage and unite a divided community to prove their climate-resilient technology works when the next flood arrives.",
    pages: 82,
    category: "primary"
  },
  {
    title: "The Girl Who Talked to Ghosts",
    mainCharacter: "A fourteen-year-old Ghanaian girl",
    description: "A fourteen-year-old Ghanaian girl discovers she can hear the dead and must uncover long-buried village secrets to bring peace to restless spirits while protecting herself from danger.",
    pages: 47,
    category: "primary"
  },
  {
    title: "Solar Power and the Genius Twins",
    mainCharacter: "Teenage twins",
    description: "When teenage twins in Ghana invent a solar-powered handwashing station that's stolen by a corrupt tech company, they must fight to prove their genius and reclaim their dream of transforming hygiene across Africa.",
    pages: 87,
    category: "primary"
  },
  {
    title: "Street Football Legends",
    mainCharacter: "A determined fourteen-year-old",
    description: "In the heart of Nima, Accra, a determined fourteen-year-old and his friends form a street football team to prove that passion and teamwork can triumph over poverty, privilege, and impossible odds.",
    pages: 73,
    category: "primary"
  },
  {
    title: "The Adventures of Kofi the Prankster",
    mainCharacter: "Kofi",
    description: "After a prank gone wrong lands him in trouble, a notorious Kumasi school prankster learns that true respect comes not from mischief but from kindness, responsibility, and genuine change.",
    pages: 47,
    category: "primary"
  },
  {
    title: "The Boy Who Refused to Follow",
    mainCharacter: "A seventeen-year-old Ghanaian boy",
    description: "Torn between inheriting his father's auto shop and pursuing his passion for art, a seventeen-year-old Ghanaian boy must prove that following his dreams can honour tradition rather than betray it.",
    pages: 82,
    category: "primary"
  },
  {
    title: "The Coach's Big Bet",
    mainCharacter: "A determined Ghanaian coach",
    description: "A determined Ghanaian coach stakes his job on transforming an underdog junior high team into champions, proving that belief, teamwork, and second chances can defy all odds.",
    pages: 71,
    category: "primary"
  },
  {
    title: "The Time-Travelling Classroom",
    mainCharacter: "Ghanaian students",
    description: "When lightning strikes during a school trip to the Manhyia Palace Museum, Ghanaian students are transported to the 17th-century Ashanti Kingdom, where they must use modern knowledge and ancestral wisdom to save an ancient empire—and their own future.",
    pages: 87,
    category: "primary"
  },
  {
    title: "The Treasure of Lake Nyasa",
    mainCharacter: "Three Ghanaian cousins",
    description: "Three Ghanaian cousins follow an ancient map from their grandmother's trunk on a dangerous quest through forests, rivers, and caves, racing against a rival hunter to discover that the real treasure lies in friendship and shared experiences rather than gold.",
    pages: 93,
    category: "primary"
  },
  {
    title: "The Twins Who Swapped Lives",
    mainCharacter: "Identical twin brothers",
    description: "Identical twin brothers in Ghana secretly switch places between their contrasting lives in Accra and a rural village, but their deceptive adventure spirals into chaos, forcing them to face consequences and learn the value of honesty and appreciating their own paths.",
    pages: 94,
    category: "primary"
  },
  {
    title: "The Witch Doctor's Apprentice",
    mainCharacter: "A thirteen-year-old Ghanaian boy",
    description: "A thirteen-year-old Ghanaian boy becomes a witch doctor's apprentice to save his dying father and must resist dark power while battling supernatural forces and corruption, learning that true healing comes from community unity rather than individual strength.",
    pages: 84,
    category: "primary"
  },
  {
    title: "The Young Astronomer's Dream",
    mainCharacter: "A Ghanaian boy",
    description: "A Ghanaian boy builds a telescope from scrap materials and discovers a mysterious celestial object, forcing him to choose between fame and scientific integrity as the world takes notice of his achievement.",
    pages: 54,
    category: "primary"
  },
  {
    title: "The Hilarious Misadventures of Afia & Kojo",
    mainCharacter: "Afia and Kojo",
    description: "In this hilarious Ghanaian adventure, inventive cousins Afia and Kojo turn everyday mishaps into unforgettable lessons about creativity, family, and the joy of finding brilliance in chaos.",
    pages: 96,
    category: "primary"
  },
  {
    title: "The Race Against the Odds",
    mainCharacter: "A Ghanaian teenager",
    description: "A Ghanaian teenager with a physical disability defies expectations and societal limitations by training for regional athletics championships with the help of his cobbler uncle's custom shoes, proving that determination can overcome any obstacle.",
    pages: 76,
    category: "primary"
  },
  {
    title: "The Boy Who Lived with the Hyenas",
    mainCharacter: "A twelve-year-old boy",
    description: "A twelve-year-old boy lost in Northern Ghana's savannah is protected by hyenas and chooses to stay with an elderly tracker to learn ancient survival skills, but must eventually decide between his bond with the wild creatures and reuniting with his grieving family.",
    pages: 110,
    category: "primary"
  },
  {
    title: "The Spirits of Lake Bosumtwi",
    mainCharacter: "A Ghanaian girl",
    description: "When a Ghanaian girl's brother falls under the spell of the mysterious Lake Bosumtwi, she must confront ancient Ashanti spirits and sacrifice her ordinary life to become the lake's new guardian and save him.",
    pages: 83,
    category: "primary"
  },
  {
    title: "The Talking Elephant",
    mainCharacter: "A shy sixteen-year-old Ghanaian boy",
    description: "A shy sixteen-year-old Ghanaian boy discovers he can communicate with a trapped baby elephant and must overcome his social anxiety to stop poachers threatening wildlife in Mole National Park.",
    pages: 103,
    category: "primary"
  }
];

// Generate UID from title
function generateUID(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);
}

// Generate excerpt from description
function generateExcerpt(description) {
  return description.length > 200 
    ? description.substring(0, 197) + '...'
    : description;
}

// Import function
async function importBooks() {
  console.log(`Starting import of ${booksData.length} books...`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const [index, book] of booksData.entries()) {
    try {
      console.log(`Importing book ${index + 1}/${booksData.length}: ${book.title}`);
      
      const uid = generateUID(book.title);
      
      const document = {
        type: 'book',
        uid,
        lang: 'en-us',
        data: {
          title: [
            {
              type: 'heading1',
              text: book.title,
              spans: []
            }
          ],
          author: book.mainCharacter,
          isbn: `978-${Math.random().toString().slice(2, 10)}-${Math.random().toString().slice(2, 5)}-${Math.random().toString().slice(2, 4)}`, // Generate random ISBN
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
              text: generateExcerpt(book.description),
              spans: []
            }
          ],
          category: book.category,
          tags: [
            { tag: 'Ghana' },
            { tag: 'Young Adult' },
            { tag: book.category === 'primary' ? 'Children' : book.category === 'junior-high' ? 'Teen' : 'Young Adult' }
          ],
          editor_notes: [
            {
              type: 'paragraph',
              text: `This ${book.pages}-page book is part of the Maybridge Publishing USA collection, featuring authentic Ghanaian storytelling that inspires minds and shapes futures.`,
              spans: []
            }
          ]
        }
      };

      // Try using REST API directly
      const response = await fetch(`https://maybridgepublishing.prismic.io/api/v2/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRISMIC_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(document)
      });

      if (response.ok) {
        successCount++;
        console.log(`✅ Successfully imported: ${book.title}`);
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        const errorText = await response.text();
        console.error(`❌ Failed to import ${book.title}:`, response.status, errorText);
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Error importing ${book.title}:`, error);
      errorCount++;
    }
  }

  console.log(`\n📊 Import Summary:`);
  console.log(`✅ Successfully imported: ${successCount} books`);
  console.log(`❌ Failed to import: ${errorCount} books`);
  console.log(`📚 Total processed: ${booksData.length} books`);
}

// Run import
importBooks().catch(console.error);