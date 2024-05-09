from rest_framework import serializers

class VideoFileSerializer(serializers.Serializer):
    video_file = serializers.FileField()