from django.contrib import admin
from .models import Car, CarOwner, CarFeature

class CarFeatureInline(admin.TabularInline):
    model = CarFeature
    extra = 1  # Number of empty feature forms to display

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'location', 'price', 'rating', 'instant_book')
    list_filter = ('transmission', 'fuel', 'instant_book')
    search_fields = ('name', 'location', 'owner__name')
    inlines = [CarFeatureInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'owner', 'location', 'distance', 'price', 'image')
        }),
        ('Specifications', {
            'fields': ('seats', 'transmission', 'fuel')
        }),
        ('Ratings', {
            'fields': ('rating', 'review_count')
        }),
        ('Booking', {
            'fields': ('instant_book',)
        }),
    )

@admin.register(CarOwner)
class CarOwnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating')
    search_fields = ('name',)

# No need to register CarFeature separately since it's inline with Car