import { View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TextInput, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { login, signin } from '../redux/slice/auth/authSlice'
import { Formik } from 'formik';
import * as yup from 'yup'

const Login = ({ navigation }) => {
  const dispatch = useDispatch()

  const { isUserLoading } = useSelector((state) => state.auth)

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Required'),
    password: yup
      .string()
      .required('Required')
  }) 

  // const user = useSelector((state) => state.auth.user)

  const handleLogin = (values) => {
    // dispatch(login()) // for testing purposes only. to be removed and activate signin
    dispatch(signin({email: values.email, password: values.password}))
  }

  return (
    <SafeAreaView className='bg-white flex-1 px-4'>
      <View className='pt-8 flex-row items-center'>
        <TouchableOpacity activeOpacity={0.2} onPress={() => navigation.navigate('onBoarding')} testID='back-button'>
        <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <View className=' -mx-6 w-full'>
        <Text className='text-xl text-center' testID='screen-title'>Log in</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior='padding' className='justify-between py-8'>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: 'k@e.com', password: '12345678'}}
          onSubmit={handleLogin}
        >
          {
            ({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched}) => (
              <View>
                <View className='border border-gray-300 p-2 rounded-xl'>
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

                <View className='border border-gray-300 mt-4 p-2 rounded-xl'>
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
                      disabled={isValid && isUserLoading}
                      onPress={handleSubmit} 
                      activeOpacity={0.9} 
                      className='bg-[#2DABB1] mt-8 px-6 py-3 w-full rounded-full'
                      testID='login-button'
                    >
                      <Text className='text-white text-center text-xl font-semibold'>{isUserLoading ? 'Please wait...' : 'Log in'}</Text>
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