import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/authSlice' 
import { useNavigation } from '@react-navigation/native'

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
      <View className='flex-row space-x-3'>
        <Image source={require('../../assets/user.png')} />  
        <View>
            <Text className='font-bold'>Kevin Kimani</Text>
            <Text className='text-gray-500'>kimanikevin254@gmail.com</Text>
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