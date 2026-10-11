/**
 * Portofolio Digital - Interaktivitas & Navigasi Responsif
 * Frontend Developer & Software Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. NAVIGASI HAMBURGER MOBILE ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  if (hamburgerBtn && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    const closeMenu = () => {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    };

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Tutup menu saat salah satu link diklik
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Tutup menu saat pengguna mengklik di luar area menu
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeMenu();
      }
    });

    // Tutup menu saat menekan tombol Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // --- 2. NAVBAR SCROLL EFFECT ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 3. SCROLLSPY / ACTIVE NAV LINK ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);

  // --- 4. TOAST NOTIFICATION SISTEM ---
  const toast = document.getElementById('toast');
  let toastTimeout;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // --- 5. PLACEHOLDER BUTTON HANDLER ---
  const placeholderBtns = document.querySelectorAll('.placeholder-btn');
  placeholderBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const info = btn.getAttribute('data-info') || 'Tautan ini belum diisi.';
      showToast(info);
    });
  });

  // --- 6. SALIN INFO KONTAK ---
  const copyBtns = document.querySelectorAll('.btn-copy-info');
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy && !textToCopy.includes('Belum diisi')) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Email berhasil disalin ke clipboard!');
        }).catch(() => {
          showToast('Gagal menyalin teks.');
        });
      } else {
        showToast('Informasi kontak ini belum diisi.');
      }
    });
  });

  // --- 7. FORM SUBMIT HANDLER ---
  const contactForm = document.getElementById('contact-form');
  const formNotice = document.getElementById('form-notice');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const senderName = nameInput ? nameInput.value : 'Pengirim';

      if (formNotice) {
        formNotice.textContent = `Terima kasih, ${senderName}! Pesan Anda telah dicatat (Simulasi Formulir).`;
        formNotice.style.color = '#10b981';
      }

      showToast('Pesan formulir terkirim (Demo).');
      contactForm.reset();

      setTimeout(() => {
        if (formNotice) formNotice.textContent = '';
      }, 5000);
    });
  }
});
