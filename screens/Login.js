import { View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TextInput, Touchable } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { login, signin } from '../redux/slice/auth/authSlice'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  // handle form validation
  const [validationStyles, setValidationStyles] = useState('mt-2 ml-2 text-sm text-red-600 hidden')

  const dispatch = useDispatch()

  const handleLogin = () => {
    if(!email){
      setValidationStyles('mt-2 ml-2 text-sm text-red-600')
      return;
    }

    if(!password){
      setValidationStyles('mt-2 ml-2 text-sm text-red-600')
      return;
    }
    dispatch(login())
    // dispatch(signin({email,password}))
    navigation.replace('drawer')
  }
  return (
    <SafeAreaView className='bg-white flex-1 px-4'>
      <View className='pt-8 flex-row items-center'>
        <TouchableOpacity activeoPacity={0.2} onPress={() => navigation.navigate('onBoarding')} testID='back-button'>
        <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <View className=' -mx-6 w-full'>
        <Text className='text-xl text-center' testID='screen-title'>Log in</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior='padding' className='justify-between py-8'>
        <View>
            <View className='border border-gray-300 p-2 rounded-xl'>
                <Text className=''>Email</Text>
                <TextInput
                    placeholder='you@email.com'
                    value={email}
                    onChangeText={text => setEmail(text)}
                 />
            </View>

            <Text className={validationStyles} testID='email-validation-text'>Email is required</Text>

            <View className='border border-gray-300 mt-4 rounded-xl'>
                <TextInput
                    placeholder='password'
                    secureTextEntry={true}
                    className='p-2'
                    value={password}
                    onChangeText={text => setPassword(text)}
                 />
            </View>

            <Text className={validationStyles} testID='password-validation-text'>Password is required</Text>

            <TouchableOpacity className='mt-4 text-[#2DABB1]'>
                <Text className='text-[#2DABB1]'>
                    Forgot password?
                </Text>
            </TouchableOpacity>
        </View>

        <View className='mt-4 flex-row space-x-2'>
            <Text>No account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('multistep')} testID='signup-button'>
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
              testID='login-button'
            >
              <Text className='text-white text-center text-xl font-semibold'>Log in</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login