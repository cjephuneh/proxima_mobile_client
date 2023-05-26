import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Surveys(){
    const navigation = useNavigation()
    return (
        <SafeAreaView className='flex-1 bg-white pt-8 px-3'>
            <View className='flex-row items-center space-x-3'>
                <View className='flex-row bg-gray-200 rounded-lg px-2 space-x-3 py-2 items-center flex-1'>
                    <EvilIcons name="search" size={24} color="black" />
                    <TextInput
                        className='flex-1'
                        placeholder='Search Surveys'
                        // value={searchWord}
                        // onChangeText={(text) => searchFilterFunction(text)}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.openDrawer()}
                    testID='profile-pic'
                >
                    <Image source={require('../assets/user.png')} />
                </TouchableOpacity>
            </View>

            <Text className='my-3 text-2xl font-semibold'>Surveys</Text>

            <ScrollView showsVerticalScrollIndicator={false} className=''>
                <TouchableOpacity onPress={() => navigation.navigate('survey')} activeOpacity={0.9} className='flex-row items-center gap-3 bg-gray-200 py-2 mt-2 mx-1 rounded'>
                    <Ionicons name="md-newspaper-outline" size={24} color="black" />
                    <View>
                        <Text className='font-semibold'>Our Products</Text>
                        <Text className='text-gray-500 text-sm'>How do you feel about our products?</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('survey')} activeOpacity={0.9} className='flex-row items-center gap-3 bg-gray-200 py-2 mt-2 mx-1 rounded'>
                    <Ionicons name="md-newspaper-outline" size={24} color="black" />
                    <View>
                        <Text className='font-semibold'>New Products?</Text>
                        <Text className='text-gray-500 text-sm'>Do you want us to produce new products?</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}