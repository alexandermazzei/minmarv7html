# Files Needing Link Path Updates

This document lists all HTML files that need to have their internal links updated to work correctly from any subdirectory. Links should be prefixed with `../` when they point to files in parent directories.

## Articles Directory

Files in the `/articles/` directory that need link updates:

1. **carbon-neutrality-commitment.html**
   - All navigation and resource links need `../` prefix

2. **drafts-air-leaks.html**
   - All navigation and resource links need `../` prefix

3. **lock-hardware-issues.html**
   - All navigation and resource links need `../` prefix
   - Footer links already updated

4. **new-energy-efficient-window-line.html**
   - All navigation and resource links need `../` prefix

5. **operation-difficulties.html**
   - All navigation and resource links need `../` prefix

6. **window-condensation.html**
   - Footer links already updated with `../` prefix
   - Check navigation links if any

## Assets Directory

1. **footer.html**
   - All links need `../` prefix since this is included in subdirectories
   - Image paths need `../` prefix (e.g., `src="../images/..."`)

2. **header.html**
   - All navigation links need `../` prefix
   - Logo image path needs `../` prefix
   - Button links need `../` prefix

## Other Files

1. **dealer-application.html**
   - Check all links if they work from subdirectories

2. **caculatedemo.html**
   - Check resource and navigation links

## General Guidelines for Updating Links

1. **Navigation Links**: All `<a href="...">` tags should be checked
2. **Resource Links**: CSS, JS, and image paths should be relative to the root
3. **Form Actions**: Check any form `action` attributes
4. **Iframe src**: Update any iframe source URLs
5. **JavaScript Links**: Check any JavaScript that modifies window.location

## Common Patterns to Update

- Change `href="page.html"` to `href="../page.html"` when in subdirectories
- Update image sources: `src="images/logo.png"` to `src="../images/logo.png"`
- Update CSS/JS includes: `href="css/style.css"` to `href="../css/style.css"`

## Verification

After making changes, test:
1. Navigation between pages
2. Resource loading (images, CSS, JS)
3. Form submissions
4. Dynamic content loading