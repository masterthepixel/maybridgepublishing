import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Complete book dataset from catalogue
const allBooksData = [
  // PRIMARY LEVEL READERS (30 books)
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
  },

  // JUNIOR HIGH FICTION (45 books)
  {
    title: "Hiding in the Shadows of Kumasi",
    mainCharacter: "A journalist",
    description: "A journalist in Kumasi uncovers the identity of a mysterious street artist whose politically charged murals inspire youth activism, forcing them both to choose between safety and fighting for free speech against an oppressive government.",
    pages: 208,
    category: "junior-high"
  },
  {
    title: "The Wise Woman's Prophecy",
    mainCharacter: "A young Ghanaian woman",
    description: "A young Ghanaian woman fulfills her prophesied destiny by creating a revolutionary education system that bridges traditional cultural wisdom and modern innovation, transforming her village and ultimately influencing educational policy across Africa.",
    pages: 225,
    category: "junior-high"
  },
  {
    title: "The Truth About the Witch Doctor",
    mainCharacter: "Araba",
    description: "In a Ghanaian village torn between superstition and science, young Araba defies tradition to heal the sick, sparking a courageous struggle between fear and truth in a powerful tale of curiosity, culture, and the transformative power of knowledge.",
    pages: 139,
    category: "junior-high"
  },
  {
    title: "Secrets of the Old Fisherman",
    mainCharacter: "A Ghanaian boy",
    description: "A Ghanaian boy must convince his skeptical coastal village to heed a \"mad\" fisherman's storm warning based on traditional knowledge, ultimately proving that ancient wisdom remains vital in the modern world.",
    pages: 190,
    category: "junior-high"
  },
  {
    title: "The King Without a Crown",
    mainCharacter: "A Ghanaian prince",
    description: "A Ghanaian prince embarks on a nationwide quest to recover three pieces of his stolen sacred crown, learning through his journey that true leadership is earned through wisdom, courage, and service to others rather than inherited power.",
    pages: 232,
    category: "junior-high"
  },
  {
    title: "A Love Story at the Kente Festival",
    mainCharacter: "Two seventeen-year-olds",
    description: "Two seventeen-year-olds from rival Ghanaian villages are forced to co-host the annual Kente Festival and fall in love despite their schools' fierce rivalry, testing whether their relationship can survive deep-rooted community divisions and family expectations.",
    pages: 223,
    category: "junior-high"
  },
  {
    title: "The Forbidden Island",
    mainCharacter: "Three Ghanaian teenagers",
    description: "Three Ghanaian teenagers shipwrecked on a forbidden island discover a hidden community guarding sacred knowledge and healing springs, forcing them to choose between returning home or becoming guardians protecting ancient treasures from corporate exploitation.",
    pages: 207,
    category: "junior-high"
  },
  {
    title: "The Boy with the Golden Eyes",
    mainCharacter: "A sixteen-year-old Ghanaian boy",
    description: "A sixteen-year-old Ghanaian boy with golden eyes and healing powers emerges from a lifetime of hiding to lead a global movement, learning to balance his extraordinary gift with his humanity while protecting himself and others from exploitation and corruption.",
    pages: 222,
    category: "junior-high"
  },
  {
    title: "Beneath the Surface of the Volta Lake",
    mainCharacter: "Amina",
    description: "When fifteen-year-old Amina discovers she can communicate with the drowned spirits beneath Ghana's Volta Lake, she must uncover the forgotten history of the Akosombo Dam and bring peace to the lost souls before she herself is trapped between the worlds of the living and the dead.",
    pages: 188,
    category: "junior-high"
  },
  {
    title: "Daughter of the Chief",
    mainCharacter: "Afia Asante",
    description: "Seventeen-year-old Afia Asante, torn between becoming her community's future queen mother and pursuing her passion for space science, must find a way to honour her heritage while following her dreams in a story that celebrates courage, identity, and the harmony between tradition and innovation.",
    pages: 164,
    category: "junior-high"
  },
  {
    title: "Chasing the Last Secret of the Forest",
    mainCharacter: "Adjoa",
    description: "Seventeen-year-old Adjoa leads a courageous fight to save her village's sacred forest from destruction, uncovering the mythical Nyame Dua and igniting a national movement that blends ancestral wisdom with modern environmental activism.",
    pages: 336,
    category: "junior-high"
  },
  {
    title: "The Revenge of the Forgotten King",
    mainCharacter: "Kwaku",
    description: "Sixteen-year-old Kwaku accidentally unleashes an ancient curse in Kumasi and, with his friends, embarks on a quest across Ghana to solve seven riddles, learning that true power lies not in magic or might but in wisdom, courage, and selfless leadership.",
    pages: 198,
    category: "junior-high"
  },
  {
    title: "Escape from the Desert",
    mainCharacter: "Darryl Mensah",
    description: "Darryl Mensah's school trip turns into a harrowing fight for survival after a rebel attack in northern Ghana, forcing him to lead his classmates to freedom and transforming him from a frightened boy into a courageous leader whose experience later inspires his life's mission of peace and resilience.",
    pages: 230,
    category: "junior-high"
  },
  {
    title: "The War of the Twin Brothers",
    mainCharacter: "Two Ghanaian brothers",
    description: "In The War of the Twins, two Ghanaian brothers blessed with opposing elemental powers are drawn into an ancient prophecy reborn in modern times, forcing them to confront destiny, rivalry, and forgiveness as their struggle determines whether Ghana's future will be torn by conflict or healed through unity.",
    pages: 158,
    category: "junior-high"
  },
  {
    title: "When the Drums Stop beating",
    mainCharacter: "A grieving sixteen-year-old drummer",
    description: "A grieving sixteen-year-old Ghanaian drummer must overcome his pain and reconnect with traditional music to help his school compete in a prestigious competition, discovering that the rhythms his father taught him can be a path to healing rather than just a reminder of loss.",
    pages: 110,
    category: "junior-high"
  },
  {
    title: "Becoming the First Female Pilot",
    mainCharacter: "Abena Asante",
    description: "Fourteen-year-old Abena Asante defies her rural Ghanaian village's traditional expectations by pursuing her dream of becoming Ghana's first female pilot, using education and determination to overcome cultural barriers and prove that girls belong in the skies.",
    pages: 179,
    category: "junior-high"
  },
  {
    title: "Echoes from the Slave Dungeon",
    mainCharacter: "Nana",
    description: "A Ghanaian student named Nana begins hearing ancestral voices in Elmina Castle's slave dungeons and uncovers dangerous historical secrets that thrust him into a global battle for truth and justice against powerful forces determined to keep the past buried.",
    pages: 195,
    category: "junior-high"
  },
  {
    title: "Love in the Age of WhatsApp",
    mainCharacter: "Akua Mensah",
    description: "Set in modern Ghana, Love in the Age of WhatsApp follows Akua Mensah, a 17-year-old whose accidental text sparks a transformative mentorship and first love with a university student, leading her to navigate digital deception, self-discovery, and empowerment as she learns that true love inspires growth and integrity in both life and technology.",
    pages: 242,
    category: "junior-high"
  },
  {
    title: "Missing at Midnight",
    mainCharacter: "Ama",
    description: "When her roommate Ama vanishes from their Ghanaian boarding school, sixteen-year-old Zara and her friends uncover a dangerous conspiracy linked to decades-old corruption surrounding the Akosombo Dam, risking their lives to expose powerful figures determined to keep the truth buried.",
    pages: 192,
    category: "junior-high"
  },
  {
    title: "Mission to Mars",
    mainCharacter: "Elikem",
    description: "In 2063, sixteen-year-old Elikem from Accra competes to become one of Ghana's first astronaut trainees through the African Space Alliance and must use courage and quick thinking when a life-threatening crisis strikes during humanity's mission to Mars.",
    pages: 209,
    category: "junior-high"
  },
  {
    title: "The Race Against Time",
    mainCharacter: "Gideon",
    description: "Gideon embarks on a perilous journey through Ghana's treacherous forests to find a legendary healing root that could save his dying father, facing wild animals and spiritual guardians in a race against time that tests his courage and determination.",
    pages: 164,
    category: "junior-high"
  },
  {
    title: "A Doctor's Journey from the Village",
    mainCharacter: "Ama",
    description: "Ama from northern Ghana is inspired to become a doctor after witnessing inadequate healthcare in her village, and after years of determined study, she returns home to revolutionize rural medicine by blending modern medical knowledge with traditional wisdom.",
    pages: 213,
    category: "junior-high"
  },
  {
    title: "Chasing the African Dream",
    mainCharacter: "Kwabena",
    description: "Kwabena, unable to afford studying abroad like his peers, uses his grandfather's farming wisdom and a mobile phone to launch a YouTube channel that grows into a continental movement proving that success and innovation can flourish from home in Africa.",
    pages: 204,
    category: "junior-high"
  },
  {
    title: "From Hawker to Business Mogul",
    mainCharacter: "Yaw",
    description: "Fifteen-year-old groundnut seller Yaw transforms his life from street hawking in Tema to becoming a successful tech entrepreneur by building a platform connecting Ghana's street food vendors to customers, proving that extraordinary success can emerge from the humblest beginnings.",
    pages: 203,
    category: "junior-high"
  },
  {
    title: "Future City_ Accra 2099",
    mainCharacter: "Tutu",
    description: "In 2099's floating city of New Accra, fifteen-year-old Tutu discovers the government is stealing memories and joins a rebellion that uncovers a galactic conspiracy harvesting human consciousness, using ancestral African wisdom and technology to fight for humanity's awakening across the universe.",
    pages: 224,
    category: "junior-high"
  },
  {
    title: "The Boy from the Wrong Side of Accra",
    mainCharacter: "Afia and Jay",
    description: "Set in modern Ghana, The Boy from the Wrong Side of Accra follows Afia, a wealthy girl from East Legon, and Jay, a gifted boy from Nima, whose forbidden love challenges class divides, family expectations, and societal norms as they fight for a future defined by their own choices rather than circumstance.",
    pages: 206,
    category: "junior-high"
  },
  {
    title: "The Cyber Warriors of Kumasi",
    mainCharacter: "Kwame Asante",
    description: "The Cyber Warriors of Kumasi follows Kwame Asante and his friends as they uncover a global cybercrime conspiracy targeting African students, forcing them to balance school, family, and danger while fighting to protect Ghana's digital future through courage, teamwork, and innovation.",
    pages: 221,
    category: "junior-high"
  },
  {
    title: "The Day Kwame Nkrumah Disappeared",
    mainCharacter: "Kofi Asante",
    description: "The Day Kwame Nkrumah Disappeared follows thirteen-year-old Kofi Asante, a boy with a photographic memory who becomes entangled in a web of espionage and danger after Ghana's leader vanishes on the eve of independence, forcing him to use his wits and courage to help uncover the truth and defend his nation's freedom.",
    pages: 227,
    category: "junior-high"
  },
  {
    title: "The Secret Map of Wli Falls",
    mainCharacter: "Four courageous Ghanaian teenagers",
    description: "The Secret Map of Wli Falls follows four courageous Ghanaian teenagers who uncover a plot to sabotage the nation's 1957 independence ceremony and must race against time through Accra and Wli's forests to protect their country, proving that courage and unity can change history.",
    pages: 187,
    category: "junior-high"
  },
  {
    title: "My Father's Secret Life",
    mainCharacter: "Ama",
    description: "My Father's Secret Life follows seventeen-year-old Ama in Accra as she uncovers her father's hidden second family, forcing her to confront betrayal, navigate complex emotions, and ultimately become the bridge that reunites two broken households through honesty, forgiveness, and compassion.",
    pages: 204,
    category: "junior-high"
  },
  {
    title: "The Boy Who Walked to School",
    mainCharacter: "Kwame Asante",
    description: "Kwame Asante, who walks ten kilometers daily to pursue his education and dream of becoming an engineer, ultimately overcomes poverty and family hardship through perseverance, academic excellence, and community support to return home as a university graduate ready to transform his village.",
    pages: 224,
    category: "junior-high"
  },
  {
    title: "My First Love and Other Disasters",
    mainCharacter: "Ama",
    description: "Ama, an aspiring writer in modern Ghana, navigates her first romance with Kwame, a literature-loving classmate, learning that real love involves navigating gossip, parental expectations, and school pressures while discovering the importance of mutual respect, communication, and balancing her heart with wisdom from caring adults.",
    pages: 200,
    category: "junior-high"
  },
  {
    title: "Not Just Another Street Child",
    mainCharacter: "Adjetey, Ama, and Kwame",
    description: "This story follows three Accra teenagers from different social classes—Adjetey, a street vendor; Ama, a struggling student; and Kwame, a privileged academy student—who form an unlikely friendship and create a tutoring program that bridges class divides, challenging societal barriers while navigating the tensions between staying authentic and embracing the growth that comes with international recognition.",
    pages: 185,
    category: "junior-high"
  },
  {
    title: "The Actor with No Stage",
    mainCharacter: "Nii Adjei",
    description: "\"The Actor with No Stage\" follows fifteen-year-old Nii Adjei from Tema, Ghana, a naturally gifted actor who must choose between his family's expectations and his passion when he secretly pursues the Ghana Youth Drama Festival, ultimately discovering that his authentic voice rooted in traditional storytelling gives him an edge over wealthier, professionally trained competitors as he learns to balance family loyalty with personal dreams.",
    pages: 194,
    category: "junior-high"
  },
  {
    title: "The AI That Knew Everything",
    mainCharacter: "Afua Asante",
    description: "Seventeen-year-old Afua Asante's weather-forecasting AI, built to help Ghanaian farmers, evolves into a powerful system that can predict human behaviour—forcing her to confront global ethical, political, and moral dilemmas about control, privacy, and the future of technology.",
    pages: 175,
    category: "junior-high"
  },
  {
    title: "The Secret Beneath the Lighthouse",
    mainCharacter: "Afari",
    description: "When Afari and his friends uncover a centuries-old smuggling network still operating along Ghana's coast, their discovery thrusts them into a perilous fight for justice—risking their lives to expose a web of corruption and human trafficking that spans generations.",
    pages: 180,
    category: "junior-high"
  },
  {
    title: "The Secret Letters of Adjoa and Kwesi",
    mainCharacter: "Adjoa and Kwesi",
    description: "When two isolated students at Akosombo Senior High secretly exchange letters that spark friendship and self-discovery, their bond challenges school traditions and societal assumptions—ultimately proving that words have the power to inspire courage and transform education.",
    pages: 229,
    category: "junior-high"
  },
  {
    title: "The Boy Who Knew Too Much",
    mainCharacter: "Kojo Asante",
    description: "Kojo Asante's perfect memory becomes both his greatest weapon and deepest curse when witnessing a powerful crime in Accra—forcing him to outsmart dangerous criminals and corrupt officials in a fight for truth, justice, and survival.",
    pages: 218,
    category: "junior-high"
  },
  {
    title: "The Stolen Exam Papers",
    mainCharacter: "Ama Asante",
    description: "When seventeen-year-old Ama Asante is falsely accused of cheating after stolen exam papers are found in her desk, she risks everything to uncover a web of corruption within Ghana's education system—proving that true success comes from integrity and courage, not privilege.",
    pages: 200,
    category: "junior-high"
  },
  {
    title: "The Youngest Journalist in Ghana",
    mainCharacter: "Sena Kusi",
    description: "This story follows thirteen-year-old Sena Kusi, an aspiring investigative journalist who uncovers a corruption scheme at her Accra school where wealthy students buy better grades, and must decide whether to risk her education and safety by exposing the truth or stay silent, ultimately learning that even young voices can spark national reform when armed with integrity and courage.",
    pages: 228,
    category: "junior-high"
  },
  {
    title: "The Freedom Fighters' Last Mission",
    mainCharacter: "Kwame",
    description: "\"The Freedom Fighters' Last Mission\" follows sixteen-year-old Kwame and his three friends in 1957 Ghana who accidentally uncover a plot by foreign agents and local collaborators to sabotage the country's independence ceremony, forcing them into a dangerous race against time to outsmart powerful enemies and protect their nation's hard-won freedom through courage, unity, and sacrifice.",
    pages: 153,
    category: "junior-high"
  },
  {
    title: "The Girl Who Refused to Stay Silent",
    mainCharacter: "Emefa",
    description: "\"This story follows 15 year-old Emefa at St. Monica's Secondary School in Ghana's Volta region, who breaks her habit of staying invisible when a trusted teacher violates boundaries, and her courageous decision to speak out sparks a youth-led movement that challenges institutional failures and cultural traditions of obedience, proving that one voice can inspire transformative collective action.",
    pages: 258,
    category: "junior-high"
  },
  {
    title: "The Last Dance at the Cultural Festival",
    mainCharacter: "Laila Asante and Kwame Osei",
    description: "The story follows 17 year-old traditional dancer Laila Asante and her academic rival Kwame Osei, who are reluctantly paired for Ghana's prestigious Traditional Dance Excellence Award and discover that their partnership transforms from competitive tension into artistic magic and budding romance, forcing them to choose between family expectations and the courage to dance their authentic truth together.",
    pages: 218,
    category: "junior-high"
  },
  {
    title: "The Musician Who Changed the World",
    mainCharacter: "A seventeen-year-old Ghanaian street musician",
    description: "A seventeen-year-old Ghanaian street musician from Nima goes viral and navigates the music industry's pressures while fighting to stay true to his community's stories and use his platform to uplift others.",
    pages: 187,
    category: "junior-high"
  },
  {
    title: "The Robot That Wanted to Be Human",
    mainCharacter: "A teenage inventor",
    description: "A teenage inventor in northern Ghana creates a conscious, questioning robot named Kofi, sparking a battle over whether a machine that thinks and feels deserves recognition as human and the right to freedom.",
    pages: 177,
    category: "junior-high"
  },

  // SENIOR HIGH FICTION (35 books)
  {
    title: "My Life as a Teenage Mother",
    mainCharacter: "Abena Osei",
    description: "Abena Osei's unplanned pregnancy shatters her university dreams, she must rebuild her life from heartbreak to hope—transforming from a frightened teenager into a determined mother and entrepreneur in a powerful Ghanaian story about resilience, second chances, and redefining success.",
    pages: 189,
    category: "senior-high"
  },
  {
    title: "Finding My Mother in a Strange Land",
    mainCharacter: "Maame",
    description: "When fifteen-year-old Maame leaves Ghana to reunite with her mother in London after eight years apart, she must navigate the challenges of reconnecting with a parent transformed by migration while learning to balance her Ghanaian identity with her new British life in a moving story about family, belonging, and self-discovery.",
    pages: 190,
    category: "senior-high"
  },
  {
    title: "From Street Football to National Team",
    mainCharacter: "Afi Mensah",
    description: "Afi Mensah's raw football talent propels her from the dusty streets of Kumasi to international stadiums, forcing her to choose between global glory and her roots in a heartfelt Ghanaian story of ambition, family, and staying true to oneself.",
    pages: 196,
    category: "senior-high"
  },
  {
    title: "Adventures of the Village Boys",
    mainCharacter: "Three adventurous Ghanaian boys",
    description: "Three adventurous Ghanaian boys who set out to build a flying bicycle accidentally uncover a centuries-old treasure, transforming their village and ultimately rising from dreamers to global education leaders in an inspiring story about friendship, innovation, and using success to serve others.",
    pages: 209,
    category: "senior-high"
  },
  {
    title: "Betrayed by My Own Brother",
    mainCharacter: "Kojo",
    description: "When fifteen-year-old Kojo's beloved older brother steals from their family's shop, the Asante household is torn apart, forcing Kojo to choose between loyalty and justice in a heartfelt Ghanaian story about betrayal, forgiveness, and the power of family to heal and rebuild trust.",
    pages: 265,
    category: "senior-high"
  },
  {
    title: "Grandma's Secret Recipe",
    mainCharacter: "Adjoa",
    description: "When sixteen-year-old Adjoa fights to save her grandmother's struggling chop bar from a flashy fast-food rival, she discovers that Ghana's traditional recipes and cultural pride are the true ingredients for success in a heartwarming story about family, heritage, and innovation.",
    pages: 171,
    category: "senior-high"
  },
  {
    title: "Kwaku the Trouble Maker",
    mainCharacter: "Kwaku Mensah",
    description: "When notorious prankster Kwaku Mensah nearly ruins his school's anniversary celebration, he embarks on a transformative journey to turn his mischief into meaningful leadership in a humorous and inspiring Ghanaian story about responsibility, friendship, and personal growth.",
    pages: 181,
    category: "senior-high"
  },
  {
    title: "Leaving Childhood Behind",
    mainCharacter: "Abigail Osei",
    description: "Thirteen-year-old Abigail Osei must choose between her football dreams and family responsibilities, discovering that growing up means balancing ambition with duty in an inspiring Ghanaian story about maturity, resilience, and redefining success.",
    pages: 230,
    category: "senior-high"
  },
  {
    title: "Legends of the Hidden Kingdom",
    mainCharacter: "Four Ghanaian teens",
    description: "Four Ghanaian teens on a camping trip uncover the legendary Hidden Kingdom of Amanp, where ancient wisdom and modern science must unite to heal a divided world in a thrilling adventure celebrating courage, heritage, and the power of knowledge to shape the future.",
    pages: 210,
    category: "senior-high"
  },
  {
    title: "Finding Home in a Strange City",
    mainCharacter: "A village boy",
    description: "A village boy from northern Ghana moves to Kumasi and learns to transform his rural background and accent from sources of shame into strengths as he builds a new life through education, unexpected friendships, and the realization that success means honoring his heritage while uplifting his community.",
    pages: 204,
    category: "senior-high"
  },
  {
    title: "My Secret Talent",
    mainCharacter: "Afriyie Asante",
    description: "When sixteen-year-old Afriyie Asante's hidden singing talent goes viral, she's thrust into a whirlwind of fame and family pressure, learning to embrace her authentic self in a powerful Ghanaian story about identity, courage, and the harmony between ambition and heritage.",
    pages: 231,
    category: "senior-high"
  },
  {
    title: "Mystery at the Waterfall Lodge",
    mainCharacter: "Four Ghanaian friends",
    description: "When four Ghanaian friends uncover ancient artifacts hidden behind a waterfall, they must protect a discovery that could rewrite African history in a thrilling adventure celebrating friendship, courage, and the preservation of cultural heritage.",
    pages: 182,
    category: "senior-high"
  },
  {
    title: "Running for a Dream",
    mainCharacter: "Yaw",
    description: "Yaw rises from running barefoot on Nkawkaw's dusty roads to international stardom, confronting the choice between pursuing fame abroad or honoring his roots in an inspiring Ghanaian story about perseverance, ambition, and staying true to where you come from.",
    pages: 200,
    category: "senior-high"
  },
  {
    title: "Running from the Past",
    mainCharacter: "Yaw Mensah",
    description: "When sixteen-year-old Yaw Mensah flees to escape the shame of his father's fraud conviction, he must confront his past to redefine his identity in a powerful Ghanaian story about courage, redemption, and the belief that one's future is not bound by family mistakes.",
    pages: 182,
    category: "senior-high"
  },
  {
    title: "Secret Admirer from the North",
    mainCharacter: "Akosua",
    description: "Akosua's search for her mysterious secret admirer leads her to an unexpected love that defies tribal boundaries in a heartfelt Ghanaian story about courage, acceptance, and seeing beyond prejudice to find true connection.",
    pages: 178,
    category: "senior-high"
  },
  {
    title: "The Class Clown's Last Joke",
    mainCharacter: "Adjei Mensah",
    description: "When a prank gone wrong silences school joker Adjei Mensah, he embarks on a transformative journey to discover that real humour—and real leadership—come from empathy, responsibility, and knowing when to speak in this heartfelt Ghanaian coming-of-age story.",
    pages: 250,
    category: "senior-high"
  },
  {
    title: "The Cursed Ring of Anomabo",
    mainCharacter: "Kojo Mensah",
    description: "When fifteen-year-old Kojo Mensah finds a golden ring that brings fortune but curses his community, he must confront ancient spirits and sacrifice everything to break the curse in a gripping Ghanaian tale of power, responsibility, and moral courage.",
    pages: 224,
    category: "senior-high"
  },
  {
    title: "The Daring Escape from the Witch's Cave",
    mainCharacter: "Ama and Kwesi",
    description: "When eleven-year-old Ama vanishes into a forbidden forest cave, her brother Kwesi bravely follows, leading them both through magical trials that reveal the true power of courage, love, and service in a captivating Ghanaian tale of adventure and ancestral wisdom.",
    pages: 221,
    category: "senior-high"
  },
  {
    title: "The Drummer's Son",
    mainCharacter: "Ebo Mensah",
    description: "When sixteen-year-old Ebo Mensah is called to step into his ailing father's role as a master drummer, he discovers how to blend traditional Ewe rhythms with contemporary sounds in a powerful Ghanaian tale of creativity, self-discovery, and preserving heritage through innovation.",
    pages: 223,
    category: "senior-high"
  },
  {
    title: "The Fisherman's Lost Son",
    mainCharacter: "A young man",
    description: "After vanishing in a storm and returning years later with the power to speak to dolphins, a young man must uncover his identity and unite humanity with the ocean in a haunting Ghanaian tale of family, mythology, and environmental redemption.",
    pages: 215,
    category: "senior-high"
  },
  {
    title: "The Town that Time Forgot",
    mainCharacter: "Seven Ghanaian students",
    description: "When seven Ghanaian students lose their way on a school trip and stumble into a timeless village, they embark on a transformative journey that teaches them the enduring value of community, tradition, and living with purpose in The Town That Time Forgot.",
    pages: 180,
    category: "senior-high"
  },
  {
    title: "The Promise at the Beach",
    mainCharacter: "Ama and Kwaku",
    description: "After making a graduation-day vow to reunite yearly at Labadi Beach, Ama and Kwaku's bond is tested by time, growth, and changing dreams in a poignant Ghanaian coming-of-age story about love, loyalty, and learning when to hold on—and when to let go.",
    pages: 178,
    category: "senior-high"
  },
  {
    title: "The Kidnap at Kwame Nkrumah Circle",
    mainCharacter: "Ama Asante",
    description: "Seventeen-year-old Ama Asante's discovery of her missing classmate's schoolbag in Accra propels her into a dangerous investigation exposing a high-level government corruption scandal, forcing her to risk her safety to pursue justice and truth in modern Ghana.",
    pages: 192,
    category: "senior-high"
  },
  {
    title: "The Last Storyteller of the Village",
    mainCharacter: "Afia Asante",
    description: "The Last Storyteller of the Village follows sixteen-year-old Afia Asante, who inherits the sacred duty of preserving her people's ancestral stories and, through courage and wisdom, transforms from a listener in a small Ghanaian village into a global advocate for harmonising tradition, modernity, and environmental stewardship.",
    pages: 185,
    category: "senior-high"
  },
  {
    title: "The Legend of the Silver Mask",
    mainCharacter: "Kofi Asante",
    description: "The Legend of the Silver Mask follows sixteen-year-old Kofi Asante, whose discovery of a mystical Ashanti artifact draws him into a dangerous quest uncovering centuries-old conspiracies and colonial secrets, forcing him to confront powerful forces while reclaiming his people's buried history and igniting a new fight for justice in modern Ghana.",
    pages: 202,
    category: "senior-high"
  },
  {
    title: "Surviving a Broken Home",
    mainCharacter: "Esi Asante",
    description: "Surviving a Broken Home follows fifteen-year-old Esi Asante as she turns the pain of her parents' divorce into personal growth, discovering through friendship, writing, and empathy that even in loss, love and healing can rebuild families in new and meaningful ways.",
    pages: 197,
    category: "senior-high"
  },
  {
    title: "The Artist Who Painted the Future",
    mainCharacter: "Abdul Mensah",
    description: "The Artist Who Painted the Future follows seventeen-year-old Abdul Mensah, a gifted Ghanaian teen whose magical art brings his drawings to life, forcing him to confront greed, danger, and self-doubt as he learns to balance his extraordinary gift with his humanity.",
    pages: 231,
    category: "senior-high"
  },
  {
    title: "The Boy Who Could Talk to Birds",
    mainCharacter: "A twelve-year-old Ghanaian boy",
    description: "A twelve-year-old Ghanaian boy discovers he can communicate with birds and must use this ability to protect his village from an impending disaster, learning about responsibility, nature, and the interconnectedness of all living things.",
    pages: 180,
    category: "senior-high"
  },
  {
    title: "The Journey to My Father's Village",
    mainCharacter: "A young Ghanaian",
    description: "A young Ghanaian embarks on a journey to his father's ancestral village, uncovering family secrets and cultural heritage that reshape his understanding of identity and belonging.",
    pages: 195,
    category: "senior-high"
  },
  {
    title: "The Girl Who Didn't Fit In",
    mainCharacter: "A teenage girl",
    description: "A teenage girl struggles with fitting into her new school and community, discovering her unique talents and the importance of self-acceptance and embracing differences.",
    pages: 185,
    category: "senior-high"
  },
  {
    title: "The Secret of the Ancient Drum",
    mainCharacter: "A curious boy",
    description: "A curious boy finds an ancient drum that holds mystical powers, leading him on an adventure to understand its secrets and protect his village's traditions.",
    pages: 200,
    category: "senior-high"
  },
  {
    title: "Whispers of the Savannah",
    mainCharacter: "A young nomad",
    description: "A young nomad hears whispers from the savannah that guide her to hidden truths about her people's history and the future of their land.",
    pages: 190,
    category: "senior-high"
  },
  {
    title: "The Brave Little Weaver",
    mainCharacter: "A skilled weaver",
    description: "A skilled weaver uses her talents to create magical fabrics that help her community overcome challenges, teaching lessons about creativity and perseverance.",
    pages: 175,
    category: "senior-high"
  },
  {
    title: "Echoes of the River",
    mainCharacter: "A fisherman's daughter",
    description: "A fisherman's daughter discovers ancient river spirits that reveal forgotten stories, helping her bridge the gap between past and present.",
    pages: 210,
    category: "senior-high"
  },
  {
    title: "The Star That Fell",
    mainCharacter: "A stargazer",
    description: "A stargazer finds a fallen star that grants wishes, but learns that true magic comes from within and the importance of responsible choices.",
    pages: 165,
    category: "senior-high"
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

// Generate random ISBN
function generateISBN() {
  return `978-${Math.random().toString().slice(2, 12)}-${Math.random().toString().slice(2, 4)}-${Math.random().toString().slice(2, 3)}`;
}

// Create write client - try with access token first
async function createImportClient() {
  console.log('🔗 Creating Prismic client...');
  
  // First try with the access token (some repositories allow this)
  const writeClient = prismic.createWriteClient('maybridgepublishing', {
    writeToken: process.env.PRISMIC_ACCESS_TOKEN
  });
  
  return writeClient;
}

// Process books in batches to avoid rate limiting
async function processBatch(client, books, batchNumber, totalBatches) {
  console.log(`\n📦 Processing batch ${batchNumber}/${totalBatches} (${books.length} books)`);
  
  const migration = prismic.createMigration();
  
  for (const [index, book] of books.entries()) {
    console.log(`  📚 Adding ${index + 1}/${books.length}: ${book.title}`);
    
    const uid = generateUID(book.title);
    
    try {
      migration.createDocument({
        type: 'book',
        uid,
        lang: 'en-us',
        tags: ['Ghana', 'Young Adult', book.category],
        data: {
          title: [{ type: 'heading1', text: book.title, spans: [] }],
          author: book.mainCharacter,
          isbn: generateISBN(),
          description: [{ type: 'paragraph', text: book.description, spans: [] }],
          excerpt: [{ 
            type: 'paragraph', 
            text: book.description.length > 200 ? book.description.substring(0, 197) + '...' : book.description, 
            spans: [] 
          }],
          category: book.category,
          editor_notes: [{
            type: 'paragraph',
            text: `This ${book.pages}-page book is part of the Maybridge Publishing USA collection, featuring authentic Ghanaian storytelling that inspires minds and shapes futures.`,
            spans: []
          }],
          pages: book.pages
        }
      }, book.title);
      
    } catch (error) {
      console.error(`    ❌ Error adding ${book.title}:`, error.message);
    }
  }
  
  // Execute the batch migration
  try {
    console.log(`  🚀 Executing batch ${batchNumber} migration...`);
    
    await client.migrate(migration, {
      reporter: (event) => {
        if (event.type === 'documents:created') {
          console.log(`    ✅ Created: ${event.data.title || 'Document'}`);
        } else if (event.type === 'documents:creating') {
          console.log(`    📝 Creating ${event.data.current}/${event.data.total}: ${event.data.document?.title || 'Document'}`);
        }
      }
    });
    
    console.log(`  🎉 Batch ${batchNumber} completed successfully!`);
    return { success: true, count: books.length };
    
  } catch (error) {
    console.error(`  💥 Batch ${batchNumber} failed:`, error.message);
    return { success: false, error: error.message, count: books.length };
  }
}

// Main import function
async function automatedImport() {
  console.log(`🚀 Starting automated import of ${allBooksData.length} books`);
  console.log(`📊 Books by category:`);
  console.log(`   📘 Primary: ${allBooksData.filter(b => b.category === 'primary').length}`);
  console.log(`   📗 Junior High: ${allBooksData.filter(b => b.category === 'junior-high').length}`);
  console.log(`   📙 Senior High: ${allBooksData.filter(b => b.category === 'senior-high').length}\n`);
  
  try {
    // Create write client
    const client = await createImportClient();
    
    // Process in batches of 10 to avoid overwhelming the API
    const BATCH_SIZE = 10;
    const batches = [];
    
    for (let i = 0; i < allBooksData.length; i += BATCH_SIZE) {
      batches.push(allBooksData.slice(i, i + BATCH_SIZE));
    }
    
    console.log(`📦 Processing ${batches.length} batches of ${BATCH_SIZE} books each\n`);
    
    let totalSuccess = 0;
    let totalFailed = 0;
    const failedBatches = [];
    
    // Process each batch
    for (const [index, batch] of batches.entries()) {
      const result = await processBatch(client, batch, index + 1, batches.length);
      
      if (result.success) {
        totalSuccess += result.count;
      } else {
        totalFailed += result.count;
        failedBatches.push({ batch: index + 1, error: result.error });
      }
      
      // Add delay between batches to avoid rate limiting
      if (index < batches.length - 1) {
        console.log(`  ⏱️  Waiting 3 seconds before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
    
    // Final summary
    console.log(`\n🎯 IMPORT COMPLETE!`);
    console.log(`📊 Summary:`);
    console.log(`   ✅ Successfully imported: ${totalSuccess} books`);
    console.log(`   ❌ Failed to import: ${totalFailed} books`);
    console.log(`   📚 Total processed: ${allBooksData.length} books`);
    
    if (failedBatches.length > 0) {
      console.log(`\n💥 Failed batches:`);
      failedBatches.forEach(({ batch, error }) => {
        console.log(`   Batch ${batch}: ${error}`);
      });
    }
    
    if (totalSuccess > 0) {
      console.log(`\n🌟 Visit your Prismic repository to see your imported books!`);
      console.log(`🔗 https://maybridgepublishing.prismic.io/`);
    }
    
  } catch (error) {
    console.error('\n💥 Import failed:', error.message);
    
    if (error.message.includes('writeToken') || error.message.includes('write token')) {
      console.log('\n💡 TIP: You need a write token to import content.');
      console.log('   1. Go to your Prismic repository settings');
      console.log('   2. Navigate to API & Security');
      console.log('   3. Generate a permanent access token with write permissions');
      console.log('   4. Add it to your .env.local as PRISMIC_WRITE_TOKEN');
    } else if (error.message.includes('custom type')) {
      console.log('\n💡 TIP: The "book" custom type needs to be created in Prismic first.');
      console.log('   1. Go to your Prismic repository');
      console.log('   2. Create a custom type called "book"');
      console.log('   3. Add the required fields (title, author, description, etc.)');
    }
    
    throw error;
  }
}

// Run the automated import
automatedImport().catch(error => {
  console.error('\n🚫 Critical error:', error);
  process.exit(1);
});