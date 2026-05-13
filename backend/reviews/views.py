from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Achievement, Review
from .serializers import AchievementSerializer, ReviewSerializer


class ReviewViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = Review.objects.all()
        featured = self.request.query_params.get("featured")
        if featured == "true":
            qs = qs.filter(is_featured=True)
        return qs


class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [AllowAny]
