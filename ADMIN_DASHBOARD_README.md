# Cinema Admin Dashboard

A comprehensive, responsive admin dashboard for managing movies, theaters, schedules, genres, and bookings in a cinema ticket booking system.

## 🚀 Features

### Dashboard Overview
- **Real-time Statistics**: Total movies, active movies, theaters, schedules, and revenue
- **Recent Bookings**: Quick view of latest customer bookings
- **Quick Actions**: Fast access to common administrative tasks
- **Trend Indicators**: Visual representation of performance metrics

### Movie Management
- ✅ **CRUD Operations**: Create, read, update, delete movies
- 🎬 **Movie Details**: Name, duration, genres, release date, rating, status
- 🖼️ **Poster Management**: Upload and manage movie posters
- 🎥 **Trailer Integration**: YouTube trailer ID management
- 🔍 **Search & Filter**: Search by name, filter by status
- 📊 **Status Management**: Now Showing, Coming Soon, Ended

### Theater Management
- 🏢 **Theater CRUD**: Complete theater lifecycle management
- 💺 **Seat Layout Designer**: Visual seat arrangement configuration
- 🎯 **Capacity Management**: Total seats, rows, seats per row
- 🚫 **Disabled Seats**: Mark specific seats as unavailable
- 🛤️ **Aisle Configuration**: Define aisle positions for better layout
- 📍 **Location Tracking**: Theater location and status management
- 👁️ **Visual Seat Preview**: Real-time seat layout visualization

### Schedule Management
- 📅 **Show Scheduling**: Create and manage movie showtimes
- 🎭 **Movie-Theater Mapping**: Assign movies to specific theaters
- 💰 **Dynamic Pricing**: Set ticket prices per schedule
- 📊 **Occupancy Tracking**: Real-time seat availability monitoring
- 🔄 **Status Control**: Enable/disable schedules
- 📈 **Occupancy Analytics**: Visual occupancy percentage indicators

### Genre Management
- 🏷️ **Genre CRUD**: Complete genre management system
- 🎨 **Color Coding**: Visual color themes for genres
- 📝 **Descriptions**: Detailed genre descriptions
- 📊 **Usage Analytics**: Track genre usage across movies
- 🔒 **Protected Deletion**: Prevent deletion of genres in use

### Booking Management
- 🎫 **Booking Overview**: Comprehensive booking tracking
- 👤 **Customer Details**: Customer information and contact details
- 💳 **Payment Tracking**: Booking amounts and payment status
- 📊 **Status Management**: Confirmed, Pending, Cancelled bookings
- 🔍 **Advanced Filtering**: Search by customer, movie, date, status
- 📈 **Revenue Analytics**: Real-time revenue calculations
- ⚡ **Quick Actions**: Approve/cancel bookings with one click

## 🛠️ Technical Stack

- **Frontend**: React 19 + TypeScript
- **UI Framework**: Mantine v8 (Components, Hooks, Forms)
- **Styling**: Tailwind CSS v4
- **Icons**: Tabler Icons React
- **State Management**: React Hooks (useState, useForm)
- **Build Tool**: Vite
- **Type Safety**: Full TypeScript implementation

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop**: Full-featured experience with side navigation
- **Tablet**: Collapsible navigation with touch-friendly controls
- **Mobile**: Hamburger menu with optimized layouts

## 🎨 UI/UX Features

### Interactive Elements
- **Hover Effects**: Smooth transitions on interactive elements
- **Loading States**: Visual feedback for user actions
- **Modal Forms**: Clean, focused data entry experience
- **Toast Notifications**: Success/error feedback (ready for integration)

### Visual Indicators
- **Status Badges**: Color-coded status indicators
- **Progress Bars**: Occupancy and completion indicators
- **Trend Icons**: Up/down arrows for performance metrics
- **Color Themes**: Consistent color scheme throughout

