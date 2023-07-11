import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/auth/authSlice' 
import { useNavigation } from '@react-navigation/native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DrawerContent = (props) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)

    const handleLogout = async () => {
        await removeInfo()
        dispatch(logout())
    }

    // remove user info from local storage
    const removeInfo = async () => {
      try {
        await AsyncStorage.removeItem('user')
      } catch (error) {
        console.log('Error')
      }
    }

    // retrieve user info from local storage
    const getInfo = async () => {
      try {
        const value = await AsyncStorage.getItem('user')        
        return value !== null ? JSON.parse(value) : null
      } catch (error) {
        return null
      }
    }

    // update state with the retrieved info
    const setUserInfo = async () => {
      let userInfo = await getInfo()
      setUser(userInfo)
    }

    // run the setUserinfo function once on page load
    useEffect(() => {
      setUserInfo()
    }, [])

  return (
    <SafeAreaView className='my-8 mx-3 flex-1 justify-between bg-white'>
      <View>
        <Text className='text-lg font-bold  text-center'>My Profile</Text>
        <View className='items-center mt-4'>
          <View className='w-14 h-14 rounded-full border-2 border-[#2DABB1] items-center justify-center'>
            <FontAwesome name="user" size={32} color="#2DABB1" />
          </View>
        </View>

        <View className='space-y-3 mt-6'>
          <View className='flex-row justify-between'>
            <Text>First name</Text>
            <Text>{user && user.first_name}</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text>Last name</Text>
            <Text>{user && user.last_name}</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text>Location</Text>
            <Text>Kenya</Text>
          </View>
        </View>

        <View className='mt-4'>
          <Text className='bg-gray-200 px-2 py-1'>ACCOUNT INFORMATION</Text>
          <View className='flex-row justify-between mt-2'>
            <Text>Email</Text>
            <Text>{user && user.email}</Text>
          </View>
        </View>

        <View className='mt-4'>
          <Text className='bg-gray-200 px-2 py-1'>LANGUAGE PREFERENCES</Text>

          <View className='flex-row mt-2 items-center justify-between'>
            <View>
              <Text className='font-semibold'>Language</Text>
              <Text className='text-sm text-gray-500'>English</Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="black" />
          </View>
        </View>
      </View>

    <TouchableOpacity 
        className='mx-auto bg-gray-300 px-4 py-2 rounded'
        activeOpacity={0.9}
        onPress={() => handleLogout()}
    >
        <Text className='font-bold'>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default DrawerContent