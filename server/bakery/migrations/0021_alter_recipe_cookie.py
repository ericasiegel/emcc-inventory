# Generated by Django 4.2.4 on 2024-02-06 23:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("bakery", "0020_cookie_image_delete_cookieimage"),
    ]

    operations = [
        migrations.AlterField(
            model_name="recipe",
            name="cookie",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="bakery.cookie"
            ),
        ),
    ]
