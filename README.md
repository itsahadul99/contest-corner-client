# Contest Corner

Contest Corner is a user-friendly contest participant website where users can create accounts, participate in various contests, and engage in tasks to win rewards. The platform supports secure payment processing through the Stripe payment gateway, allowing users to pay entry fees for contests. 
-[live-link](https://contest-corner.web.app/)

## Features

- **User Registration and Authentication:** Users can create accounts and log in securely using JWT authentication.
- **Contest Participation:** Users can browse and participate in contests by paying entry fees through the Stripe payment gateway.
- **Leaderboard:** Users can view the leaderboard to track their performance and win rates in contests.
- **Task Submission:** Participants can submit tasks for the contests they've entered.
- **Search Functionality:** The website includes a search bar where users can search for contests based on tags.
- **Pagination and Tabs:** Contest pages are designed with pagination and tab implementation for easier navigation.
- **Role-based Access:** There are three roles: 
  - **User:** Can participate in contests.
  - **Creator:** Can create contests, review submissions, and declare winners.
  - **Admin:** Has control over user and contest management.
- **Unique Dashboards:** Each role has a unique dashboard tailored to their specific functionalities.
- **Technology Stack:** The website is built using Tailwind CSS for styling, React for frontend development, Express for backend development, MongoDB for the database, Firebase for additional functionalities, and React Hook Forms for form management.

## Installation

To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/programming-hero-web-course1/b9a12-client-side-itsahadul99.git

1. Navigate to both the server and client directories.
2. Set the following environment variables required for the application and Firebase:

    - `STRIPE_API_KEY`: Your Stripe API key for payment processing.
    - Other environment variables specific to your application and Firebase setup.

3. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm run dev