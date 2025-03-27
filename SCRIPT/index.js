document.addEventListener("DOMContentLoaded", function () {
  const facts = [
    "Honey never spoils!",
    "Bananas are berries, but strawberries aren't!",
    "Octopuses have three hearts!",
    "The Eiffel Tower can grow taller in summer!",
    "A day on Venus is longer than a year on Venus!",
    "In numerology, the number 8 is considered both powerful and karmic. Many successful Indian businesspeople, like Dhirubhai Ambani, had strong number 8 influences in their charts.",
    "The number 3 is linked to growth and expansion and is considered lucky for many Indians, as it is associated with Lord Vishnu and Jupiter (Guru) in astrology.",
    'Mangal Dosha (Mars affliction) in Vedic astrology is believed to affect marriages in India. Many people perform rituals like "Kumbh Vivah" to counteract its effects.',
    "Rahu and Ketu, the shadow planets in Indian astrology, have a strong influence on technology, AI, and digital advancements",
    "In Indian astrology, people born under the Kumbha Rashi (Aquarius) are believed to be futuristic thinkers, often excelling in science and innovation",

    "India's first AI-powered police station was set up in Kozhikode, Kerala, to enhance security and efficiency in policing.",
    "ISRO (Indian Space Research Organisation) used AI in Chandrayaan-3 to optimize lunar landing operations.",
    "Pune-based IISER (Indian Institute of Science Education and Research) has contributed significantly to quantum computing and AI research.",
    "India's first humanoid robot, Rashmi, was built using AI and NLP (natural language processing) in 2018.",
    "India is ranked among the top 10 countries in AI research, with numerous startups in AI emerging from Bengaluru, Pune, and Hyderabad.",

    "Pune is often called the 'Oxford of the East' due to its top-tier IT and engineering colleges.",
    "India's first supercomputer, PARAM 8000, was developed in 1991 by the Centre for Development of Advanced Computing (C-DAC), headquartered in Pune.",
    "Maharashtra has the highest number of software export zones in India, with IT hubs in Pune, Mumbai, and Nagpur.",
    "The Indian government has launched 'Digital India' initiatives, promoting AI, blockchain, and cloud computing adoption.",
    "Flipkart, India's e-commerce giant, uses AI extensively for customer recommendations and logistics optimization.",

    "The first Indian woman to win an Olympic medal, Karnam Malleswari, trained in Maharashtra before her victory in 2000.",
    "Shaniwar Wada, a famous fort in Pune, is rumored to be haunted and has historical significance from the Peshwa era.",
    "Pune has India's largest two-wheeler population per capita, making traffic a major issue in the city.",
    "Lavasa, India's first planned hill city, was developed near Pune but faced controversies regarding environmental concerns.",
    "Maharashtra has the highest number of UNESCO World Heritage Sites in India, including Ajanta & Ellora Caves, and the Chhatrapati Shivaji Terminus in Mumbai.",
  ];

  const factElement = document.getElementById("random-fact");
  function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * facts.length);
    factElement.textContent = facts[randomIndex];
  }
  showRandomFact();
  setInterval(showRandomFact, 9000);
});
