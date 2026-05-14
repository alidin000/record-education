import logging

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import mixins, status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Branch, ContactSubmission
from .serializers import BranchSerializer, ContactSubmissionSerializer

logger = logging.getLogger("record")


class BranchViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = [AllowAny]


class ContactSubmissionViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = serializer.save()

        self._send_notification_email(submission)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def _send_notification_email(self, submission):
        subject = "Жаңы кайрылуу алынды"
        message = (
            f"Жаңы кайрылуу алынды!\n\n"
            f"Аты-жөнү: {submission.full_name}\n"
            f"Телефон: {submission.phone}\n"
            f"Курс: {submission.course_interest or 'Көрсөтүлгөн эмес'}\n"
            f"Билдирүү: {submission.message or 'Жок'}\n\n"
            f"Убакыт: {submission.created_at}\n"
        )
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=False,
            )
        except Exception:
            logger.exception("Failed to send contact notification email")
