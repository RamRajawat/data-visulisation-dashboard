import json
from datetime import datetime
from django.core.management.base import BaseCommand
from dashboard.models import Insight

def to_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return None

def parse_datetime(value):
    if not value:
        return None
    try:
        return datetime.strptime(value, "%B, %d %Y %H:%M:%S")
    except (ValueError, TypeError):
        return None

def safe_get(value, max_len=300):
    if value is None:
        return None
    value = str(value)
    if len(value) > max_len:
        return value[:max_len]
    return value if value != '' else None

class Command(BaseCommand):
    help = 'Import data from jsondata.json into PostgreSQL'

    def handle(self, *args, **kwargs):
        with open('jsondata.json', encoding='utf-8') as file:
            data = json.load(file)
            for item in data:
                try:
                    Insight.objects.create(
                        end_year=safe_get(item.get('end_year')),
                        intensity=to_int(item.get('intensity')),
                        sector=safe_get(item.get('sector')),
                        topic=safe_get(item.get('topic')),
                        insight=safe_get(item.get('insight'), 1000),  
                        url=safe_get(item.get('url'), 500),  
                        region=safe_get(item.get('region')),
                        start_year=safe_get(item.get('start_year')),
                        impact=safe_get(item.get('impact')),
                        added=parse_datetime(item.get('added')) or safe_get(item.get('added')),
                        published=parse_datetime(item.get('published')) or safe_get(item.get('published')),
                        country=safe_get(item.get('country')),
                        relevance=to_int(item.get('relevance')),
                        pestle=safe_get(item.get('pestle')),
                        source=safe_get(item.get('source')),
                        title=safe_get(item.get('title'), 1000),  
                        likelihood=to_int(item.get('likelihood')),
                        city=safe_get(item.get('city'))
                    )
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"Error importing record: {e}"))
                    continue

        self.stdout.write(self.style.SUCCESS('Data import completed.'))