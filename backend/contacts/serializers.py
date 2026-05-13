from rest_framework import serializers

from .models import Branch, ContactSubmission


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = [
            "id", "name_ky", "name_ru", "name_en",
            "address_ky", "address_ru", "address_en",
            "phone", "whatsapp", "instagram_url",
            "latitude", "longitude", "is_main",
        ]


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ["id", "full_name", "phone", "message", "course_interest"]
