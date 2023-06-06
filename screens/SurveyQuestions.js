import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SurveyQuestions(){
    const navigation = useNavigation()
    const route = useRoute()

    const { survey_questions, community_id } = route.params
    
    const surveyQuestions = Object.keys(survey_questions).map(key => ({ key, value: survey_questions[key] }))

      const [currentQuestion, setCurrentQuestion] = useState(0)

      const handleNext = () => {
        if(currentQuestion+1 === surveyQuestions.length){
            navigation.navigate('surveys', { community_id })
            return
        }
        setCurrentQuestion(currentQuestion+1)
      }
      
    return (
        <SafeAreaView className='pt-8 px-3 flex-1 justify-between'>
            <View className='relative flex-1'>
                <View>
                    <View className='space-y-3'>
                        <Text className='text-xl'>{currentQuestion+1}. {surveyQuestions[currentQuestion].value}</Text>
                        <TextInput
                            placeholder='Type your answer'
                            className='border border-gray-200 p-2'
                            multiline
                            // value={message}
                            // onChangeText={text => setMessage(text)}
                            style={{
                                maxHeight: 90,
                                height: 'auto'
                            }}
                            testID='message-input'
                        />
                    </View>

                </View>

                {   
                    currentQuestion+1 === surveyQuestions.length &&
                    <View className='absolute bottom-12 w-full'>
                        <Text className='text-center'>
                            Thank you for participating
                        </Text>

                    </View>
                }
            </View>

            <TouchableOpacity activeOpacity={0.9} onPress={() => handleNext()} className='mb-6 bg-[#2DABB1] py-2 rounded-full'>
                <Text className='text-center font-semibold text-white'>{ currentQuestion+1 === surveyQuestions.length ? 'Complete' : 'Next'}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}