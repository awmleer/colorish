from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from sample_generator import sample

def generate(request):
    return JsonResponse(sample(), safe=False)
