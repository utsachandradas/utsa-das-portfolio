# Performance Optimization Guide

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP)
- **Target:** < 2.5 seconds
- **Optimizations implemented:**
  - Preload critical fonts
  - Lazy load below-the-fold images
  - Optimize hero images
  - Minimize render-blocking resources

### First Input Delay (FID)
- **Target:** < 100 milliseconds
- **Optimizations implemented:**
  - Debounce scroll and resize events
  - Defer non-critical JavaScript
  - Use passive event listeners
  - Minimize long tasks

### Cumulative Layout Shift (CLS)
- **Target:** < 0.1
- **Optimizations implemented:**
  - Reserve space for images (width/height attributes)
  - Avoid inserting content above existing content
  - Use transform animations instead of layout changes
  - Preload web fonts to prevent FOUT

## Image Optimization

### Best Practices
1. Use modern formats (WebP with fallbacks)
2. Implement responsive images with srcset
3. Add width/height attributes to prevent layout shift
4. Use lazy loading for below-the-fold images
5. Compress images before deployment

### Implementation
```html
<img 
  src="image.jpg" 
  alt="Description"
  width="800"
  height="600"
  loading="lazy"
  srcset="image-small.jpg 480w, image-medium.jpg 800w, image-large.jpg 1200w"
>
```

## CSS & JavaScript Optimization

### CSS
- Minify production CSS
- Remove unused CSS
- Use CSS variables for theming
- Avoid @import statements
- Use critical CSS inlining for above-the-fold content

### JavaScript
- Defer non-critical scripts with `defer` attribute
- Use async for analytics/tracking scripts
- Minify and bundle JavaScript
- Implement code splitting for large features
- Use service workers for offline support

## Font Optimization

### Current Setup
- Using Google Fonts with preconnect
- Font weights: 400, 500, 600, 700, 800, 900
- Font display: swap (prevents FOUT)

### Recommendations
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

## Caching Strategy

### Browser Caching (.htaccess)
- **Images:** 1 year
- **CSS/JS:** 1 month
- **Fonts:** 1 year
- **HTML:** 2 days

### Server-Side Caching
- Enable gzip compression
- Use CDN for static assets
- Implement cache busting for CSS/JS updates

## Network Optimization

### Techniques
1. **Preload critical resources:**
   ```html
   <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
   ```

2. **DNS prefetch for external domains:**
   ```html
   <link rel="dns-prefetch" href="https://fonts.googleapis.com">
   ```

3. **Prefetch next page resources:**
   ```html
   <link rel="prefetch" href="next-page.html">
   ```

## Monitoring & Testing

### Tools
- Google PageSpeed Insights
- WebPageTest
- Lighthouse CI
- Chrome DevTools Performance tab

### Key Metrics to Track
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)

### Performance Budget
- **HTML:** < 50 KB
- **CSS:** < 30 KB (minified)
- **JS:** < 50 KB (minified)
- **Images:** < 500 KB total
- **Total page size:** < 700 KB

## Deployment Checklist

- [ ] Minify CSS and JavaScript
- [ ] Optimize all images
- [ ] Enable gzip compression
- [ ] Set up browser caching
- [ ] Test with PageSpeed Insights
- [ ] Verify Core Web Vitals
- [ ] Test on 3G connection
- [ ] Test on mobile devices
- [ ] Verify accessibility
- [ ] Check SEO meta tags

## Continuous Improvement

1. Monitor Core Web Vitals in production
2. Set up alerts for performance regressions
3. Regular audits (monthly)
4. Update dependencies and frameworks
5. Implement new optimization techniques as they emerge
