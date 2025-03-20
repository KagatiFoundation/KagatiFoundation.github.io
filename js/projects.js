
document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.querySelector(".projects");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Fetch JSON data and render projects
  async function loadProjects() {
    try {
      const response = await fetch("assets/data/project-data.js");
      const projects = await response.json();
      displayProjects(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  function displayProjects(projects) {
    projectsContainer.innerHTML = "";

    projects.forEach(project => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      projectCard.setAttribute("data-category", project.category);

      projectCard.innerHTML = `
              <div class="card-content">
                  <div class="project-header">
                      <h3 class="gradient-text">${project.name}</h3>
                      <span class="category-tag">${capitalize(project.category)}</span>
                  </div>
                  <p>${project.description}</p>
                  <div class="project-stats">
                      <div class="stat">
                          <span class="stat-number">${project.contributors}</span>
                          <span class="stat-label">Contributors</span>
                      </div>
                      <div class="stat">
                          <span class="stat-number">${project.stars}</span>
                          <span class="stat-label">Stars</span>
                      </div>
                  </div>
                  <div class="project-links">
                      <a href="${project.links.contribute}" class="project-btn">Contribute</a>
                      <a href="${project.links.docs}" class="project-btn">Documentation</a>
                      <a href="${project.links.demo}" class="project-btn primary">Live Demo</a>
                  </div>
              </div>
          `;

      projectsContainer.appendChild(projectCard);
    });
  }

  // Category filtering
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterProjects(filter);
      document.querySelector(".filter-btn.active").classList.remove("active");
      button.classList.add("active");
    });
  });

  function filterProjects(filter) {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  loadProjects();
});


