import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface ReviewItemProps {
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  reviewText: string;
}

const ReviewItem = ({ userName, rating, date, reviewText }: ReviewItemProps) => {
  const renderStars = () => {
    const stars: string[] = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '⭐' : '☆');
    }
    return (
      <View style={localStyles.ratingContainer}>
        <Text style={localStyles.star}>{stars.join('')}</Text>
      </View>
    );
  };

  return (
    <View style={localStyles.reviewCard}>
      <View style={localStyles.reviewHeader}>
        <View style={localStyles.userInfo}>
          <View style={localStyles.avatar}>
            <Text style={localStyles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={localStyles.userDetails}>
            <Text style={localStyles.userName}>{userName}</Text>
            {renderStars()}
          </View>
        </View>
        <Text style={localStyles.date}>{date}</Text>
      </View>
      <Text style={localStyles.reviewText}>{reviewText}</Text>
    </View>
  );
};

export const Review = () => {
  const reviews = [
    {
      id: 1,
      userName: 'Ahmed Mohamed',
      rating: 5,
      date: '2 дня назад',
      reviewText: 'Отличный сервис! Egypt Property Hub помогли мне найти идеальную квартиру в центре Каира. Профессиональная команда и быстрое оформление документов.',
    },
    {
      id: 2,
      userName: 'Sarah Ali',
      rating: 5,
      date: '1 неделю назад',
      reviewText: 'Очень довольна сотрудничеством с Egypt Property Hub. Быстро нашли вариант, который полностью соответствует моим требованиям. Рекомендую!',
    },
    {
      id: 3,
      userName: 'Omar Hassan',
      rating: 4,
      date: '2 недели назад',
      reviewText: 'Хороший опыт работы с Egypt Property Hub. Единственное - хотелось бы больше вариантов в определенном районе, но в целом все отлично.',
    },
  ];

  return (
    <ScrollView style={localStyles.container} contentContainerStyle={localStyles.content}>
      <View style={localStyles.header}>
        <Text style={localStyles.companyName}>Egypt Property Hub</Text>
        <Text style={localStyles.headerSubtitle}>Отзывы клиентов</Text>
      </View>

      <View style={localStyles.statsContainer}>
        <View style={localStyles.statItem}>
          <Text style={localStyles.statValue}>4.8</Text>
          <Text style={localStyles.statLabel}>Средний рейтинг</Text>
        </View>
        <View style={localStyles.statDivider} />
        <View style={localStyles.statItem}>
          <Text style={localStyles.statValue}>127</Text>
          <Text style={localStyles.statLabel}>Отзывов</Text>
        </View>
      </View>

      {reviews.map((review) => (
        // eslint-disable-next-line react/jsx-key
        <ReviewItem
          userName={review.userName}
          rating={review.rating}
          date={review.date}
          reviewText={review.reviewText}
        />
      ))}
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f19',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  companyName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#60a5fa',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#374151',
    marginHorizontal: 20,
  },
  reviewCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#60a5fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontSize: 16,
  },
  date: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '400',
  },
  reviewText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
