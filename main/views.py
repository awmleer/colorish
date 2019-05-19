from django.http import JsonResponse

from colorish.decorators import json_request
from main.models import Schema
from . import generator

@json_request
def generate(request):
    generated = generator.generate(
        network_id=request.json['networkId']
    )
    schema = Schema(
        view_count=1,
        time=generated['time'],
        network_id=generated['network_id']
    )
    schema.set_colors(generated['colors'])
    schema.save()
    return JsonResponse(schema.as_dict())
