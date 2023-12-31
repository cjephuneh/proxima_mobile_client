import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../screens/Chat';
import Inbox from '../screens/Inbox';
import Home from '../screens/Home';
import Company from '../screens/Company';
import CompanyLocation from '../screens/CompanyLocation';
import Login from '../screens/Login'
import CreateIssue from '../screens/CreateIssue';
import CompanyProfile from '../screens/CompanyProfile';
import Issues from '../screens/Issues';
import Issue from '../screens/Issue';
import Community from '../screens/Community';
import FavoriteOrgs from '../screens/FavoriteOrgs';
import Communities from '../screens/Communities';
import Surveys from '../screens/Surveys';
import Survey from '../screens/Survey';
import SurveyQuestions from '../screens/SurveyQuestions';

const Stack = createNativeStackNavigator();

const AppStackNav = () => {
  return (
    <Stack.Navigator initialRouteName='home' screenOptions={{
        headerShown:  false,
      }}>
        <Stack.Screen name='home' component={Home} />
        <Stack.Screen name='company' component={Company} />
        <Stack.Screen name='inbox' component={Inbox} />
        <Stack.Screen name='chat' component={Chat} />
        <Stack.Screen name='location' component={CompanyLocation} />
        <Stack.Screen name='createIssue' component={CreateIssue} />
        <Stack.Screen name='companyProfile' component={CompanyProfile} />
        <Stack.Screen name='issues' component={Issues} />
        <Stack.Screen name='issue' component={Issue} />
        <Stack.Screen name='communities' component={Communities} />
        <Stack.Screen name='community' component={Community} />
        <Stack.Screen name='favorite' component={FavoriteOrgs} />
        <Stack.Screen name='surveys' component={Surveys} />
        <Stack.Screen name='survey' component={Survey} />
        <Stack.Screen name='surveyQuestions' component={SurveyQuestions} />
        
        {/* the login route should be the last in the list */}
        <Stack.Screen name='login' component={Login} />
    </Stack.Navigator>
  )
}

export default AppStackNav