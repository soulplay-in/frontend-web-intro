// Navigation functionality
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = formatNumber(target);
      clearInterval(timer);
    } else {
      element.textContent = formatNumber(Math.floor(start));
    }
  }, 16);
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate");

      // Animate counters when hero section is visible
      if (entry.target.classList.contains("hero")) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
      }
    }
  });
}, observerOptions);

// Observe elements with animation attributes
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("[data-aos]");
  const heroSection = document.querySelector(".hero");

  animatedElements.forEach((el) => observer.observe(el));
  if (heroSection) observer.observe(heroSection);
});

// Parallax effect for floating elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-element");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Add hover effects to feature cards
const featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Add click effects to buttons
const buttons = document.querySelectorAll(".btn, .download-btn");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger hero animations
  setTimeout(() => {
    const heroElements = document.querySelectorAll(
      ".hero .title-line, .hero-subtitle, .hero-buttons, .hero-stats, .hero-visual",
    );
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, index * 200);
    });
  }, 300);
});

// Add scroll progress indicator
const scrollProgress = document.createElement("div");
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #3B82F6, #10B981);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";
});

// Add performance optimization for scroll events
let ticking = false;

function updateScrollEffects() {
  const scrolled = window.pageYOffset;

  // Update navbar
  if (scrolled > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update parallax elements
  const parallaxElements = document.querySelectorAll(".floating-element");
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });

  // Update scroll progress
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrolled / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
});

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg activated
    document.body.style.animation = "rainbow 2s infinite";
    setTimeout(() => {
      document.body.style.animation = "";
    }, 5000);

    // Add rainbow animation
    const rainbowStyle = document.createElement("style");
    rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
    document.head.appendChild(rainbowStyle);

    konamiCode = [];
  }
});
