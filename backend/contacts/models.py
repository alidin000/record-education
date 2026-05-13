from django.db import models


class Branch(models.Model):
    name_ky = models.CharField(max_length=200)
    name_ru = models.CharField(max_length=200)
    name_en = models.CharField(max_length=200)
    address_ky = models.TextField()
    address_ru = models.TextField()
    address_en = models.TextField()
    phone = models.CharField(max_length=20)
    whatsapp = models.CharField(max_length=20)
    instagram_url = models.URLField(blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    is_main = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Branches"

    def __str__(self):
        return self.name_ru


class ContactSubmission(models.Model):
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    message = models.TextField(blank=True)
    course_interest = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} - {self.phone}"
