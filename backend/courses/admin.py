from django.contrib import admin

from .models import Course, CourseCategory, Schedule


class ScheduleInline(admin.TabularInline):
    model = Schedule
    extra = 1


@admin.register(CourseCategory)
class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ["name_ru", "name_ky", "slug"]
    prepopulated_fields = {"slug": ("name_en",)}


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ["title_ru", "category", "duration", "price", "start_date", "is_active"]
    list_filter = ["category", "is_active"]
    search_fields = ["title_ru", "title_ky", "title_en"]
    inlines = [ScheduleInline]