### Data Visualization
- **Statistics Cards**: Key metrics at a glance
- **Seat Layout Viewer**: Interactive theater seat maps
- **Occupancy Charts**: Visual booking percentages
- **Revenue Tracking**: Financial performance indicators

## 📂 File Structure

```
src/
├── types/
│   └── AdminTypes.ts          # Admin-specific type definitions
├── components/admin/
│   ├── layout/
│   │   └── AdminLayout.tsx    # Main admin layout with navigation
│   ├── dashboard/
│   │   ├── AdminDashboard.tsx # Dashboard overview page
│   │   └── StatsCard.tsx      # Reusable statistics card
│   ├── movies/
│   │   └── MovieManagement.tsx # Movie CRUD operations
│   ├── theaters/
│   │   ├── TheaterManagement.tsx # Theater CRUD operations
│   │   └── SeatLayoutViewer.tsx  # Visual seat layout component
│   ├── schedules/
│   │   └── ScheduleManagement.tsx # Schedule CRUD operations
│   ├── genres/
│   │   └── GenreManagement.tsx    # Genre CRUD operations
│   ├── bookings/
│   │   └── BookingManagement.tsx  # Booking management
│   └── index.ts               # Component exports
└── pages/admin/
    └── AdminPanel.tsx         # Main admin panel container
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- React 19
- TypeScript 5+

### Installation
The admin dashboard is integrated into your existing React + Vite project. All dependencies are already included in your `package.json`.

### Usage

1. **Import the Admin Panel**:
```tsx
import { AdminPanel } from '@/pages';

// Use in your routing
<Route path="/admin" element={<AdminPanel />} />
```

2. **Access the Dashboard**:
Navigate to `/admin` in your application to access the full admin dashboard.

### Navigation
The dashboard uses a tab-based navigation system:
- **Dashboard**: Overview and statistics
- **Movies**: Movie management
- **Theaters**: Theater and seat management
- **Schedules**: Show scheduling
- **Genres**: Genre management
- **Bookings**: Booking oversight

## 🔧 Customization

### Adding New Features
1. Create new components in the appropriate `src/components/admin/` subdirectory
2. Add new types to `src/types/AdminTypes.ts`
3. Update the navigation in `AdminLayout.tsx`
4. Add the new tab to `AdminTabType` enum

### Styling Customization
- Modify Tailwind classes for layout adjustments
- Update Mantine theme in your main app configuration
- Customize colors in the component files

### Data Integration
Replace mock data with actual API calls:
1. Create API service functions
2. Implement React Query or similar for data fetching
3. Add loading and error states
4. Update form submission handlers

## 📊 Mock Data

The dashboard includes comprehensive mock data for demonstration:
- **Movies**: Sample movies with all required fields
- **Theaters**: Different theater configurations with seat layouts
- **Schedules**: Various showtimes and pricing
- **Bookings**: Customer bookings with different statuses
- **Genres**: Common movie genres with descriptions

## 🔐 Security Considerations

When integrating with a real backend:
- Implement proper authentication and authorization
- Validate all user inputs on both client and server
- Use HTTPS for all API communications
- Implement role-based access control
- Add audit logging for administrative actions

## 🎯 Future Enhancements

Potential improvements for production use:
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Analytics**: Charts and graphs for business insights
- **Bulk Operations**: Mass updates for movies and schedules
- **Export Functionality**: CSV/PDF export for reports
- **Advanced Filtering**: Date ranges, complex queries
- **User Management**: Admin user roles and permissions
- **Notification System**: Email/SMS notifications for bookings
- **Integration APIs**: Third-party movie databases, payment gateways

## 🐛 Known Limitations

- Mock data only (no backend integration)
- No real-time updates
- Limited validation on forms
- No file upload functionality (poster images)
- No advanced analytics or reporting

## 📝 License

This admin dashboard is part of your cinema booking system and follows the same license terms.

---

**Built with ❤️ using React, TypeScript, and Mantine UI**