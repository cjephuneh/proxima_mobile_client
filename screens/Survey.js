import { useNavigation } from "@react-navigation/native";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Survey(){
    const navigation = useNavigation()
    return (
        <SafeAreaView className='flex-1 bg-white pt-8 px-3 justify-between'>
            <View>
                <Text className='font-semibold text-2xl text-center'>Our Products</Text>
                <Text className='text-center mt-3'>
                We value your opinion! As a valued customer of our company, we would like to hear your feedback on our products. Your insights are crucial in helping us understand your preferences and improve our offerings to better serve you.
                </Text>
                
                <View className='mt-7 flex-row items-center '>
                    <View className='flex-row'>
                        {
                            [1,2,3].map((user, i) => (
                                <View key={i} className={i > 0 ? '-mx-2 border-2 border-white rounded-full' : 'border-2 border-white rounded-full'}>
                                    <Image 
                                        key={i}
                                        source={require('../assets/user.png')}
                                        testID='top-3-member-images'
                                    />
                                </View>
                            ))
                        }
                    </View>
                    <Text className='ml-5 text-[#2DABB1]'>Completed by 15 people</Text>
                </View>

                <View className='mt-8 flex-row items-center justify-around'>
                    <View>
                        <Text className='text-center'>Questions</Text>
                        <Text className='text-center font-semibold'>45</Text>
                    </View>

                    <View>
                        <Text className='text-center'>Approximate time</Text>
                        <Text className='text-center font-semibold'>20mins</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('surveyQuestions')} className='mb-6 bg-[#2DABB1] py-2 rounded-full'>
                <Text className='text-center font-semibold text-white'>Start Survey</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}