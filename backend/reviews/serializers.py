from rest_framework import serializers

from .models import Achievement, Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id", "student_name",
            "text_ky", "text_ru", "text_en",
            "score", "video_url", "photo", "year", "is_featured",
        ]


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = [
            "id", "title_ky", "title_ru", "title_en",
            "description_ky", "description_ru", "description_en",
            "image", "value", "order",
        ]
