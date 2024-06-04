from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Contact, Feedback
from .serializers import ContactSerializer
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

class ContactViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.valid_contact_data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'message': 'This is a test message.'
        }

        self.invalid_contact_data = {
            'name': '',
            'email': 'invalid_email',  
            'message': ''
        }

    def test_create_valid_contact(self):
        response = self.client.post('http://127.0.0.1:8000/api/contact/', self.valid_contact_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        contact = Contact.objects.get()
        self.assertEqual(contact.name, self.valid_contact_data['name'])
        self.assertEqual(contact.email, self.valid_contact_data['email'])
        self.assertEqual(contact.message, self.valid_contact_data['message'])

    def test_create_invalid_contact(self):
        response = self.client.post('http://127.0.0.1:8000/api/contact/', self.invalid_contact_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)  

    def test_contact_serializer_validation(self):
        serializer = ContactSerializer(data=self.invalid_contact_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors) 

class FeedbackModelTestCase(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(email='test@gmail.com', password='testpassword')

    def test_create_valid_feedback(self):
        feedback = Feedback.objects.create(
            user=self.user,
            emotion='happy',
            rating=4,
            comment="Great experience!"
        )
        self.assertEqual(str(feedback), "test@gmail.com - happy")  
        self.assertEqual(feedback.sentiment, "neutral")     
        self.assertIsNotNone(feedback.timestamp)  

    def test_invalid_emotion(self):
        with self.assertRaises(ValidationError):
            feedback = Feedback(
                user=self.user,
                emotion='invalid_emotion', 
                rating=4,
                comment="Test"
            )
            feedback.full_clean() 

    def test_invalid_rating(self):
        with self.assertRaises(ValidationError):
            feedback = Feedback(
                user=self.user,
                emotion='happy',
                rating=-1,  
                comment="Test"
            )
            feedback.full_clean()
        
        with self.assertRaises(ValidationError):
            feedback = Feedback(
                user=self.user,
                emotion='happy',
                rating=6,
                comment="Test"
            )
            feedback.full_clean()

    def test_empty_comment(self):
        feedback = Feedback.objects.create(
            user=self.user,
            emotion='happy',
            rating=5,
            comment="" 
        )
        self.assertEqual(feedback.comment, "")
