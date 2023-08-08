import { View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TextInput, Touchable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { login, signin } from '../redux/slice/auth/authSlice'
import { Formik } from 'formik';
import * as yup from 'yup'


const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const { isUserLoading, isUserError, isUserMessage } = useSelector((state) => state.auth)

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Required'),
    password: yup
      .string()
      .required('Required')
  }) 

  const handleLogin = (values) => {
    // dispatch(login()) // for testing purposes only. to be removed and activate signin
    dispatch(signin({email: values.email, password: values.password}))
  }

  

  // display appropriate error messages
  useEffect(() => {
    if(isUserError){
      if(isUserMessage === 'Incorrect credentials' && isUserLoading === false){
        Alert.alert('Incorrect credentials',
          'Please use the correct credentials or create an account'
        )
      }
    }
  }, [isUserError, isUserMessage, isUserLoading])

  return (
    <SafeAreaView className='flex-1 px-4 bg-white'>
      <View className='flex-row items-center pt-8'>
        <TouchableOpacity activeOpacity={0.2} onPress={() => navigation.navigate('onBoarding')} testID='back-button'>
        <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <View className='w-full -mx-6 '>
        <Text className='text-xl text-center' testID='screen-title'>Log in</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior='padding' className='justify-between py-8'>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={handleLogin}
        >
          {
            ({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched}) => (
              <View>
                <View className='p-2 border border-gray-300 rounded-xl'>
                    <Text className=''>Email</Text>
                    <TextInput
                        name='email'
                        placeholder='you@email.com'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                    />
                </View>

                {errors.email && touched.email && <Text className='mt-2 ml-2 text-sm text-red-600' testID='email-validation-text'>{errors.email}</Text>}

                <View className='p-2 mt-4 border border-gray-300 rounded-xl'>
                    <TextInput
                        name='password'
                        placeholder='password'
                        secureTextEntry={true}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                    />
                </View>

                {errors.password && touched.password && <Text className='mt-2 ml-2 text-sm text-red-600' testID='password-validation-text'>{errors.password}</Text>}

                <TouchableOpacity className='mt-4 text-[#2DABB1]'>
                    <Text className='text-[#2DABB1]'>
                        Forgot password?
                    </Text>
                </TouchableOpacity>

                <View className='flex-row mt-4 space-x-2'>
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
                      disabled={isValid && isUserLoading}
                      onPress={handleSubmit} 
                      activeOpacity={0.9} 
                      className='bg-[#2DABB1] mt-8 px-6 py-3 w-full rounded-full'
                      testID='login-button'
                    >
                      <Text className='text-xl font-semibold text-center text-white'>{isUserLoading ? 'Please wait...' : 'Log in'}</Text>
                    </TouchableOpacity>
                </View>
              </View>
            )
          }
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login