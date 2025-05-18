/**
 * Elegance Nail Salon - Form JavaScript
 * Handles form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // DOM Elements
    const bookingForm = document.getElementById('booking-form');
    const formResponse = document.getElementById('form-response');
    const inputFields = bookingForm.querySelectorAll('input, select, textarea');

    /**
     * Initialize form validation and submission
     */
    function initForm() {
        // Add validation events to input fields
        inputFields.forEach(field => {
            if (field.hasAttribute('required')) {
                field.addEventListener('blur', validateField);
                field.addEventListener('input', clearError);
            }
        });

        // Form submission handler
        bookingForm.addEventListener('submit', handleFormSubmit);

        // Set minimum date for the date picker (today)
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            dateInput.setAttribute('min', formattedDate);
        }
    }

    /**
     * Validate a single form field
     * @param {Event} e - The blur event
     */
    function validateField(e) {
        const field = e.target;
        const fieldType = field.type;
        const fieldValue = field.value.trim();
        const fieldName = field.name;
        const errorElement = field.nextElementSibling;
        
        // Skip validation if field is not required or has no error element
        if (!field.hasAttribute('required') || !errorElement) return;
        
        // Clear any existing error
        clearErrorForField(field);
        
        // Validate based on field type
        switch (fieldType) {
            case 'text':
                if (fieldName === 'name' && fieldValue.length < 2) {
                    showError(field, 'Please enter your full name');
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(fieldValue)) {
                    showError(field, 'Please enter a valid email address');
                }
                break;
                
            case 'tel':
                const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if (!phoneRegex.test(fieldValue)) {
                    showError(field, 'Please enter a valid phone number');
                }
                break;
                
            case 'date':
                if (!fieldValue) {
                    showError(field, 'Please select a date');
                } else {
                    const selectedDate = new Date(fieldValue);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (selectedDate < today) {
                        showError(field, 'Please select a future date');
                    }
                }
                break;
                
            case 'time':
                if (!fieldValue) {
                    showError(field, 'Please select a time');
                }
                break;
                
            case 'select-one':
                if (!fieldValue) {
                    showError(field, 'Please select an option');
                }
                break;
        }
    }

    /**
     * Show error message for a field
     * @param {Element} field - The form field
     * @param {string} message - The error message
     */
    function showError(field, message) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            field.classList.add('error');
        }
    }

    /**
     * Clear error when user starts typing
     * @param {Event} e - The input event
     */
    function clearError(e) {
        clearErrorForField(e.target);
    }

    /**
     * Clear error for a specific field
     * @param {Element} field - The form field
     */
    function clearErrorForField(field) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            field.classList.remove('error');
        }
    }

    /**
     * Validate all required form fields
     * @returns {boolean} - Whether the form is valid
     */
    function validateForm() {
        let isValid = true;
        
        // Trigger validation for each required field
        const requiredFields = bookingForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            // Create a blur event to trigger validation
            const event = new Event('blur');
            field.dispatchEvent(event);
            
            // Check if field has error
            const errorElement = field.nextElementSibling;
            if (
                errorElement && 
                errorElement.classList.contains('error-message') && 
                errorElement.textContent
            ) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    /**
     * Handle form submission
     * @param {Event} e - The submit event
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isValid = validateForm();
        
        if (isValid) {
            // Simulate form submission
            simulateFormSubmission();
        } else {
            // Scroll to the first error
            const firstError = bookingForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    /**
     * Simulate form submission (since we don't have a backend)
     */
    function simulateFormSubmission() {
        // Show loading state
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';
        
        // Simulate network request
        setTimeout(() => {
            // Reset form and show success message
            bookingForm.reset();
            
            // Show success message
            formResponse.textContent = 'Thank you for your booking request! We will contact you shortly to confirm your appointment.';
            formResponse.className = 'form-response success';
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            // Scroll to response message
            formResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 8 seconds
            setTimeout(() => {
                formResponse.style.display = 'none';
            }, 8000);
        }, 1500);
    }

    // Initialize form functionality
    initForm();
});
