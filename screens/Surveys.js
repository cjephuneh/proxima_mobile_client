import { EvilIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { retrieveCommunitySurveys } from "../redux/slice/community/communitySlice";

export default function Surveys(){
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()

    const { community_id, tenant_id } = route.params

    // retrieve data from the store
    const { communitysurveys, isCommunitySurveysLoading, isCommunitySurveysSuccess, isCommunitySurveysError, isCommunitySurveysMessage } = useSelector((state) => state.community)


    // retrieve community surveys
    useEffect(() => {
        community_id && dispatch(retrieveCommunitySurveys({community_id: community_id, tenant_id: tenant_id}))
    }, [community_id, tenant_id, dispatch])
    return (
        community_id &&
        <SafeAreaView className='flex-1 px-3 pt-8'>
            <View className='flex-row items-center space-x-3'>
                <View className='flex-row items-center flex-1 px-2 py-2 space-x-3 bg-gray-200 rounded-lg'>
                    <EvilIcons name="search" size={24} color="black" />
                    <TextInput
                        className='flex-1'
                        placeholder='Search Surveys'
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.openDrawer()}
                    testID='profile-pic'
                    className='h-10 w-10 border-2 border-[#2DABB1] rounded-full justify-center items-center'
                >
                    <FontAwesome5 name="user-alt" size={20} color="#2DABB1" />
                </TouchableOpacity>
            </View>

            <Text className='my-3 text-2xl font-semibold'>Surveys</Text>

            <ScrollView showsVerticalScrollIndicator={false} className=''>
                {
                    isCommunitySurveysLoading ?

                    <Text>Loading surveys...</Text> :

                    (
                        isCommunitySurveysSuccess && communitysurveys.data.length > 0 ?

                        <>
                            {
                                communitysurveys.data.map(survey => (
                                    <TouchableOpacity key={survey.survey_id} onPress={() => navigation.navigate('survey', {
                                            survey_id: survey.survey_id,
                                            survey_topic: survey.survey_topic,
                                            survey_description: survey.survey_description,
                                            survey_questions: survey.survey_questions,
                                            community_id,
                                            tenant_id
                                        })} 
                                        activeOpacity={0.9} 
                                        className='flex-row items-center p-2 mb-1 space-x-3 bg-white rounded'
                                        style={{elevation: 2, shadowColor: '#52006A'}}
                                    >
                                            <Ionicons name="md-newspaper-outline" size={24} color="#2DABB1" />
                                            <View>
                                                <Text className='font-semibold'>{survey.survey_topic}</Text>
                                                <Text className='text-sm text-gray-500'>{survey.survey_description.length > 40 ? survey.survey_description.slice(0, 40)+'...' : survey.survey_description}</Text>
                                            </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </> :

                        <Text>No surveys available for this community</Text>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}