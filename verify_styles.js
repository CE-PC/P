#!/usr/bin/env node

/**
 * Style Verification Script
 * 
 * This script verifies that all critical inline styles are preserved after refactoring.
 * Run this after refactoring to ensure nothing was accidentally removed.
 * 
 * Usage:
 *   node verify_styles.js
 */

const fs = require('fs');
const path = require('path');

// ==============================================
// CRITICAL STYLE CHECKS
// ==============================================

const criticalStyleChecks = {
    'index.html': [
        {
            description: 'Facebook blue gradient background',
            pattern: /style="background:\s*linear-gradient\(135deg,\s*#1877f2/,
            required: true
        },
        {
            description: 'White button in CTA with gradient text',
            pattern: /style="background-color:\s*white;"/,
            required: true,
            count: 2 // Should appear at least twice
        },
        {
            description: 'Property card title with transparent wrapper',
            pattern: /class="property-card-title"\s+style="color:\s*transparent\s*!important;"/,
            required: true
        },
        {
            description: 'Service button gradient styles',
            pattern: /style="flex:\s*1;.*background:\s*linear-gradient\(135deg,\s*#c8102e/,
            required: true
        },
        {
            description: 'CTA gradient background with border-radius',
            pattern: /style="background:\s*linear-gradient\(135deg,\s*#c8102e.*border-radius:\s*1rem/,
            required: true
        }
    ],
    
    'contact.html': [
        {
            description: 'Facebook blue gradient in contact page',
            pattern: /style="background:\s*linear-gradient\(135deg,\s*#1877f2/,
            required: true
        },
        {
            description: 'Contact link backgrounds',
            pattern: /class="contact-link"/,
            required: true
        }
    ],
    
    'services.html': [
        {
            description: 'Email button styling',
            pattern: /class="contact-link"/,
            required: true
        },
        {
            description: 'CTA section gradient',
            pattern: /style="background:\s*linear-gradient\(135deg,\s*#c8102e/,
            required: true
        }
    ],
    
    'team.html': [
        {
            description: 'White card backgrounds',
            pattern: /background:\s*white/,
            required: true
        },
        {
            description: 'Gradient text in headings',
            pattern: /class="gradient-text"/,
            required: true
        }
    ],
    
    'about.html': [
        {
            description: 'Section title wrappers',
            pattern: /style="color:\s*transparent\s*!important;"/,
            required: true
        },
        {
            description: 'Gradient text spans',
            pattern: /class="gradient-text"/,
            required: true
        }
    ],
    
    'projects.html': [
        {
            description: 'Property card styles',
            pattern: /class="property-card"/,
            required: true
        }
    ],
    
    'property.html': [
        {
            description: 'Property card styles',
            pattern: /class="property-card"/,
            required: true
        }
    ]
};

// ==============================================
// CSS FILE CHECKS
// ==============================================

const cssRequiredClasses = [
    'gradient-text',
    'gradient-icon',
    'card-white-elevated',
    'card-gradient',
    'bg-facebook',
    'btn-white-gradient',
    'btn-service',
    'text-gray',
    'text-white-90',
    'text-white-95',
    'button-flex',
    'flex-gap-1',
    'grid-2-col',
    'grid-3-col',
    'line-height-relaxed',
    'mt-15',
    'section-heading'
];

// ==============================================
// VERIFICATION FUNCTIONS
// ==============================================

function checkFile(filename, checks) {
    console.log(`\n📄 Checking ${filename}...`);
    console.log('─'.repeat(80));
    
    if (!fs.existsSync(filename)) {
        console.log(`❌ File not found: ${filename}`);
        return { passed: 0, failed: 1, warnings: 0 };
    }
    
    const content = fs.readFileSync(filename, 'utf8');
    let passed = 0;
    let failed = 0;
    let warnings = 0;
    
    checks.forEach(check => {
        const matches = content.match(check.pattern);
        const matchCount = matches ? matches.length : 0;
        
        if (check.required) {
            if (matchCount === 0) {
                console.log(`❌ FAILED: ${check.description}`);
                console.log(`   Expected pattern not found`);
                failed++;
            } else if (check.count && matchCount < check.count) {
                console.log(`⚠️  WARNING: ${check.description}`);
                console.log(`   Found ${matchCount} instances, expected at least ${check.count}`);
                warnings++;
            } else {
                console.log(`✅ PASSED: ${check.description}`);
                if (check.count) {
                    console.log(`   Found ${matchCount} instances`);
                }
                passed++;
            }
        }
    });
    
    return { passed, failed, warnings };
}

