document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")
  const themeToggle = document.querySelector(".theme-toggle")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active")
      themeToggle.classList.toggle("active")

      // Animate hamburger to X
      this.classList.toggle("active")
    })
  }


  document.addEventListener("DOMContentLoaded", function () {
    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");

    function setTheme(isDark) {
      if (isDark) {
        document.body.classList.add("dark");
        sunIcon.classList.add("hidden");
        moonIcon.classList.remove("hidden");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        sunIcon.classList.remove("hidden");
        moonIcon.classList.add("hidden");
        localStorage.setItem("theme", "light");
      }
    }

    // Check local storage for saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme(true);
    } else {
      setTheme(false);
    }

    // Toggle theme on click
    sunIcon.addEventListener("click", () => setTheme(true));
    moonIcon.addEventListener("click", () => setTheme(false));
  });






  // Dark/Light Mode Toggle
  const themeSwitch = document.getElementById("theme-switch")
  const themeToggleText = document.querySelector(".theme-toggle-text")

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  // Set initial theme based on saved preference or system preference
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark")
    if (themeSwitch) themeSwitch.checked = true
    if (themeToggleText) themeToggleText.textContent = "Dark"
  }

  // Theme switch event listener
  if (themeSwitch) {
    themeSwitch.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark")
        localStorage.setItem("theme", "dark")
        if (themeToggleText) themeToggleText.textContent = "Dark"
      } else {
        document.body.classList.remove("dark")
        localStorage.setItem("theme", "light")
        if (themeToggleText) themeToggleText.textContent = "Light"
      }
    })
  }

  // Auto-update copyright year
  const copyrightElement = document.getElementById("copyright")
  if (copyrightElement) {
    const currentYear = new Date().getFullYear()
    copyrightElement.textContent = `© 2018 - ${currentYear} Kagati Foundation. All rights reserved.`
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Here you would typically send the data to a server
      // For now, we'll just show an alert
      alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`)

      // Reset the form
      contactForm.reset()
    })
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add animation to cards when they come into view
  const animateOnScroll = () => {
    const cards = document.querySelectorAll(".card, .contributor-card, .project-card, .value-card, .team-member")

    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top
      const triggerBottom = window.innerHeight * 0.8

      if (cardTop < triggerBottom) {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animation
  document.querySelectorAll(".card, .contributor-card, .project-card, .value-card, .team-member").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)
})

