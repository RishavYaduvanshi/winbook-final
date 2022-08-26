from rest_framework.serializers import ModelSerializer,SerializerMethodField

from authn.serializers import UserSerializer
from .models import Post

class PostSerializer(ModelSerializer):
    
    def get_userName(self, obj):
        return str(obj.user.username)




    userName = SerializerMethodField()
    liked_cnt = SerializerMethodField()

    def get_liked_cnt(self, obj):
        return obj.liked_by.count()
    
    
    class Meta:
        model = Post
        
        fields = ('url', 'caption', 'liked_cnt', 'created_at', 'updated_at','pk', 'userName','user')
        read_only_fields = ('created_at', 'updated_at')
        extra_kwargs = {
            'url': {'required': True},
            'caption': {'required': True},
        }

    