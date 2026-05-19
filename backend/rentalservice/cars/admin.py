from django.contrib import admin
from .models import Car, CarOwner, CarFeature, CustomUser, CarImages, PickupLocation


# @admin.register(CustomUser)
# class CustomUserAdmin():
#     model = CustomUser
admin.site.register(CustomUser)
    # fieldsets = UserAdmin.fieldsets + (
    #     (None, {'fields': ('user_type', 'avatar', 'phone', 'location', 'bio', 'rating', 'is_verified', 'joined_date')}),
    # )
    # add_fieldsets = UserAdmin.add_fieldsets + (
    #     (None, {'fields': ('user_type',)}),
    # )
    # list_display = ('username', 'email', 'user_type', 'is_staff', 'is_active')
    # list_filter = ('user_type', 'is_staff', 'is_active')

class CarFeatureInline(admin.TabularInline):
    model = CarFeature
    extra = 1  # Number of empty feature forms to display

class CarImagesInline(admin.TabularInline):
    model = CarImages
    extra= 1

class PickupLocationInline(admin.TabularInline):
    model = PickupLocation
    extra = 1

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'location', 'price', 'instant_book', 'plate_number')
    list_filter = ('transmission', 'fuel', 'instant_book')
    search_fields = ('name', 'location', 'owner__name', 'plate_number')
    inlines = [CarFeatureInline, CarImagesInline, PickupLocationInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'owner', 'location', 'distance', 'price', 'preview_image','plate_number')
        }),
        ('Specifications', {
            'fields': ('seats', 'transmission', 'fuel')
        }),
        ('Booking', {
            'fields': ('instant_book',)
        }),
        ('Coordinates', {
            'fields': ('latitude','longitude')
        }),
        ('Timestamps', {
            'fields': ('created_at','updated_at')
        }),
    )
    readonly_fields = ('created_at','updated_at')

@admin.register(CarOwner)
class CarOwnerAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

# No need to register CarFeature separately since it's inline with Car