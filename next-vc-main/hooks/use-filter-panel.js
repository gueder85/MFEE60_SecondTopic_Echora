import { useState, useEffect } from 'react'
import { useFetch } from '@/hooks/use-fetch'

export function useFilterPanel() {
  const { data } = useFetch('http://localhost:3005/api/activities/options')

  const city = [
    '基隆市', '台北市', '新北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '台中市', '彰化縣', '南投縣',
    '雲林縣', '嘉義市', '嘉義縣', '台南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣',
    '澎湖縣', '金門縣', '連江縣'
  ]

  const initDate = () => {
    const start = new Date()
    const end = new Date(start)
    end.setMonth(end.getMonth() + 1)
    return [start.toISOString().split('T')[0], end.toISOString().split('T')[0]]
  }

  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedPrice, setSelectedPrice] = useState(5000)
  const [selectedDate, setSelectedDate] = useState(initDate())
  const [error, setError] = useState('')

  useEffect(() => {
    if (data) {
      setSelectedCategories(data.categories.map((v, i) => ({ id: i + 1, name: v.name, checked: false })))
      setSelectedGenres(data.genres.map((v, i) => ({ id: i + 1, name: v.name, checked: false })))
    }
  }, [data])

  useEffect(() => {
    setError(selectedDate[0] > selectedDate[1] ? '活動開始日期應該早於結束日期' : '')
  }, [selectedDate])

  const resetFilters = () => {
    setSelectedCategories(prev => prev.map(v => ({ ...v, checked: false })))
    setSelectedGenres(prev => prev.map(v => ({ ...v, checked: false })))
    setSelectedCity('')
    setSelectedPrice(5000)
    setSelectedDate(initDate())
  }

  const handleDateChange = (date) => setSelectedDate(date)

  return {
    selectedCategories,
    selectedGenres,
    selectedCity,
    selectedPrice,
    selectedDate,
    error,
    city,
    resetFilters,
    handleDateChange,
    setSelectedCategories,
    setSelectedGenres,
    setSelectedCity,
    setSelectedPrice,
  }
}
