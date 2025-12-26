// 1. Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if(menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change icon from hamburger (bars) to X (times)
        if (navLinks.classList.contains('active')) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// 2. Typing Animation Logic
const typeText = document.querySelector('.typing-text');
const textArray = ["Frontend Developer", "React Enthusiast", "Web Designer", "Tech Learner"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if(!typeText) return; // Safety check

    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typeText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // Speed Control (Randomized slightly for realism)
    let typeSpeed = isDeleting ? 100 : 150;

    // If word is complete
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length; // Move to next word
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start animation on load
document.addEventListener("DOMContentLoaded", type);

// 3. Navbar Sticky on Scroll
window.addEventListener("scroll", function(){
    const navbar = document.querySelector(".navbar");
    if(navbar) {
        // Adds 'sticky' class when scrolled down 20px
        navbar.classList.toggle("sticky", window.scrollY > 20);
    }
});

// 4. Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu when a link is clicked
        if(navLinks) {
            navLinks.classList.remove('active');
            if(menuBtn) menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});