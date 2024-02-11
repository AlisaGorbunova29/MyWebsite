from django.db import models
from User.models import User

class Schedule(models.Model):
    day_of_week = models.CharField(max_length=20)
    class_number = models.IntegerField()
    subject = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.day_of_week} - {self.class_number}: {self.subject}"
