from django.db import models
from django.conf import settings 
from django.core.validators import MaxValueValidator, MinValueValidator

class Feedback(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    emotion = models.CharField(max_length=10, choices=[
        ('happy', 'Happy'), ('sad', 'Sad'), ('neutral', 'Neutral'),
        ('fear', 'Fear'), ('surprise', 'Surprise')
    ])  
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.emotion}'
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()  
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} - {self.email}'