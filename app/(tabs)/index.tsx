import UserCard from '@/components/UserCard'
import UserModal from '@/components/UserModal'
import { User } from '@/user'
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const fetchUsers = async () => {
    try {
      setError(null)
      setLoading(true)
      const { data } = await axios.get<{ users: User[] }>(
        'https://dummyjson.com/users?limit=150'
      )
      setUsers(data.users)
    } catch (err) {
      setError('Failed to load users')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    setPage(1)
    fetchUsers()
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText)
      setPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [searchText])

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users
    return users.filter(user =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    )
  }, [users, debouncedSearch])

  const paginatedUsers = useMemo(() => {
    const start = 0
    const end = page * PAGE_SIZE
    return filteredUsers.slice(start, end)
  }, [filteredUsers, page])

  const loadMore = () => {
    if (paginatedUsers.length < filteredUsers.length) {
      setPage(prev => prev + 1)
    }
  }

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
        <Button title="Retry" onPress={fetchUsers} />
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
        data={paginatedUsers}
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
