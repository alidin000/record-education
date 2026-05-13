from django.contrib import admin

from .models import Branch, ContactSubmission


@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ["name_ru", "phone", "is_main"]
    list_filter = ["is_main"]


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ["full_name", "phone", "course_interest", "created_at", "is_processed"]
    list_filter = ["is_processed", "created_at"]
    readonly_fields = ["created_at"]
