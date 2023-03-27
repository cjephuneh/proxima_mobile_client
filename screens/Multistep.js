import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Touchable } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import { Ionicons } from '@expo/vector-icons';


const Goal = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView className='flex-1 pt-12 px-2 bg-white'>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-1/5 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text className='mt-3 text-2xl font-bold tracking-wider'>Tell us your goal</Text>
            <Text>What would you like to do with proxima?</Text>

            <View className='mt-8 space-y-4'>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('email')}
                    className='bg-blue-200 px-6 py-4 rounded-full'
                >
                    <Text className='font-bold'>Chat with in-house organizations</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.navigate('email')}
                    className='bg-[#F2F4F5] px-6 py-4 rounded-full'
                >
                    <Text className='font-bold'>Join Organization community</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.navigate('email')}
                    className='bg-[#F2F4F5] px-6 py-4 rounded-full'
                >
                    <Text className='font-bold'>Explore other organizations</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const Email = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView className='flex-1 pt-8 px-2 bg-white'>
            <TouchableOpacity onPress={() => navigation.navigate('goal')} className="mb-4">
            <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-2/5 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text className='mt-3 text-xl font-bold'>What is your email address?</Text>

            <TextInput
                className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
                placeholder='you@email.com'
             />

            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('code')} className='bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'>
                <Text className='text-white text-center text-xl font-semibold'>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const Code = () => {
    const navigation = useNavigation()
    const [disabled, setDisabled] = useState(false)
    return (
        <SafeAreaView className='flex-1 pt-8 px-2 bg-white'>
            <TouchableOpacity onPress={() => navigation.navigate('email')} className="mb-4">
            <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-3/5 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text className='mt-3 text-xl font-bold'>Enter authentication code</Text>

            <Text>
            Enter the 4-digit that we have sent via the email address <Text className='font-bold'>you@email.com</Text>
            </Text>

            <TextInput
                className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
                placeholder='1234'
             />
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('setPassword')} className={disabled ? 'bg-gray-300 mt-16 px-4 py-2 w-full rounded-full' : 'bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'}>
                <Text className='text-white text-center text-xl font-semibold'>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity className='mt-4'>
                <Text className='text-[#2DABB1] text-center text-lg font-semibold'>
                    Resend code
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const SetPassword = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView className='flex-1 pt-8 px-2 bg-white'>
            <TouchableOpacity onPress={() => navigation.navigate('code')} className="mb-4">
            <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-4/5 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text className='mt-3 text-xl font-bold'>Set a password</Text>

            <TextInput
                className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
                placeholder='your password'
                secureTextEntry={true}
             />
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('confirmPassword')} className='bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'>
                <Text className='text-white text-center text-xl font-semibold'>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const ConfirmPassword = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView className='flex-1 pt-8 px-2 bg-white'>
            <TouchableOpacity onPress={() => navigation.navigate('setPassword')} className="mb-4">
            <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View className='w-full h-2 bg-gray-300 rounded'>
                <View className='w-5/5 h-2 bg-[#2DABB1] rounded'></View>
            </View>

            <Text className='mt-3 text-xl font-bold'>Confirm password</Text>

            <TextInput
                className='mt-4 border border-gray-300 px-4 py-2 rounded-lg'
                placeholder='confirm password'
             />
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.replace('drawer')} className='bg-[#2DABB1] mt-16 px-4 py-2 w-full rounded-full'>
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
    </Stack.Navigator>
  )
}

export default Multistep