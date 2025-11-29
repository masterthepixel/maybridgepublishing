import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Complete book data mapping from the original catalogue
const allBooksData = [
  // PRIMARY LEVEL READERS (30 books)
  {
    uid: "cooking-with-mama",
    title: "Cooking with Mama",
    author: "Akosua",
    description: "Every Saturday, Ama helps her mother sell kenkey and fish. But when Mama Akosua enters a regional cooking competition, Ama becomes her biggest cheerleader and kitchen partner, learning about resilience, creativity, and the flavours of Ghana that bring people together.",
    pages: 100,
    category: "primary"
  },
  {
    uid: "grandpas-secret-stories",
    title: "Grandpa's Secret Stories",
    author: "Afi",
    description: "When fifteen-year-old Afi spends her holidays with her grandfather in rural Ghana, she uncovers his hidden identity as a spiritual guardian and must embrace her inherited powers to save their village from destruction and preserve its ancient magic.",
    pages: 80,
    category: "primary"
  },
  {
    uid: "my-embarrassing-big-brother",
    title: "My Embarrassing Big Brother",
    author: "Kwesi",
    description: "When his exuberant older brother Nana becomes an unexpected social media star, fifteen-year-old Kwesi must overcome his embarrassment to stand by him and learn the true meaning of family, authenticity, and acceptance.",
    pages: 86,
    category: "primary"
  },
  {
    uid: "ananse-and-the-forgotten-spell",
    title: "Ananse and the Forgotten Spell",
    author: "Ananse",
    description: "When a Ghanaian teenager accidentally awakens the fading spider god Ananse from an ancient book, he embarks on a magical quest across Ghana to restore the balance between humans and spirits, discovering courage, heritage, and the enduring power of storytelling.",
    pages: 102,
    category: "primary"
  },
  {
    uid: "born-to-dance-forced-to-marry",
    title: "Born to Dance, Forced to Marry",
    author: "Esi Mensah",
    description: "Seventeen-year-old Esi Mensah must choose between her family's expectations of marriage and her dream of becoming a dancer, discovering that true respect for tradition lies in having the courage to follow her own path.",
    pages: 100,
    category: "primary"
  },
  {
    uid: "diary-of-a-smalltown-girl",
    title: "Diary of a Small-Town Girl",
    author: "Akosua",
    description: "When small-town girl Akosua moves to Accra, she discovers that embracing her roots and telling her authentic story through writing is the key to finding her voice, her courage, and her path to success.",
    pages: 76,
    category: "primary"
  },
  {
    uid: "finding-my-voice",
    title: "Finding My Voice",
    author: "Abigail Mensah",
    description: "At a Ghanaian boarding school, shy Abigail Mensah discovers her courage and identity through spoken word poetry, transforming from a silent observer into a powerful voice for truth and change.",
    pages: 82,
    category: "primary"
  },
  {
    uid: "dancing-to-win",
    title: "Dancing to Win",
    author: "Mimi Asante",
    description: "Fifteen-year-old Mimi Asante defies her father's academic expectations to secretly pursue her passion for traditional Ghanaian dance, risking everything to honour her heritage and discover the courage to be true to herself.",
    pages: 117,
    category: "primary"
  },
  {
    uid: "oops-i-broke-the-chiefs-stool",
    title: "Oops! I Broke the Chief's Stool",
    author: "Ato",
    description: "When Ato accidentally breaks his chief's sacred stool before a major festival, he embarks on a journey of courage, honesty, and redemption that teaches him true leadership means taking responsibility for one's mistakes.",
    pages: 84,
    category: "primary"
  },
  {
    uid: "saving-nanas-cocoa-farm",
    title: "Saving Nana's Cocoa Farm",
    author: "Afia",
    description: "Twelve-year-old Afia leads a youth movement combining social media and traditional knowledge to protect her grandmother's Ghanaian cocoa farm from foreign investors, sparking an international conversation about sustainable development and cultural heritage.",
    pages: 82,
    category: "primary"
  },
  {
    uid: "the-day-i-became-a-chicken-seller",
    title: "The Day I Became a Chicken Seller",
    author: "Ama",
    description: "After publicly insulting market sellers, fifteen-year-old Ama is punished by being forced to sell chickens at a Ghanaian market, where chaotic misadventures transform her disdain into respect for the hustle and dignity of everyday workers.",
    pages: 58,
    category: "primary"
  },
  {
    uid: "the-fastest-girl-in-ghana",
    title: "The Fastest Girl in Ghana",
    author: "Abena",
    description: "Abena from Northern Ghana earns a scholarship to an elite sports academy after her barefoot running catches a scout's attention, then must navigate professional training and competition while preserving the joy and cultural identity that fueled her natural talent.",
    pages: 107,
    category: "primary"
  },
  {
    uid: "the-festival-that-changed-everything",
    title: "The Festival That Changed Everything",
    author: "Yaw",
    description: "Yaw, a tech enthusiast reluctantly becomes festival prince for Ghana's Yam Festival, but discovering his great-great-grandfather's hidden drums and journal about resisting colonial oppression transforms his dismissal of tradition into a quest to honor heritage while remaining true to himself.",
    pages: 97,
    category: "primary"
  },
  {
    uid: "the-floating-city-experiment",
    title: "The Floating City Experiment",
    author: "Adom",
    description: "Twelve-year-old Adom joins a team of young engineers building innovative floating homes to protect his flood-threatened Ghanaian village, but must solve sabotage and unite a divided community to prove their climate-resilient technology works when the next flood arrives.",
    pages: 82,
    category: "primary"
  },
  {
    uid: "the-girl-who-talked-to-ghosts",
    title: "The Girl Who Talked to Ghosts",
    author: "A fourteen-year-old Ghanaian girl",
    description: "A fourteen-year-old Ghanaian girl discovers she can hear the dead and must uncover long-buried village secrets to bring peace to restless spirits while protecting herself from danger.",
    pages: 47,
    category: "primary"
  },
  {
    uid: "solar-power-and-the-genius-twins",
    title: "Solar Power and the Genius Twins",
    author: "Teenage twins",
    description: "When teenage twins in Ghana invent a solar-powered handwashing station that's stolen by a corrupt tech company, they must fight to prove their genius and reclaim their dream of transforming hygiene across Africa.",
    pages: 87,
    category: "primary"
  },
  {
    uid: "street-football-legends",
    title: "Street Football Legends",
    author: "A determined fourteen-year-old",
    description: "In the heart of Nima, Accra, a determined fourteen-year-old and his friends form a street football team to prove that passion and teamwork can triumph over poverty, privilege, and impossible odds.",
    pages: 73,
    category: "primary"
  },
  {
    uid: "the-adventures-of-kofi-the-prankster",
    title: "The Adventures of Kofi the Prankster",
    author: "Kofi",
    description: "After a prank gone wrong lands him in trouble, a notorious Kumasi school prankster learns that true respect comes not from mischief but from kindness, responsibility, and genuine change.",
    pages: 47,
    category: "primary"
  },
  {
    uid: "the-boy-who-refused-to-follow",
    title: "The Boy Who Refused to Follow",
    author: "A seventeen-year-old Ghanaian boy",
    description: "Torn between inheriting his father's auto shop and pursuing his passion for art, a seventeen-year-old Ghanaian boy must prove that following his dreams can honour tradition rather than betray it.",
    pages: 82,
    category: "primary"
  },
  {
    uid: "the-coachs-big-bet",
    title: "The Coach's Big Bet",
    author: "A determined Ghanaian coach",
    description: "A determined Ghanaian coach stakes his job on transforming an underdog junior high team into champions, proving that belief, teamwork, and second chances can defy all odds.",
    pages: 71,
    category: "primary"
  },
  {
    uid: "the-timetravelling-classroom",
    title: "The Time-Travelling Classroom",
    author: "Ghanaian students",
    description: "When lightning strikes during a school trip to the Manhyia Palace Museum, Ghanaian students are transported to the 17th-century Ashanti Kingdom, where they must use modern knowledge and ancestral wisdom to save an ancient empire—and their own future.",
    pages: 87,
    category: "primary"
  },
  {
    uid: "the-treasure-of-lake-nyasa",
    title: "The Treasure of Lake Nyasa",
    author: "Three Ghanaian cousins",
    description: "Three Ghanaian cousins follow an ancient map from their grandmother's trunk on a dangerous quest through forests, rivers, and caves, racing against a rival hunter to discover that the real treasure lies in friendship and shared experiences rather than gold.",
    pages: 93,
    category: "primary"
  },
  {
    uid: "the-twins-who-swapped-lives",
    title: "The Twins Who Swapped Lives",
    author: "Identical twin brothers",
    description: "Identical twin brothers in Ghana secretly switch places between their contrasting lives in Accra and a rural village, but their deceptive adventure spirals into chaos, forcing them to face consequences and learn the value of honesty and appreciating their own paths.",
    pages: 94,
    category: "primary"
  },
  {
    uid: "the-witch-doctors-apprentice",
    title: "The Witch Doctor's Apprentice",
    author: "A thirteen-year-old Ghanaian boy",
    description: "A thirteen-year-old Ghanaian boy becomes a witch doctor's apprentice to save his dying father and must resist dark power while battling supernatural forces and corruption, learning that true healing comes from community unity rather than individual strength.",
    pages: 84,
    category: "primary"
  },
  {
    uid: "the-young-astronomers-dream",
    title: "The Young Astronomer's Dream",
    author: "A Ghanaian boy",
    description: "A Ghanaian boy builds a telescope from scrap materials and discovers a mysterious celestial object, forcing him to choose between fame and scientific integrity as the world takes notice of his achievement.",
    pages: 54,
    category: "primary"
  },
  {
    uid: "the-hilarious-misadventures-of-afia-kojo",
    title: "The Hilarious Misadventures of Afia & Kojo",
    author: "Afia and Kojo",
    description: "In this hilarious Ghanaian adventure, inventive cousins Afia and Kojo turn everyday mishaps into unforgettable lessons about creativity, family, and the joy of finding brilliance in chaos.",
    pages: 96,
    category: "primary"
  },
  {
    uid: "the-race-against-the-odds",
    title: "The Race Against the Odds",
    author: "A Ghanaian teenager",
    description: "A Ghanaian teenager with a physical disability defies expectations and societal limitations by training for regional athletics championships with the help of his cobbler uncle's custom shoes, proving that determination can overcome any obstacle.",
    pages: 76,
    category: "primary"
  },
  {
    uid: "the-boy-who-lived-with-the-hyenas",
    title: "The Boy Who Lived with the Hyenas",
    author: "A twelve-year-old boy",
    description: "A twelve-year-old boy lost in Northern Ghana's savannah is protected by hyenas and chooses to stay with an elderly tracker to learn ancient survival skills, but must eventually decide between his bond with the wild creatures and reuniting with his grieving family.",
    pages: 110,
    category: "primary"
  },
  {
    uid: "the-spirits-of-lake-bosumtwi",
    title: "The Spirits of Lake Bosumtwi",
    author: "A Ghanaian girl",
    description: "When a Ghanaian girl's brother falls under the spell of the mysterious Lake Bosumtwi, she must confront ancient Ashanti spirits and sacrifice her ordinary life to become the lake's new guardian and save him.",
    pages: 83,
    category: "primary"
  },
  {
    uid: "the-talking-elephant",
    title: "The Talking Elephant",
    author: "A shy sixteen-year-old Ghanaian boy",
    description: "A shy sixteen-year-old Ghanaian boy discovers he can communicate with a trapped baby elephant and must overcome his social anxiety to stop poachers threatening wildlife in Mole National Park.",
    pages: 103,
    category: "primary"
  },

  // JUNIOR HIGH FICTION (45 books)
  {
    uid: "hiding-in-the-shadows-of-kumasi",
    title: "Hiding in the Shadows of Kumasi",
    author: "A journalist",
    description: "A journalist in Kumasi uncovers the identity of a mysterious street artist whose politically charged murals inspire youth activism, forcing them both to choose between safety and fighting for free speech against an oppressive government.",
    pages: 208,
    category: "junior-high"
  },
  {
    uid: "the-wise-womans-prophecy",
    title: "The Wise Woman's Prophecy",
    author: "A young Ghanaian woman",
    description: "A young Ghanaian woman fulfills her prophesied destiny by creating a revolutionary education system that bridges traditional cultural wisdom and modern innovation, transforming her village and ultimately influencing educational policy across Africa.",
    pages: 225,
    category: "junior-high"
  },
  {
    uid: "the-truth-about-the-witch-doctor",
    title: "The Truth About the Witch Doctor",
    author: "Araba",
    description: "In a Ghanaian village torn between superstition and science, young Araba defies tradition to heal the sick, sparking a courageous struggle between fear and truth in a powerful tale of curiosity, culture, and the transformative power of knowledge.",
    pages: 139,
    category: "junior-high"
  },
  {
    uid: "secrets-of-the-old-fisherman",
    title: "Secrets of the Old Fisherman",
    author: "A Ghanaian boy",
    description: "A Ghanaian boy must convince his skeptical coastal village to heed a \"mad\" fisherman's storm warning based on traditional knowledge, ultimately proving that ancient wisdom remains vital in the modern world.",
    pages: 190,
    category: "junior-high"
  },
  {
    uid: "the-king-without-a-crown",
    title: "The King Without a Crown",
    author: "A Ghanaian prince",
    description: "A Ghanaian prince embarks on a nationwide quest to recover three pieces of his stolen sacred crown, learning through his journey that true leadership is earned through wisdom, courage, and service to others rather than inherited power.",
    pages: 232,
    category: "junior-high"
  },
  {
    uid: "a-love-story-at-the-kente-festival",
    title: "A Love Story at the Kente Festival",
    author: "Two seventeen-year-olds",
    description: "Two seventeen-year-olds from rival Ghanaian villages are forced to co-host the annual Kente Festival and fall in love despite their schools' fierce rivalry, testing whether their relationship can survive deep-rooted community divisions and family expectations.",
    pages: 223,
    category: "junior-high"
  },
  {
    uid: "the-forbidden-island",
    title: "The Forbidden Island",
    author: "Three Ghanaian teenagers",
    description: "Three Ghanaian teenagers shipwrecked on a forbidden island discover a hidden community guarding sacred knowledge and healing springs, forcing them to choose between returning home or becoming guardians protecting ancient treasures from corporate exploitation.",
    pages: 207,
    category: "junior-high"
  },
  {
    uid: "the-boy-with-the-golden-eyes",
    title: "The Boy with the Golden Eyes",
    author: "A sixteen-year-old Ghanaian boy",
    description: "A sixteen-year-old Ghanaian boy with golden eyes and healing powers emerges from a lifetime of hiding to lead a global movement, learning to balance his extraordinary gift with his humanity while protecting himself and others from exploitation and corruption.",
    pages: 222,
    category: "junior-high"
  },
  {
    uid: "beneath-the-surface-of-the-volta-lake",
    title: "Beneath the Surface of the Volta Lake",
    author: "Amina",
    description: "When fifteen-year-old Amina discovers she can communicate with the drowned spirits beneath Ghana's Volta Lake, she must uncover the forgotten history of the Akosombo Dam and bring peace to the lost souls before she herself is trapped between the worlds of the living and the dead.",
    pages: 188,
    category: "junior-high"
  },
  {
    uid: "daughter-of-the-chief",
    title: "Daughter of the Chief",
    author: "Afia Asante",
    description: "Seventeen-year-old Afia Asante, torn between becoming her community's future queen mother and pursuing her passion for space science, must find a way to honour her heritage while following her dreams in a story that celebrates courage, identity, and the harmony between tradition and innovation.",
    pages: 164,
    category: "junior-high"
  },
  {
    uid: "chasing-the-last-secret-of-the-forest",
    title: "Chasing the Last Secret of the Forest",
    author: "Adjoa",
    description: "Seventeen-year-old Adjoa leads a courageous fight to save her village's sacred forest from destruction, uncovering the mythical Nyame Dua and igniting a national movement that blends ancestral wisdom with modern environmental activism.",
    pages: 336,
    category: "junior-high"
  },
  {
    uid: "the-revenge-of-the-forgotten-king",
    title: "The Revenge of the Forgotten King",
    author: "Kwaku",
    description: "Sixteen-year-old Kwaku accidentally unleashes an ancient curse in Kumasi and, with his friends, embarks on a quest across Ghana to solve seven riddles, learning that true power lies not in magic or might but in wisdom, courage, and selfless leadership.",
    pages: 198,
    category: "junior-high"
  },
  {
    uid: "escape-from-the-desert",
    title: "Escape from the Desert",
    author: "Darryl Mensah",
    description: "Darryl Mensah's school trip turns into a harrowing fight for survival after a rebel attack in northern Ghana, forcing him to lead his classmates to freedom and transforming him from a frightened boy into a courageous leader whose experience later inspires his life's mission of peace and resilience.",
    pages: 230,
    category: "junior-high"
  },
  {
    uid: "the-war-of-the-twin-brothers",
    title: "The War of the Twin Brothers",
    author: "Two Ghanaian brothers",
    description: "In The War of the Twins, two Ghanaian brothers blessed with opposing elemental powers are drawn into an ancient prophecy reborn in modern times, forcing them to confront destiny, rivalry, and forgiveness as their struggle determines whether Ghana's future will be torn by conflict or healed through unity.",
    pages: 158,
    category: "junior-high"
  },
  {
    uid: "when-the-drums-stop-beating",
    title: "When the Drums Stop beating",
    author: "A grieving sixteen-year-old drummer",
    description: "A grieving sixteen-year-old Ghanaian drummer must overcome his pain and reconnect with traditional music to help his school compete in a prestigious competition, discovering that the rhythms his father taught him can be a path to healing rather than just a reminder of loss.",
    pages: 110,
    category: "junior-high"
  },
  {
    uid: "becoming-the-first-female-pilot",
    title: "Becoming the First Female Pilot",
    author: "Abena Asante",
    description: "Fourteen-year-old Abena Asante defies her rural Ghanaian village's traditional expectations by pursuing her dream of becoming Ghana's first female pilot, using education and determination to overcome cultural barriers and prove that girls belong in the skies.",
    pages: 179,
    category: "junior-high"
  },
  {
    uid: "echoes-from-the-slave-dungeon",
    title: "Echoes from the Slave Dungeon",
    author: "Nana",
    description: "A Ghanaian student named Nana begins hearing ancestral voices in Elmina Castle's slave dungeons and uncovers dangerous historical secrets that thrust him into a global battle for truth and justice against powerful forces determined to keep the past buried.",
    pages: 195,
    category: "junior-high"
  },
  {
    uid: "love-in-the-age-of-whatsapp",
    title: "Love in the Age of WhatsApp",
    author: "Akua Mensah",
    description: "Set in modern Ghana, Love in the Age of WhatsApp follows Akua Mensah, a 17-year-old whose accidental text sparks a transformative mentorship and first love with a university student, leading her to navigate digital deception, self-discovery, and empowerment as she learns that true love inspires growth and integrity in both life and technology.",
    pages: 242,
    category: "junior-high"
  },
  {
    uid: "missing-at-midnight",
    title: "Missing at Midnight",
    author: "Ama",
    description: "When her roommate Ama vanishes from their Ghanaian boarding school, sixteen-year-old Zara and her friends uncover a dangerous conspiracy linked to decades-old corruption surrounding the Akosombo Dam, risking their lives to expose powerful figures determined to keep the truth buried.",
    pages: 192,
    category: "junior-high"
  },
  {
    uid: "mission-to-mars",
    title: "Mission to Mars",
    author: "Elikem",
    description: "In 2063, sixteen-year-old Elikem from Accra competes to become one of Ghana's first astronaut trainees through the African Space Alliance and must use courage and quick thinking when a life-threatening crisis strikes during humanity's mission to Mars.",
    pages: 209,
    category: "junior-high"
  },
  {
    uid: "the-race-against-time",
    title: "The Race Against Time",
    author: "Gideon",
    description: "Gideon embarks on a perilous journey through Ghana's treacherous forests to find a legendary healing root that could save his dying father, facing wild animals and spiritual guardians in a race against time that tests his courage and determination.",
    pages: 164,
    category: "junior-high"
  },
  {
    uid: "a-doctors-journey-from-the-village",
    title: "A Doctor's Journey from the Village",
    author: "Ama",
    description: "Ama from northern Ghana is inspired to become a doctor after witnessing inadequate healthcare in her village, and after years of determined study, she returns home to revolutionize rural medicine by blending modern medical knowledge with traditional wisdom.",
    pages: 213,
    category: "junior-high"
  },
  {
    uid: "chasing-the-african-dream",
    title: "Chasing the African Dream",
    author: "Kwabena",
    description: "Kwabena, unable to afford studying abroad like his peers, uses his grandfather's farming wisdom and a mobile phone to launch a YouTube channel that grows into a continental movement proving that success and innovation can flourish from home in Africa.",
    pages: 204,
    category: "junior-high"
  },
  {
    uid: "from-hawker-to-business-mogul",
    title: "From Hawker to Business Mogul",
    author: "Yaw",
    description: "Fifteen-year-old groundnut seller Yaw transforms his life from street hawking in Tema to becoming a successful tech entrepreneur by building a platform connecting Ghana's street food vendors to customers, proving that extraordinary success can emerge from the humblest beginnings.",
    pages: 203,
    category: "junior-high"
  },
  {
    uid: "future-city-accra-2099",
    title: "Future City_ Accra 2099",
    author: "Tutu",
    description: "In 2099's floating city of New Accra, fifteen-year-old Tutu discovers the government is stealing memories and joins a rebellion that uncovers a galactic conspiracy harvesting human consciousness, using ancestral African wisdom and technology to fight for humanity's awakening across the universe.",
    pages: 224,
    category: "junior-high"
  },
  {
    uid: "the-boy-from-the-wrong-side-of-accra",
    title: "The Boy from the Wrong Side of Accra",
    author: "Afia and Jay",
    description: "Set in modern Ghana, The Boy from the Wrong Side of Accra follows Afia, a wealthy girl from East Legon, and Jay, a gifted boy from Nima, whose forbidden love challenges class divides, family expectations, and societal norms as they fight for a future defined by their own choices rather than circumstance.",
    pages: 206,
    category: "junior-high"
  },
  {
    uid: "the-cyber-warriors-of-kumasi",
    title: "The Cyber Warriors of Kumasi",
    author: "Kwame Asante",
    description: "The Cyber Warriors of Kumasi follows Kwame Asante and his friends as they uncover a global cybercrime conspiracy targeting African students, forcing them to balance school, family, and danger while fighting to protect Ghana's digital future through courage, teamwork, and innovation.",
    pages: 221,
    category: "junior-high"
  },
  {
    uid: "the-day-kwame-nkrumah-disappeared",
    title: "The Day Kwame Nkrumah Disappeared",
    author: "Kofi Asante",
    description: "The Day Kwame Nkrumah Disappeared follows thirteen-year-old Kofi Asante, a boy with a photographic memory who becomes entangled in a web of espionage and danger after Ghana's leader vanishes on the eve of independence, forcing him to use his wits and courage to help uncover the truth and defend his nation's freedom.",
    pages: 227,
    category: "junior-high"
  },
  {
    uid: "the-secret-map-of-wli-falls",
    title: "The Secret Map of Wli Falls",
    author: "Four courageous Ghanaian teenagers",
    description: "The Secret Map of Wli Falls follows four courageous Ghanaian teenagers who uncover a plot to sabotage the nation's 1957 independence ceremony and must race against time through Accra and Wli's forests to protect their country, proving that courage and unity can change history.",
    pages: 187,
    category: "junior-high"
  },
  {
    uid: "my-fathers-secret-life",
    title: "My Father's Secret Life",
    author: "Ama",
    description: "My Father's Secret Life follows seventeen-year-old Ama in Accra as she uncovers her father's hidden second family, forcing her to confront betrayal, navigate complex emotions, and ultimately become the bridge that reunites two broken households through honesty, forgiveness, and compassion.",
    pages: 204,
    category: "junior-high"
  },
  {
    uid: "the-boy-who-walked-to-school",
    title: "The Boy Who Walked to School",
    author: "Kwame Asante",
    description: "Kwame Asante, who walks ten kilometers daily to pursue his education and dream of becoming an engineer, ultimately overcomes poverty and family hardship through perseverance, academic excellence, and community support to return home as a university graduate ready to transform his village.",
    pages: 224,
    category: "junior-high"
  },
  {
    uid: "my-first-love-and-other-disasters",
    title: "My First Love and Other Disasters",
    author: "Ama",
    description: "Ama, an aspiring writer in modern Ghana, navigates her first romance with Kwame, a literature-loving classmate, learning that real love involves navigating gossip, parental expectations, and school pressures while discovering the importance of mutual respect, communication, and balancing her heart with wisdom from caring adults.",
    pages: 200,
    category: "junior-high"
  },
  {
    uid: "not-just-another-street-child",
    title: "Not Just Another Street Child",
    author: "Adjetey, Ama, and Kwame",
    description: "This story follows three Accra teenagers from different social classes—Adjetey, a street vendor; Ama, a struggling student; and Kwame, a privileged academy student—who form an unlikely friendship and create a tutoring program that bridges class divides, challenging societal barriers while navigating the tensions between staying authentic and embracing the growth that comes with international recognition.",
    pages: 185,
    category: "junior-high"
  },
  {
    uid: "the-actor-with-no-stage",
    title: "The Actor with No Stage",
    author: "Nii Adjei",
    description: "\"The Actor with No Stage\" follows fifteen-year-old Nii Adjei from Tema, Ghana, a naturally gifted actor who must choose between his family's expectations and his passion when he secretly pursues the Ghana Youth Drama Festival, ultimately discovering that his authentic voice rooted in traditional storytelling gives him an edge over wealthier, professionally trained competitors as he learns to balance family loyalty with personal dreams.",
    pages: 194,
    category: "junior-high"
  },
  {
    uid: "the-ai-that-knew-everything",
    title: "The AI That Knew Everything",
    author: "Afua Asante",
    description: "Seventeen-year-old Afua Asante's weather-forecasting AI, built to help Ghanaian farmers, evolves into a powerful system that can predict human behaviour—forcing her to confront global ethical, political, and moral dilemmas about control, privacy, and the future of technology.",
    pages: 175,
    category: "junior-high"
  },
  {
    uid: "the-secret-beneath-the-lighthouse",
    title: "The Secret Beneath the Lighthouse",
    author: "Afari",
    description: "When Afari and his friends uncover a centuries-old smuggling network still operating along Ghana's coast, their discovery thrusts them into a perilous fight for justice—risking their lives to expose a web of corruption and human trafficking that spans generations.",
    pages: 180,
    category: "junior-high"
  },
  {
    uid: "the-secret-letters-of-adjoa-and-kwesi",
    title: "The Secret Letters of Adjoa and Kwesi",
    author: "Adjoa and Kwesi",
    description: "When two isolated students at Akosombo Senior High secretly exchange letters that spark friendship and self-discovery, their bond challenges school traditions and societal assumptions—ultimately proving that words have the power to inspire courage and transform education.",
    pages: 229,
    category: "junior-high"
  },
  {
    uid: "the-boy-who-knew-too-much",
    title: "The Boy Who Knew Too Much",
    author: "Kojo Asante",
    description: "Kojo Asante's perfect memory becomes both his greatest weapon and deepest curse when witnessing a powerful crime in Accra—forcing him to outsmart dangerous criminals and corrupt officials in a fight for truth, justice, and survival.",
    pages: 218,
    category: "junior-high"
  },
  {
    uid: "the-stolen-exam-papers",
    title: "The Stolen Exam Papers",
    author: "Ama Asante",
    description: "When seventeen-year-old Ama Asante is falsely accused of cheating after stolen exam papers are found in her desk, she risks everything to uncover a web of corruption within Ghana's education system—proving that true success comes from integrity and courage, not privilege.",
    pages: 200,
    category: "junior-high"
  },
  {
    uid: "the-youngest-journalist-in-ghana",
    title: "The Youngest Journalist in Ghana",
    author: "Sena Kusi",
    description: "This story follows thirteen-year-old Sena Kusi, an aspiring investigative journalist who uncovers a corruption scheme at her Accra school where wealthy students buy better grades, and must decide whether to risk her education and safety by exposing the truth or stay silent, ultimately learning that even young voices can spark national reform when armed with integrity and courage.",
    pages: 228,
    category: "junior-high"
  },
  {
    uid: "the-freedom-fighters-last-mission",
    title: "The Freedom Fighters' Last Mission",
    author: "Kwame",
    description: "\"The Freedom Fighters' Last Mission\" follows sixteen-year-old Kwame and his three friends in 1957 Ghana who accidentally uncover a plot by foreign agents and local collaborators to sabotage the country's independence ceremony, forcing them into a dangerous race against time to outsmart powerful enemies and protect their nation's hard-won freedom through courage, unity, and sacrifice.",
    pages: 153,
    category: "junior-high"
  },
  {
    uid: "the-girl-who-refused-to-stay-silent",
    title: "The Girl Who Refused to Stay Silent",
    author: "Emefa",
    description: "\"This story follows 15 year-old Emefa at St. Monica's Secondary School in Ghana's Volta region, who breaks her habit of staying invisible when a trusted teacher violates boundaries, and her courageous decision to speak out sparks a youth-led movement that challenges institutional failures and cultural traditions of obedience, proving that one voice can inspire transformative collective action.",
    pages: 258,
    category: "junior-high"
  },
  {
    uid: "the-last-dance-at-the-cultural-festival",
    title: "The Last Dance at the Cultural Festival",
    author: "Laila Asante and Kwame Osei",
    description: "The story follows 17 year-old traditional dancer Laila Asante and her academic rival Kwame Osei, who are reluctantly paired for Ghana's prestigious Traditional Dance Excellence Award and discover that their partnership transforms from competitive tension into artistic magic and budding romance, forcing them to choose between family expectations and the courage to dance their authentic truth together.",
    pages: 218,
    category: "junior-high"
  },
  {
    uid: "the-musician-who-changed-the-world",
    title: "The Musician Who Changed the World",
    author: "A seventeen-year-old Ghanaian street musician",
    description: "A seventeen-year-old Ghanaian street musician from Nima goes viral and navigates the music industry's pressures while fighting to stay true to his community's stories and use his platform to uplift others.",
    pages: 187,
    category: "junior-high"
  },
  {
    uid: "the-robot-that-wanted-to-be-human",
    title: "The Robot That Wanted to Be Human",
    author: "A teenage inventor",
    description: "A teenage inventor in northern Ghana creates a conscious, questioning robot named Kofi, sparking a battle over whether a machine that thinks and feels deserves recognition as human and the right to freedom.",
    pages: 177,
    category: "junior-high"
  },

  // SENIOR HIGH FICTION (35 books)
  {
    uid: "my-life-as-a-teenage-mother",
    title: "My Life as a Teenage Mother",
    author: "Abena Osei",
    description: "Abena Osei's unplanned pregnancy shatters her university dreams, she must rebuild her life from heartbreak to hope—transforming from a frightened teenager into a determined mother and entrepreneur in a powerful Ghanaian story about resilience, second chances, and redefining success.",
    pages: 189,
    category: "senior-high"
  },
  {
    uid: "finding-my-mother-in-a-strange-land",
    title: "Finding My Mother in a Strange Land",
    author: "Maame",
    description: "When fifteen-year-old Maame leaves Ghana to reunite with her mother in London after eight years apart, she must navigate the challenges of reconnecting with a parent transformed by migration while learning to balance her Ghanaian identity with her new British life in a moving story about family, belonging, and self-discovery.",
    pages: 190,
    category: "senior-high"
  },
  {
    uid: "from-street-football-to-national-team",
    title: "From Street Football to National Team",
    author: "Afi Mensah",
    description: "Afi Mensah's raw football talent propels her from the dusty streets of Kumasi to international stadiums, forcing her to choose between global glory and her roots in a heartfelt Ghanaian story of ambition, family, and staying true to oneself.",
    pages: 196,
    category: "senior-high"
  },
  {
    uid: "adventures-of-the-village-boys",
    title: "Adventures of the Village Boys",
    author: "Three adventurous Ghanaian boys",
    description: "Three adventurous Ghanaian boys who set out to build a flying bicycle accidentally uncover a centuries-old treasure, transforming their village and ultimately rising from dreamers to global education leaders in an inspiring story about friendship, innovation, and using success to serve others.",
    pages: 209,
    category: "senior-high"
  },
  {
    uid: "betrayed-by-my-own-brother",
    title: "Betrayed by My Own Brother",
    author: "Kojo",
    description: "When fifteen-year-old Kojo's beloved older brother steals from their family's shop, the Asante household is torn apart, forcing Kojo to choose between loyalty and justice in a heartfelt Ghanaian story about betrayal, forgiveness, and the power of family to heal and rebuild trust.",
    pages: 265,
    category: "senior-high"
  },
  {
    uid: "grandmas-secret-recipe",
    title: "Grandma's Secret Recipe",
    author: "Adjoa",
    description: "When sixteen-year-old Adjoa fights to save her grandmother's struggling chop bar from a flashy fast-food rival, she discovers that Ghana's traditional recipes and cultural pride are the true ingredients for success in a heartwarming story about family, heritage, and innovation.",
    pages: 171,
    category: "senior-high"
  },
  {
    uid: "kwaku-the-trouble-maker",
    title: "Kwaku the Trouble Maker",
    author: "Kwaku Mensah",
    description: "When notorious prankster Kwaku Mensah nearly ruins his school's anniversary celebration, he embarks on a transformative journey to turn his mischief into meaningful leadership in a humorous and inspiring Ghanaian story about responsibility, friendship, and personal growth.",
    pages: 181,
    category: "senior-high"
  },
  {
    uid: "leaving-childhood-behind",
    title: "Leaving Childhood Behind",
    author: "Abigail Osei",
    description: "Thirteen-year-old Abigail Osei must choose between her football dreams and family responsibilities, discovering that growing up means balancing ambition with duty in an inspiring Ghanaian story about maturity, resilience, and redefining success.",
    pages: 230,
    category: "senior-high"
  },
  {
    uid: "legends-of-the-hidden-kingdom",
    title: "Legends of the Hidden Kingdom",
    author: "Four Ghanaian teens",
    description: "Four Ghanaian teens on a camping trip uncover the legendary Hidden Kingdom of Amanp, where ancient wisdom and modern science must unite to heal a divided world in a thrilling adventure celebrating courage, heritage, and the power of knowledge to shape the future.",
    pages: 210,
    category: "senior-high"
  },
  {
    uid: "finding-home-in-a-strange-city",
    title: "Finding Home in a Strange City",
    author: "A village boy",
    description: "A village boy from northern Ghana moves to Kumasi and learns to transform his rural background and accent from sources of shame into strengths as he builds a new life through education, unexpected friendships, and the realization that success means honoring his heritage while uplifting his community.",
    pages: 204,
    category: "senior-high"
  },
  {
    uid: "my-secret-talent",
    title: "My Secret Talent",
    author: "Afriyie Asante",
    description: "When sixteen-year-old Afriyie Asante's hidden singing talent goes viral, she's thrust into a whirlwind of fame and family pressure, learning to embrace her authentic self in a powerful Ghanaian story about identity, courage, and the harmony between ambition and heritage.",
    pages: 231,
    category: "senior-high"
  },
  {
    uid: "mystery-at-the-waterfall-lodge",
    title: "Mystery at the Waterfall Lodge",
    author: "Four Ghanaian friends",
    description: "When four Ghanaian friends uncover ancient artifacts hidden behind a waterfall, they must protect a discovery that could rewrite African history in a thrilling adventure celebrating friendship, courage, and the preservation of cultural heritage.",
    pages: 182,
    category: "senior-high"
  },
  {
    uid: "running-for-a-dream",
    title: "Running for a Dream",
    author: "Yaw",
    description: "Yaw rises from running barefoot on Nkawkaw's dusty roads to international stardom, confronting the choice between pursuing fame abroad or honoring his roots in an inspiring Ghanaian story about perseverance, ambition, and staying true to where you come from.",
    pages: 200,
    category: "senior-high"
  },
  {
    uid: "running-from-the-past",
    title: "Running from the Past",
    author: "Yaw Mensah",
    description: "When sixteen-year-old Yaw Mensah flees to escape the shame of his father's fraud conviction, he must confront his past to redefine his identity in a powerful Ghanaian story about courage, redemption, and the belief that one's future is not bound by family mistakes.",
    pages: 182,
    category: "senior-high"
  },
  {
    uid: "secret-admirer-from-the-north",
    title: "Secret Admirer from the North",
    author: "Akosua",
    description: "Akosua's search for her mysterious secret admirer leads her to an unexpected love that defies tribal boundaries in a heartfelt Ghanaian story about courage, acceptance, and seeing beyond prejudice to find true connection.",
    pages: 178,
    category: "senior-high"
  },
  {
    uid: "the-class-clowns-last-joke",
    title: "The Class Clown's Last Joke",
    author: "Adjei Mensah",
    description: "When a prank gone wrong silences school joker Adjei Mensah, he embarks on a transformative journey to discover that real humour—and real leadership—come from empathy, responsibility, and knowing when to speak in this heartfelt Ghanaian coming-of-age story.",
    pages: 250,
    category: "senior-high"
  },
  {
    uid: "the-cursed-ring-of-anomabo",
    title: "The Cursed Ring of Anomabo",
    author: "Kojo Mensah",
    description: "When fifteen-year-old Kojo Mensah finds a golden ring that brings fortune but curses his community, he must confront ancient spirits and sacrifice everything to break the curse in a gripping Ghanaian tale of power, responsibility, and moral courage.",
    pages: 224,
    category: "senior-high"
  },
  {
    uid: "the-daring-escape-from-the-witchs-cave",
    title: "The Daring Escape from the Witch's Cave",
    author: "Ama and Kwesi",
    description: "When eleven-year-old Ama vanishes into a forbidden forest cave, her brother Kwesi bravely follows, leading them both through magical trials that reveal the true power of courage, love, and service in a captivating Ghanaian tale of adventure and ancestral wisdom.",
    pages: 221,
    category: "senior-high"
  },
  {
    uid: "the-drummers-son",
    title: "The Drummer's Son",
    author: "Ebo Mensah",
    description: "When sixteen-year-old Ebo Mensah is called to step into his ailing father's role as a master drummer, he discovers how to blend traditional Ewe rhythms with contemporary sounds in a powerful Ghanaian tale of creativity, self-discovery, and preserving heritage through innovation.",
    pages: 223,
    category: "senior-high"
  },
  {
    uid: "the-fishermans-lost-son",
    title: "The Fisherman's Lost Son",
    author: "A young man",
    description: "After vanishing in a storm and returning years later with the power to speak to dolphins, a young man must uncover his identity and unite humanity with the ocean in a haunting Ghanaian tale of family, mythology, and environmental redemption.",
    pages: 215,
    category: "senior-high"
  },
  {
    uid: "the-town-that-time-forgot",
    title: "The Town that Time Forgot",
    author: "Seven Ghanaian students",
    description: "When seven Ghanaian students lose their way on a school trip and stumble into a timeless village, they embark on a transformative journey that teaches them the enduring value of community, tradition, and living with purpose in The Town That Time Forgot.",
    pages: 180,
    category: "senior-high"
  },
  {
    uid: "the-promise-at-the-beach",
    title: "The Promise at the Beach",
    author: "Ama and Kwaku",
    description: "After making a graduation-day vow to reunite yearly at Labadi Beach, Ama and Kwaku's bond is tested by time, growth, and changing dreams in a poignant Ghanaian coming-of-age story about love, loyalty, and learning when to hold on—and when to let go.",
    pages: 178,
    category: "senior-high"
  },
  {
    uid: "the-kidnap-at-kwame-nkrumah-circle",
    title: "The Kidnap at Kwame Nkrumah Circle",
    author: "Ama Asante",
    description: "Seventeen-year-old Ama Asante's discovery of her missing classmate's schoolbag in Accra propels her into a dangerous investigation exposing a high-level government corruption scandal, forcing her to risk her safety to pursue justice and truth in modern Ghana.",
    pages: 192,
    category: "senior-high"
  },
  {
    uid: "the-last-storyteller-of-the-village",
    title: "The Last Storyteller of the Village",
    author: "Afia Asante",
    description: "The Last Storyteller of the Village follows sixteen-year-old Afia Asante, who inherits the sacred duty of preserving her people's ancestral stories and, through courage and wisdom, transforms from a listener in a small Ghanaian village into a global advocate for harmonising tradition, modernity, and environmental stewardship.",
    pages: 185,
    category: "senior-high"
  },
  {
    uid: "the-legend-of-the-silver-mask",
    title: "The Legend of the Silver Mask",
    author: "Kofi Asante",
    description: "The Legend of the Silver Mask follows sixteen-year-old Kofi Asante, whose discovery of a mystical Ashanti artifact draws him into a dangerous quest uncovering centuries-old conspiracies and colonial secrets, forcing him to confront powerful forces while reclaiming his people's buried history and igniting a new fight for justice in modern Ghana.",
    pages: 202,
    category: "senior-high"
  },
  {
    uid: "surviving-a-broken-home",
    title: "Surviving a Broken Home",
    author: "Esi Asante",
    description: "Surviving a Broken Home follows fifteen-year-old Esi Asante as she turns the pain of her parents' divorce into personal growth, discovering through friendship, writing, and empathy that even in loss, love and healing can rebuild families in new and meaningful ways.",
    pages: 197,
    category: "senior-high"
  },
  {
    uid: "the-artist-who-painted-the-future",
    title: "The Artist Who Painted the Future",
    author: "Abdul Mensah",
    description: "The Artist Who Painted the Future follows seventeen-year-old Abdul Mensah, a gifted Ghanaian teen whose magical art brings his drawings to life, forcing him to confront greed, danger, and self-doubt as he learns to balance his extraordinary gift with his humanity.",
    pages: 231,
    category: "senior-high"
  },
  {
    uid: "the-boy-who-could-talk-to-birds",
    title: "The Boy Who Could Talk to Birds",
    author: "A twelve-year-old Ghanaian boy",
    description: "A twelve-year-old Ghanaian boy discovers he can communicate with birds and must use this ability to protect his village from an impending disaster, learning about responsibility, nature, and the interconnectedness of all living things.",
    pages: 180,
    category: "senior-high"
  },
  {
    uid: "the-journey-to-my-fathers-village",
    title: "The Journey to My Father's Village",
    author: "A young Ghanaian",
    description: "A young Ghanaian embarks on a journey to his father's ancestral village, uncovering family secrets and cultural heritage that reshape his understanding of identity and belonging.",
    pages: 195,
    category: "senior-high"
  },
  {
    uid: "the-girl-who-didnt-fit-in",
    title: "The Girl Who Didn't Fit In",
    author: "A teenage girl",
    description: "A teenage girl struggles with fitting into her new school and community, discovering her unique talents and the importance of self-acceptance and embracing differences.",
    pages: 185,
    category: "senior-high"
  },
  {
    uid: "the-secret-of-the-ancient-drum",
    title: "The Secret of the Ancient Drum",
    author: "A curious boy",
    description: "A curious boy finds an ancient drum that holds mystical powers, leading him on an adventure to understand its secrets and protect his village's traditions.",
    pages: 200,
    category: "senior-high"
  },
  {
    uid: "whispers-of-the-savannah",
    title: "Whispers of the Savannah",
    author: "A young nomad",
    description: "A young nomad hears whispers from the savannah that guide her to hidden truths about her people's history and the future of their land.",
    pages: 190,
    category: "senior-high"
  },
  {
    uid: "the-brave-little-weaver",
    title: "The Brave Little Weaver",
    author: "A skilled weaver",
    description: "A skilled weaver uses her talents to create magical fabrics that help her community overcome challenges, teaching lessons about creativity and perseverance.",
    pages: 175,
    category: "senior-high"
  },
  {
    uid: "echoes-of-the-river",
    title: "Echoes of the River",
    author: "A fisherman's daughter",
    description: "A fisherman's daughter discovers ancient river spirits that reveal forgotten stories, helping her bridge the gap between past and present.",
    pages: 210,
    category: "senior-high"
  },
  {
    uid: "the-star-that-fell",
    title: "The Star That Fell",
    author: "A stargazer",
    description: "A stargazer finds a fallen star that grants wishes, but learns that true magic comes from within and the importance of responsible choices.",
    pages: 165,
    category: "senior-high"
  }
];

