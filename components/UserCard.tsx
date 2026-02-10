import { User } from '@/user';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Added Image import

type UserCardProps = {
  item: User
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserCard: React.FC<UserCardProps> = ({ item, setSelectedUser }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedUser(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>
        <Text>
        {item.address.address}, {item.address.country}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
  },
})

export default UserCard
