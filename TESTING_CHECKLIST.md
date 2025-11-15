# Visual Testing Checklist

Print this checklist and check off items as you test each page after refactoring.

## 🏠 index.html

### Hero Section
- [ ] Hero section displays with gradient background
- [ ] Title text is visible and has gradient
- [ ] Subtitle text is readable
- [ ] Skeleton loading animation appears initially (optional)

### Action Buttons in Hero
- [ ] "Browse Properties" button visible
- [ ] "Browse Properties" has gradient icon (house icon)
- [ ] "Browse Properties" has gradient text
- [ ] "Get in Touch" button visible
- [ ] "Get in Touch" has gradient icon (phone icon)
- [ ] "Get in Touch" has gradient text

### Featured Image Card
- [ ] Large property image displays correctly
- [ ] Image is clickable (cursor changes to pointer)
- [ ] Title "Building Dreams, Creating Homes" has gradient
- [ ] Description text is readable
- [ ] Card has proper shadow and border

### Facebook Card
- [ ] **CRITICAL**: Card background is BLUE (not white/gradient red)
- [ ] Facebook icon is white and large
- [ ] "Follow Us on Facebook" title is white
- [ ] Description text is white/light
- [ ] "Visit Our Facebook Page" button is styled (blue)
- [ ] Stats text visible (8.8K Followers, etc.)

### Services Section
- [ ] "Our Services" title has gradient
- [ ] 4 service cards display in grid
- [ ] Each card has gradient icon (home, key, hammer, file)
- [ ] Cards have white background with shadow
- [ ] "View Properties" button on first card has gradient
- [ ] All text is readable

### Call to Action (Bottom)
- [ ] **CRITICAL**: Section has gradient background (red to brown)
- [ ] "Ready to Find Your Perfect Property?" text is white
- [ ] Description text is white
- [ ] **CRITICAL**: "Contact Us Today" button is WHITE (not gradient)
- [ ] **CRITICAL**: Button text "Contact Us Today" has GRADIENT color
- [ ] **CRITICAL**: Phone icon in button has GRADIENT color

---

## 📞 contact.html

### Contact Cards
- [ ] Three contact cards display in grid
- [ ] Icons have gradient colors
- [ ] Cards have white background with shadow
- [ ] Phone/Email/Location information is readable

### Contact Buttons
- [ ] "Call Us" button has proper styling
- [ ] "Email Us" button has proper styling (brown/gold color)
- [ ] "WhatsApp" button is green
- [ ] All buttons have icons

### Map Section (if present)
- [ ] Map or location info displays correctly

### Facebook Section
- [ ] **CRITICAL**: Card background is BLUE (Facebook blue gradient)
- [ ] Facebook icon is white
- [ ] "Visit Our Facebook Page" text is white
- [ ] Button has proper styling
- [ ] All text in section is readable

---

## 🏢 services.html

### Hero Section
- [ ] Hero displays with gradient background
- [ ] Title has gradient
- [ ] Description is readable

### Service Cards
- [ ] Multiple service cards display
- [ ] **CRITICAL**: Cards have white backgrounds with borders
- [ ] Icons have gradient colors
- [ ] Card titles are bold and readable
- [ ] Description text is gray

### "Why Choose Us" Section
- [ ] **CRITICAL**: Card has white background
- [ ] **CRITICAL**: Card has visible border/shadow
- [ ] **CRITICAL**: Card is not too wide (contained)
- [ ] Bullet points display correctly
- [ ] Icons have gradient colors

### Contact Buttons
- [ ] **CRITICAL**: Email buttons have proper styling (not just blue text)
- [ ] Buttons have background color
- [ ] Icons are visible
- [ ] Text is readable

### "Ready to Get Started?" Section
- [ ] **CRITICAL**: Section has gradient background (visible)
- [ ] **CRITICAL**: Title has gradient AND is bold
- [ ] Description text is white
- [ ] Buttons are white with gradient text/icons

---

## 👥 team.html

### "Our Team Values" Card
- [ ] **CRITICAL**: Card is visible (not hidden)
- [ ] **CRITICAL**: Card has white background
- [ ] Card has border/shadow
- [ ] Title has gradient
- [ ] Icons have gradient
- [ ] Text is readable

### Team Member Cards
- [ ] All team member photos display
- [ ] Photos are circular with gradient border
- [ ] Names have gradient color
- [ ] Roles are in gray italic text
- [ ] Cards have white background with shadow

### "Work with Our Expert Team" Section
- [ ] **CRITICAL**: Section is visible
- [ ] **CRITICAL**: Section has gradient background
- [ ] **CRITICAL**: Title has gradient AND is bold
- [ ] Description text is white
- [ ] **CRITICAL**: Button has gradient icon (phone icon)
- [ ] **CRITICAL**: Button is white with gradient text

---

## ℹ️ about.html

