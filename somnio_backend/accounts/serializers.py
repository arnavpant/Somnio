from rest_framework import serializers
from django.contrib.auth.models import User

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSettingsSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    journal_font = serializers.CharField(source="profile.journal_font", required=False)
    bg_color = serializers.CharField(source="profile.bg_color", required=False)

    class Meta:
        model = User
        fields = ["id", "username", "password", "journal_font", "bg_color"]


    def update(self, instance, validated_data):
        # Update username
        instance.username = validated_data.get('username', instance.username)
        # Update password if provided
        password = validated_data.get('password')
        if password:
            instance.set_password(password)
        instance.save()
        # Update user profile preferences
        profile_data = validated_data.get('profile', {})
        profile = instance.profile
        profile.journal_font = profile_data.get('journal_font', profile.journal_font)
        profile.bg_color = profile_data.get('bg_color', profile.bg_color)
        profile.save()
        return instance
