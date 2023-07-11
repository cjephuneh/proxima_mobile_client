import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Survey(){
    const navigation = useNavigation()
    const route = useRoute()

    // retrieve data passed via route
    const { survey_id, survey_topic, survey_description, survey_questions, community_id, tenant_id } = route.params

    return (
        <SafeAreaView className='flex-1 bg-white pt-8 px-3 justify-between'>
            <View>
                <Text className='font-semibold text-2xl text-center'>{survey_topic}</Text>
                <Text className='text-center mt-3'>{survey_description}</Text>
                
                

                <View className='mt-8 flex-row items-center justify-around'>
                    <View>
                        <Text className='text-center'>Questions</Text>
                        <Text className='text-center font-semibold'>{Object.keys(survey_questions).length}</Text>
                    </View>

                    <View>
                        <Text className='text-center'>Approximate time</Text>
                        <Text className='text-center font-semibold'>{(Object.keys(survey_questions).length)*2.5} mins</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('surveyQuestions', { survey_id, survey_topic, survey_description, survey_questions, community_id, tenant_id })} className='mb-6 bg-[#2DABB1] py-2 rounded-full'>
                <Text className='text-center font-semibold text-white'>Start Survey</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}