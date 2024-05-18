from rest_framework import serializers
from .models import Feedback, Contact

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'user', 'emotion', 'rating', 'comment', 'timestamp']
        read_only_fields = ['user', 'timestamp']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'