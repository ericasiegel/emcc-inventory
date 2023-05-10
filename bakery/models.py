from django.db import models
from django.contrib.auth.models import User

SIZE_CHOICES = (
    ('mini', 'Mini'),
    ('mega', 'Mega')
)

# Create your models here.
class Cookie(models.Model):
    name = models.CharField(max_length=100)
    
    
class Recipe(models.Model):
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE)
    description = models.TextField(null=True)
    ingredients = models.TextField()
    instructions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    
class Storage(models.Model):
    title = models.CharField(max_length=100)
    
    
class Shelf(models.Model):
    SHELF_CHOICES = (
    ('top', 'Top Shelf'),
    ('middle', 'Middle Shelf'),
    ('bottom', 'Bottom Shelf'),
    )
    
    type = models.CharField(max_length=50, choices=SHELF_CHOICES)
    storage = models.ForeignKey(Storage, on_delete=models.CASCADE)


class Dough(models.Model):
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    location = models.ForeignKey(Shelf, on_delete=models.CASCADE)
    

class BakedCookie(models.Model):
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE)
    size = models.CharField(max_length=50, choices=SIZE_CHOICES)
    quantity = models.PositiveIntegerField(default=0)
    location = models.ForeignKey(Shelf, on_delete=models.CASCADE)
    
    
class Grocery(models.Model):
    title = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=0)
    description = models.TextField(null=True)
    order_link = models.URLField(max_length=250)
    

class Store(models.Model):
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE)
    size = models.CharField(max_length=50, choices=SIZE_CHOICES)
    quantity = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    
    
    