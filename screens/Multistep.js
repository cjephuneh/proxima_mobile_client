import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Touchable, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import { Feather, Ionicons } from '@expo/vector-icons';
import { register, reset, setAuthCode, setGoal, setUserConfirmPassword, setUserEmail, setUserPassword, setUserProfile } from '../redux/slice/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup'
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

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
        
        navigation.navigate('setPassword')
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
                initialValues={{email: 'k@e.com'}}
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

// export const Code = () => {
//     const navigation = useNavigation()
//     const dispatch = useDispatch()

//     const email = useSelector(state => state.auth.email)

//     const authCodeValidationSchema = yup.object().shape({
//         code: yup
//             .string()
//             .matches(/^[0-9]+$/, "Must be digits only")
//             .min(4)
//             .max(4)
//             .required('Required'),
//     }) 

//     const submitAuthCode = (values) => {
//         // console.log(values)
//         dispatch(setAuthCode(values.code))

//         navigation.navigate('setPassword')
//     }
//     return (
//         <SafeAreaView className='flex-1 pt-8 px-2 bg-white'>
//             <TouchableOpacity onPress={() => navigation.navigate('email')} className="mb-4">
//             <Ionicons name="chevron-back" size={24} color="black" />
//             </TouchableOpacity>
//             <View className='w-full h-2 bg-gray-300 rounded'>
//                 <View className='w-3/6 h-2 bg-[#2DABB1] rounded'></View>
//             </View>

//             <Text className='mt-3 text-xl font-bold'>Enter authentication code</Text>

//             <Text>
//             Enter the 4-digit code that we have sent to the email address <Text className='font-bold'>{email}</Text>
//             </Text>

//             <Formik
//                 validationSchema={authCodeValidationSchema}
//                 initialValues={{code: ''}}
//                 onSubmit={submitAuthCode}
//             >
//                 {
//                     ({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
//                         <>
//                             <TextInput
//                                 className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
//                                 placeholder='1234'
//                                 value={values.code}
//                                 onChangeText={handleChange('code')}
//                                 onBlur={handleBlur('code')}
//                                 testID='code-input'
//                             />

//                             {errors.code && touched.code && <Text testID='code-validation' className='mt-2 ml-2 text-sm text-red-600'>{errors.code}</Text>}

//                             <TouchableOpacity activeOpacity={0.9} onPress={handleSubmit} className='bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'>
//                                 <Text className='text-white text-center text-xl font-semibold'>Continue</Text>
//                             </TouchableOpacity>
//                         </>
//                     )
//                 }

//             </Formik>

