const https = require('https');

const query = 'YourSearchTerm'; // Replace 'YourSearchTerm' with your desired search term

const options = {
  method: 'GET',
  hostname: 'house-plants2.p.rapidapi.com',
  port: null,
  path: `/search?query=${query}`,
  headers: {
    'X-RapidAPI-Key': '02519f1268msh504c0807dc34ec3p13dbedjsnee23f748189c',
    'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
  }
};

const req = https.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function () {
    const body = Buffer.concat(chunks);
    const responseData = JSON.parse(body.toString());

    // Parse and process the API response
    const plants = responseData.results; // Adjust based on the actual response structure
    // Extract necessary information from each plant object
    const plantData = plants.map((plant) => ({
      name: plant.name,
      image: plant.image_url,
      description: plant.description,
    }));

    // Create HTML elements dynamically
    const galleryContainer = document.getElementById('gallery');

    plantData.forEach((plant) => {
      // Create plant card element
      const card = document.createElement('div');
      card.classList.add('plant-card');

      // Create plant image element
      const image = document.createElement('img');
      image.src = plant.image;
      card.appendChild(image);

      // Create plant name element
      const name = document.createElement('h3');
      name.textContent = plant.name;
      card.appendChild(name);

      // Create plant description element
      const description = document.createElement('p');
      description.textContent = plant.description;
      card.appendChild(description);

      // Append the plant card to the gallery container
      galleryContainer.appendChild(card);
    });
  });
});

req.on('error', function (error) {
  console.error(error);
});

req.end();


