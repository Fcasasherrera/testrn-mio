import { User } from '@/user'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

const PAGE_SIZE = 10

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)

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

  const onRefresh = () => {
    setRefreshing(true)
    setPage(1)
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

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

  return {
    users: paginatedUsers,
    loading,
    error,
    refreshing,
    selectedUser,
    setSelectedUser,
    searchText,
    setSearchText,
    onRefresh,
    loadMore,
  }
}
