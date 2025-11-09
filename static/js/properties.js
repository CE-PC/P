/**
 * PURE JAVASCRIPT PROPERTY CONFIG
 * ================================
 * Edit this file to add/update properties - NO JSON needed!
 * Perfect for GitHub Pages (free tier)
 * 
 * TO ADD NEW PROJECT:
 * -------------------
 * 1. Create folder: /static/images/projects/15/
 * 2. Add images and zzz_description.txt
 * 3. Add entry below (copy the template)
 * 4. Upload this file - Done!
 */

window.PROPERTY_DATA = {
    // Base path - DON'T CHANGE THIS
    basePath: "/static/images/projects/",
    
    // ===================================
    // ADD YOUR PROJECTS HERE
    // ===================================
    projects: {
        
        "1": {
            name: "Project 1",
            location: "Calamba, Laguna",
            folder: "1",
            images: [
                "image_81.jpeg",
                "image_83.jpeg",
                "image_84.jpeg",
                "image_86.jpeg",
                "image_87.jpeg"
            ]
        },
        
        "2": {
            name: "Project 2",
            location: "Calamba, Laguna",
            folder: "2",
            images: [
                "image_89.jpeg",
                "image_90.jpeg"
            ]
        },
        
        "3": {
            name: "Project 3",
            location: "Calamba, Laguna",
            folder: "3",
            images: [
                "image_92.jpeg"
            ]
        },
        
        "4": {
            name: "Project 4",
            location: "Calamba, Laguna",
            folder: "4",
            images: [
                "image_97.jpeg"
            ]
        },
        
        "5": {
            name: "Project 5",
            location: "Calamba, Laguna",
            folder: "5",
            images: [
                "a.jpeg"
            ]
        },
        
        "6": {
            name: "Project 6",
            location: "Calamba, Laguna",
            folder: "6",
            images: [
                "image_102.jpeg"
            ]
        },
        
        "7": {
            name: "Project 7",
            location: "Calamba, Laguna",
            folder: "7",
            images: [
                "Image_104.jpeg"
            ]
        },
        
        "8": {
            name: "Project 8",
            location: "Calamba, Laguna",
            folder: "8",
            images: [
                "image_106.jpeg"
            ]
        },
        
        "9": {
            name: "Project 9",
            location: "Calamba, Laguna",
            folder: "9",
            images: [
                "Image_108.jpeg"
            ]
        },
        
        "10": {
            name: "Project 10",
            location: "Calamba, Laguna",
            folder: "10",
            images: [
                "image_111.jpeg"
            ]
        },
        
        "11": {
            name: "Project 11",
            location: "Calamba, Laguna",
            folder: "11",
            images: [
                "image_118.jpeg"
            ]
        },
        
        "12": {
            name: "Project 12",
            location: "Calamba, Laguna",
            folder: "12",
            images: [
                "image_123.jpeg"
            ]
        },
        
        "13": {
            name: "Project 13",
            location: "Calamba, Laguna",
            folder: "13",
            images: []
        },
        
        "14": {
            name: "Project 14",
            location: "Calamba, Laguna",
            folder: "14",
            images: [
                "image_127.jpeg"
            ]
        },
        
        "model-house": {
            name: "Turn over Unit (Model House)",
            location: "Calamba, Laguna",
            folder: "Turn over Unit (Model House)",
            images: [
                "image_142.jpeg"
            ]
        }
        
        // ===================================
        // ADD NEW PROJECTS BELOW THIS LINE
        // ===================================
        
        // TEMPLATE - Copy this to add Project 15:
        /*
        ,"15": {
            name: "Beautiful Villa",
            location: "Calamba City, Laguna",
            folder: "15",
            images: [
                "photo1.jpg",
                "photo2.jpg",
                "photo3.jpg"
            ]
        }
        */
        
    },
    
    // ===================================
    // AUTOMATIC FUNCTIONS - DON'T EDIT BELOW
    // ===================================
    
    /**
     * Get property with full image paths
     */
    async getProperty(id) {
        const project = this.projects[id];
        if (!project) return null;
        
        // Build full image paths
        const images = project.images.map(filename => 
            this.basePath + project.folder + "/" + filename
        );
        
        // Try to load description
        let description = null;
        try {
            const response = await fetch(this.basePath + project.folder + "/zzz_description.txt");
            if (response.ok) {
                description = await response.text();
            }
        } catch (error) {
            // No description file, that's okay
        }
        
        return {
            id: id,
            name: project.name,
            location: project.location,
            folder: project.folder,
            images: images,
            description: description,
            features: [
                { icon: "fas fa-home", text: "Residential Property" },
                { icon: "fas fa-map-marker-alt", text: project.location },
                { icon: "fas fa-images", text: images.length + " Photo" + (images.length !== 1 ? "s" : "") }
            ]
        };
    },
    
    /**
     * Get all properties
     */
    async getAllProperties() {
        const all = {};
        for (let id in this.projects) {
            all[id] = await this.getProperty(id);
        }
        return all;
    }
};

// Backwards compatibility
window.PROPERTY_CONFIG = window.PROPERTY_DATA;
window.PROPERTY_LOADER = window.PROPERTY_DATA;

/**
 * =============================================
 * HOW TO ADD PROJECT 15
 * =============================================
 * 
 * Step 1: Create folder and add files
 * ------------------------------------
 * /static/images/projects/15/
 *   ├── photo1.jpg
 *   ├── photo2.jpg
 *   ├── photo3.jpg
 *   └── zzz_description.txt  (optional)
 * 
 * 
 * Step 2: Edit THIS file
 * ----------------------
 * Find line that says: "ADD NEW PROJECTS BELOW THIS LINE"
 * 
 * Add this code:
 * 
 * ,"15": {
 *     name: "Beautiful Villa",
 *     location: "Calamba City, Laguna",
 *     folder: "15",
 *     images: [
 *         "photo1.jpg",
 *         "photo2.jpg",
 *         "photo3.jpg"
 *     ]
 * }
 * 
 * IMPORTANT: Don't forget the comma before "15"!
 * 
 * 
 * Step 3: Upload & Done!
 * ----------------------
 * Upload this file to: /static/js/properties.js
 * Visit: yoursite.com/property.html?id=15
 * 
 * =============================================
 * 
 * NOTES:
 * ------
 * - Just list filenames, NOT full paths
 * - System adds /static/images/projects/15/ automatically
 * - Images are loaded in the order you list them
 * - First image = main carousel image
 * - zzz_description.txt is loaded automatically
 * 
 * =============================================
 */
