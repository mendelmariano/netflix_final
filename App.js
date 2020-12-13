import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import Tabs from './routes/Tabs';
import Camera from './screen/Camera';
import ChooseIcons from './screen/ChooseIcon';
import ProfileToEdit from './screen/ProfileToEdit';
import ProfileContext from "./context/ProfileContext";
import {configureLanguageToi18n} from './languages/utils';


const Stack = createStackNavigator();

configureLanguageToi18n();

const App = () => {

  

  const [user, changeUser] = useState("Jose");

  return (
  <ProfileContext.Provider value={{user, changeUser}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        options={{ headerShown: false}}
        name="Tabs" component={Tabs}/>
        <Stack.Screen name="Camera" component={Camera}/>
        <Stack.Screen name="ChooseIcon" component={ChooseIcons}/>
        <Stack.Screen name="ProfileToEdit" component={ProfileToEdit}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ProfileContext.Provider>
  );
};

export default App;
