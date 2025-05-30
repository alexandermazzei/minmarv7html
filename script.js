// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function () {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when a link is clicked
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Set current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    const yearSpanAbout = document.getElementById('currentYearAbout'); // For about page or any other page
    if (yearSpanAbout) {
        yearSpanAbout.textContent = new Date().getFullYear();
    }
    
    // Contact Form (Basic structure, real submission needs server-side)
    const contactForm = document.getElementById('contact-us-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Basic validation example
            const emailInput = contactForm.querySelector('input[name="email"]');
            if (emailInput && (!emailInput.value || !emailInput.value.includes('@'))) {
                alert('Please enter a valid email address.');
                return;
            }
            const requiredInputs = contactForm.querySelectorAll('[required]');
            let formIsValid = true;
            requiredInputs.forEach(input => {
                if(!input.value.trim()){
                    formIsValid = false;
                    // You could add some visual indication for the user here
                    input.style.borderColor = 'red'; 
                } else {
                    input.style.borderColor = ''; // Reset border color
                }
            });

            if (!formIsValid) {
                alert('Please fill out all required fields.');
                return;
            }
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                const formContainer = contactForm.parentElement;
                contactForm.style.display = 'none';
                
                let successDiv = formContainer.querySelector('.submit-success-message');
                if (!successDiv) {
                    successDiv = document.createElement('div');
                    successDiv.className = 'submit-success-message bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6';
                    successDiv.innerHTML = `
                        <p class="font-medium">Thank you for your message!</p>
                        <p>We have received your inquiry and will get back to you shortly.</p>
                        <button class="mt-4 btn btn-outline" id="sendAnother">Send Another Message</button>
                    `;
                    formContainer.appendChild(successDiv);
                    document.getElementById('sendAnother').addEventListener('click', () => {
                        successDiv.remove();
                        contactForm.style.display = 'block';
                        contactForm.reset();
                        requiredInputs.forEach(input => input.style.borderColor = ''); // Reset borders
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    });
                } else {
                    successDiv.style.display = 'block';
                }
            }, 1000);
        });
    }

    // Care instructions tabs
    const careTabsContainer = document.querySelector('.care-tabs');
    if (careTabsContainer) {
        const careTabs = careTabsContainer.querySelectorAll('.care-tab');
        const careSections = document.querySelectorAll('.care-section');
        
        // Function to show a specific section and update tab states
        function showCareSection(indexToShow) {
            // Hide all sections and remove active class from all tabs
            careSections.forEach((section, index) => {
                if (index === indexToShow) {
                    section.style.display = 'block';
                    careTabs[index].classList.add('text-blue-600', 'border-blue-500');
                    careTabs[index].classList.remove('text-gray-600');
                } else {
                    section.style.display = 'none';
                    careTabs[index].classList.remove('text-blue-600', 'border-blue-500');
                    careTabs[index].classList.add('text-gray-600');
                }
            });
        }
        
        // Add click event listeners to tabs
        careTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                showCareSection(index);
            });
        });
        
        // Show first tab by default if no tab is active
        const hasActiveTab = Array.from(careTabs).some(tab => tab.classList.contains('active'));
        if (!hasActiveTab && careTabs.length > 0) {
            careTabs[0].classList.add('active');
            showCareSection(0);
        }

        // Function to show a specific section and update tab states
        function showCareSection(indexToShow) {
            careTabs.forEach((tab, index) => {
                if (index === indexToShow) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            careSections.forEach((section, index) => {
                if (index === indexToShow) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        }

        careTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                showCareSection(index);
            });
        });

        // Initially show the first tab/section if they exist
        if (careTabs.length > 0 && careSections.length > 0) {
            showCareSection(0);
        }
    }
});