from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models


SIZE_CHOICES = (
    ('mini', 'Mini'),
    ('mega', 'Mega')
)

def validate_file_size(file):
    max_size_kb = 50
    if file.size > max_size_kb * 1024:
        raise ValidationError(f'Files can not be larger than {max_size_kb}KB!')
    

# Create your models here.
class Cookie(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']
        
class CookieImage(models.Model):
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(
        upload_to='bakery/images',
        validators=[validate_file_size]
        )
    
    
class Recipe(models.Model):
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE, related_name='recipe_set')
    description = models.TextField(null=True, blank=True)
    ingredients = models.TextField()
    instructions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.cookie.name
    
    class Meta:
        ordering = ['cookie']
    
    
class Location(models.Model):
    title = models.CharField(max_length=100)
    
    def __str__(self):
        return self.title
    

class Dough(models.Model):
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE, related_name= 'dough_set')
    quantity = models.PositiveIntegerField(default=0)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.cookie.name
    
    class Meta:
        ordering = ['cookie', 'date_added']

class BakedCookie(models.Model):
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE, related_name= 'bakedcookie_set')
    size = models.CharField(max_length=50, choices=SIZE_CHOICES)
    quantity = models.PositiveIntegerField(default=0)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.cookie.name
    
    class Meta:
        ordering = ['cookie', 'size', 'date_added']
        
class Store(models.Model):
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE , related_name= 'store_set')
    size = models.CharField(max_length=50, choices=SIZE_CHOICES)
    quantity = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.cookie.name
    
    class Meta:
        ordering = ['cookie', 'size']
        verbose_name = 'Cookies In Store'
        unique_together = [['size', 'cookie']]
    
class Grocery(models.Model):
    title = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=0)
    description = models.TextField(null=True, blank=True)
    location = models.ForeignKey(Location, on_delete=models.PROTECT)
    order_link = models.URLField(max_length=250)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['title']
    


    
    
    