from rest_framework import generics
from .models import Insight
from .serializers import InsightSerializer
from django_filters.rest_framework import DjangoFilterBackend

class InsightListAPIView(generics.ListAPIView):
    queryset = Insight.objects.all()
    serializer_class = InsightSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['end_year', 'topic', 'sector', 'region', 'pestle', 'source', 'country', 'city','likelihood']
