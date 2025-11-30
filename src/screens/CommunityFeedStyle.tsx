import { StyleSheet } from 'react-native';
import {
  BAckGround,
  WHITE_BACKGROUND,
  PRIMARY,
  SECONDARY_ACCENT,
  WHITE,
  GRAY_SHADE,
  GRAY_BORDER,
  LIGHTGREY,
  RED
} from '../common-styles/colors';
const INPUT_BG = LIGHTGREY;

export const CommunityFeedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BAckGround,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: WHITE_BACKGROUND,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_BORDER,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITE,
  },
  createButton: {
    backgroundColor: PRIMARY,
    padding: 8,
    borderRadius: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: WHITE_BACKGROUND,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAY_BORDER,
    marginBottom: 16,
    overflow: 'hidden',
  },
  postContentContainer: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: WHITE,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: GRAY_SHADE,
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    backgroundColor: LIGHTGREY,
  },
  description: {
    fontSize: 14,
    color: GRAY_SHADE,
    lineHeight: 20,
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: GRAY_BORDER,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    color: WHITE,
    marginLeft: 6,
    fontSize: 14,
  },
  commentSection: {
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderTopWidth: 1,
    borderTopColor: GRAY_BORDER,
  },
  commentsList: {
    maxHeight: 200,
    marginBottom: 12,
  },
  commentItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 6,
  },
  commentText: {
    color: WHITE,
    fontSize: 13,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    backgroundColor: INPUT_BG,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: WHITE,
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
  },
  // Modal Styles
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
    backgroundColor: INPUT_BG,
    borderRadius: 8,
    padding: 12,
    color: WHITE,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: GRAY_BORDER,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
  },
  imageIconBadge: {
      padding: 12,
      backgroundColor: INPUT_BG,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      borderWidth: 1,
      borderColor: GRAY_BORDER,
      borderLeftWidth: 0,
      marginBottom: 16,
      justifyContent: 'center',
      alignItems: 'center',
      height: 52 // Match input height roughly
  },
  helperText: {
      color: GRAY_SHADE,
      fontSize: 12,
      marginBottom: 16,
      fontStyle: 'italic',
  },
  postButton: {
    backgroundColor: PRIMARY,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  joinButton: {
    backgroundColor: SECONDARY_ACCENT,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  joinButtonText: {
    color: WHITE,
    fontWeight: 'bold',
  },
});
