#!/usr/bin/env node

/**
 * Smart HTML Style Refactoring Script v2.0
 * 
 * This script carefully refactors inline styles to CSS classes while preserving
 * critical styles that must remain inline for specific functionality.
 * 
 * Usage:
 *   node smart_refactor.js
 */

const fs = require('fs');
const path = require('path');

// ==============================================
// PROTECTED PATTERNS - THESE MUST STAY INLINE
// ==============================================

const protectedPatterns = [
    // Facebook gradient background - MUST stay inline
    /style="background:\s*linear-gradient\(135deg,\s*#1877f2\s+0%,\s*#0c5ba8\s+100%\);\s*color:\s*white;"/gi,
    
    // Specific button backgrounds in CTA sections
    /style="background-color:\s*white;"\s+(?=.*Contact Us Today)/gi,
    /style="background-color:\s*white;"\s+(?=.*Ready to)/gi,
    
    // Property card titles with transparent color wrapper
    /class="property-card-title"\s+style="color:\s*transparent\s*!important;"/gi,
    /class="section-title"\s+style="color:\s*transparent\s*!important;"/gi,
    
    // Specific font sizes on buttons
    /style="font-weight:\s*bold;\s*padding:\s*12px\s+30px;\s*border-radius:\s*8px;"/gi,
    
    // Height and cursor on images (functional)
    /style="height:\s*400px;\s*cursor:\s*pointer;"/gi,
    /style="height:\s*500px;\s*object-fit:\s*cover;\s*cursor:\s*pointer;"/gi,
    
    // Specific border-radius in CTA sections
    /style="background:\s*linear-gradient\(135deg,\s*#c8102e\s+0%,\s*#a77846\s+100%\);\s*border-radius:\s*1rem;\s*color:\s*white;"/gi,
    
    // Font size variations in specific contexts
    /style="font-size:\s*3rem;"/gi,
    /style="font-size:\s*1\.1rem;"/gi,
    /style="font-size:\s*0\.95rem;"/gi,
    
    // Service button specific styles
    /style="flex:\s*1;\s*padding:\s*10px;\s*background:\s*linear-gradient\(135deg,\s*#c8102e\s+0%,\s*#a77846\s+100%\);\s*color:\s*white;\s*text-align:\s*center;\s*border-radius:\s*6px;\s*text-decoration:\s*none;\s*font-size:\s*0\.9rem;"/gi,
];

// ==============================================
// SAFE REFACTORING RULES
// ==============================================

