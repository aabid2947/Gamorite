import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  PRIMARY,
  WHITE,
  GRAY_SHADE,
  RED
} from '../common-styles/colors';
import { CommunityFeedStyles as styles } from './CommunityFeedStyle';
import { Comment ,Post} from '../common-styles/interface';
import { useAuth } from '../context/AuthContext';

const STORAGE_KEY = '@gamorite_posts';

const CommunityFeedScreen = () => {
  const { user, signIn, signOut } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  
  // New Post State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUri, setNewImageUri] = useState('');

  // Comment State
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      }
    } catch (error) {
      console.error('Failed to load posts', error);
    }
  };

  const savePosts = async (updatedPosts: Post[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Failed to save posts', error);
    }
  };

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      Alert.alert('Error', 'Please fill in title and description');
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      imageUri: newImageUri.trim() || `https://picsum.photos/seed/${Date.now()}/400/200`,
      likes: 0,
      isLiked: false,
      comments: [],
      createdAt: Date.now(),
    };

    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    
    // Reset and close
    setNewTitle('');
    setNewDescription('');
    setNewImageUri('');
    setIsModalVisible(false);
  };

  const handleSignIn = () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }
    signIn(username);
    setIsLoginModalVisible(false);
    setUsername('');
  };

  const handleLike = (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    });
    savePosts(updatedPosts);
  };

  const toggleCommentSection = (postId: string) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
      setCommentText('');
    }
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          text: commentText,
          createdAt: Date.now()
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });

    savePosts(updatedPosts);
    setCommentText('');
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.dateText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>

      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.postImage} resizeMode="cover" />
      ) : null}

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleLike(item.id)}
        >
          <Ionicons 
            name={item.isLiked ? "heart" : "heart-outline"} 
            size={20} 
            color={item.isLiked ? RED : WHITE} 
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => toggleCommentSection(item.id)}
        >
          <Ionicons name="chatbubble-outline" size={20} color={WHITE} />
          <Text style={styles.actionText}>{item.comments.length}</Text>
        </TouchableOpacity>
      </View>

      {expandedPostId === item.id && (
        <View style={styles.commentSection}>
          <FlatList
            data={item.comments}
            keyExtractor={(c) => c.id}
            renderItem={({ item: comment }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            )}
            style={styles.commentsList}
            scrollEnabled={true}
            nestedScrollEnabled={true}
          />
          
          <View style={styles.addCommentContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor={GRAY_SHADE}
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={() => handleAddComment(item.id)} style={styles.sendButton}>
              <Ionicons name="send" size={20} color={PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Feed</Text>
        {user ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={styles.createButton} onPress={() => setIsModalVisible(true)}>
              <Ionicons name="add" size={24} color={WHITE} />
            </TouchableOpacity>
            <TouchableOpacity onPress={signOut} style={{ marginLeft: 16 }}>
               <Text style={{ color: RED, fontWeight: 'bold' }}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setIsLoginModalVisible(true)} style={{ marginRight: 16 }}>
              <Text style={{ color: WHITE, fontWeight: 'bold', fontSize: 16 }}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLoginModalVisible(true)} style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Post</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color={WHITE} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor={GRAY_SHADE}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What's on your mind?"
              placeholderTextColor={GRAY_SHADE}
              value={newDescription}
              onChangeText={setNewDescription}
              multiline
            />

            <View style={styles.imageInputContainer}>
                <TextInput
                    style={[styles.input, {flex: 1, marginBottom: 0}]}
                    placeholder="Image URL (Optional)"
                    placeholderTextColor={GRAY_SHADE}
                    value={newImageUri}
                    onChangeText={setNewImageUri}
                />
                <View style={styles.imageIconBadge}>
                    <Ionicons name="image-outline" size={20} color={GRAY_SHADE} />
                </View>
            </View>
            <Text style={styles.helperText}>Leave empty for random image</Text>

            <TouchableOpacity style={styles.postButton} onPress={handleCreatePost}>
              <Text style={styles.postButtonText}>POST</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={isLoginModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsLoginModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enter Username</Text>
              <TouchableOpacity onPress={() => setIsLoginModalVisible(false)}>
                <Ionicons name="close" size={24} color={WHITE} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={GRAY_SHADE}
              value={username}
              onChangeText={setUsername}
            />

            <TouchableOpacity style={styles.postButton} onPress={handleSignIn}>
              <Text style={styles.postButtonText}>ENTER</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};


export default CommunityFeedScreen;
