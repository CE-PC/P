# 🏠 Property Data Auto-Generator

Automatically generates `properties.js` and `partners.js` by scanning your image folders.

---

## 🚀 Quick Start - Running Locally

### 1. **Install Node.js** (if you haven't already)

Download from: https://nodejs.org/ (LTS version recommended)

Verify installation:
```bash
node --version
npm --version
```

### 2. **Navigate to Your Project**

```bash
cd path/to/your/project
```

### 3. **Run the Generators**

#### Generate Properties
```bash
node generate-properties.js
```

#### Generate Partners
```bash
node generate-partners.js
```

#### Generate Both at Once
```bash
node generate-properties.js && node generate-partners.js
```

---

## 📁 What It Does

### Properties Generator (`generate-properties.js`)
- Scans `/static/images/projects/` folder
- Finds all subfolders (1, 2, 3, beach-villa, etc.)
- Lists all images in each folder
- **Uses folder name as-is for project name**
- Generates `/static/js/properties.js` automatically

**Examples:**
- Folder `1` → Project name: `"1"`
- Folder `beach-villa` → Project name: `"beach-villa"`
- Folder `Turn over Unit (Model House)` → Project name: `"Turn over Unit (Model House)"`

### Partners Generator (`generate-partners.js`)
- Scans `/static/images/partners/` folder
- Finds all image files
- **Uses filename (without extension) as title**
- Generates `/static/js/partners.js` automatically

**Examples:**
- File `amaia-land.jpeg` → Title: `"amaia-land"`
- File `image_146.jpeg` → Title: `"image_146"`
- File `Community Event.png` → Title: `"Community Event"`

---

## 🔄 Workflow

### Local Development
1. Add new images to folders
2. Run generator scripts: `node generate-properties.js && node generate-partners.js`
3. Test locally
4. Commit and push

### Automatic (GitHub Actions)
1. Add new images to folders
2. Commit and push to GitHub
3. GitHub Actions automatically runs generators
4. Updated `.js` files are committed automatically
5. GitHub Pages deploys the changes

---

## 📂 Folder Structure

```
your-project/
├── .github/
│   └── workflows/
│       └── pages.yml                    # GitHub Actions workflow
├── static/
│   ├── images/
│   │   ├── projects/
│   │   │   ├── 1/
│   │   │   │   ├── image_81.jpeg
│   │   │   │   ├── image_83.jpeg
│   │   │   │   └── zzz_description.txt  # Optional
│   │   │   ├── 2/
│   │   │   ├── beach-villa/
│   │   │   └── Turn over Unit (Model House)/
│   │   └── partners/
│   │       ├── amaia-land.jpeg
│   │       ├── image_146.jpeg
│   │       └── crown-asia.png
│   └── js/
│       ├── properties.js                # AUTO-GENERATED
│       └── partners.js                  # AUTO-GENERATED
├── generate-properties.js               # Generator script
├── generate-partners.js                 # Generator script
└── README-GENERATORS.md                 # This file
```

---

## ➕ Adding New Content

### Adding New Property (e.g., Beach Villa)

1. **Create folder:**
   ```
   /static/images/projects/beach-villa/
   ```

2. **Add images:**
   ```
   /static/images/projects/beach-villa/
   ├── front-view.jpg
   ├── living-room.jpg
   └── zzz_description.txt  (optional)
   ```

3. **Run generator:**
   ```bash
   node generate-properties.js
   ```

4. **Result:**
   ```javascript
   "beach-villa": {
       "name": "beach-villa",
       "location": "Calamba, Laguna",
       "folder": "beach-villa",
       "images": ["front-view.jpg", "living-room.jpg"]
   }
   ```

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add beach villa property"
   git push
   ```

### Adding New Partner Image

1. **Add image with descriptive name:**
   ```
   /static/images/partners/crown-asia.png
   ```

2. **Run generator:**
   ```bash
   node generate-partners.js
   ```

3. **Result:**
   ```javascript
   {
       "filename": "crown-asia.png",
       "title": "crown-asia"
   }
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add Crown Asia partner"
   git push
   ```

---

## 🤖 GitHub Actions

The workflow automatically runs when you:
- Push changes to `main` branch
- Manually trigger from the Actions tab

### Checking Action Status

1. Go to your GitHub repository
2. Click the **Actions** tab
3. See the "Generate and Deploy" workflow

---

## 🧪 Testing Locally

### Test Before Pushing

```bash
# Run generators
node generate-properties.js
node generate-partners.js

# Check the generated files
cat static/js/properties.js
cat static/js/partners.js

# Open your HTML file in browser to test
# (Use a local server if needed)
python -m http.server 8000
# Then visit: http://localhost:8000
```

---

## ⚠️ Important Notes

1. **Never edit `properties.js` or `partners.js` manually**
   - They are auto-generated and will be overwritten
   - Edit the generator scripts instead if you need changes

2. **Image file formats supported:**
   - `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

3. **Description files (optional):**
   - Name it `zzz_description.txt` in each project folder
   - Automatically loaded and displayed on property pages

4. **Naming conventions:**
   - **Properties**: Folder name becomes project name (used as-is)
   - **Partners**: Filename (without extension) becomes title

---

## 📊 Generated File Examples

### properties.js
```javascript
window.PROPERTY_DATA = {
    basePath: "/static/images/projects/",
    projects: {
        "1": {
            "name": "1",
            "location": "Calamba, Laguna",
            "folder": "1",
            "images": ["image_81.jpeg", "image_83.jpeg"]
        },
        "beach-villa": {
            "name": "beach-villa",
            "location": "Calamba, Laguna",
            "folder": "beach-villa",
            "images": ["front-view.jpg", "bedroom.jpg"]
        }
    },
    // ... functions
};
```

### partners.js
```javascript
window.PARTNERS_DATA = {
    basePath: "/static/images/partners/",
    partners: [
        {
            "filename": "amaia-land.jpeg",
            "title": "amaia-land"
        },
        {
            "filename": "crown-asia.png",
            "title": "crown-asia"
        },
        {
            "filename": "image_146.jpeg",
            "title": "image_146"
        }
    ]
};
```

---

## 🐛 Troubleshooting

### "Directory not found" error
```bash
# Make sure you're in the project root
pwd
# Should show your project directory

# Check if folders exist
ls -la static/images/projects/
ls -la static/images/partners/
```

### Node.js not installed
```bash
# Install Node.js from https://nodejs.org/
# Or use nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
```

### GitHub Actions not running
- Check that the workflow file is in `.github/workflows/pages.yml`
- Check the Actions tab for error messages
- Ensure you pushed to `main` branch
- Verify GitHub Pages Source is set to "GitHub Actions" in Settings → Pages

---

## 💡 Tips

- Run generators before every commit to keep data fresh
- Test locally before pushing to production
- Check GitHub Actions after pushing to ensure it ran successfully
- Images are sorted alphabetically - rename files to control order
- Use descriptive folder/file names for better organization

---

## 🎯 Workflow Summary

```
Add Images → Run Generators → Test Locally → Commit → Push → GitHub Actions → Live Site
```

**Local:**
1. Add images to folders
2. `node generate-properties.js && node generate-partners.js`
3. Test in browser
4. `git add . && git commit -m "message" && git push`

**Automatic:**
- GitHub Actions runs generators
- Commits updated files
- Deploys to GitHub Pages
- Site is live!

---

## 📞 Need Help?

- Check the console output when running scripts
- Look at GitHub Actions logs for automatic runs
- Ensure folder structure matches the examples above
- Verify Node.js is installed: `node --version`

---

**Generated with ❤️ by Node.js automation**
