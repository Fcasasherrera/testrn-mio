import { User } from '@/user'
import React from 'react'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

type Props = {
  selectedUser: User | null
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserModal: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
}) => {
  return (
    <Modal visible={!!selectedUser} animationType="slide">
      <View style={styles.modal}>
        {selectedUser && (
          <>
            <Image
              source={{ uri: selectedUser?.image }}
              style={styles.avatar}
            />
            <Text style={styles.title}>
              {selectedUser.firstName} {selectedUser.lastName}
            </Text>
            <Text>Email: {selectedUser.email}</Text>
            <Text>Phone: {selectedUser.phone}</Text>
            <Text>
              Location: {selectedUser.address.city},{' '}
              {selectedUser.address.country}
            </Text>
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={() => setSelectedUser(null)}>
          <Text style={{ color: 'blue' }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default UserModal; 