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
import {StyleSheet} from 'react-native';
export const ProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BAckGround,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 150,
    opacity: 0.6,
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: PRIMARY,
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: SECONDARY_ACCENT,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BAckGround,
  },
  levelText: {
    color: WHITE,
    fontSize: 10,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: WHITE,
    marginBottom: 4,
  },
  gamertag: {
    fontSize: 16,
    color: GRAY_SHADE,
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PRIMARY,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  editButtonText: {
    color: PRIMARY,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: WHITE_BACKGROUND,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: GRAY_BORDER,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: WHITE,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: GRAY_SHADE,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: GRAY_BORDER,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITE,
    marginBottom: 16,
  },
  postCard: {
    backgroundColor: WHITE_BACKGROUND,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: GRAY_BORDER,
  },
  postImage: {
    width: '100%',
    height: 150,
  },
  postContent: {
    padding: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: WHITE,
    marginBottom: 4,
  },
  postDate: {
    fontSize: 12,
    color: GRAY_SHADE,
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    color: GRAY_SHADE,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: GRAY_SHADE,
    marginLeft: 6,
    fontSize: 12,
  },
  signOutButton: {
    marginHorizontal: 16,
    marginBottom: 30,
    padding: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: RED,
  },
  signOutText: {
    color: RED,
    fontWeight: 'bold',
    fontSize: 16,
  }
});