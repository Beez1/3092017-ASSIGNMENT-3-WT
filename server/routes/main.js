const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
  try {
    const locals = {
      title: "ZB Blog",
      description: "Entertainment hub."
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});

 router.get('', async (req, res) => {
   const locals = {
     title: "ZB Blog",
     description: "Entertainment hub."
   }

   try {
     const data = await Post.find();
     res.render('index', { locals, data });
   } catch (error) {
     console.log(error);
   }

 });


/**
 * GET /
 * Post :id
*/
router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Entertainment Hub",
    }

    res.render('post', { 
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});


/**
 * POST /
 * Post - searchTerm
*/
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Entertainment Hub."
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { comment: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * About
*/
router.get('/about', (req, res) => {
  res.render('about', {
    currentRoute: '/about'
  });
});
/* articles */
function insertPostData () {
  Post.insertMany([
    {
      title: "Breakthrough in Cancer Research: New Drug Shows Promise in Targeting Resistant Tumors",
      body: "In a landmark development in the fight against cancer, scientists have announced a major breakthrough with the discovery of a novel drug that demonstrates efficacy in targeting previously resistant tumors. This promising advancement opens new avenues for treating patients with advanced-stage cancers, offering hope where conventional therapies have faltered. With further research and clinical trials underway, the medical community eagerly anticipates the potential impact of this groundbreaking treatment on improving patient outcomes and extending survival rates.",
      comment: "lovely post", // Comment: Added comment
    },
    {
      title: "Renewable Energy Revolution: Solar Power Surpasses Coal as Leading Energy Source in Multiple Countries",
      body: "The global transition towards renewable energy reaches a significant milestone as solar power surpasses coal as the primary source of electricity in multiple countries. With increasing investment and technological advancements driving down costs, solar energy emerges as a clean and sustainable alternative to fossil fuels. As nations around the world prioritize the adoption of renewable energy solutions to combat climate change and reduce carbon emissions, the rise of solar power heralds a new era of energy independence and environmental stewardship.",
      comment: "lovely post", // Comment: Added comment
    },
    {
      title: "Exploring the Depths: Scientists Discover New Species in the Ocean's Twilight Zone",
      body: "Delving into the mysterious depths of the ocean's twilight zone, marine scientists unveil a treasure trove of newfound species, each more extraordinary than the last. From bioluminescent creatures to elusive deep-sea fish, these discoveries shed light on the rich biodiversity thriving in one of Earth's least explored habitats. As researchers embark on expeditions to uncover the secrets of the deep, they uncover a world teeming with life and brimming with possibilities for scientific exploration and conservation efforts.",
      comment: "lovely post", // Comment: Added comment
    },
    {
      title: "Artificial Intelligence Breakthrough: AI System Achieves Human-Level Performance in Language Understanding Tasks",
      body: "In a significant leap forward for artificial intelligence, researchers announce the development of an AI system that attains human-level performance in language understanding tasks. Leveraging advanced machine learning algorithms and vast amounts of data, the system demonstrates a remarkable ability to comprehend and generate natural language with a level of fluency and accuracy previously unseen in AI models. As the boundaries of AI continue to expand, this breakthrough holds promise for applications ranging from virtual assistants to automated translation services, revolutionizing the way we interact with technology.",
      comment: "lovely post", // Comment: Added comment
    },
    {
      title: "Preserving Bio-diversity: Conservation Efforts Restore Endangered Species to Their Natural Habitats",
      body: "Conservationists celebrate a triumph in biodiversity preservation as efforts to restore endangered species to their natural habitats yield positive results. Through habitat restoration, captive breeding programs, and community-based conservation initiatives, endangered species once on the brink of extinction are making a remarkable comeback. As ecosystems recover and species populations rebound, these success stories serve as a beacon of hope for conservation efforts worldwide, highlighting the importance of collaborative action in safeguarding Earth's rich biological heritage.",
      comment: "lovely post", // Comment: Added comment
    },
    {
      title: "Space Exploration Milestone: NASA's Perseverance Rover Discovers Evidence of Ancient Life on Mars",
      body: "In a historic moment for space exploration, NASA's Perseverance rover makes a groundbreaking discovery on the surface of Mars, uncovering compelling evidence of ancient microbial life. Analyzing rock samples collected from the Jezero Crater, the rover's instruments detect organic molecules and fossilized remains indicative of past biological activity. This monumental finding ignites excitement among scientists and space enthusiasts alike, fueling speculation about the possibility of life beyond Earth and paving the way for future missions to explore the red planet in greater detail.",
      comment: "lovely post", // Comment: Added comment
    },
    {
      title: "Revolutionizing Transportation: Electric Vehicles Surge in Popularity as Governments Implement Green Initiatives",
      body: "The transportation industry undergoes a transformative shift as electric vehicles (EVs) surge in popularity, propelled by government incentives and environmental policies aimed at reducing carbon emissions. With advancements in battery technology and infrastructure development, EVs offer a cleaner and more sustainable alternative to traditional gasoline-powered vehicles. As consumers embrace the benefits of electric mobility, manufacturers ramp up production to meet growing demand, signaling a pivotal moment in the transition towards a greener and more eco-friendly transportation ecosystem.",
      comment: "lovely post", // Comment: Added comment
    },
    {
      title: "Innovations in Healthcare: Gene Editing Technology Holds Promise for Treating Genetic Disorders",
      body: "Breakthroughs in gene editing technology usher in a new era of personalized medicine, offering hope to millions of individuals affected by genetic disorders. With tools such as CRISPR-Cas9 enabling precise modifications to the human genome, scientists explore innovative approaches to treating inherited diseases and genetic conditions. From correcting faulty genes to developing targeted therapies, gene editing holds immense potential for revolutionizing healthcare and improving patient outcomes, marking a significant milestone in the quest to conquer genetic diseases.",
      comment: "lovely post", // Comment: Added comment
    },
    {
      title: "Sustainable Agriculture: Farmers Embrace Regenerative Practices to Combat Climate Change",
      body: "In response to the challenges posed by climate change and environmental degradation, farmers worldwide are adopting regenerative agricultural practices aimed at restoring soil health, enhancing biodiversity, and sequestering carbon. From cover cropping to rotational grazing, these sustainable farming methods prioritize soil conservation and ecosystem resilience, offering a viable solution for mitigating the impacts of climate change on food production. As awareness grows about the importance of sustainable agriculture, a growing number of farmers embrace regenerative practices to build a more resilient and sustainable food system for future generations.",
      comment: "lovely post", 
    },
    {
      title: "Empowering Communities: Social Entrepreneurship Initiatives Drive Economic Development in Underserved Areas",
      body: "Social entrepreneurship initiatives emerge as a catalyst for economic empowerment and community development in underserved areas around the world. Through innovative business models and social impact-driven ventures, entrepreneurs address pressing social and environmental challenges while generating sustainable economic opportunities for marginalized communities. From microfinance programs to renewable energy projects, these initiatives empower individuals and communities to build resilient economies and create positive social change, demonstrating the transformative potential of entrepreneurship in fostering inclusive and sustainable development.",
      comment: "lovely post", 
    }
 ]);
}
insertPostData();
module.exports = router;
