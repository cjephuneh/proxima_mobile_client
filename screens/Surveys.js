import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { retrieveCommunitySurveys } from "../redux/slice/community/communitySlice";

export default function Surveys(){
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()

    const { community_id } = route.params

    // retrieve data from the store
    const { communitysurveys, isCommunitySurveysLoading, isCommunitySurveysSuccess, isCommunitySurveysError, isCommunitySurveysMessage } = useSelector((state) => state.community)

    // console.log('surveys',  communitysurveys, isCommunitySurveysSuccess)

    // retrieve community surveys
    useEffect(() => {
        // TODO => replace 1 with a dynamic community_id
        community_id && dispatch(retrieveCommunitySurveys({ tenant_id: community_id}))
    }, [])
    return (
        community_id &&
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
                {
                    isCommunitySurveysLoading ?

                    <Text>Loading surveys...</Text> :

                    (
                        isCommunitySurveysSuccess && communitysurveys.data.length > 0 ?

                        <>
                            {
                                communitysurveys.data.map(survey => (
                                    <TouchableOpacity key={survey.survey_id} onPress={() => navigation.navigate('survey', {
                                        survey_topic: survey.survey_topic,
                                        survey_description: survey.survey_description,
                                        survey_questions: survey.survey_questions,
                                        community_id
                                    })} activeOpacity={0.9} className='flex-row items-center gap-3 bg-gray-200 py-2 mt-2 mx-1 rounded'>
                                        <Ionicons name="md-newspaper-outline" size={24} color="black" />
                                        <View>
                                            <Text className='font-semibold'>{survey.survey_topic}</Text>
                                            <Text className='text-gray-500 text-sm'>{survey.survey_description.length > 40 ? survey.survey_description.slice(0, 40)+'...' : survey.survey_description}</Text>
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