from django.contrib import admin
from .models import Feedback, Contact, Upgrade, EmotionRecord

admin.site.register(Feedback)
admin.site.register(Contact)
admin.site.register(Upgrade)
admin.site.register(EmotionRecord)
