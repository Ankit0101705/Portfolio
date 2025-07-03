document.addEventListener('DOMContentLoaded', () => {

  // Sidebar Toggle (Show/Hide Contacts)

  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  const sidebarMore = document.querySelector('.sidebar-info_more');

  sidebarBtn.addEventListener('click', () => {
    sidebarMore.classList.toggle('active');
    sidebarBtn.querySelector('span').textContent = sidebarMore.classList.contains('active') ? 'Hide Contacts' : 'Show Contacts';
  });

  // Navbar Navigation (Page Switching)

  const navLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Remove active class from all nav links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked nav link
      link.classList.add('active');

      // Show the relevant page and hide others
      const targetPage = link.textContent.toLowerCase();
      pages.forEach(page => {
        page.classList.toggle('active', page.dataset.page === targetPage);
      });

      // Optional: Scroll to top after page switch
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Testimonials Modal (Open/Close)

  const testimonialItems = document.querySelectorAll('[data-testimonials-item]');
  const modalContainer = document.querySelector('[data-modal-container]');
  const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
  const modalImg = document.querySelector('[data-modal-img]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalText = document.querySelector('[data-modal-text]');

  testimonialItems.forEach(item => {
    item.addEventListener('click', () => {
      const avatarSrc = item.querySelector('[data-testimonials-avatar]').src;
      const titleText = item.querySelector('[data-testimonials-title]').textContent;
      const testimonialHTML = item.querySelector('[data-testimonials-text]').innerHTML;

      modalImg.src = avatarSrc;
      modalTitle.textContent = titleText;
      modalText.innerHTML = testimonialHTML;

      modalContainer.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scroll while modal is open
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    modalContainer.classList.remove('active');
    document.body.style.overflow = '';
  });

  document.querySelector('[data-overlay]').addEventListener('click', () => {
    modalContainer.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Project Filter Select Box (Dropdown & Filtering)

  const filterSelectBtn = document.querySelector('[data-select]');
  const filterSelectValue = document.querySelector('[data-select-value]');
  const projectItems = document.querySelectorAll('[data-filter-item]');

  // Create filter options dynamically
  const categories = ['all', 'web development', 'web design', 'applications', 'development'];

  let dropdown = document.createElement('ul');
  dropdown.classList.add('filter-options');

  categories.forEach(cat => {
    let li = document.createElement('li');
    li.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    li.dataset.category = cat;
    dropdown.appendChild(li);
  });

  filterSelectBtn.after(dropdown);

  // Style dropdown (you can move this CSS to your stylesheet)
  Object.assign(dropdown.style, {
    position: 'absolute',
    background: '#fff',
    border: '1px solid #ddd',
    padding: '0',
    margin: '0',
    listStyle: 'none',
    width: filterSelectBtn.offsetWidth + 'px',
    maxHeight: '150px',
    overflowY: 'auto',
    display: 'none',
    zIndex: 1000,
  });

  filterSelectBtn.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    filterSelectBtn.classList.toggle('active');
  });

  dropdown.querySelectorAll('li').forEach(option => {
    option.style.padding = '8px 12px';
    option.style.cursor = 'pointer';
    option.addEventListener('click', () => {
      filterSelectValue.textContent = option.textContent;
      dropdown.style.display = 'none';
      filterSelectBtn.classList.remove('active');

      const selectedCategory = option.dataset.category;

      projectItems.forEach(item => {
        if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
          item.style.display = '';
          item.classList.add('active');
        } else {
          item.style.display = 'none';
          item.classList.remove('active');
        }
      });
    });
  });

  // Close dropdown if clicking outside
  document.addEventListener('click', e => {
    if (!filterSelectBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
      filterSelectBtn.classList.remove('active');
    }
  });

  //  Smooth Horizontal Scrolling for Testimonials & Clients

  function enableHorizontalScroll(selector) {
    const container = document.querySelector(selector);
    if (!container) return;
    container.addEventListener('wheel', e => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY + e.deltaX;
    });
  }

  enableHorizontalScroll('.testimonials-list');
  enableHorizontalScroll('.clients-list');

  // Contact Form Validation & Submit Button Enabling

  const form = document.querySelector('[data-form]');
  const inputs = form.querySelectorAll('[data-form-input]');
  const submitBtn = form.querySelector('[data-form-btn]');

  function checkFormValidity() {
    const allValid = Array.from(inputs).every(input => input.checkValidity());
    submitBtn.disabled = !allValid;
  }

  inputs.forEach(input => {
    input.addEventListener('input', checkFormValidity);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
    submitBtn.disabled = true;
  });

  // Initial check to disable submit button on page load
  checkFormValidity();
});
