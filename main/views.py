from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from colorish.decorators import json_request
from main.models import Schema
from . import generator

@require_http_methods(['POST'])
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


@require_http_methods(['GET'])
def popular(request):
    schemas = Schema.objects.order_by('-created_at')[:9] # TODO
    ret = []
    for schema in schemas:
        ret.append(schema.as_dict())
    return JsonResponse(ret, safe=False)
