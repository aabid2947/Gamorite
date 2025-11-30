import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Upload, X } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  WHITE_BACKGROUND,
  PRIMARY,
  WHITE,
  GRAY_SHADE,
  GRAY_BORDER,
  LIGHTGREY
} from '../common-styles/colors';

interface UserProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (username: string, avatarUri: string) => void;
  initialUsername?: string;
  initialAvatarUri?: string;
  title?: string;
  submitButtonText?: string;
}

const UserProfileModal = ({
  isVisible,
  onClose,
  onSubmit,
  initialUsername = '',
  initialAvatarUri = '',
  title = 'Edit Profile',
  submitButtonText = 'SAVE'
}: UserProfileModalProps) => {
  const [username, setUsername] = useState(initialUsername);
  const [avatarUri, setAvatarUri] = useState(initialAvatarUri);

  // Update local state when props change (e.g. opening modal with existing data)
  React.useEffect(() => {
    if (isVisible) {
        setUsername(initialUsername);
        setAvatarUri(initialAvatarUri);
    }
  }, [isVisible, initialUsername, initialAvatarUri]);

  const handleSelectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    onSubmit(username, avatarUri);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={WHITE} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={GRAY_SHADE}
            value={username}
            onChangeText={setUsername}
          />

          <View style={styles.imageInputContainer}>
              <TouchableOpacity onPress={handleSelectImage} style={styles.uploadButton}>
                  <Upload size={20} color={WHITE} style={{ marginRight: 8 }} />
                  <Text style={{ color: WHITE }}>Upload Avatar</Text>
              </TouchableOpacity>
          </View>
          
          {avatarUri ? (
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
              <Image source={{ uri: avatarUri }} style={{ width: 80, height: 80, borderRadius: 40 }} />
            </View>
          ) : null}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{submitButtonText}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: WHITE_BACKGROUND,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: GRAY_BORDER,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITE,
  },
  input: {
    backgroundColor: LIGHTGREY,
    borderRadius: 8,
    padding: 12,
    color: WHITE,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: GRAY_BORDER,
  },
  imageInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
  },
  uploadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.1)',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: GRAY_BORDER,
      width: '100%',
      marginBottom: 8,
  },
  submitButton: {
    backgroundColor: PRIMARY,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserProfileModal;
