// document.addEventListener("DOMContentLoaded", () => {
//   // Set animation delay for each card
//   const projectCards = document.querySelectorAll(".project-card")
//   projectCards.forEach((card, index) => {
//     card.style.setProperty("--card-index", index)
//   })

//   // Project filtering
//   const filterButtons = document.querySelectorAll(".filter-buttons .glass-btn")
//   //const projectCards = document.querySelectorAll(".project-card") // Removed duplicate declaration

//   filterButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       // Remove active class from all buttons
//       filterButtons.forEach((btn) => btn.classList.remove("active"))
//       // Add active class to clicked button
//       button.classList.add("active")

//       const filter = button.getAttribute("data-filter")

//       // Filter the projects
//       filterProjects(filter)
//     })
//   })

//   function filterProjects(filter) {
//     const projectCards = document.querySelectorAll(".project-card")

//     projectCards.forEach((card, index) => {
//       // Reset animation
//       card.style.opacity = "0"
//       card.style.transform = "translateY(30px)"

//       setTimeout(() => {
//         if (filter === "all" || card.getAttribute("data-category") === filter) {
//           card.style.display = "block"
//           // Re-trigger animation with new delay
//           setTimeout(() => {
//             card.style.opacity = "1"
//             card.style.transform = "translateY(0)"
//           }, index * 100)
//         } else {
//           card.style.display = "none"
//         }
//       }, 300)
//     })
//   }

//   // Animate cards on scroll
//   const animateOnScroll = () => {
//     const cards = document.querySelectorAll(".project-card")

//     cards.forEach((card, index) => {
//       const cardTop = card.getBoundingClientRect().top
//       const triggerBottom = window.innerHeight * 0.8

//       if (cardTop < triggerBottom) {
//         setTimeout(() => {
//           card.style.opacity = "1"
//           card.style.transform = "translateY(0)"
//         }, index * 100)
//       }
//     })
//   }

//   // Run animation on load and scroll
//   window.addEventListener("load", animateOnScroll)
//   window.addEventListener("scroll", animateOnScroll)

//   // Parallax effect for hero background
//   window.addEventListener("scroll", () => {
//     const scrolled = window.pageYOffset
//     const heroBackground = document.querySelector(".hero-background")
//     if (heroBackground) {
//       heroBackground.style.backgroundPositionY = `${scrolled * 0.5}px`
//     }
//   })

//   // Add hover effect to project cards
//   projectCards.forEach((card) => {
//     card.addEventListener("mouseenter", function () {
//       this.style.transform = "translateY(-10px) scale(1.02)"
//       this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.3)"
//       this.style.borderColor = "rgba(255, 215, 0, 0.3)"
//     })

//     card.addEventListener("mouseleave", function () {
//       this.style.transform = "translateY(0) scale(1)"
//       this.style.boxShadow = "none"
//       this.style.borderColor = "rgba(255, 255, 255, 0.2)"
//     })
//   })

//   // Add pulse animation to primary buttons
//   const primaryButtons = document.querySelectorAll(".project-btn.primary")
//   primaryButtons.forEach((button) => {
//     button.addEventListener("mouseenter", function () {
//       this.style.animation = "pulse 1.5s infinite"
//     })

//     button.addEventListener("mouseleave", function () {
//       this.style.animation = "none"
//     })
//   })
// })





document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.querySelector(".projects");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Fetch JSON data and render projects
  async function loadProjects() {
    try {
      const response = await fetch("assets/data/project-data.json");
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


