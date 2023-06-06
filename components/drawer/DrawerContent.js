import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/auth/authSlice' 
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DrawerContent = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [user, setUser] = useState(null)

    // dispatch the logout reducer which set the user to null
    // remove user info from local storage
    // current closing drawer and redirecting to login manually
    // TODO: Try and find a fix to force the MainStackNav to rerender on user state change
    const handleLogout = async () => {
        await removeInfo()
        dispatch(logout())
        // props.navigation.closeDrawer()
        // navigation.replace('login')
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
      // console.log('user info ', userInfo)
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
          <Image source={require('../../assets/user.png')} className='w-16 h-16' resizeMode='contain' />  
          <TouchableOpacity activeOpacity={0.9} className='mt-2 bg-[#EBFEFF] px-4 py-1 rounded'>
            <Text className='text-[#2DABB1]'>Change profile picture</Text>
          </TouchableOpacity>
        </View>

        <View className='space-y-3 mt-6'>
          <View className='flex-row justify-between'>
            <Text>First name</Text>
            <Text>John</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text>Last name</Text>
            <Text>Doe</Text>
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