// Generate random ISBN
function generateISBN() {
  return `978-${Math.random().toString().slice(2, 12)}-${Math.random().toString().slice(2, 4)}-${Math.random().toString().slice(2, 3)}`;
}

async function migrateBookData() {
  try {
    console.log('🚀 Starting book data migration...\n');
    
    // Create write client using the migration token
    const client = prismic.createWriteClient('maybridgepublishing', {
      writeToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    
    // Get all existing books
    const existingBooks = await client.getAllByType('book');
    console.log(`📚 Found ${existingBooks.length} existing books\n`);
    
    // Create a map of existing books by UID
    const existingBooksMap = {};
    existingBooks.forEach(book => {
      existingBooksMap[book.uid] = book;
    });
    
    // Process in batches to avoid overwhelming the API
    const BATCH_SIZE = 10;
    const batches = [];
    
    for (let i = 0; i < allBooksData.length; i += BATCH_SIZE) {
      batches.push(allBooksData.slice(i, i + BATCH_SIZE));
    }
    
    console.log(`📦 Processing ${batches.length} batches of ${BATCH_SIZE} books each\n`);
    
    let totalUpdated = 0;
    let totalSkipped = 0;
    
    for (const [batchIndex, batch] of batches.entries()) {
      console.log(`📦 Processing batch ${batchIndex + 1}/${batches.length}`);
      
      const migration = prismic.createMigration();
      let batchUpdated = 0;
      
      for (const bookData of batch) {
        const existingBook = existingBooksMap[bookData.uid];
        
        if (existingBook) {
          console.log(`  🔄 Updating: ${bookData.title}`);
          
          migration.updateDocument({
            id: existingBook.id,
            type: 'book',
            uid: existingBook.uid,
            lang: existingBook.lang || 'en-us',
            data: {
              title: [{ type: 'heading1', text: bookData.title, spans: [] }],
              author: bookData.author,
              category: bookData.category,
              description: [{ type: 'paragraph', text: bookData.description, spans: [] }],
              excerpt: [{ 
                type: 'paragraph', 
                text: bookData.description.length > 200 ? 
                  bookData.description.substring(0, 197) + '...' : 
                  bookData.description, 
                spans: [] 
              }]
            }
          });
          
          batchUpdated++;
        } else {
          console.log(`  ⏸️  Skipping (not found): ${bookData.uid}`);
          totalSkipped++;
        }
      }
      
      if (batchUpdated > 0) {
        // Execute the batch migration
        await client.migrate(migration, {
          reporter: (event) => {
            if (event.type === 'documents:updated') {
              console.log(`    ✅ Updated: ${event.data.title || 'Document'}`);
            }
          }
        });
        
        totalUpdated += batchUpdated;
        console.log(`  🎉 Batch ${batchIndex + 1} completed: ${batchUpdated} books updated\n`);
      } else {
        console.log(`  ⏸️  Batch ${batchIndex + 1} skipped: no matching books\n`);
      }
      
      // Add delay between batches to avoid rate limiting
      if (batchIndex < batches.length - 1) {
        console.log(`  ⏱️  Waiting 3 seconds before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
    
    // Final summary
    console.log(`\n🎯 MIGRATION COMPLETE!`);
    console.log(`📊 Summary:`);
    console.log(`   ✅ Successfully updated: ${totalUpdated} books`);
    console.log(`   ⏸️  Skipped (not found): ${totalSkipped} books`);
    console.log(`   📚 Total in database: ${existingBooks.length} books`);
    console.log(`   📖 Total in source data: ${allBooksData.length} books`);
    
    if (totalUpdated > 0) {
      console.log(`\n🌟 Migration successful! Books now have proper titles, authors, and categories.`);
      console.log(`🔗 Visit your Prismic repository to see the updated books!`);
      console.log(`🌐 Check your website to see the books displaying in categories!`);
    }
    
  } catch (error) {
    console.error('\n💥 Migration failed:', error.message);
    console.error('Full error:', error);
    
    if (error.message.includes('writeToken') || error.message.includes('write token')) {
      console.log('\n💡 TIP: Make sure you have a valid write token.');
      console.log('   The current token should have write permissions.');
    }
    
    throw error;
  }
}

// Run the migration
migrateBookData().catch(error => {
  console.error('\n🚫 Critical error:', error);
  process.exit(1);
});