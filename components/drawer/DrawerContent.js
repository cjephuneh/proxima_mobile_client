import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/auth/authSlice' 
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

const DrawerContent = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleLogout = () => {
        dispatch(logout())
        props.navigation.closeDrawer()
        navigation.replace('login')
    }
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
            <Text>jon@email.com</Text>
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