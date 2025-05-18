
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
  
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      // Transform hamburger to X
      const hamburger = document.querySelector('.hamburger');
      hamburger.classList.toggle('active');
      if (hamburger.classList.contains('active')) {
        hamburger.style.transform = 'rotate(45deg)';
        hamburger.style.backgroundColor = 'transparent';
      } else {
        hamburger.style.transform = 'rotate(0)';
        hamburger.style.backgroundColor = 'var(--dark)';
      }
    });
  
    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const hamburger = document.querySelector('.hamburger');
        hamburger.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
        hamburger.style.backgroundColor = 'var(--dark)';
      });
    });
  
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
  
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  
    // Testimonial slider functionality
    // const testimonials = document.querySelectorAll('.testimonial');
    // const dots = document.querySelectorAll('.dot');
    // const prevBtn = document.querySelector('.prev-btn');
    // const nextBtn = document.querySelector('.next-btn');
    // let currentTestimonialIndex = 0;
  
    // Function to show a specific testimonial
    // function showTestimonial(index) {
    //   testimonials.forEach((testimonial, i) => {
    //     testimonial.classList.remove('active');
    //     if (i === index) {
    //       testimonial.classList.add('active');
    //     }
    //   });
      
    //   dots.forEach((dot, i) => {
    //     dot.classList.remove('active');
    //     if (i === index) {
    //       dot.classList.add('active');
    //     }
    //   });
      
    //   currentTestimonialIndex = index;
    // }
  
    // // Next button click
    // nextBtn.addEventListener('click', function() {
    //   if (currentTestimonialIndex < testimonials.length - 1) {
    //     showTestimonial(currentTestimonialIndex + 1);
    //   } else {
    //     showTestimonial(0);
    //   }
    // });
  
    // // Previous button click
    // prevBtn.addEventListener('click', function() {
    //   if (currentTestimonialIndex > 0) {
    //     showTestimonial(currentTestimonialIndex - 1);
    //   } else {
    //     showTestimonial(testimonials.length - 1);
    //   }
    // });
  
    // // Dot click
    // dots.forEach((dot, index) => {
    //   dot.addEventListener('click', function() {
    //     showTestimonial(index);
    //   });
    // });
  
    // // Auto slide testimonials
    // setInterval(function() {
    //   if (currentTestimonialIndex < testimonials.length - 1) {
    //     showTestimonial(currentTestimonialIndex + 1);
    //   } else {
    //     showTestimonial(0);
    //   }
    // }, 5000);
  
    // Form submission handling
    const contactForm = document.getElementById('website-request-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
      
        // Get form data
        const formData = {
          name: document.getElementById('name').value,
          organization: document.getElementById('organization').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          message: document.getElementById('message').value
        };
        fetch('https://techlift-4.onrender.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (response.ok) {
            alert('Thank you for your interest! We will contact you shortly.');
            contactForm.reset();
          } else {
            alert('There was a problem submitting your request.');
          }
        });
        
        // In a real application, you would send this data to a server
        console.log('Form submitted with data:', formData);
        
        // Show success message (in a real app, show after server confirms)
        alert('Thank you for your interest! We will contact you shortly.');
        
        // Reset form
        contactForm.reset();
      });
    }
    
  
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        console.log('Newsletter signup:', email);
        
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
      });
    }
  
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Add animation to elements when they come into view
    const fadeElements = document.querySelectorAll('.card, .feature');
    
    const fadeOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, fadeOptions);
    
    fadeElements.forEach(element => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      fadeObserver.observe(element);
    });
  });