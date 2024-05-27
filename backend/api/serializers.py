from rest_framework import serializers
from .models import Feedback, Contact, Upgrade
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'user', 'emotion', 'rating', 'comment', 'timestamp']
        read_only_fields = ['user', 'timestamp']
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
class UpgradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upgrade
        fields = ['id', 'email', 'amount', 'payment_id', 'paid', 'access_level']
        read_only_fields = ['payment_id', 'start_date', 'end_date', 'paid', 'access_level']  
class VideoFileSerializer(serializers.Serializer):
    video_file = serializers.FileField()
