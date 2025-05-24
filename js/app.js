const charactersDiv = document.getElementById('characters');
const dropdownLinks = document.querySelectorAll('.dropdown-content a');

function fetchAndDisplayCharacters(house) {
  fetch('https://hp-api.onrender.com/api/characters')
    .then(res => res.json())
    .then(data => {
      let filtered = data;
      if (house !== 'All') {
        filtered = data.filter(char => char.house === house);
      }

      filtered = filtered.slice(0, 16);

      charactersDiv.innerHTML = filtered.map(char => `
        <div class="character-card">
          <img src="${char.image || 'images/notFound.png'}" alt="${char.name}" onerror="this.src='images/notFound.png'">
          <div class="character-info">
            <h3>${char.name}</h3>
            <p><strong>House:</strong> ${char.house || 'Unknown'}</p>
            <p><strong>Birth:</strong> ${char.dateOfBirth || 'Unknown'}</p>
          </div>
        </div>
      `).join('');
    })
    .catch(err => console.error(err));
}

fetchAndDisplayCharacters('All');

dropdownLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedHouse = link.getAttribute('data-house');
    fetchAndDisplayCharacters(selectedHouse);
  });
});
