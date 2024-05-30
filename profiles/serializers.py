from rest_framework import serializers
from .models import Profile


# Create a ProfileSerializer class and inherit from ModelSerializer and specify owner as a readonly field so it can't be edited
class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()        

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'first_name',
            'last_name', 'image', 'is_owner',
        ]