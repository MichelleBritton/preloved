# Generated by Django 5.0.6 on 2024-05-30 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='default_profile_p9bf83', upload_to='images/'),
        ),
    ]
