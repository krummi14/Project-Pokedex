<img src="./assets/icon/pokeball_blackWhite.png" alt="Pokeball Icon" width="200px"/>
<h1>Pokedex – A Pokémon Trainer Registry</h1>

<p>
Welcome to the <strong>Pokedex web application</strong>, a project designed to display a dynamic registry of Pokémon. 
The application uses external APIs to fetch Pokémon data and render it efficiently in the browser. 
The goal is to create a lightweight, compatible, and extensible system that follows modern web development principles.
</p>

<hr>

<h2>✨ Features</h2>
<ul>
  <li>Dynamic loading of <strong>20–40 Pokémon</strong> on initial page load</li>
  <li>Performance‑optimized <strong>Lazy Loading</strong></li>
  <li>Implementation of the <strong>Fetch‑then‑Render</strong> pattern</li>
  <li><strong>Caching</strong> to reduce unnecessary API requests</li>
  <li>A button to <strong>load 20 additional Pokémon</strong> at a time</li>
  <li>Uses an external API to retrieve Pokémon attributes</li>
  <li>Built entirely with <strong>HTML, CSS, and JavaScript</strong></li>
  <li>No frameworks required</li>
</ul>

<hr>

<h2>🧩 Technologies</h2>

<table>
  <tr>
    <th>Area</th>
    <th>Technology</th>
  </tr>
  <tr>
    <td>Structure</td>
    <td>HTML</td>
  </tr>
  <tr>
    <td>Styling</td>
    <td>CSS</td>
  </tr>
  <tr>
    <td>Logic & API Handling</td>
    <td>JavaScript</td>
  </tr>
  <tr>
    <td>Data Source</td>
    <td>External PokéAPI, https://pokeapi.co/</td>
  </tr>
</table>

<hr>

<h2>📦 Installation & Usage</h2>

<ol>
  <li>Download or clone the repository:
    <pre><code>git clone &lt;repository-url&gt;</code></pre>
  </li>
  <li>Ensure that <strong>all required files</strong> are included:
    <ul>
      <li><code>assets/</code></li>
      <li><code>scripts/</code></li>
      <li><code>styles/</code></li>
      <li>HTML file</li>
    </ul>
  </li>
  <li>Open the <code>index.html</code> file in your browser.</li>
  <li>The application will automatically load the first set of Pokémon. Use the button to load more.</li>
</ol>

<hr>

<h2>🛠️ How It Works</h2>

<h3>API Integration</h3>
<p>
The application fetches Pokémon data from an external API and processes it in several steps:
</p>
<ul>
  <li><strong>Fetch:</strong> Data is loaded asynchronously</li>
  <li><strong>Cache:</strong> Already loaded Pokémon are stored to avoid repeated requests</li>
  <li><strong>Render:</strong> Pokémon cards are dynamically inserted into the DOM</li>
</ul>

<h3>Lazy Loading</h3>
<p>
Pokémon are loaded only when needed, improving performance and reducing API load.
</p>

<h3>Load More Button</h3>
<p>
Each click loads <strong>20 additional Pokémon</strong> and renders them on the page.
</p>

<hr>

<h2>📁 Project Structure</h2>

<pre><code>
/assets        → Images, icons, fonts and static files
/scripts       → JavaScript files (API, rendering, caching)
/styles        → CSS files
index.html     → Entry point of the application
README.md      → Project documentation
LICENSE        → License documentation
</code></pre>

<hr>

<h2>🚀 Project Purpose</h2>

<p>
This project serves as a practical exercise and demonstration of:
</p>

<ul>
  <li>Frontend API integration</li>
  <li>Performance optimization using Lazy Loading & Caching</li>
  <li>DOM manipulation with vanilla JavaScript</li>
  <li>Structuring small‑scale web applications</li>
</ul>