const refactoringRules = [
    // Gradient text in spans - SAFE TO REFACTOR
    {
        name: 'Gradient Text in Icons (i tags)',
        pattern: /<i([^>]+)style="background:\s*linear-gradient\(135deg,\s*#c8102e\s+0%,\s*#a77846\s+100%\);\s*-webkit-background-clip:\s*text;\s*-webkit-text-fill-color:\s*transparent;\s*background-clip:\s*text;"([^>]*)>/gi,
        replacement: '<i$1class="gradient-icon"$2>',
        test: (match) => !match.includes('fas fa-phone') // Don't change if it's part of a protected button
    },
    
    {
        name: 'Gradient Text in Spans (display: inline-block first)',
        pattern: /<span\s+style="display:\s*inline-block;\s*background:\s*linear-gradient\(135deg,\s*#c8102e\s+0%,\s*#a77846\s+100%\);\s*-webkit-background-clip:\s*text;\s*-webkit-text-fill-color:\s*transparent;\s*background-clip:\s*text;">([^<]+)<\/span>/gi,
        replacement: '<span class="gradient-text">$1</span>'
    },
    
    {
        name: 'Gradient Text in Spans (background first)',
        pattern: /<span\s+style="background:\s*linear-gradient\(135deg,\s*#c8102e\s+0%,\s*#a77846\s+100%\);\s*-webkit-background-clip:\s*text;\s*-webkit-text-fill-color:\s*transparent;\s*background-clip:\s*text;\s*display:\s*inline-block;">([^<]+)<\/span>/gi,
        replacement: '<span class="gradient-text">$1</span>'
    },
    
    {
        name: 'Gradient Text in Spans (no display property)',
        pattern: /<span\s+style="background:\s*linear-gradient\(135deg,\s*#c8102e\s+0%,\s*#a77846\s+100%\);\s*-webkit-background-clip:\s*text;\s*-webkit-text-fill-color:\s*transparent;\s*background-clip:\s*text;">([^<]+)<\/span>/gi,
        replacement: '<span class="gradient-text">$1</span>'
    },
    
    // White cards - SAFE
    {
        name: 'White Card with p-5',
        pattern: /<div\s+class="p-5"\s+style="background:\s*white;\s*border-radius:\s*12px;\s*box-shadow:\s*0\s+4px\s+6px\s+rgba\(0,\s*0,\s*0,\s*0\.1\);">/gi,
        replacement: '<div class="card-white-elevated">'
    },
    
    {
        name: 'White Card with text-center p-5',
        pattern: /<div\s+class="text-center\s+p-5"\s+style="background:\s*white;\s*border-radius:\s*12px;\s*box-shadow:\s*0\s+4px\s+6px\s+rgba\(0,\s*0,\s*0,\s*0\.1\);">/gi,
        replacement: '<div class="card-white-elevated text-center">'
    },
    
    {
        name: 'White Card with p-5 text-center',
        pattern: /<div\s+class="p-5\s+text-center"\s+style="background:\s*white;\s*border-radius:\s*12px;\s*box-shadow:\s*0\s+4px\s+6px\s+rgba\(0,\s*0,\s*0,\s*0\.1\);">/gi,
        replacement: '<div class="card-white-elevated p-5 text-center">'
    },
    
    // Text colors - SAFE
    {
        name: 'Text White 95%',
        pattern: /style="color:\s*rgba\(255,\s*255,\s*255,\s*0\.95\);"/gi,
        replacement: 'class="text-white-95"'
    },
    
    {
        name: 'Text White 90%',
        pattern: /style="color:\s*rgba\(255,\s*255,\s*255,\s*0\.9\);"/gi,
        replacement: 'class="text-white-90"'
    },
    
    {
        name: 'Text Gray (#666)',
        pattern: /style="color:\s*#666;"/gi,
        replacement: 'class="text-gray"'
    },
    
    // Flex displays - SAFE
    {
        name: 'Flex with Gap 10px',
        pattern: /style="display:\s*flex;\s*gap:\s*10px;"/gi,
        replacement: 'class="button-flex"'
    },
    
    {
        name: 'Flex with Gap 1rem',
        pattern: /style="display:\s*flex;\s*gap:\s*1rem;"/gi,
        replacement: 'class="flex-gap-1"'
    },
    
    // Margin utilities - SAFE
    {
        name: 'Margin Top 15px',
        pattern: /style="margin-top:\s*15px;"/gi,
        replacement: 'class="mt-15"'
    },
    
    // Line heights - SAFE
    {
        name: 'Line Height 1.8',
        pattern: /style="line-height:\s*1\.8;"/gi,
        replacement: 'class="line-height-relaxed"'
    },
    
    // Grid layouts - SAFE
    {
        name: '2-Column Grid',
        pattern: /style="display:\s*grid;\s*grid-template-columns:\s*repeat\(2,\s*1fr\);\s*gap:\s*1\.5rem;"/gi,
        replacement: 'class="grid-2-col"'
    },
    
    {
        name: '3-Column Grid',
        pattern: /style="display:\s*grid;\s*grid-template-columns:\s*repeat\(3,\s*1fr\);\s*gap:\s*1rem;"/gi,
        replacement: 'class="grid-3-col"'
    },
];

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

function isProtected(text) {
    return protectedPatterns.some(pattern => pattern.test(text));
}

function getAllHtmlFiles(dir = '.') {
    const files = fs.readdirSync(dir);
    return files.filter(file => 
        file.endsWith('.html') && 
        !file.includes('backup') &&
        file !== 'node_modules'
    );
}

function createBackup(files) {
    const backupDir = './backup';
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const versionDir = path.join(backupDir, `backup-${timestamp}`);
    fs.mkdirSync(versionDir);

    files.forEach(file => {
        fs.copyFileSync(file, path.join(versionDir, file));
    });

    console.log(`✅ Backup created: ${versionDir}\n`);
    return versionDir;
}

