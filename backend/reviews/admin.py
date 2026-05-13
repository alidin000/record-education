from django.contrib import admin

from .models import Achievement, Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["student_name", "score", "year", "is_featured"]
    list_filter = ["year", "is_featured"]
    search_fields = ["student_name"]


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ["title_ru", "value", "order"]
    list_editable = ["order"]
