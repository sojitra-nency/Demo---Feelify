# Feelify

Feelify is an emotion-based book and video recommendation system designed to enhance your reading and viewing experiences based on your emotions. The application leverages emotion analysis to provide personalized recommendations, making it a unique and engaging platform for discovering new content.

## Tech Stack

- **Backend**: Python (Django Rest Framework)
- **Frontend**: Next.js (TypeScript)
- **UI**: Material UI
- **Database**: SQLite

## Features

### Authentication and Profile Management

- **JWT Authentication**: Secure authentication mechanism using JSON Web Tokens.
- **User Profile**: Users can update their profile information.
- **Change Password**: Users can change their password securely.

### Content Search and Recommendations

- **Video Search**: Available for free plan users to search for any videos.
- **Book Search**: Available for free plan users to search for any books.

### Recommendation System

- **Video Recommendation**: Basic plan feature where users receive video recommendations for five emotions - happy, sad, fear, surprise, and neutral.
- **Book Recommendation**: Basic plan feature where users receive book recommendations for five emotions - happy, sad, fear, surprise, and neutral.

### Emotion-Based Recommendations

- **Emotion-Based Recommendations**: Premium plan feature where users can capture their photo, perform emotion analysis, and receive recommendations. Emotions with a percentage above 10% are provided as dropdown options, along with another dropdown for book or video recommendations based on the user's selection.

### Subscription Plans

- **Monthly Subscription Plans**: 
  - **Free Plan**: Access to video and book search features.
  - **Basic Plan**: Access to video and book recommendations based on emotions.
  - **Premium Plan**: Access to emotion-based video and book recommendations using photo analysis.

### Feedback and Contact

- **Feedback**: Users can provide feedback, and sentiment analysis is performed on the feedback given.
- **Contact**: Users can contact the support team by filling out the contact form.

### Additional Information

- **About Us**: Users can learn more about the website and its owner.

## Getting Started

### Prerequisites

- Node.js
- Python
- SQLite

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/sojitra-nency/Demo---Feelify.git
   ```

2. Navigate to the project directory:
   ```sh
   cd backend
   ```

3. Install the backend dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Install the frontend dependencies:
   ```sh
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```sh
   python manage.py runserver
   ```

2. Start the frontend development server:
   ```sh
   cd frontend
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:
```env
NEXT_PUBLIC_HOST=http://localhost:8000
```

## Screenshots

Here are some screenshots of the Feelify application:

### Sign Up Page
![Sign Up Page](frontend\public\assets\Screenshots\Sign_Up_Page.PNG)

### Sign In Page
![Sign In Page](frontend\public\assets\Screenshots\Sign_In_Page.PNG)

### Forgot Password Page
![Forgot Password Page](frontend\public\assets\Screenshots\Forgot_Password.PNG)

### User Profile
![User Profile](frontend\public\assets\Screenshots\User_Profile_Page.PNG)

### Dashboard Page
![Dashboard Page](frontend\public\assets\Screenshots\Dashboard_page.PNG)

### Video Search
![Video Search](frontend\public\assets\Screenshots\Video_Search_Page.PNG)
![Video Search](frontend\public\assets\Screenshots\Video_Search_Page(1).PNG)

### Book Search
![Book Search](frontend\public\assets\Screenshots\Book_Search_Page.PNG)
![Book Search](frontend\public\assets\Screenshots\Book_Search_Page(1).PNG)

### Upgrade
![Upgrade](frontend\public\assets\Screenshots\Upgrade_Page.PNG)

### Emotion based Video and Book Recommendation 
![Emotion based Video and Book Recommendation](frontend\public\assets\Screenshots\Emotion_Detection_Page.PNG)
![Emotion based Video and Book Recommendation](frontend\public\assets\Screenshots\Emotion_Analysis.PNG)

### Video Recommendation
![Video Recommendation](frontend\public\assets\Screenshots\Video_Recommendation_Page.PNG)
![Video Recommendation](frontend\public\assets\Screenshots\Video_Recommendation_Page(1).PNG)
![Video Recommendation](frontend\public\assets\Screenshots\Video_Recommendation_Page(2).PNG)

### Book Recommendation
![Book Recommendation](frontend\public\assets\Screenshots\Book_Recommendation_Page.PNG)
![Book Recommendation](frontend\public\assets\Screenshots\Book_Recommendation_Page(1).PNG)
![Book Recommendation](frontend\public\assets\Screenshots\Book_Recommendation_Page(2).PNG)

### Feedback
![Feedback](frontend\public\assets\Screenshots\Feeback_Page.PNG)
![Feedback](frontend\public\assets\Screenshots\Feedback_Sentiment_Analysis.PNG)

### Contact
![Contact](frontend\public\assets\Screenshots\Contact_Page.PNG)

### About Us
![About Us](frontend\public\assets\Screenshots\About_Us_Page.PNG)

### 404 Not Found
![404 Not Found](frontend\public\assets\Screenshots\404_Not_Found_Page.PNG)

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Please ensure all changes are well-documented and tested.

---

Feelify - Bringing emotions to your reading and viewing experience.