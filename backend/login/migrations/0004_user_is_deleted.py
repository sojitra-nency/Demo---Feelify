# Generated by Django 5.0.4 on 2024-05-10 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0003_user_avatar_user_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]
