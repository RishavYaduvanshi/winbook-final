import imp
from django.shortcuts import render
from rest_framework import viewsets
from .models import Post
from .serializer import PostSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import Response, status
from rest_framework.decorators import action
# Create your views here.



class PostViewSet(viewsets.ModelViewSet):
    
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['user'] = request.user.pk
        
        
        serializer = self.get_serializer(data=data)
        
        serializer.is_valid(raise_exception=True)
        
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(methods=['post'], detail=True)
    def like(self, request, pk=None):
        try:
            post = self.get_object()
            hasLiked = post.liked_by.filter(pk=request.user.pk).exists()
            
            if(not hasLiked):
                post.liked_by.add(request.user)
            else:
                post.liked_by.remove(request.user)
            
            post.save()
            return Response({"likes_count":post.liked_by.count(),"liked_status":not hasLiked},status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

