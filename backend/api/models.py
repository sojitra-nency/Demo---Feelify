from django.db import models
from django.conf import settings 
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone
from dateutil.relativedelta import relativedelta

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
    
class Upgrade(models.Model):
    email = models.EmailField(max_length=254)
    amount = models.IntegerField() 
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    payment_id = models.CharField(max_length=100)
    paid = models.BooleanField(default=False)
    ACCESS_LEVEL_CHOICES = (
        ('free', 'Free'),
        ('basic', 'Basic'),  
        ('premium', 'Premium'), 
    )
    access_level = models.CharField(max_length=10, choices=ACCESS_LEVEL_CHOICES, default='free')

    def save(self, *args, **kwargs):
        
        super().save(*args, **kwargs)

    def save(self, *args, **kwargs):
        if self.paid and not self.start_date:
            self.start_date = timezone.now().date()
            self.end_date = self.start_date + relativedelta(months=1)
            if self.paid and self.amount >= 400:  
                self.access_level = 'premium'
            elif self.paid and self.amount >= 200:
                self.access_level = 'basic'
        super().save(*args, **kwargs)