# Elegance Nail Salon Website

A modern, elegant static website for a nail salon that provides a visually engaging online presence with responsive design and interactive user experience.

## Website Overview

The Elegance Nail Salon website is a professional, static HTML website designed to showcase nail salon services, gallery, about information, and booking capabilities. The site features modern design elements including:

- Responsive layout for mobile, tablet, and desktop
- Interactive button effects and animations
- Image gallery with filtering and lightbox
- Contact form with validation
- Service showcase with pricing
- Testimonials section
- Team member profiles
- About page with company history

## File Structure

- **HTML Files**: Main website pages
  - `index.html` - Homepage
  - `services.html` - Services and pricing
  - `gallery.html` - Portfolio and nail design gallery
  - `about.html` - About the salon and team
  - `booking.html` - Appointment booking form

- **CSS Files**: Styling components
  - `styles.css` - Main styles and variables
  - `responsive.css` - Mobile and tablet adaptations
  - `pages.css` - Page-specific styles
  - `glossy.css` - Glossy UI elements
  - `paint-effects.css` - Paint splash effects
  - `improved-button-effects.css` - Enhanced button interactions
  - `mobile-buttons.css` - Mobile button optimizations
  - `fix-mobile.css` - Mobile display fixes
  - `clean-design.css` - Clean UI components
  - `simple-wave-dividers.css` - Wave section dividers
  - `elegant-footer.css` - Footer styling
  - `nav-logo.css` - Navigation and logo styling
  - `back-to-top.css` - Back to top button
  - `nav-interactions.css` - Navigation interactions
  - `images-fix.css` - Image display fixes

- **JavaScript Files**: Interactive functionality
  - `main.js` - Core functionality (navigation, animations)
  - `improved-button-effects.js` - Button paint effects
  - `nav-interactions.js` - Navigation micro-interactions
  - `form.js` - Form validation and submission
  - `gallery.js` - Gallery filtering and lightbox

- **Assets Directory**:
  - `images/` - All website images
  - `square-logo.svg` - Square logo SVG
  - `logo.svg` - Main logo SVG

## How to Customize

### Changing Color Scheme

1. Open `css/styles.css`
2. Locate the `:root` element near the top (around line 18)
3. Modify color variables to match your desired color scheme:
   ```css
   :root {
       --primary-color: #F8C3C8; /* Main pink color */
       --accent-color: #D4AF37; /* Gold accent */
       /* Other color variables */
   }
   ```

### Modifying Content

1. **Changing Text**: Edit the HTML files directly to update headlines, descriptions, and content.

2. **Replacing Images**: 
   - Place new images in the `assets/images/` directory
   - Update image paths in HTML files
   - Maintain the same aspect ratios for best results
   - Use WebP format images for optimal performance

3. **Updating Services**:
   - Edit the services section in `services.html`
   - Update prices, descriptions, and service categories

4. **Modifying Gallery**:
   - Add new images to `assets/images/`
   - Update the gallery items in `gallery.html`
   - Ensure new images have proper alt text for accessibility

5. **Changing Contact Info**:
   - Update address, phone, email in `about.html` and footer sections

### Adding New Pages

1. Copy an existing HTML file as a template
2. Update the page title, meta description, and content
3. Add navigation link in the header section of all pages

## Technical Features

### Responsive Design
- Mobile-first approach with media queries
- Flexible grid layouts
- Optimized images for different screen sizes

### Animation Effects
- Scroll animations for elements
- Button paint splash effects
- Hover animations on cards and images
- Navigation interactions

### Interactive Components
- Filterable gallery
- Lightbox for gallery images
- Service tab switching
- Testimonial slider
- Form validation

### Performance Optimization
- Optimized WebP images
- Modular CSS files
- Efficient JavaScript

## Browser Compatibility

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Maintenance Tips

1. **Adding New Services**:
   - Copy an existing service item in `services.html`
   - Update text, price, and details

2. **Updating the Gallery**:
   - Add new images to `assets/images/`
   - Add new gallery items in `gallery.html` following the existing format
   - Set the appropriate data-category for filtering

3. **Adding Testimonials**:
   - Add new testimonial slides in the testimonial section of `index.html`
   - Update testimonial dots for navigation

4. **SEO Updates**:
   - Regularly update meta titles and descriptions in each HTML file
   - Ensure all images have descriptive alt text

5. **Content Updates**:
   - Replace placeholder text with real salon information
   - Update business hours, contact information, and policies as needed

## Support and Questions

If you have any questions about customizing or maintaining this website, please contact the developer.

---

© 2025 Elegance Nail Salon Website Template