function verifyCSSFile(filename) {
    console.log(`\n📄 Checking ${filename}...`);
    console.log('─'.repeat(80));
    
    if (!fs.existsSync(filename)) {
        console.log(`❌ CSS file not found: ${filename}`);
        return { passed: 0, failed: cssRequiredClasses.length };
    }
    
    const content = fs.readFileSync(filename, 'utf8');
    let passed = 0;
    let failed = 0;
    
    cssRequiredClasses.forEach(className => {
        // Check for class definition (with dot or as selector)
        const pattern = new RegExp(`\\.${className}\\s*\\{`, 'g');
        const matches = content.match(pattern);
        
        if (!matches || matches.length === 0) {
            console.log(`❌ MISSING: .${className}`);
            failed++;
        } else {
            console.log(`✅ FOUND: .${className}`);
            passed++;
        }
    });
    
    return { passed, failed, warnings: 0 };
}

function generateSummaryReport(results) {
    console.log('\n' + '='.repeat(80));
    console.log('                    VERIFICATION SUMMARY');
    console.log('='.repeat(80));
    
    let totalPassed = 0;
    let totalFailed = 0;
    let totalWarnings = 0;
    
    Object.entries(results).forEach(([file, result]) => {
        totalPassed += result.passed;
        totalFailed += result.failed;
        totalWarnings += result.warnings;
        
        const status = result.failed === 0 ? '✅' : '❌';
        console.log(`${status} ${file}: ${result.passed} passed, ${result.failed} failed, ${result.warnings} warnings`);
    });
    
    console.log('='.repeat(80));
    console.log(`Total: ${totalPassed} passed, ${totalFailed} failed, ${totalWarnings} warnings`);
    console.log('='.repeat(80));
    
    if (totalFailed === 0 && totalWarnings === 0) {
        console.log('\n🎉 All checks passed! Your refactoring is successful!');
    } else if (totalFailed === 0) {
        console.log('\n⚠️  All required checks passed, but there are some warnings.');
        console.log('Review the warnings above to ensure everything is working as expected.');
    } else {
        console.log('\n❌ Some checks failed! Please review the issues above.');
        console.log('\nTo fix:');
        console.log('1. Check the REFACTORING_GUIDE.md for protected patterns');
        console.log('2. Restore from backup if needed (./backup/backup-TIMESTAMP/)');
        console.log('3. Manually add back any missing critical styles');
    }
    
    return totalFailed === 0;
}

function checkForCommonIssues(filename) {
    if (!fs.existsSync(filename)) return [];
    
    const content = fs.readFileSync(filename, 'utf8');
    const issues = [];
    
    // Check for removed gradient text that should have a class
    const bareGradientPattern = /style="background:\s*linear-gradient\(135deg,\s*#c8102e.*-webkit-background-clip:\s*text/g;
    const bareMatches = content.match(bareGradientPattern);
    if (bareMatches && bareMatches.length > 10) {
        issues.push(`Found ${bareMatches.length} inline gradient text styles that could be refactored`);
    }
    
    // Check for white cards without classes
    const whiteCardPattern = /style="background:\s*white;.*border-radius:\s*12px/g;
    const whiteCardMatches = content.match(whiteCardPattern);
    if (whiteCardMatches && whiteCardMatches.length > 3) {
        issues.push(`Found ${whiteCardMatches.length} inline white card styles that could use card-white class`);
    }
    
    return issues;
}

// ==============================================
// MAIN EXECUTION
// ==============================================

function main() {
    console.log('\n🔍 Starting Style Verification...\n');
    console.log('This script checks that critical inline styles are preserved after refactoring.\n');
    
    const results = {};
    
    // Check HTML files
    Object.entries(criticalStyleChecks).forEach(([filename, checks]) => {
        results[filename] = checkFile(filename, checks);
        
        // Check for common issues
        const issues = checkForCommonIssues(filename);
        if (issues.length > 0) {
            console.log('\n💡 Optimization suggestions:');
            issues.forEach(issue => console.log(`   • ${issue}`));
        }
    });
    
    // Check CSS file
    const cssFile = 'modern-styles-enhanced.css';
    console.log('\n' + '='.repeat(80));
    console.log('                   CSS FILE VERIFICATION');
    console.log('='.repeat(80));
    results[cssFile] = verifyCSSFile(cssFile);
    
    // Generate summary
    const success = generateSummaryReport(results);
    
    console.log('\n');
    
    process.exit(success ? 0 : 1);
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { checkFile, verifyCSSFile, criticalStyleChecks };
