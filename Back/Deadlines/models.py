from django.db import models
from User.models import User


class Deadline(models.Model):
    subject = models.CharField(max_length=100)
    deadline_date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.subject} - {self.deadline_date}"
