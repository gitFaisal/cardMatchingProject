from django.shortcuts import render


def index(request):
    return render(request,'cardgame/index.html')
