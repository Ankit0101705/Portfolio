document.addEventListener("DOMContentLoaded", () => {
  // SIDEBAR TOGGLE
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
    });
  }

  // NAVBAR PAGE SWITCHING
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("article[data-page]");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      const targetPage = link.textContent.trim().toLowerCase();
      pages.forEach(page => {
        if (page.getAttribute("data-page") === targetPage) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });
      // Mobile: close sidebar after navigation
      if (window.innerWidth < 992 && sidebar && sidebarBtn) {
        sidebar.classList.remove("active");
        sidebarBtn.classList.remove("active");
      }
      // Scroll to top after switching page
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Close dropdown on outside click
  document.addEventListener("click", e => {
    if (!filterSelect.contains(e.target)) {
      filterSelect.classList.remove("open");
    }
  });
});

// BLOG 
document.addEventListener('DOMContentLoaded', () => {
  const allPosts = Array.from(document.querySelectorAll('.blog-post-item'));

  const now = new Date();
  const newPostsContainer = document.querySelector('.blog-posts-list-new');
  const oldPostsContainer = document.querySelector('.blog-posts-list-old');

  if (!newPostsContainer || !oldPostsContainer) return;

  // Separate posts into new (date >= now) and old (date < now)
  const newPosts = [];
  const oldPosts = [];

  allPosts.forEach(post => {
    const postDateStr = post.querySelector('time').getAttribute('datetime');
    const postDate = new Date(postDateStr);

    if (postDate >= now) newPosts.push(post);
    else oldPosts.push(post);
  });

  // Sort new posts descending (newest first)
  newPosts.sort((a, b) => new Date(b.querySelector('time').getAttribute('datetime')) - new Date(a.querySelector('time').getAttribute('datetime')));

  // Sort old posts ascending (oldest first)
  oldPosts.sort((a, b) => new Date(a.querySelector('time').getAttribute('datetime')) - new Date(b.querySelector('time').getAttribute('datetime')));

  // Clear containers and append sorted posts
  newPostsContainer.innerHTML = '';
  oldPostsContainer.innerHTML = '';

  newPosts.forEach(post => newPostsContainer.appendChild(post));
  oldPosts.forEach(post => oldPostsContainer.appendChild(post));
});

// CONTACT FORM VALIDATION & SUBMISSION
const form = document.querySelector("[data-form]");
const formBtn = form ? form.querySelector("[data-form-btn]") : null;
const formInputs = form ? form.querySelectorAll("[data-form-input]") : [];

if (form && formInputs.length && formBtn) {
  // Validate form fields
  const validateForm = () => {
    let isValid = true;

    formInputs.forEach(input => {
      // Required field check
      if (input.hasAttribute("required") && !input.value.trim()) {
        isValid = false;
        return;
      }

      // Email validation
      if (input.type === "email" && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          isValid = false;
          return;
        }
      }
    });

    formBtn.disabled = !isValid;
  };

  // Add input event listeners to validate on typing
  formInputs.forEach(input => {
    input.addEventListener("input", validateForm);
  });

  // Phone input: only allow digits
  const phoneInput = form.querySelector('input[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '');
      validateForm();  // revalidate form on phone input change
    });
  }

  // On form submit
  form.addEventListener("submit", e => {
    e.preventDefault();
    formBtn.disabled = true;
    formBtn.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon> <span>Message Sent!</span>';

    // Simulate message sent delay
    setTimeout(() => {
      form.reset();
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon> <span>Send Message</span>';
      formBtn.disabled = true; // disable submit after reset until form is valid again
    }, 2000);
  });

  // Initial validation on page load
  validateForm();
}

// SMOOTH SCROLL FOR INTERNAL LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
