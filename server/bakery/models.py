from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils.text import slugify
from django.db import models

# Choices for the 'size' field in various models
SIZE_CHOICES = (
    ('mini', 'Mini'),
    ('mega', 'Mega')
)

def validate_file_size(file):
    """
    Custom validation function to check if uploaded files exceed a maximum size.

    Args:
        file: The uploaded file object.

    Raises:
        ValidationError: If the file size exceeds the maximum allowed size.
    """
    max_size_kb = 400
    if file.size > max_size_kb * 1024:
        raise ValidationError(f'Files can not be larger than {max_size_kb}KB!')

# Create your models here.

class Cookie(models.Model):
    """
    Model representing a type of cookie.

    Attributes:
        name (str): The name of the cookie.
        slug (str): A slugified version of the cookie name.
        is_active (bool): Indicates whether the cookie is currently active.

    Methods:
        __str__(): Returns a string representation of the cookie.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    image = models.ImageField(
        upload_to='bakery/images',
        validators=[validate_file_size],
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Cookie, self).save(*args, **kwargs)

# class CookieImage(models.Model):
#     """
#     Model representing images associated with a cookie.

#     Attributes:
#         cookie (ForeignKey): The cookie associated with the image.
#         image (ImageField): The image file of the cookie.

#     Note:
#         Images are validated using the validate_file_size function.
#     """
#     cookie = models.OneToOneField(Cookie, on_delete=models.CASCADE, related_name='image')
#     image = models.ImageField(
#         upload_to='bakery/images',
#         validators=[validate_file_size]
#     )

class Location(models.Model):
    """
    Model representing a location.

    Attributes:
        title (str): The title or name of the location.

    Methods:
        __str__(): Returns a string representation of the location.
    """
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Dough(models.Model):
    """
    Model representing dough for a specific cookie type.

    Attributes:
        cookie (ForeignKey): The cookie associated with the dough.
        quantity (int): The quantity of dough available.
        location (ForeignKey): The location where the dough is stored.
        date_added (DateTimeField): The date and time when the dough was added.

    Methods:
        __str__(): Returns a string representation of the associated cookie.
    """
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE, related_name='dough_set')
    quantity = models.PositiveIntegerField()
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.cookie.name

    class Meta:
        ordering = ['cookie', 'date_added']

class BakedCookie(models.Model):
    """
    Model representing baked cookies.

    Attributes:
        cookie (ForeignKey): The type of cookie that was baked.
        size (str): The size of the baked cookies.
        quantity (int): The quantity of baked cookies available.
        location (ForeignKey): The location where the cookies are stored.
        date_added (DateTimeField): The date and time when the cookies were added.

    Methods:
        __str__(): Returns a string representation of the associated cookie.
    """
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE, related_name='bakedcookie_set')
    size = models.CharField(max_length=50, choices=SIZE_CHOICES)
    quantity = models.PositiveIntegerField()
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.cookie.name

    class Meta:
        ordering = ['cookie', 'size', 'date_added']

class Store(models.Model):
    """
    Model representing cookies available in a store.

    Attributes:
        cookie (ForeignKey): The type of cookie available in the store.
        size (str): The size of the cookies.
        quantity (int): The quantity of cookies available in the store.
        last_updated (DateTimeField): The date and time when the record was last updated.
        updated_by (ForeignKey): The user who last updated the record.

    Methods:
        __str__(): Returns a string representation of the associated cookie.
    """
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE, related_name='store_set')
    size = models.CharField(max_length=50, choices=SIZE_CHOICES)
    quantity = models.PositiveIntegerField()
    last_updated = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.cookie.name

    class Meta:
        ordering = ['cookie', 'size']
        verbose_name = 'Cookies In Store'
        unique_together = [['size', 'cookie']]

class Ingredient(models.Model):
    """
    Model representing an ingredient.

    Attributes:
        name (str): The name of the ingredient.

    Methods:
        __str__(): Returns a string representation of the ingredient.
    """
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    """
    Model representing a recipe for a specific cookie type.

    Attributes:
        cookie (ForeignKey): The type of cookie the recipe is for.
        description (TextField): A description of the recipe.
        ingredients (ManyToManyField): Ingredients used in the recipe (through RecipeIngredient).
        instructions (ManyToManyField): Instructions for making the recipe.
        created_at (DateTimeField): The date and time when the recipe was created.
        last_updated (DateTimeField): The date and time when the recipe was last updated.
        modified_by (ForeignKey): The user who last modified the recipe.

    Methods:
        __str__(): Returns a string representation of the associated cookie.
    """
    cookie = models.ForeignKey(Cookie, on_delete=models.CASCADE, related_name='recipe_set')
    notes = models.TextField(null=True, blank=True)
    ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredient')
    # instructions = models.ManyToManyField(RecipeInstruction)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.cookie.name

    class Meta:
        ordering = ['cookie']
        

class RecipeInstruction(models.Model):
    """
    Model representing an instruction in a recipe.

    Attributes:
        instruction (TextField): The text of the instruction.

    Methods:
        __str__(): Returns a string representation of the instruction.
    """
    instruction = models.TextField(max_length=255)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='instructions')

    def __str__(self):
        return self.instruction
    

class RecipeIngredient(models.Model):
    """
    Model representing an ingredient in a recipe.

    Attributes:
        ingredient (ForeignKey): The ingredient used in the recipe.
        recipe (ForeignKey): The recipe to which the ingredient belongs.
        quantity (int): The quantity of the ingredient required.
        unit (str): The unit of measurement for the quantity (optional).

    Note:
        This model is used to associate ingredients with recipes.
    """
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit = models.CharField(max_length=50, blank=True, null=True)

class Grocery(models.Model):
    """
    Model representing grocery items.

    Attributes:
        ingredient (ForeignKey): The ingredient associated with the grocery item.
        quantity (int): The quantity of the grocery item.
        unit (str): The unit of measurement for the quantity (optional).
        description (TextField): A description of the grocery item (optional).
        location (ForeignKey): The location where the grocery item is stored.
        order_link (URLField): A link for ordering the grocery item (optional).

    Methods:
        Meta:
            ordering (list): Specifies the default ordering of grocery items by ingredient name.
    """
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    location = models.ForeignKey(Location, on_delete=models.PROTECT)
    order_link = models.URLField(max_length=250, null=True, blank=True)

    class Meta:
        ordering = ['ingredient']
