# Admin Dashboard Setup Guide

## Quick Start

### 1. Import and Use the Admin Dashboard

```tsx
// In your main App.tsx or routing file
import { AdminPanel } from '@/pages';

// Add to your routes
<Route path="/admin" element={<AdminPanel />} />

// Or use the demo component
import AdminDashboardDemo from '@/components/AdminDashboardDemo';
<Route path="/admin-demo" element={<AdminDashboardDemo />} />
```

### 2. Access the Dashboard

Navigate to `/admin` in your browser to access the full admin dashboard.

## Features Overview

### 🎛️ Dashboard Tab
- Real-time statistics and metrics
- Recent bookings overview
- Quick action buttons
- Revenue tracking

### 🎬 Movies Tab
- Add/Edit/Delete movies
- Upload posters and trailers
- Manage genres and ratings
- Filter by status (Now Showing, Coming Soon, Ended)

### 🏢 Theaters Tab
- Create and manage theaters
- Visual seat layout designer
- Configure aisles and disabled seats
- Real-time seat layout preview

### 📅 Schedules Tab
- Create movie showtimes
- Assign movies to theaters
- Set ticket prices
- Monitor seat occupancy

### 🏷️ Genres Tab
- Manage movie genres
- Color-coded categories
- Track usage across movies
- Prevent deletion of genres in use

### 🎫 Bookings Tab
- View all customer bookings
- Approve/cancel pending bookings
- Filter by status, date, customer
- Revenue analytics

## Responsive Design

The dashboard automatically adapts to different screen sizes:
- **Desktop**: Full sidebar navigation
- **Tablet/Mobile**: Collapsible hamburger menu
- **Touch-friendly**: Optimized for mobile interactions

## Customization

### Colors and Themes
Modify the color scheme by updating the Mantine theme or Tailwind classes in the component files.

### Adding New Sections
1. Create a new component in `src/components/admin/`
2. Add it to the `AdminTabType` enum in `src/types/AdminTypes.ts`
3. Update the navigation in `AdminLayout.tsx`
4. Add the component to `AdminPanel.tsx`

### Data Integration
Replace mock data with real API calls by updating the data fetching logic in each management component.

## Demo Data

The dashboard includes realistic mock data:
- 45+ movies across different genres
- 8 theaters with various seating configurations
- 150+ scheduled showtimes
- 1200+ customer bookings
- Revenue tracking and analytics

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

The dashboard is optimized for performance with:
- Lazy loading of components
- Efficient state management
- Responsive image loading
- Minimal re-renders

---

**Ready to manage your cinema! 🎬**