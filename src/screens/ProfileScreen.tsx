import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Heart } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import {
  BAckGround,
  WHITE_BACKGROUND,
  PRIMARY,
  SECONDARY_ACCENT,
  WHITE,
  GRAY_SHADE,
  GRAY_BORDER,
  RED
} from '../common-styles/colors';
import { Post } from '../common-styles/interface';
import { ProfileScreenStyles as styles } from './ProfileStyle';
import UserProfileModal from '../components/UserProfileModal';

// Mock Data for "My Posts"
const MOCK_USER_POSTS: Post[] = [
  {
    id: '101',
    title: 'My Gaming Setup 2025',
    description: 'Finally completed my dream setup with triple monitors and RGB everywhere!',
    imageUri: 'https://picsum.photos/id/1/400/200',
    likes: 120,
    isLiked: true,
    comments: [],
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: '102',
    title: 'Ranked Match Highlights',
    description: 'Check out this insane clutch I pulled off last night.',
    imageUri: 'https://picsum.photos/id/2/400/200',
    likes: 85,
    isLiked: false,
    comments: [],
    createdAt: Date.now() - 86400000 * 5,
  }
];

const ProfileScreen = ({ navigation }: any) => {
  const { user, signOut, updateProfile } = useAuth();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  
  // Default Guest Profile if no user is logged in
  const profileData = user ? {
    name: user.displayName || 'Gamorite User',
    gamertag: `@${user.displayName?.replace(/\s/g, '').toLowerCase() || 'gamer'}`,
    avatar: user.photoURL || 'https://i.pravatar.cc/300',
    level: 42,
    xp: '12,450 XP',
    postsCount: 12,
    followers: '1.2k',
    gamerScore: '8,540'
  } : {
    name: 'Guest User',
    gamertag: '@guest',
    avatar: 'https://i.pravatar.cc/300?u=guest',
    level: 1,
    xp: '0 XP',
    postsCount: 0,
    followers: '0',
    gamerScore: '0'
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Image source={{ uri: item.imageUri }} style={styles.postImage} />
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.postDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.postStats}>
            <Heart size={16} color={RED} fill={RED} />
            <Text style={styles.statText}>{item.likes}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image 
            source={{ uri: 'https://picsum.photos/800/400?grayscale' }} 
            style={styles.coverImage} 
          />
          <View style={styles.profileInfoContainer}>
            <View style={styles.avatarContainer}>
                <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
                <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>LVL {profileData.level}</Text>
                </View>
            </View>
            <Text style={styles.userName}>{profileData.name}</Text>
            <Text style={styles.gamertag}>{profileData.gamertag}</Text>
            
            {user && (
              <TouchableOpacity style={styles.editButton} onPress={() => setIsEditModalVisible(true)}>
                  <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{profileData.postsCount}</Text>
                <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{profileData.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{profileData.gamerScore}</Text>
                <Text style={styles.statLabel}>Score</Text>
            </View>
        </View>

        {/* My Posts Section */}
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <FlatList
                data={MOCK_USER_POSTS}
                renderItem={renderPost}
                keyExtractor={item => item.id}
                scrollEnabled={false} // Since it's inside a ScrollView
            />
        </View>
        
        {user && (
            <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        )}

        {user && (
          <UserProfileModal
            isVisible={isEditModalVisible}
            onClose={() => setIsEditModalVisible(false)}
            onSubmit={(username, avatarUri) => {
              updateProfile(username, avatarUri);
              setIsEditModalVisible(false);
            }}
            initialUsername={user.displayName || ''}
            initialAvatarUri={user.photoURL || ''}
            title="Edit Profile"
            submitButtonText="SAVE CHANGES"
          />
        )}

      </ScrollView>
    </SafeAreaView>
  );
};


export default ProfileScreen;