### First Card (Company Info)
- [ ] **CRITICAL**: Text is NEXT TO image (not on top)
- [ ] Image displays on left side
- [ ] Text content on right side
- [ ] Card has proper layout
- [ ] No text overflow over image

### "Why Choose Calamba" Card
- [ ] **CRITICAL**: Card has white background
- [ ] **CRITICAL**: Card has visible border
- [ ] Card is not too wide
- [ ] Bullet points display correctly
- [ ] Icons have gradient

### "Ready to Work with Us?" Section
- [ ] **CRITICAL**: Section has gradient background
- [ ] **CRITICAL**: Title "Ready to Work with Us" has gradient AND is bold
- [ ] Description text is white
- [ ] **CRITICAL**: Buttons are WHITE (not gradient background)
- [ ] **CRITICAL**: Button text has gradient color
- [ ] **CRITICAL**: Button icons have gradient color

---

## 🏘️ projects.html

- [ ] Property cards display in grid
- [ ] Images load correctly
- [ ] Titles have gradient
- [ ] Status badges display (if present)
- [ ] "View Details" buttons work
- [ ] Hover effects work on cards

---

## 🏡 property.html

- [ ] Individual property details display
- [ ] Image gallery/carousel works
- [ ] Property information is formatted correctly
- [ ] Contact buttons are styled
- [ ] Price information is visible
- [ ] Features list displays with icons

---

## 🏆 achievements.html

- [ ] Achievement cards display correctly
- [ ] Icons have gradient colors
- [ ] Cards have proper backgrounds
- [ ] Text is all readable
- [ ] Layout is not broken

---

## 🤝 partners.html

- [ ] Partner logos/cards display
- [ ] Cards have proper styling
- [ ] Hover effects work
- [ ] No layout issues

---

## ❌ 404.html

- [ ] 404 message displays centered
- [ ] Title "404 - Page Not Found" has gradient
- [ ] "Return to Homepage" button has gradient background
- [ ] Button is clickable and styled correctly

---

## 📱 Mobile Testing (< 768px)

Test on actual mobile device or Chrome DevTools mobile view:

### index.html (Mobile)
- [ ] Hero section looks good on mobile
- [ ] Buttons stack properly
- [ ] Facebook card is still blue
- [ ] Services cards stack vertically
- [ ] CTA button is still white with gradient text

### contact.html (Mobile)
- [ ] Contact cards stack vertically
- [ ] Facebook section is still blue
- [ ] Buttons are full width and readable

### All Pages (Mobile)
- [ ] Navigation menu works
- [ ] Text is readable (not too small)
- [ ] Images don't overflow
- [ ] Cards stack properly
- [ ] No horizontal scrolling
- [ ] Footer displays correctly

---

## 💻 Desktop Testing (> 1200px)

### All Pages
- [ ] Cards display in grid (not stretched too wide)
- [ ] Max-width container is applied
- [ ] Spacing looks balanced
- [ ] Images are not distorted
- [ ] Text is comfortable to read

---

## 🌐 Browser Testing

Test in multiple browsers:

### Chrome
- [ ] All gradients display correctly
- [ ] Animations work smoothly
- [ ] No console errors

### Firefox
- [ ] All gradients display correctly
- [ ] No layout issues
- [ ] Icons display properly

### Safari (if available)
- [ ] Webkit gradients work
- [ ] Background-clip works
- [ ] No iOS-specific issues

### Edge
- [ ] Everything displays correctly
- [ ] No Edge-specific issues

---

## ⚡ Performance Check

- [ ] Pages load quickly
- [ ] No significant increase in load time
- [ ] Images load properly
- [ ] No flickering or FOUC (Flash of Unstyled Content)

---

## 🔍 Final Verification

Run the verification script:
```bash
node verify_styles.js
```

- [ ] Verification script shows all checks passed
- [ ] No failed checks
- [ ] No critical warnings

---

## 📝 Notes Section

Use this space to write down any issues you find:

Issue 1: _______________________________________
Page: _________________ 
Fix: _______________________________________

Issue 2: _______________________________________
Page: _________________ 
Fix: _______________________________________

Issue 3: _______________________________________
Page: _________________ 
Fix: _______________________________________

---

## ✅ Final Sign-Off

Once all checks pass:

- [ ] All pages tested on desktop
- [ ] All pages tested on mobile
- [ ] All critical styles preserved
- [ ] No functionality broken
- [ ] Backups kept safely
- [ ] Ready for production

**Tested by**: ___________________
**Date**: ___________________
**Status**: ☐ Approved  ☐ Needs fixes

---

## 🚨 Emergency Rollback

If major issues found:

```bash
# Restore from backup
cp backup/backup-TIMESTAMP/*.html .
cp manual-backup/modern-styles.css static/css/

# Or use Git if in version control
git checkout .
```

---

**Remember**: 
- Keep backups for at least 1 week
- Test thoroughly before deploying to production
- If any critical check fails, restore from backup
- Refer to REFACTORING_GUIDE.md for specific fixes
