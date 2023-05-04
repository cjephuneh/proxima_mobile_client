import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Touchable, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import { Ionicons } from '@expo/vector-icons';
import { setAuthCode, setGoal, setUserConfirmPassword, setUserEmail, setUserPassword, setUserProfile } from '../redux/slice/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup'

export const Goal = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    return (
        <SafeAreaView className='flex-1 pt-12 px-2 bg-white'>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-1/6 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text testID='goal-header' className='mt-3 text-2xl font-bold tracking-wider'>Tell us your goal</Text>
            <Text>What would you like to do with proxima?</Text>

            <View className='mt-8 space-y-4'>
                <TouchableOpacity
                    testID='chat-goal-btn' 
                    onPress={() => {
                        dispatch(setGoal('Chat with in-house organizations'))
                        navigation.navigate('email')
                    }}
                    className='bg-blue-200 px-6 py-4 rounded-full'
                >
                    <Text className='font-bold'>Chat with in-house organizations</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    testID='join-goal-btn' 
                    onPress={() => {
                        dispatch(setGoal('Join Organization community'))
                        navigation.navigate('email')
                    }}
                    className='bg-[#F2F4F5] px-6 py-4 rounded-full'
                >
                    <Text className='font-bold'>Join Organization community</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    testID='explore-goal-btn'
                    onPress={() => {
                        dispatch(setGoal('Explore other organizations'))
                        navigation.navigate('email')
                    }}
                    className='bg-[#F2F4F5] px-6 py-4 rounded-full'
                >
                    <Text className='font-bold'>Explore other organizations</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export const Email = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const emailValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Invalid email address')
            .required('Required'),
    }) 
    
    const submitEmail = (values) => {
        dispatch(setUserEmail(values.email))
        
        navigation.navigate('code')
    }

    return (
        <SafeAreaView className='flex-1 pt-8 px-2 bg-white'>
            <TouchableOpacity onPress={() => navigation.navigate('goal')} className="mb-4">
            <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-2/6 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text className='mt-3 text-xl font-bold'>What is your email address?</Text>

            <Formik
                validationSchema={emailValidationSchema}
                initialValues={{email: ''}}
                onSubmit={submitEmail}
            >
                {
                    ({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched}) => (
                        <>
                            <TextInput
                                className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
                                placeholder='you@email.com'
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                testID='email-input'
                            />

                            {errors.email && touched.email && <Text testID='email-validation-text' className='mt-2 ml-2 text-sm text-red-600'>{errors.email}</Text>}

                            <TouchableOpacity testID='submit-email-btn' activeOpacity={0.9} onPress={handleSubmit} className='bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'>
                                <Text className='text-white text-center text-xl font-semibold'>Continue</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
                </Formik>
        </SafeAreaView>
    )
}

export const Code = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const email = useSelector(state => state.auth.email)

    const authCodeValidationSchema = yup.object().shape({
        code: yup
            .string()
            .matches(/^[0-9]+$/, "Must be digits only")
            .min(4)
            .max(4)
            .required('Required'),
    }) 

    const submitAuthCode = (values) => {
        // console.log(values)
        dispatch(setAuthCode(values.code))

        navigation.navigate('setPassword')
    }
    return (
        <SafeAreaView className='flex-1 pt-8 px-2 bg-white'>
            <TouchableOpacity onPress={() => navigation.navigate('email')} className="mb-4">
            <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-3/6 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text className='mt-3 text-xl font-bold'>Enter authentication code</Text>

            <Text>
            Enter the 4-digit code that we have sent to the email address <Text className='font-bold'>{email}</Text>
            </Text>

            <Formik
                validationSchema={authCodeValidationSchema}
                initialValues={{code: ''}}
                onSubmit={submitAuthCode}
            >
                {
                    ({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                        <>
                            <TextInput
                                className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
                                placeholder='1234'
                                value={values.code}
                                onChangeText={handleChange('code')}
                                onBlur={handleBlur('code')}
                                testID='code-input'
                            />

                            {errors.code && touched.code && <Text testID='code-validation' className='mt-2 ml-2 text-sm text-red-600'>{errors.code}</Text>}

                            <TouchableOpacity activeOpacity={0.9} onPress={handleSubmit} className='bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'>
                                <Text className='text-white text-center text-xl font-semibold'>Continue</Text>
                            </TouchableOpacity>
                        </>
                    )
                }

            </Formik>

            <TouchableOpacity className='mt-4'>
                <Text className='text-[#2DABB1] text-center text-lg font-semibold'>
                    Resend code
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export const SetPassword = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const passwordValidationSchema = yup.object().shape({
        password: yup
            .string()
            .min(6, 'Your password must be at least 6 characters long')
            .required('Required'),
    }) 

    const submitPassword = (values) => {
        dispatch(setUserPassword(values.password))
        navigation.navigate('confirmPassword')
    }

    return (
        <SafeAreaView className='flex-1 pt-8 px-2 bg-white'>
            <TouchableOpacity onPress={() => navigation.navigate('code')} className="mb-4">
            <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-4/6 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text className='mt-3 text-xl font-bold'>Set a password</Text>

            <Formik
                initialValues={{password: ''}}
                validationSchema={passwordValidationSchema}
                onSubmit={submitPassword}
            >
                {
                    ({ values, errors, handleBlur, handleChange, handleSubmit, touched }) => (
                        <>
                            <TextInput
                                className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
                                placeholder='your password'
                                secureTextEntry={true}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                testID='password-input'
                            />

                            { errors.password && touched.password && <Text testID='password-validation' className='mt-2 ml-2 text-sm text-red-600'>{errors.password}</Text>}

                            <TouchableOpacity activeOpacity={0.9} onPress={handleSubmit} className='bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'>
                                <Text className='text-white text-center text-xl font-semibold'>Continue</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
            </Formik>
        </SafeAreaView>
    )
}

export const ConfirmPassword = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const password = useSelector(state => state.auth.password)
    

    const [confirmPassword, setConfirmPassword] = useState(null)

    // handle form validation
    const [validationStyles, setValidationStyles] = useState('mt-2 ml-2 text-sm text-red-600 hidden')

    const validateConfirmPassword = () => {
        if(password !== confirmPassword || !confirmPassword){
            setValidationStyles('mt-2 ml-2 text-sm text-red-600')
            return
        }
        dispatch(setUserConfirmPassword(confirmPassword))
        navigation.navigate('setProfile')
        
    }
    return (
        <SafeAreaView className='flex-1 pt-8 px-2 bg-white'>
            <TouchableOpacity onPress={() => navigation.navigate('setPassword')} className="mb-4">
            <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-5/6 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text className='mt-3 text-xl font-bold'>Confirm password</Text>

            <TextInput
                className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
                placeholder='confirm password'
                value={confirmPassword}
                secureTextEntry
                onChangeText={text => setConfirmPassword(text)}
                testID='confirm-password-input'
             />

             <Text testID='confirm-password-validation' className={validationStyles}>Passwords do not match</Text>
            <TouchableOpacity testID='set-password' activeOpacity={0.9} onPress={() => validateConfirmPassword()} className='bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'>
                <Text className='text-white text-center text-xl font-semibold'>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export const SetProfile = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [name, setName] = useState(null)
    const [bio, setBio] = useState(null)

    // handle form validation
    const [validationStyles, setValidationStyles] = useState('mt-2 ml-2 text-sm text-red-600 hidden')

    const validateProfile = () => {
        if(!name){
            setValidationStyles('mt-2 ml-2 text-sm text-red-600')
            return;
        }
        
        dispatch(setUserProfile({
            name,
            bio
        }))
        navigation.replace('drawer')
    }
    return (
        <SafeAreaView className='flex-1 pt-8 px-2 bg-white'>
            <TouchableOpacity onPress={() => navigation.navigate('setPassword')} className="mb-4">
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-6/6 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text className='mt-3 text-xl font-bold'>Finish setting up your profile</Text>

            <KeyboardAvoidingView className='mt-2 space-y-3'>
                <View>
                    <Text>Your Name</Text>
                    <TextInput
                        className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
                        placeholder='John Doe'
                        value={name}
                        onChangeText={text => setName(text)}
                        testID='name-input'
                    />

                    <Text testID='name-val-text' className={validationStyles}>Your name is required</Text>
                </View>

                <View>
                    <Text>Your Bio(optional)</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
                        placeholder='A brief description about you'
                        value={bio}
                        onChangeText={text => setBio(text)}
                        textAlignVertical='top'
                        testID='bio-input'
                    />
                </View>
            </KeyboardAvoidingView>

            <TouchableOpacity activeOpacity={0.9} onPress={() => validateProfile()} className='bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'>
                <Text className='text-white text-center text-xl font-semibold'>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const Multistep = () => {
    
  return (
    <Stack.Navigator screenOptions={{
        headerShown:  false,
      }}>
        <Stack.Screen name='goal' component={Goal} />
        <Stack.Screen name='email' component={Email} />
        <Stack.Screen name='code' component={Code} />
        <Stack.Screen name='setPassword' component={SetPassword} />
        <Stack.Screen name='confirmPassword' component={ConfirmPassword} />
        <Stack.Screen name='setProfile' component={SetProfile} />
    </Stack.Navigator>
  )
}

export default Multistep