//             <TouchableOpacity className='mt-4'>
//                 <Text className='text-[#2DABB1] text-center text-lg font-semibold'>
//                     Resend code
//                 </Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     )
// }

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
            <TouchableOpacity onPress={() => navigation.navigate('email')} className="mb-4">
            <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-4/6 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text className='mt-3 text-xl font-bold'>Set a password</Text>

            <Formik
                initialValues={{password: '12345678'}}
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
    

    const [confirmPassword, setConfirmPassword] = useState('12345678')

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

    const [selectedGender, setSelectedGender] = useState('');

    // dropdown
    const [genderOpen, setGenderOpen] = useState(false);
    const [genders, setGenders] = useState([
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
    ]);


    // date picker
    // const [date, setDate] = useState(new Date());
    // const [show, setShow] = useState(false);

    // const onChange = (event, selectedDate) => {
    //     const dt = JSON.stringify(selectedDate)
    //     const currentDate = selectedDate;
    //     setDOB(JSON.stringify(selectedDate).split('T')[0])
    //     console.log('dob')
    //     setShow(false);
    //     setDate(currentDate);
    //   };

    const profileValidationSchema = yup.object().shape({
        username: yup
            .string()
            .required('Required'),
        firstName: yup
            .string()
            .required('Required'),
        lastName: yup
            .string()
            .required('Required'),
        // gender: yup
        //     .string()
        //     .required(),
        dateOfBirth: yup
            .string()
            .required(),
        phoneNumber: yup
            .string()
            .required()
    }) 

    const { email, password, confirmPassword, isUserError, isUserSuccess, isUserMessage, isUserLoading } = useSelector((state) => state.auth)
    
    const submitProfile = (values) => {

        const resetErrorInStore = (dispatch, action) => new Promise((resolve, reject) => {
            dispatch(action())
            resolve();
        })

        resetErrorInStore(dispatch, reset).then(() => {
            dispatch(register({
                username: values.username,
                email,
                first_name: values.firstName,
                last_name: values.lastName,
                gender: selectedGender,
                phonenumber: values.phoneNumber,
                DOB: values.dateOfBirth,
                password,
                confirm_password: confirmPassword,
                user_type: 'client'
            }))
        })
    }

    useEffect(() => {
        if(isUserError){
            if(isUserMessage === 'Username already taken'){
                Alert.alert('Username already registered', 
                    'Please select another username'
                )
            }
    
            if(isUserMessage === 'Email already registered'){
                Alert.alert('User already exists', 
                    'It seems you already have a Proxima account. Please log in.',
                    [
                        { text: 'LOGIN', onPress: () => navigation.replace('login')},
                        { text: 'OK', style: 'cancel'}
                    ]
                )
            }
    
            if(isUserMessage === 'An error occurred. Please try again later'){
                Alert.alert('Error :(',
                'An error occurred. Please make sure the form is fully filled out or try again later'
                )
            }
        }
    }, [isUserError, isUserMessage])
    return (
        <SafeAreaView className='flex-1 pt-8 px-2 bg-white'>
            <KeyboardAvoidingView behavior='position' className='mt-2 space-y-3'>
                <View className=''>
                    <TouchableOpacity onPress={() => navigation.navigate('setPassword')} className="mb-4">
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <View className='w-full h-2 bg-gray-300 rounded'>
                        <View className='w-6/6 h-2 bg-[#2DABB1] rounded'></View>
                    </View>
                </View>

                <Text className='mt-3 text-xl font-bold'>Finish setting up your profile</Text>
                <Formik
                    initialValues={{username: 'kimtest1', firstName: 'Kim', lastName: 'Test', gender: selectedGender, dateOfBirth: '2022-12-12', phoneNumber: '254712345678'}}
                    validationSchema={profileValidationSchema}
                    onSubmit={submitProfile}
                >
                    {
                        ({handleChange, handleBlur, handleSubmit, values, errors, isValid, touched}) => (
                            <View className='mt-4 space-y-3'>
                                <View>
                                    <Text>Username</Text>
                                    <TextInput
                                        className='mt-2 border border-gray-300 px-4 py-2 rounded-lg'
                                        placeholder='johndoe'
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        testID='name-input'
                                    />
                                    {errors.username && touched.username && <Text testID='username-validation-text' className='mt-2 ml-2 text-sm text-red-600'>{errors.username}</Text>}

                                </View>
                                
                                <View className='flex-row justify-between gap-2'>
                                    <View className='flex-1'>
                                        <Text>First Name</Text>
                                        <TextInput
                                            className='mt-2 border border-gray-300 px-4 py-2 rounded-lg'
                                            placeholder='John'
                                            value={values.firstName}
                                            onChangeText={handleChange('firstName')}
                                            onBlur={handleBlur('firstName')}
                                            testID='name-input'
                                        />
                                        {errors.firstName && touched.firstName && <Text testID='firstName-validation-text' className='mt-2 ml-2 text-sm text-red-600'>{errors.firstName}</Text>}

                                    </View>

                                    <View className='flex-1'>
                                        <Text>Last Name</Text>
                                        <TextInput
                                            className='mt-2 border border-gray-300 px-4 py-2 rounded-lg'
                                            placeholder='Doe'
                                            value={values.lastName}
                                            onChangeText={handleChange('lastName')}
                                            onBlur={handleBlur('lastName')}
                                            testID='name-input'
                                        />
                                        {errors.lastName && touched.lastName && <Text testID='lastName-validation-text' className='mt-2 ml-2 text-sm text-red-600'>{errors.lastName}</Text>}
                                    </View>
                                </View>

                                <View className='flex-row gap-2'>
                                    <View className='flex-1'>
                                        <Text>Gender</Text>
                                        <DropDownPicker
                                            // style={styles.dropdown}
                                            style={{
                                                borderColor: 'rgb(209 213 219)',
                                                borderWidth: 1,
                                            }}
                                            // textStyle={{
                                            //     fontSize: 10
                                            // }}
                                            // labelStyle={{
                                            //     fontSize: 10
                                            // }}
                                            className='mt-2 px-4 py-2'
                                            open={genderOpen}
                                            value={selectedGender} //genderValue
                                            items={genders}
                                            
                                            setOpen={setGenderOpen}
                                            setValue={setSelectedGender}
                                            setItems={setGenders}
                                            placeholder="Select Gender"
                                            // theme='DARK'
                                            // placeholderStyle={{backgroundColor: 'blue'}}
                                            // onOpen={onGenderOpen}
                                            // onChangeValue={(value) => setUserGender(value)}
                                            // zIndex={5000}
                                            // zIndexInverse={6000}
                                            dropDownDirection='TOP'
                                            // disableBorderRadius={true}
                                            // maxHeight={100}
                                        />

                                        {/* <Text testID='name-val-text' className={validationStyles}>Your name is required</Text> */}
                                    </View>

                                    <View className='flex-1'>
                                        <Text>Date of Birth</Text>
                                        {/* {show && (
                                            <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={'date'}
                                            is24Hour={true}
                                            onChange={onChange}
                                            />
                                        )} */}
                                        <View className='flex-row flex-1 items-center border border-gray-300 mt-2 rounded-lg px-2 py-2 '>
                                            <TextInput
                                                className='flex-1'
                                                placeholder='YYYY-MM-DD'
                                                value={values.dateOfBirth}
                                                onChangeText={handleChange('dateOfBirth')}
                                                onBlur={handleBlur('dateOfBirth')}
                                                testID='name-input'
                                            />
                                            {/* <TouchableOpacity activeOpacity={.9} onPress={() => setShow(!show)}>
                                                <Feather name="calendar" size={24} color="black" />
                                            </TouchableOpacity> */}
                                            {errors.dateOfBirth && touched.dateOfBirth && <Text testID='dateOfBirth-validation-text' className='mt-2 ml-2 text-sm text-red-600'>{errors.dateOfBirth}</Text>}
                                        </View>

                                        {/* <Text testID='name-val-text' className={validationStyles}>Your name is required</Text> */}
                                    </View>
                                </View>

                                <View>
                                    <Text>Phone Number</Text>
                                    <TextInput
                                        className='mt-2 border border-gray-300 px-4 py-2 rounded-lg'
                                        placeholder='254712345678'
                                        value={values.phoneNumber}
                                        onChangeText={handleChange('phoneNumber')}
                                        onBlur={handleBlur('phoneNumber')}
                                        testID='name-input'
                                    />

                                    {errors.phoneNumber && touched.phoneNumber && <Text testID='phoneNumber-validation-text' className='mt-2 ml-2 text-sm text-red-600'>{errors.phoneNumber}</Text>}
                                </View>

                                <TouchableOpacity activeOpacity={0.9} onPress={handleSubmit} className='bg-[#2DABB1] z-0 mt-16 px-4 py-2 w-full rounded-full'>
                                    <Text className='text-white text-center text-xl font-semibold'>{isUserLoading ? 'Please wait...' : 'Continue'}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </Formik>
                

                {/* <View>
                    <Text>Your Bio(optional)</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        className='mt-2 border border-gray-300 px-4 py-2 rounded-lg'
                        placeholder='A brief description about you'
                        value={bio}
                        onChangeText={text => setBio(text)}
                        textAlignVertical='top'
                        testID='bio-input'
                    />
                </View> */}
            </KeyboardAvoidingView>
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
        {/* <Stack.Screen name='code' component={Code} /> */}
        <Stack.Screen name='setPassword' component={SetPassword} />
        <Stack.Screen name='confirmPassword' component={ConfirmPassword} />
        <Stack.Screen name='setProfile' component={SetProfile} />
    </Stack.Navigator>
  )
}

export default Multistep