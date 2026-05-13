from django.contrib import admin

from .models import Branch, ContactSubmission


@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ["name_ru", "phone", "whatsapp", "is_main"]
    list_filter = ["is_main"]
    fieldsets = (
        ("Names", {
            "fields": ("name_ky", "name_ru", "name_en"),
        }),
        ("Addresses", {
            "fields": ("address_ky", "address_ru", "address_en"),
        }),
        ("Contact", {
            "fields": ("phone", "whatsapp", "instagram_url"),
        }),
        ("Map", {
            "fields": ("latitude", "longitude", "is_main"),
        }),
    )


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ["full_name", "phone", "course_interest", "created_at", "is_processed"]
    list_filter = ["is_processed", "created_at"]
    list_editable = ["is_processed"]
    readonly_fields = ["created_at"]
    search_fields = ["full_name", "phone"]
    actions = ["mark_processed"]

    @admin.action(description="Mark selected as processed")
    def mark_processed(self, request, queryset):
        updated = queryset.update(is_processed=True)
        self.message_user(request, f"{updated} submission(s) marked as processed.")
