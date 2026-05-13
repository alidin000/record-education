from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny

from .models import Branch, ContactSubmission
from .serializers import BranchSerializer, ContactSubmissionSerializer


class BranchViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = [AllowAny]


class ContactSubmissionViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [AllowAny]
