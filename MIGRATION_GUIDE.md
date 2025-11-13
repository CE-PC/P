# Migration Guide: Adding Categories to Your Property System

## Overview
This guide will help you reorganize your existing property structure to support categories (House and Lot, Lot Only, Commercial Space, Commercial Lot).

## Step 1: Reorganize Your Folder Structure

### Current Structure:
```
static/images/projects/
├── 1/
│   ├── image_83.jpeg
│   └── ...
├── 2/
│   └── ...
└── 14/
    └── ...
```

### New Structure:
```
static/images/projects/
├── house-and-lot/
│   ├── 1/
│   │   ├── image_83.jpeg
│   │   └── zzz_description.txt (optional)
│   └── 2/
│       └── ...
├── lot-only/
│   ├── 3/
│   └── 4/
├── commercial-space/
│   ├── 5/
│   └── 6/
└── commercial-lot/
    └── 7/
```

## Step 2: Move Your Existing Files

You need to move each property folder into the appropriate category folder:

### Option A: Manual Move (if you have few properties)
1. Create the category folders:
   - `static/images/projects/house-and-lot/`
   - `static/images/projects/lot-only/`
   - `static/images/projects/commercial-space/`
   - `static/images/projects/commercial-lot/`

2. Move each numbered folder into its appropriate category
3. Keep the same folder names (1, 2, 3, etc.)

### Option B: Bash Script (recommended for many properties)
Create a file called `migrate-to-categories.sh` in your project root:

```bash
#!/bin/bash

# Migration script to organize properties into categories
# Adjust the mappings below based on your properties

PROJECTS_DIR="static/images/projects"

# Create category folders
mkdir -p "$PROJECTS_DIR/house-and-lot"
mkdir -p "$PROJECTS_DIR/lot-only"
mkdir -p "$PROJECTS_DIR/commercial-space"
mkdir -p "$PROJECTS_DIR/commercial-lot"

# Move properties to their categories
# Format: mv "$PROJECTS_DIR/FOLDER" "$PROJECTS_DIR/CATEGORY/"

# House and Lot
mv "$PROJECTS_DIR/1" "$PROJECTS_DIR/house-and-lot/"
mv "$PROJECTS_DIR/2" "$PROJECTS_DIR/house-and-lot/"
mv "$PROJECTS_DIR/Turn over Unit (Model House)" "$PROJECTS_DIR/house-and-lot/"

# Lot Only
mv "$PROJECTS_DIR/3" "$PROJECTS_DIR/lot-only/"
mv "$PROJECTS_DIR/4" "$PROJECTS_DIR/lot-only/"

# Commercial Space
mv "$PROJECTS_DIR/5" "$PROJECTS_DIR/commercial-space/"
mv "$PROJECTS_DIR/6" "$PROJECTS_DIR/commercial-space/"

# Commercial Lot
mv "$PROJECTS_DIR/7" "$PROJECTS_DIR/commercial-lot/"

# Add more as needed...
# mv "$PROJECTS_DIR/8" "$PROJECTS_DIR/house-and-lot/"
# mv "$PROJECTS_DIR/9" "$PROJECTS_DIR/lot-only/"

echo "✅ Migration complete!"
echo "Next steps:"
echo "1. Run: node generate-properties.js"
echo "2. Test locally"
echo "3. Commit and push changes"
```

Run it with: `bash migrate-to-categories.sh`

## Step 3: Update Your Files

Replace these files in your project:

1. **generate-properties.js** - Updated to scan categories
2. **projects.html** - Added category dropdown filter
3. **property.html** - Updated to handle category parameter
4. **static/js/properties.js** - Will be regenerated with categories

## Step 4: Generate New properties.js

After reorganizing folders, run:

```bash
node generate-properties.js
```

This will scan all category folders and generate the new properties.js file.

## Step 5: Test Locally

1. Open `projects.html` in your browser
2. You should see:
   - A category dropdown filter
   - Category badges on each property card
   - Ability to filter by category
3. Click on a property to test `property.html`
4. Verify URLs look like: `property.html?category=house-and-lot&id=1`

## Step 6: Deploy

1. Commit all changes:
   ```bash
   git add .
   git commit -m "Add category support to property system"
   git push
   ```

2. GitHub Pages will automatically deploy

## URL Changes

### Before:
- Projects page: `yoursite.com/projects.html`
- Property page: `yoursite.com/property.html?id=1`

### After:
- Projects page: `yoursite.com/projects.html` (same, now with filters)
- Property page: `yoursite.com/property.html?category=house-and-lot&id=1`

⚠️ **Important**: Old property URLs will break! If you have external links, they'll need updating.

## Category Definitions

Current categories and their folder names:

| Display Name      | Folder Name       |
|-------------------|-------------------|
| House And Lot     | house-and-lot     |
| Lot Only          | lot-only          |
| Commercial Space  | commercial-space  |
| Commercial Lot    | commercial-lot    |

## Adding New Categories

To add more categories, edit `generate-properties.js`:

```javascript
const CATEGORIES = [
    'house-and-lot',
    'lot-only',
    'commercial-space',
    'commercial-lot',
    'condominium',        // Add new category
    'townhouse'           // Add another
];
```

Then create the folder: `static/images/projects/condominium/`

## Troubleshooting

### Issue: "Category folder not found"
**Solution**: Make sure you created all category folders in `static/images/projects/`

### Issue: "No properties showing"
**Solution**: 
1. Check that folders were moved correctly
2. Run `node generate-properties.js` again
3. Clear browser cache

### Issue: "Property images not loading"
**Solution**: Check the full path in browser console. Should be:
`/static/images/projects/{category}/{folder}/{image}.jpg`

### Issue: Old URLs not working
**Solution**: Old URLs (`?id=1`) won't work anymore. They need the category parameter.
Update any bookmarks or external links to include `&category=...`

## Quick Checklist

- [ ] Created category folders
- [ ] Moved property folders into categories
- [ ] Updated generate-properties.js
- [ ] Updated projects.html
- [ ] Updated property.html
- [ ] Ran `node generate-properties.js`
- [ ] Tested locally
- [ ] Committed and pushed changes
- [ ] Verified on live site

## Need Help?

If you run into issues:
1. Check browser console for errors (F12)
2. Verify folder structure matches exactly
3. Make sure properties.js was regenerated
4. Clear browser cache and reload

---

**Remember**: Always test locally before pushing to production!
