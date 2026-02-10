import UserCard from '@/components/UserCard'
import UserModal from '@/components/UserModal'
import { useUsers } from '@/hooks/useUsers'
import React from 'react'
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'

export default function HomeScreen() {
  const {
    users,
    loading,
    error,
    refreshing,
    selectedUser,
    setSelectedUser,
    searchText,
    setSearchText,
    onRefresh,
    loadMore,
  } = useUsers()

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Button title="Retry" onPress={onRefresh} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <UserCard item={item} setSelectedUser={setSelectedUser} />
        )}
        ListEmptyComponent={<Text>No results</Text>}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={5}
      />

      <UserModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 32,
    backgroundColor: 'white',
  },
  center: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
})
