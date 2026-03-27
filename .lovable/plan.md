

## Plan: Rebrand buubra → puubra

### Summary
Replace all instances of "buubra" with "puubra" across the entire codebase, including brand name, domain references, email addresses, social handles, hashtags, and the logo asset filename.

### Files to Modify (17 files, ~244 replacements)

| File | Changes |
|------|---------|
| `index.html` | Title, meta tags, twitter handle |
| `src/index.css` | CSS comment |
| `src/components/layout/Header.tsx` | Logo import path, alt text |
| `src/components/layout/Footer.tsx` | Logo import, alt text, email (`hello@puubra.com`), copyright, newsletter text |
| `src/components/home/UGCGallery.tsx` | `@puubra`, `#puubraStyle` |
| `src/components/home/BrandStory.tsx` | Brand references |
| `src/components/home/HeroSection.tsx` | Brand references |
| `src/components/home/CustomerReviews.tsx` | Brand references |
| `src/pages/About.tsx` | Brand name, alt text |
| `src/pages/OurStory.tsx` | Brand references in timeline |
| `src/pages/Sustainability.tsx` | Brand references, email |
| `src/pages/FAQ.tsx` | Brand references, email |
| `src/pages/SizeGuide.tsx` | Email references |
| `src/pages/Contact.tsx` | Brand/email references |
| `src/pages/Returns.tsx` | Brand/email references |
| `src/pages/Shipping.tsx` | Brand references |
| `src/pages/Careers.tsx` | Brand references |

### Asset Rename
- Rename `src/assets/buubra-logo.png` → `src/assets/puubra-logo.png`
- Update import paths in Header.tsx and Footer.tsx

### Approach
Simple find-and-replace of `buubra` → `puubra` (case-sensitive) across all files, plus rename the logo asset file.

