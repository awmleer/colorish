import json
import os

from django.contrib import auth
from django.db.models import Count
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from colorish.decorators import json_request, require_login
from main.models import Schema
from . import generator


@require_http_methods(['GET'])
def me(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'username': request.user.username,
        })
    else:
        return JsonResponse(None, safe=False)


@require_http_methods(['POST'])
@json_request
def login(request):
    user = auth.authenticate(username=request.json['username'], password=request.json['password'])
    if user is None:
        return JsonResponse(False, safe=False)
    else:
        auth.login(request, user)
        return JsonResponse(True, safe=False)


@require_http_methods(['POST'])
@json_request
def generate(request):
    user = request.user if request.user.is_authenticated else None
    generated = generator.generate(
        network_id=request.json['networkId']
    )
    schema = Schema(
        view_count=1,
        time=generated['time'],
        network_id=generated['network_id'],
        quality=generated['quality'],
    )
    schema.set_colors(generated['colors'])
    schema.save()
    return JsonResponse(schema.as_dict(user=user))


@require_http_methods(['GET'])
def popular(request, network_id=None):
    user = request.user if request.user.is_authenticated else None
    schemas = Schema.objects.annotate(liked_users_count=Count('liked_users')).order_by('-liked_users_count', '-id')
    ret = []
    if network_id:
        schemas = schemas.filter(network_id=network_id)
    for schema in schemas[:9]:
        ret.append(schema.as_dict(user=user))
    return JsonResponse(ret, safe=False)


@require_http_methods(['GET'])
def networks(request):
    ret = []
    for networkId in os.listdir('state-dict'):
        ret.append({
            'networkId': networkId,
            'schemaCount': Schema.objects.filter(network_id=networkId).count(),
        })
    return JsonResponse(ret, safe=False)


@require_http_methods(['GET'])
def network(request, network_id):
    with open('state-dict/' + network_id + '/log.json') as json_file:
        ret = {
            'networkId': network_id,
            'schemaCount': Schema.objects.filter(network_id=network_id).count(),
            'log': json.load(json_file),
        }
    return JsonResponse(ret)


@require_http_methods(['GET'])
def schema(request, schema_id):
    user = request.user if request.user.is_authenticated else None
    s = Schema.objects.get(id=schema_id)
    s.view_count += 1
    s.save()
    return JsonResponse(s.as_dict(user=user))


@require_login
@require_http_methods(['GET'])
def toggle_like(request, schema_id):
    s = Schema.objects.get(id=schema_id)
    u = request.user
    liked = s.liked_users.filter(id=u.id).exists()
    if liked:
        s.liked_users.remove(u)
    else:
        s.liked_users.add(u)
    return JsonResponse({
        'liked_count': s.like_count(),
        'liked': not liked,
    })

