from django.http import JsonResponse

from colorish.decorators import json_request
from . import generator

@json_request
def generate(request):
    schema = generator.generate(
        network_id=request.json['networkId']
    )
    return JsonResponse(schema)
