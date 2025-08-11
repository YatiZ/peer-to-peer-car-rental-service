from django.contrib import admin
from .models import Car, CarOwner, CarFeature, CustomUser

class CarFeatureInline(admin.TabularInline):
    model = CarFeature
    extra = 1  # Number of empty feature forms to display

# @admin.register(CustomUser)
# class CustomUserAdmin():
#     model = CustomUser
    # fieldsets = UserAdmin.fieldsets + (
    #     (None, {'fields': ('user_type', 'avatar', 'phone', 'location', 'bio', 'rating', 'is_verified', 'joined_date')}),
    # )
    # add_fieldsets = UserAdmin.add_fieldsets + (
    #     (None, {'fields': ('user_type',)}),
    # )
    # list_display = ('username', 'email', 'user_type', 'is_staff', 'is_active')
    # list_filter = ('user_type', 'is_staff', 'is_active')

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