function applyRefactoring(content, rules) {
    let modifiedContent = content;
    const appliedRules = [];

    rules.forEach(rule => {
        const initialContent = modifiedContent;
        const matches = [];
        
        // Find all matches first
        let match;
        const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
        while ((match = regex.exec(initialContent)) !== null) {
            matches.push(match[0]);
        }
        
        if (matches.length > 0) {
            let changesCount = 0;
            
            // Apply replacements
            modifiedContent = modifiedContent.replace(rule.pattern, (match) => {
                // Skip if protected
                if (isProtected(match)) {
                    return match;
                }
                
                // Apply custom test if exists
                if (rule.test && !rule.test(match)) {
                    return match;
                }
                
                changesCount++;
                return match.replace(rule.pattern, rule.replacement);
            });
            
            if (changesCount > 0) {
                appliedRules.push({
                    name: rule.name,
                    count: changesCount
                });
            }
        }
    });

    return { modifiedContent, appliedRules };
}

function generateReport(results) {
    console.log('\n' + '='.repeat(80));
    console.log('                  SMART REFACTORING REPORT');
    console.log('='.repeat(80) + '\n');

    let totalChanges = 0;
    let totalFiles = 0;

    results.forEach(result => {
        if (result.appliedRules.length > 0) {
            totalFiles++;
            console.log(`📄 ${result.file}`);
            console.log('─'.repeat(80));
            
            result.appliedRules.forEach(rule => {
                console.log(`   ✓ ${rule.name}: ${rule.count} replacement${rule.count > 1 ? 's' : ''}`);
                totalChanges += rule.count;
            });
            
            console.log(`   Total: ${result.appliedRules.reduce((sum, r) => sum + r.count, 0)} changes\n`);
        }
    });

    console.log('='.repeat(80));
    console.log(`📊 SUMMARY`);
    console.log('─'.repeat(80));
    console.log(`   Files modified: ${totalFiles}`);
    console.log(`   Total changes: ${totalChanges}`);
    console.log(`   Protected patterns preserved: ${protectedPatterns.length}`);
    console.log('='.repeat(80) + '\n');

    // Show files with no changes
    const unchangedFiles = results.filter(r => r.appliedRules.length === 0);
    if (unchangedFiles.length > 0) {
        console.log('ℹ️  Files with no changes:');
        unchangedFiles.forEach(r => console.log(`   • ${r.file}`));
        console.log('');
    }
}

// ==============================================
// MAIN EXECUTION
// ==============================================

function main() {
    console.log('\n🚀 Starting Smart HTML Style Refactoring...\n');

    // Find all HTML files
    const htmlFiles = getAllHtmlFiles();
    
    if (htmlFiles.length === 0) {
        console.log('❌ No HTML files found in current directory.');
        process.exit(1);
    }

    console.log(`🔍 Found ${htmlFiles.length} HTML file(s):`);
    htmlFiles.forEach(file => console.log(`   • ${file}`));
    console.log('');

    // Create backup
    const backupDir = createBackup(htmlFiles);

    // Process each file
    const results = [];
    
    htmlFiles.forEach(file => {
        console.log(`⚙️  Processing: ${file}...`);
        
        const content = fs.readFileSync(file, 'utf8');
        const { modifiedContent, appliedRules } = applyRefactoring(content, refactoringRules);
        
        // Write modified content
        fs.writeFileSync(file, modifiedContent, 'utf8');
        
        results.push({
            file,
            appliedRules
        });
    });

    // Generate report
    generateReport(results);

    console.log('✅ Refactoring complete!\n');
    console.log(`💾 Original files backed up to: ${backupDir}`);
    console.log('📖 Next steps:');
    console.log('   1. Replace your current modern-styles.css with modern-styles-enhanced.css');
    console.log('   2. Test all pages to ensure styles are preserved');
    console.log('   3. Protected inline styles remain intact for critical functionality\n');
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { refactoringRules, applyRefactoring, protectedPatterns };
