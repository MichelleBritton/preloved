
from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from adverts.models import Advert
from likes.models import Like


class AdvertSerializer(serializers.ModelSerializer):
    """
    AdvertSerializer class which inherits from ModelSerializer
    Specify owner as a readonly field so it can't be edited
    """

    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()   
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')   
    profile_name = serializers.ReadOnlyField(source='owner.profile.first_name')    
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    like_id = serializers.SerializerMethodField()
    image_2 = serializers.ImageField(
        required=False,
        max_length=None,
        allow_empty_file=True,
        use_url=True
    ) 
    image_3 = serializers.ImageField(
        required=False,
        max_length=None,
        allow_empty_file=True,
        use_url=True
    ) 
    image_4 = serializers.ImageField(
        required=False,
        max_length=None,
        allow_empty_file=True,
        use_url=True
    ) 

    def get_created_at(self, obj):
        return naturaltime(obj.created_at)
    
    def get_updated_at(self, obj):
        return naturaltime(obj.updated_at)

    def validate_image_1(self, value):
        """
        Validate image_1 size.
        Check if file size is bigger than 2MB and width and
        height are no larger than 1024px
        """
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                'Image size larger than 2MB!'
            )
        if value.image.width > 1024:
            raise serializers.ValidationError(
                'Image width larger than 1024px!'
            )
        if value.image.height > 1024:
            raise serializers.ValidationError(
                'Image height larger than 1024px!'
            )
        # return original value passed into our validate_image function
        return value
    
    def validate_image_2(self, value):
        """
        Validate image_2 size.
        Check if file size is bigger than 2MB and width and
        height are no larger than 1024px
        """
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                'Image size larger than 2MB!'
            )
        if value.image.width > 1024:
            raise serializers.ValidationError(
                'Image width larger than 1024px!'
            )
        if value.image.height > 1024:
            raise serializers.ValidationError(
                'Image height larger than 1024px!'
            )
        # return original value passed into our validate_image function
        return value
    
    def validate_image_3(self, value):
        """
        Validate image_3 size.
        Check if file size is bigger than 2MB and width and
        height are no larger than 1024px
        """
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                'Image size larger than 2MB!'
            )
        if value.image.width > 1024:
            raise serializers.ValidationError(
                'Image width larger than 1024px!'
            )
        if value.image.height > 1024:
            raise serializers.ValidationError(
                'Image height larger than 1024px!'
            )
        # return original value passed into our validate_image function
        return value
    
    def validate_image_4(self, value):
        """
        Validate image_4 size.
        Check if file size is bigger than 2MB and width and
        height are no larger than 1024px
        """
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                'Image size larger than 2MB!'
            )
        if value.image.width > 1024:
            raise serializers.ValidationError(
                'Image width larger than 1024px!'
            )
        if value.image.height > 1024:
            raise serializers.ValidationError(
                'Image height larger than 1024px!'
            )
        # return original value passed into our validate_image function
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, advert=obj
            ).first()
            return like.id if like else None
        return None

    class Meta:
        model = Advert
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'title',
            'description', 'location', 'price', 'category',
            'deliver', 'image_1', 'image_2', 'image_3', 'image_4',
            'is_owner', 'profile_id', 'profile_name', 'profile_image', 'like_id'
        ]


class CategorySerializer(serializers.Serializer):
    value = serializers.CharField()
    label = serializers.CharField()


class LocationSerializer(serializers.Serializer):
    value = serializers.CharField()
    label = serializers.CharField()

class DeliverSerializer(serializers.Serializer):
    value = serializers.CharField()
    label = serializers.CharField()