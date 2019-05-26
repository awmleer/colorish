import json
import os
import random

from django.contrib import auth
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Count
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods

from colorish.decorators import json_request, require_login
from main.models import Scheme
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
    schemes_count = Scheme.objects.filter(network_id=request.json['networkId']).count()
    use_cache = random.choices([True, False], weights=[max(0, schemes_count - 1000), 1000])
    if use_cache:
        i = random.randint(0, schemes_count - 1)
        scheme = Scheme.objects.order_by('id')[i]
    else:
        generated = generator.generate(
            network_id=request.json['networkId']
        )
        scheme = Scheme(
            view_count=1,
            time=generated['time'],
            network_id=generated['network_id'],
            quality=generated['quality'],
        )
        scheme.set_colors(generated['colors'])
        scheme.save()
    return JsonResponse(scheme.as_dict(user=user))


@staff_member_required
@require_http_methods(['GET'])
def bulk_generate(request, network_id):
    for i in range(20):
        generated = generator.generate(network_id=network_id)
        scheme = Scheme(view_count=1, time=generated['time'], network_id=generated['network_id'], quality=generated['quality'], )
        scheme.set_colors(generated['colors'])
        scheme.save()
    return HttpResponse('success')



@require_http_methods(['GET'])
def popular(request, network_id=None):
    user = request.user if request.user.is_authenticated else None
    schemes = Scheme.objects.annotate(liked_users_count=Count('liked_users')).order_by('-liked_users_count', '-id')
    ret = []
    if network_id:
        schemes = schemes.filter(network_id=network_id)
    for scheme in schemes[:9]:
        ret.append(scheme.as_dict(user=user))
    return JsonResponse(ret, safe=False)


@require_http_methods(['GET'])
def networks(request):
    ret = []
    for networkId in os.listdir('state-dict'):
        ret.append({
            'networkId': networkId,
            'schemeCount': Scheme.objects.filter(network_id=networkId).count(),
        })
    return JsonResponse(ret, safe=False)


@require_http_methods(['GET'])
def network(request, network_id):
    with open('state-dict/' + network_id + '/log.json') as json_file:
        ret = {
            'networkId': network_id,
            'schemeCount': Scheme.objects.filter(network_id=network_id).count(),
            'log': json.load(json_file),
        }
    return JsonResponse(ret)


@require_http_methods(['GET'])
def scheme_detail(request, scheme_id):
    user = request.user if request.user.is_authenticated else None
    s = Scheme.objects.get(id=scheme_id)
    s.view_count += 1
    s.save()
    return JsonResponse(s.as_dict(user=user))


@require_login
@require_http_methods(['GET'])
def toggle_like(request, scheme_id):
    scheme = Scheme.objects.get(id=scheme_id)
    u = request.user
    liked = scheme.liked_users.filter(id=u.id).exists()
    if liked:
        scheme.liked_users.remove(u)
    else:
        scheme.liked_users.add(u)
    return JsonResponse({
        'liked_count': scheme.like_count(),
        'liked': not liked,
    })


@require_login
@require_http_methods(['GET'])
def likes(request):
    user = request.user if request.user.is_authenticated else None
    ret = [s.as_dict(user) for s in request.user.likes.all()]
    return JsonResponse(ret, safe=False)

