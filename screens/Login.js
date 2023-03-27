import { View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TextInput, Touchable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slice/authSlice'

const Login = ({ navigation }) => {
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(login())
    navigation.replace('drawer')
  }
  return (
    <SafeAreaView className='bg-white flex-1 px-4'>
      <View className='pt-8 flex-row items-center'>
        <TouchableOpacity activeoPacity={0.2} onPress={() => navigation.navigate('onBoarding')}>
        <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <View className=' -mx-6 w-full'>
        <Text className='text-xl text-center'>Log in</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior='padding' className='justify-between py-8'>
        <View>
            <View className='border border-gray-300 p-2 rounded-xl'>
                <Text className=''>Email</Text>
                <TextInput
                    className=''
                    placeholder='you@email.com'
                 />
            </View>
            <View className='border border-gray-300 mt-4 rounded-xl'>
                <TextInput
                    placeholder='password'
                    className='p-2'
                 />
            </View>
            <TouchableOpacity className='mt-4 text-[#2DABB1]'>
                <Text className='text-[#2DABB1]'>
                    Forgot password?
                </Text>
            </TouchableOpacity>
        </View>

        <View className='mt-4 flex-row space-x-2'>
            <Text>No account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('multistep')}>
                <Text className='text-[#2DABB1]'>Sign up</Text>
            </TouchableOpacity>
        </View>

        <View className='mt-12'>
            <Text>
                By continuing, you agree to our <Text className='text-[#2DABB1]'>Terms of Service</Text> and our <Text className='text-[#2DABB1]'>Privacy Policy</Text>.
            </Text>

            <TouchableOpacity 
              onPress={handleLogin} 
              activeOpacity={0.9} 
              className='bg-[#2DABB1] mt-8 px-6 py-3 w-full rounded-full'
            >
              <Text className='text-white text-center text-xl font-semibold'>Log in</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login