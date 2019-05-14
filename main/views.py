from django.http import JsonResponse

from . import generator

def generate(request):
    return JsonResponse(generator.generate(), safe=False)
