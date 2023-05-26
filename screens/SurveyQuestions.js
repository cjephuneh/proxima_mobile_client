import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SurveyQuestions(){
    const navigation = useNavigation()
    const surveyQuestions = [
        {
          id: 1,
          question: "How satisfied are you with the product quality?",
        },
        {
          id: 2,
          question: "Would you recommend this product to others?",
        },
        {
          id: 3,
          question: "What improvements would you like to see in the product?",
        },
        {
          id: 4,
          question: "How would you rate the product's performance?",
        },
        {
          id: 5,
          question: "Are you satisfied with the product's pricing?",
        },
        {
          id: 6,
          question: "Did the product meet your expectations?",
        },
        {
          id: 7,
          question: "How likely are you to purchase from us again?",
        },
      ];

      const [currentQuestion, setCurrentQuestion] = useState(0)

      const handleNext = () => {
        if(currentQuestion+1 === surveyQuestions.length){
            navigation.navigate('surveys')
            return
        }
        setCurrentQuestion(currentQuestion+1)
      }
      
    return (
        <SafeAreaView className='pt-8 px-3 flex-1 justify-between'>
            <View className='relative flex-1'>
                <View>
                    <View className='space-y-3'>
                        <Text className='text-xl'>{currentQuestion+1}. {surveyQuestions[currentQuestion].question}</Text>
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