from django.db import models


class Review(models.Model):
    student_name = models.CharField(max_length=200)
    text_ky = models.TextField(blank=True)
    text_ru = models.TextField(blank=True)
    text_en = models.TextField(blank=True)
    score = models.PositiveIntegerField(help_text="ЖРТ/ОРТ score achieved")
    video_url = models.URLField(blank=True)
    photo = models.ImageField(upload_to="reviews/", blank=True)
    year = models.PositiveIntegerField()
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-year", "-score"]

    def __str__(self):
        return f"{self.student_name} - {self.score} балл"


class Achievement(models.Model):
    title_ky = models.CharField(max_length=200)
    title_ru = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200)
    description_ky = models.TextField(blank=True)
    description_ru = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    image = models.ImageField(upload_to="achievements/", blank=True)
    value = models.CharField(max_length=50, help_text="e.g. '200+', '8+', '50'")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title_ru
