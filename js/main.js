document.addEventListener('DOMContentLoaded', () => {
    // --- FAQ ACCORDION LOGIC ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-question');
        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close other FAQ items for clean look
            document.querySelectorAll('.faq-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            if (!isOpen) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // --- CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById('hit-contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop actual submit
            
            // Get values
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const service = document.getElementById('form-service').value;
            const message = document.getElementById('form-message').value.trim();
            
            // Simple validation flag
            let isValid = true;
            
            // Remove previous error alerts
            document.querySelectorAll('.form-group .error-msg').forEach(el => el.remove());
            document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
                el.classList.remove('error-field');
            });

            // Validation Helper
            const showError = (fieldId, message) => {
                isValid = false;
                const field = document.getElementById(fieldId);
                field.classList.add('error-field');
                
                const errEl = document.createElement('span');
                errEl.className = 'error-msg';
                errEl.style.color = '#ff6b6b';
                errEl.style.fontSize = '0.78rem';
                errEl.style.marginTop = '0.35rem';
                errEl.style.display = 'block';
                errEl.innerText = message;
                
                field.parentElement.appendChild(errEl);
            };

            // Checks
            if (!name) showError('form-name', 'Name is required');
            
            if (!email) {
                showError('form-email', 'Email is required');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('form-email', 'Please enter a valid email address');
            }
            
            if (phone && !/^[0-9+\s-]{8,15}$/.test(phone)) {
                showError('form-phone', 'Please enter a valid phone number');
            }

            if (!service) showError('form-service', 'Please select a service or interest area');
            if (!message) showError('form-message', 'Message is required');
            
            if (isValid) {
                // Submit animation/loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const origText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending Message... <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 31.4" fill="none"></circle></svg>';
                
                // Simulate netlify backend latency (1.2 seconds)
                setTimeout(() => {
                    // Create overlay success message
                    const successModal = document.createElement('div');
                    successModal.className = 'success-modal';
                    successModal.style.position = 'fixed';
                    successModal.style.inset = '0';
                    successModal.style.backgroundColor = 'rgba(3, 36, 34, 0.9)';
                    successModal.style.display = 'flex';
                    successModal.style.alignItems = 'center';
                    successModal.style.justifyContent = 'center';
                    successModal.style.zIndex = '1100';
                    successModal.style.opacity = '0';
                    successModal.style.transition = 'opacity 0.4s ease';
                    
                    successModal.innerHTML = `
                        <div class="success-card reveal reveal-scale" style="background-color: var(--color-white); border-radius: var(--radius-md); padding: 3rem; max-width: 500px; width: 90%; text-align: center; box-shadow: var(--shadow-lg);">
                            <div style="width: 72px; height: 72px; background-color: var(--color-accent); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-dark)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">Message Received!</h3>
                            <p style="color: var(--color-muted); margin-bottom: 2rem;">Thank you for contacting HIT Integrated Technologies. Our specialists will review your inquiry and reach out within 24 business hours.</p>
                            <button id="close-success-btn" class="btn btn-dark" style="width: 100%;">Return to Site</button>
                        </div>
                    `;
                    
                    document.body.appendChild(successModal);
                    
                    // Show modal
                    setTimeout(() => {
                        successModal.style.opacity = '1';
                        successModal.querySelector('.success-card').classList.add('visible');
                    }, 50);
                    
                    // Reset Button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = origText;
                    
                    // Reset Form
                    contactForm.reset();
                    
                    // Close listener
                    document.getElementById('close-success-btn').addEventListener('click', () => {
                        successModal.style.opacity = '0';
                        setTimeout(() => successModal.remove(), 400);
                    });
                }, 1200);
            }
        });
    }

    // Add spinner style to document body once
    const spinStyle = document.createElement('style');
    spinStyle.innerHTML = `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .error-field { border-color: #ff6b6b !important; background-color: rgba(255, 107, 107, 0.02) !important; }
    `;
    document.head.appendChild(spinStyle);
});
