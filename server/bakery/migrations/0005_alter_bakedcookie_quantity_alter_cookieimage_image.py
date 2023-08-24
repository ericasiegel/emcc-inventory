# Generated by Django 4.2.4 on 2023-08-18 19:04

import bakery.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bakery", "0004_cookieimage"),
    ]

    operations = [
        migrations.AlterField(
            model_name="bakedcookie",
            name="quantity",
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name="cookieimage",
            name="image",
            field=models.ImageField(
                upload_to="bakery/images", validators=[bakery.models.validate_file_size]
            ),
        ),
    ]