# 🚐 TravelTrucks — Web Application for Camper Rentals

TravelTrucks is a web application designed for renting campers and travel vans. Users can explore available campers, filter results by location and technical specifications, view detailed vehicle info with reviews, and make online bookings.

---

## 🚀 Demo & Deployment

- **Live Demo:** [Vercel Deployment Link](https://your-app-name.vercel.app)
- **Repository:** [GitHub Repository Link](https://github.com/your-username/travel-trucks)

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **State Management & Data Fetching:** `@tanstack/react-query` (`useInfiniteQuery`, `useQuery`)
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS / CSS
- **Icons:** React Icons (`react-icons`)

---

## ✨ Key Features

- **Home Page (`/`):** Hero section with a banner and call-to-action button redirecting to the catalog.
- **Catalog Page (`/catalog`):**
  - Interactive filters by location, camper form, engine type, and transmission.
  - Infinite pagination with the **Load More** button.
  - Responsive catalog cards aligned with Figma designs.
- **Camper Details Page (`/catalog/[camperId]`):**
  - Detailed specs, vehicle dimensions, and image gallery.
  - User reviews with 5-star rating visualizer.
  - Interactive booking form with notification upon successful reservation.

---

## 💻 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/travel-trucks.git](https://github.com/your-username/travel-trucks.git)
   cd travel-trucks
   ```
