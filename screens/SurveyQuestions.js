import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Animated, Easing, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resetSurveyResponseState, saveSurveyResponse } from "../redux/slice/community/communitySlice";
import { AntDesign } from "@expo/vector-icons";

export default function SurveyQuestions(){
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()

    // handle animation
    const rotateValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 2,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 2],
    outputRange: ['0deg', '720deg'],
  });

    // retrieve user from store
    const { user } = useSelector((state) => state.auth)

    const { survey_id, survey_topic, survey_description, survey_questions, community_id, tenant_id } = route.params
    
    const surveyQuestions = Object.keys(survey_questions).map(key => ({ key, value: survey_questions[key] }))

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState('')

    // initialize the answers state with an array of null values, where each element represents a question in the survey. 
    // By setting the initial length and filling it with null values, you ensure that you have a placeholder for each question's answer.   
    const [answers, setAnswers] = useState(Array(surveyQuestions.length).fill(null))

    // handle error message
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const handleNextQuestion = () => {
        if(currentQuestionAnswer.length === 0){
            setShowErrorMessage(true)
        }  else {
            setShowErrorMessage(false) 
            handleAnswer(currentQuestionAnswer)
        }
    }

    const handleAnswer = (answer) => {
        const updatedAnswers = [...answers]
        updatedAnswers[currentQuestion] = {
            question: surveyQuestions[currentQuestion].key,
            answer
        }
        setAnswers(updatedAnswers)
        setCurrentQuestionAnswer('')
        goToNextQuestion()
    }

    const goToNextQuestion = () => {
        if(currentQuestion < surveyQuestions.length - 1){
            setCurrentQuestion(currentQuestion + 1)
        }
        else {
            return
        }
    }

    useEffect(() => {
        // submit the responses once the answers array has no null values
        if(answers.every((answer) => answer !== null)){
            console.log(answers)
            const restructuredAnswer = answers.reduce((result, item) => {
                result[item.question] = item.answer;
                return result;
            }, {});
              

            console.log(restructuredAnswer)
            dispatch(saveSurveyResponse({
                survey_id,
                client: user.id,
                survey_response: {

                }
            }))
        }
      }, [answers]);

      
    // retrieve survey response data from store
    const { surveyresponse, isSurveyResponseLoading, isSurveyResponseSuccess, isSurveyResponseError, isSurveyResponseMessage } = useSelector((state) => state.community)

    // handle response data
    useEffect(() => {
        if(isSurveyResponseSuccess && surveyresponse){
            Alert.alert(
                'Thank you!', 
                'Your participation is this survey is highly appreciated!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('surveys', { community_id, tenant_id })
                    }
                ] 
            )
        }

        if(isSurveyResponseError || isSurveyResponseMessage){
            Alert.alert(
                'Failed to capture response', 
                'The response was not captured. Please note that you cannot participate in a survey twice. If you have not participated in this survey before, please try again later',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('surveys', { community_id, tenant_id })
                    }
                ] 
            )
        }

        dispatch(resetSurveyResponseState())
    }, [dispatch, navigation, surveyresponse, isSurveyResponseLoading, isSurveyResponseError, isSurveyResponseMessage, isSurveyResponseSuccess])
    return (
        <SafeAreaView className='flex-1 px-3 pt-8'>
            
            <View className='items-center justify-center flex-1 space-y-4'>
                <View className='items-center'>
                    <Text className='text-xl font-semibold'>{survey_topic}</Text>
                    <Text className='text-sm text-center text-gray-500'>{survey_description.length > 100 ? survey_description.slice(0, 100)+'...' : survey_description}</Text>
                </View>
                {
                    isSurveyResponseLoading ? 
                    <View className='relative items-center justify-center w-full p-2 bg-white rounded h-80'>
                        <Animated.View style={{transform: [{ rotate: rotateInterpolation }]}}>
                            <AntDesign name="loading1" size={80} color="#2DABB1" style={{}} />
                        </Animated.View>
                    </View> :
                    <View 
                        className='relative w-full p-2 bg-white rounded h-80'
                        style={{elevation: 2, shadowColor: '#52006A'}}
                    >
                    <View className='flex-1 space-y-3'>
                            <Text className='text-lg'>{currentQuestion+1}. {surveyQuestions[currentQuestion].value}</Text>
                            <View className='flex-1'>
                                <TextInput
                                    placeholder='Type your answer'
                                    value={currentQuestionAnswer}
                                    onChangeText={text => setCurrentQuestionAnswer(text)}
                                    className='flex-1 p-2 mb-2 border border-gray-200 rounded'
                                    multiline
                                    textAlignVertical="top"
                                    // style={{
                                    //     maxHeight: 120,
                                    //     height: 'auto'
                                    // }}
                                    testID='message-input'
                                />
                                <Text className={showErrorMessage ? 'mb-2 text-red-600 text-sm' : 'hidden'}>Required</Text>
                            </View>
                    </View>

                    <TouchableOpacity 
                        activeOpacity={0.9} 
                        onPress={() => handleNextQuestion()} 
                        className='mb-6 bg-[#2DABB1] py-2 rounded-full'>
                        <Text className='font-semibold text-center text-white'>{ currentQuestion+1 === surveyQuestions.length ? 'Complete' : 'Next'}</Text>
                    </TouchableOpacity>
                    </View>
                }
                
            </View>
        </SafeAreaView>
    )
}